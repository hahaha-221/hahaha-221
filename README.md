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
3. Redeploy the Pages project. The function defaults to the `gemini-3.8-flash` model. Set the non-secret `GEMINI_MODEL` variable only if you need to choose another supported model.
4. Configure a Cloudflare rate-limiting rule for `/api/writing-feedback` to control API usage and cost, especially if the site is public.

For local development, install Node.js and Wrangler, create a root `.dev.vars` file containing `GEMINI_API_KEY="your-key"`, then run `npx wrangler pages dev .`. `.dev.vars` and `.env` files are ignored by Git. The basic Python static server does not execute Pages Functions, so the AI button reports that the endpoint is not configured there.

The feedback panel explains that answers are sent to Gemini and advises learners not to include personal information. It returns an estimated CEFR level, four rubric scores, item-level comments, corrections, and improved examples.
