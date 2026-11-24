# AptisPractice

A static HTML/CSS/JavaScript website for practicing Aptis Listening, Reading, Writing, and Speaking. Listening audio and question data are stored locally under `assets/`.

## Run the website

Open `index.html` in a browser for the practice features. AI feedback requires the deployed API setup below.

All website source files and assets are included in this project and can be edited directly.

## AI Writing feedback

Writing feedback is provided by a Cloudflare Pages Function at `/api/writing-feedback`. By default, the function uses Cloudflare Workers AI. Learners may optionally save their own Gemini API key in this browser's `localStorage`; it is sent in a request header only when asking for feedback and is not stored by the server. Scores and CEFR levels are practice estimates, not official Aptis results.

To enable it on Cloudflare Pages:

1. Deploy this project through Cloudflare Pages Git integration or Wrangler. Pages Functions are not supported by dashboard Direct Upload.
2. In the Pages project, open **Settings → Bindings → Add → Workers AI** and create a binding named `AI`. The default scorer uses `@cf/meta/llama-3.3-70b-instruct-fp8-fast`.
3. Create a Cloudflare D1 database. In the Pages project, add it as a D1 binding named `WRITING_RATE_LIMITS`, and run [`functions/api/writing-rate-limit-schema.sql`](functions/api/writing-rate-limit-schema.sql) against it.
4. Add `WRITING_RATE_LIMIT_HASH_SECRET` as an encrypted secret for Production and Preview. Use a long random value and keep it stable: changing it creates new per-IP hashes and resets existing rate-limit counters. If `WRITING_RATE_LIMIT_HASH_SECRET` is not set, the function can use `GEMINI_API_KEY` as the HMAC secret for compatibility with existing deployments.
5. Redeploy the Pages project so the bindings and secret take effect.

The endpoint allows at most 5 scoring attempts per IP in any rolling 10-minute window and 15 in any rolling 24-hour window. It uses Cloudflare's `CF-Connecting-IP` header and atomically records attempts in D1; IP addresses are HMAC-hashed before storage. If the D1 binding or HMAC secret is missing or unavailable, the endpoint fails closed and does not send the answer to an AI model.

The Writing panel's optional personal-key controls save or remove the key in the current browser's `localStorage`. When a personal key is present, the endpoint uses it for the Gemini request through Cloudflare AI Gateway and skips the site's D1 rate limits; that key is still subject to Google's own quotas and billing. Invalid or quota-exhausted personal keys show guidance to check the key or remove it to return to the site's Workers AI scorer and D1 limits. If Google rejects a request, the response and server log include Google's status/error code without logging the key. Do not save a personal key on a shared device.

For local development, install Node.js and Wrangler, create a root `.dev.vars` file with `WRITING_RATE_LIMIT_HASH_SECRET="a-long-random-secret"`, configure local D1 and Workers AI bindings (`WRITING_RATE_LIMITS` and `AI`), and apply the schema to the local database. Run `npx wrangler pages dev . --ai=AI`. `.dev.vars` and `.env` files are ignored by Git. The basic Python static server does not execute Pages Functions.

The feedback panel explains which AI provider is used and advises learners not to include personal information. It returns an estimated CEFR level, four rubric scores, item-level comments, corrections, and improved examples.

## AI Speaking feedback

Speaking uses one continuous browser-microphone recording. It starts when the learner starts the Part 1 timer and continues through the Parts until they choose **Hoàn thành**. The site then sends the recording to the `/api/speaking-feedback` Pages Function. Cloudflare Workers AI uses `@cf/openai/whisper-large-v3-turbo` to transcribe it and `@cf/meta/llama-3.3-70b-instruct-fp8-fast` to provide practice feedback. This uses the existing `AI`, `WRITING_RATE_LIMITS`, and `WRITING_RATE_LIMIT_HASH_SECRET` bindings described above; Speaking attempts share the same per-IP limits as Writing. The browser must support `MediaRecorder` and microphone access, and microphone access requires HTTPS or localhost.

Audio stays in browser memory during the practice session and is uploaded for transcription and scoring only when the learner submits the test. The browser keeps no recording after leaving the session. Feedback is based on the transcript and does not reliably grade pronunciation, accent, or spoken fluency; scores are practice estimates, not official Aptis results. The standard AI and D1 setup above also enables this endpoint.
