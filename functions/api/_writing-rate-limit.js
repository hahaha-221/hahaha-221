const TEN_MINUTES_MS = 10 * 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const cleanupQuery = `
  DELETE FROM writing_feedback_rate_limits
  WHERE ip_hash IN (
    SELECT ip_hash
    FROM writing_feedback_rate_limits
    WHERE last_request_at < ?1
    ORDER BY last_request_at
    LIMIT 100
  )
`;

const consumeQuery = `
  INSERT INTO writing_feedback_rate_limits (ip_hash, timestamps, last_request_at)
  VALUES (?1, json_array(?2), ?2)
  ON CONFLICT(ip_hash) DO UPDATE SET
    timestamps = json_insert(
      json(COALESCE((
        SELECT json_group_array(CAST(value AS INTEGER))
        FROM json_each(writing_feedback_rate_limits.timestamps)
        WHERE CAST(value AS INTEGER) > ?2 - ${ONE_DAY_MS}
      ), '[]')),
      '$[#]',
      ?2
    ),
    last_request_at = ?2
  WHERE
    (SELECT COUNT(*)
      FROM json_each(writing_feedback_rate_limits.timestamps)
      WHERE CAST(value AS INTEGER) > ?2 - ${TEN_MINUTES_MS}) < 5
    AND
    (SELECT COUNT(*)
      FROM json_each(writing_feedback_rate_limits.timestamps)
      WHERE CAST(value AS INTEGER) > ?2 - ${ONE_DAY_MS}) < 15
  RETURNING 1 AS allowed
`;

const formatWait = (seconds) => {
  if (seconds < 60 * 60) {
    return `khoảng ${Math.ceil(seconds / 60)} phút`;
  }
  return `khoảng ${Math.ceil(seconds / (60 * 60))} giờ`;
};

const hashIp = async (ip, secret) => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`aptis-writing-rate-limit:v1:${ip}`),
  );
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
};

export async function consumeWritingFeedbackAttempt({ database, ip, secret, now = Date.now() }) {
  if (!database || typeof database.prepare !== "function") {
    throw new Error("WRITING_RATE_LIMITS D1 binding is not configured");
  }

  const ipHash = await hashIp(ip, secret);
  await database.prepare(cleanupQuery).bind(now - ONE_DAY_MS).run();

  const consumed = await database.prepare(consumeQuery).bind(ipHash, now).first();
  if (consumed) {
    return { allowed: true };
  }

  const row = await database.prepare(
    "SELECT timestamps FROM writing_feedback_rate_limits WHERE ip_hash = ?1",
  ).bind(ipHash).first();
  if (!row || typeof row.timestamps !== "string") {
    throw new Error("Could not read writing feedback rate limit state");
  }

  let timestamps;
  try {
    timestamps = JSON.parse(row.timestamps);
  } catch {
    throw new Error("Writing feedback rate limit state is not valid JSON");
  }
  if (!Array.isArray(timestamps) || timestamps.some((timestamp) => !Number.isSafeInteger(timestamp))) {
    throw new Error("Writing feedback rate limit state has an invalid shape");
  }

  const recent = timestamps
    .filter((timestamp) => timestamp > now - ONE_DAY_MS)
    .sort((left, right) => left - right);
  const recentTenMinutes = recent.filter((timestamp) => timestamp > now - TEN_MINUTES_MS);
  const blockedWindows = [];

  if (recentTenMinutes.length >= 5) {
    blockedWindows.push({
      message: "Bạn đã chấm tối đa 5 bài trong 10 phút gần đây.",
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((recentTenMinutes[recentTenMinutes.length - 5] + TEN_MINUTES_MS - now) / 1000),
      ),
    });
  }
  if (recent.length >= 15) {
    blockedWindows.push({
      message: "Bạn đã dùng hết 15 lượt chấm trong 24 giờ qua.",
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((recent[recent.length - 15] + ONE_DAY_MS - now) / 1000),
      ),
    });
  }
  if (blockedWindows.length === 0) {
    throw new Error("Writing feedback rate limit was not consumed but no limit was reached");
  }

  const blockingWindow = blockedWindows.reduce((longest, window) =>
    window.retryAfterSeconds > longest.retryAfterSeconds ? window : longest);

  return {
    allowed: false,
    message: `${blockingWindow.message} Bạn có thể thử lại sau ${formatWait(blockingWindow.retryAfterSeconds)}.`,
    retryAfterSeconds: blockingWindow.retryAfterSeconds,
  };
}
