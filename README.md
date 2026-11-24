# AptisPractice

A static HTML/CSS/JavaScript website for practicing Aptis Listening, Reading, Writing, and Speaking. Listening audio and question data are stored locally under `assets/`.

## Run the website

Open `index.html` in a browser for the practice features. AI Writing feedback requires the deployed API setup below.

All website source files and assets are included in this project and can be edited directly.

## AI Writing feedback

Writing feedback is provided by a Cloudflare Pages Function at `/api/writing-feedback`. The function sends the task and submitted answers to the Gemini API. The browser never receives the Gemini API key. Scores and CEFR levels are practice estimates, not official Aptis results.

To enable it on Cloudflare Pages:

1. Deploy this project through Cloudflare Pages Git integration or Wrangler. Pages Functions are not supported by dashboard Direct Upload.
2. In the Pages project settings, add `GEMINI_API_KEY` as an encrypted secret for both Production and Preview. Create the key in Google AI Studio; do not put it in JavaScript, HTML, or committed configuration.
3. Create a Cloudflare D1 database. In the Pages project, open **Settings → Functions → D1 database bindings**, add the database with binding name `WRITING_RATE_LIMITS`, and run [`functions/api/writing-rate-limit-schema.sql`](functions/api/writing-rate-limit-schema.sql) against it.
4. Redeploy the Pages project. The function defaults to the `gemini-3.8-flash` model. Set the non-secret `GEMINI_MODEL` variable only if you need to choose another supported model.

The endpoint allows at most 5 scoring attempts per IP in any rolling 10-minute window and 15 in any rolling 24-hour window. It uses Cloudflare's `CF-Connecting-IP` header and atomically records attempts in D1; IP addresses are HMAC-hashed with `GEMINI_API_KEY` before storage. Changing the Gemini key also changes those hashes, so existing per-IP limits will reset. If the D1 binding is missing or unavailable, the endpoint fails closed and does not send the answer to Gemini.

For local development, install Node.js and Wrangler, create a root `.dev.vars` file containing `GEMINI_API_KEY="your-key"`, configure a local D1 binding named `WRITING_RATE_LIMITS`, then run `npx wrangler pages dev .`. Apply the schema to the local database as well. `.dev.vars` and `.env` files are ignored by Git. The basic Python static server does not execute Pages Functions.

The feedback panel explains that answers are sent to Gemini and advises learners not to include personal information. It returns an estimated CEFR level, four rubric scores, item-level comments, corrections, and improved examples.
