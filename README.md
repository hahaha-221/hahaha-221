# AptisPractice

A static HTML/CSS/JavaScript website for practicing Aptis Listening, Reading, Writing, and Speaking. Listening audio and question data are stored locally under `assets/`.

## Run the website

Open `index.html` in a browser for the practice features. AI feedback requires the deployed API setup below.

All website source files and assets are included in this project and can be edited directly.

## AI Writing feedback

Writing feedback is provided by a Cloudflare Pages Function at `/api/writing-feedback`. Learners complete all four Parts and select **Hoàn thành** to open one results page and submit all answers in a single scoring request. By default, the function uses Cloudflare Workers AI. Learners may optionally save their own Gemini API key in this browser's `localStorage`; it is sent in a request header only when asking for feedback and is not stored by the server. Scores and CEFR levels are practice estimates, not official Aptis results.

To enable it on Cloudflare Pages:

1. Deploy this project through Cloudflare Pages Git integration or Wrangler. Pages Functions are not supported by dashboard Direct Upload.
2. In the Pages project, open **Settings → Bindings → Add → Workers AI** and create a binding named `AI`. The default scorer uses `@cf/meta/llama-3.3-70b-instruct-fp8-fast`.
3. Create a Cloudflare D1 database. In the Pages project, add it as a D1 binding named `WRITING_RATE_LIMITS`, and run [`functions/api/writing-rate-limit-schema.sql`](functions/api/writing-rate-limit-schema.sql) against it.
4. Add `WRITING_RATE_LIMIT_HASH_SECRET` as an encrypted secret for Production and Preview. Use a long random value and keep it stable: changing it creates new per-IP hashes and resets existing rate-limit counters. If `WRITING_RATE_LIMIT_HASH_SECRET` is not set, the function can use `GEMINI_API_KEY` as the HMAC secret for compatibility with existing deployments.
5. Redeploy the Pages project so the bindings and secret take effect.

The endpoint allows at most 5 scoring attempts per IP in any rolling 10-minute window and 15 in any rolling 24-hour window. A single completed four-Part submission counts as one attempt. It uses Cloudflare's `CF-Connecting-IP` header and atomically records attempts in D1; IP addresses are HMAC-hashed before storage. If the D1 binding or HMAC secret is missing or unavailable, the endpoint fails closed and does not send the answers to an AI model.

The Writing panel's optional personal-key controls save or remove the key in the current browser's `localStorage`. Personal keys use the `x-goog-api-key` header and skip the site's D1 rate limits; they remain subject to Google's own quotas and billing. Keys beginning with `AQ` are tried against the Google Cloud Express Mode endpoint first, then the Gemini API through Cloudflare AI Gateway if Google rejects the first endpoint with an authentication or endpoint error. Other keys use the Gemini API through Cloudflare AI Gateway. This fallback supports authorization keys created through different Google flows; a key can still fail if it is invalid, restricted, lacks Gemini API access, or has exhausted quota. If Google rejects a request, the response and server log include Google's status/error code without logging the key. Do not save a personal key on a shared device.

After finishing all four Writing parts, the results screen also provides a `.txt` download containing each part's prompt and the corresponding answers, including empty answers.

For local development, install Node.js and Wrangler, create a root `.dev.vars` file with `WRITING_RATE_LIMIT_HASH_SECRET="a-long-random-secret"`, configure local D1 and Workers AI bindings (`WRITING_RATE_LIMITS` and `AI`), and apply the schema to the local database. Run `npx wrangler pages dev . --ai=AI`. `.dev.vars` and `.env` files are ignored by Git. The basic Python static server does not execute Pages Functions.

The results page explains which AI provider is used and advises learners not to include personal information. It returns an estimated CEFR level for the complete submission, four rubric scores, and item-level comments, corrections, and non-empty sample responses for all Parts. Samples are prompted with each task's word limits and sentence/paragraph guidance, including complete Part 4 emails. The endpoint counts sample words and retries out-of-range samples up to twice; it still returns feedback if a non-empty sample remains outside the limit.

## AI Speaking feedback

The visible Speaking instructions and their spoken versions match the supplied English screenshots. Before each Speaking timer starts, the browser reads that Part's instructions followed by its visible English question(s), using built-in speech synthesis. The Part 1 timer remains 30 seconds total for all three questions, per the existing practice requirement. Part 1 recording starts after the instructions, prompt, and microphone setup, so the spoken directions are not included in the learner's recording. Speaking then uses a continuous browser-microphone recording plus separate recordings for each Part. Recording continues through the Parts until they choose **Hoàn thành**. The `/api/speaking-feedback` Pages Function receives the per-Part audio, question prompts, and that Part's image files together. Cloudflare Workers AI transcribes each Part with `@cf/openai/whisper-large-v3-turbo`, describes prompt images with `@cf/meta/llama-3.2-11b-vision-instruct`, and grades the transcript against the questions and visual descriptions with `@cf/meta/llama-3.3-70b-instruct-fp8-fast`. Before using the vision model for the first time, the account owner must accept Meta's model license in Cloudflare Workers AI. The result page offers individual Part downloads and a button that downloads all available Part recordings. Speaking uses the existing `AI`, `WRITING_RATE_LIMITS`, and `WRITING_RATE_LIMIT_HASH_SECRET` bindings; attempts share the same per-IP limits as Writing. Audio and images are held only for the current browser session and are sent to Cloudflare for feedback. The browser must support `MediaRecorder` and microphone access, and microphone access requires HTTPS or localhost.

Audio stays in browser memory during the practice session and is uploaded for transcription and scoring only when the learner submits the test. The browser keeps no recording after leaving the session. Feedback is based on the transcript and does not reliably grade pronunciation, accent, or spoken fluency; scores are practice estimates, not official Aptis results. The standard AI and D1 setup above also enables this endpoint.
