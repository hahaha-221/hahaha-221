CREATE TABLE IF NOT EXISTS writing_feedback_rate_limits (
  ip_hash TEXT PRIMARY KEY NOT NULL,
  timestamps TEXT NOT NULL
    CHECK (json_valid(timestamps) AND json_type(timestamps) = 'array'),
  last_request_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS writing_feedback_rate_limits_last_request_at
  ON writing_feedback_rate_limits(last_request_at);
