# AptisPractice — Project Context

**Last checked:** 2026-11-24
**Project root:** `C:\Users\ADMIN\.gemini\antigravity\scratch\fraud_detection_project`  
**Purpose of this file:** handoff notes for continuing this local project with another Copilot account. This is a source-of-truth snapshot, not a feature plan.

## 1. Project goal

AptisPractice is a Vietnamese-language Aptis study website. Its initial home page was based on user-provided screenshots, and its practice content and presentation have been added from the user's screen-recorded videos and screenshots. The user's strongest requirement is fidelity to those materials: audio, titles, prompts, options, answers, and transcript/description formatting must not be invented or silently paraphrased.

The frontend is a static site built with plain HTML, CSS, and JavaScript. Writing and Speaking AI feedback run through Cloudflare Pages Functions, with D1 storing HMAC-hashed IPs and request timestamps only for rate limiting. The project has no user authentication or progress storage, build system, or test runner.

## 2. Current verified project structure

```text
/
├── index.html
├── script.js
├── styles.css
├── PROJECT_CONTEXT.md
└── assets/
    ├── guides.js
    ├── listening-part1.js
    ├── listening-part2.js
    ├── listening-part3.js
    ├── listening-part4.js
    └── audio/
        ├── listening-q1.wav … listening-q194.wav
        ├── listening-part2-q01-speaker-a.wav … listening-part2-q16-speaker-d.wav
        └── listening-part3-q01.wav, q03.wav, q04.wav, q05.wav,
            q08.wav, q09.wav, q11.wav, q14.wav, q15.wav
```

The current asset inventory has 296 WAV files: 194 for Part 1, 64 for Part 2, 9 for Part 3, and 29 for Part 4. Source videos and temporary OCR/audio-analysis files are outside the project directory; they are not deployment assets.

There is no `package.json`, dependency manifest, README, test suite, or build configuration in the visible project tree. `node` was not available on PATH at the last check, so `node --check` could not run. Browser testing has been used instead.

### File responsibilities

- **`index.html`** — Vietnamese home page, navigation, skill cards, overview panels, Listening overview, question list/detail markup, accessible controls, and script loading. Data scripts load with `defer` before `script.js`.
- **`styles.css`** — all presentation, responsive layouts, buttons/cards, question states, audio/transcript display, and mobile breakpoints.
- **`script.js`** — Reading Part 1 and Part 2–3 data/navigation/scoring, Reading/Writing/Speaking practice, Listening navigation/rendering/audio/transcripts/scoring, timers, vocabulary panel, and toast messages. Writing submits all four Parts together for AI feedback after completion; personal Gemini keys are never embedded in source.
- **`assets/listening-part1.js`** — 194 Part 1 question records, audio-source metadata, transcript/answer data, and vocabulary data.
- **`assets/listening-part2.js`** — 16 Part 2 sets, four speaker records per set, choices, descriptions/transcripts, and audio paths.
- **`assets/listening-part3.js`** — 16 Part 3 records, video titles, prompts, statements, transcripts/source notes, and optional audio paths.
- **`assets/listening-part4.js`** — 30 Part 4 sets with source-derived titles, prompts, options, answer keys, audio references, translations/transcripts/tips, and notes for incomplete source material.
- **`assets/guides.js`** — the 12 guide titles and article data, rendered through the guide layouts in `script.js`. All 12 articles are available, including Part 2–3 short answers, beginner Writing prompts and sample emails, and combined Speaking Part 4 story models. Reference video and Drive links are attached to the relevant guides and examples.
- **`assets/audio/`** — the WAV files referenced by those data records. Do not rename or remove them without updating every corresponding data path.

## 3. Actual feature status (checked against current code)

### Listening Part 1 — implemented, 194 questions

- Browser runtime loads 194 records and 194 WAVs.
- Runtime data marks **125 recordings as audio from the source videos** and **69 as synthesized audio**.
- 53 records have `reconstructed`; 12 have `videoDescriptionAudio`. These are different metadata flags, not proof that every transcript was independently verified against original audio.
- A question has a title, transcript lines, answer choices, answer index, audio path, and optional reconstruction/vocabulary metadata. The UI provides a native audio player, transcript toggle, multiple-choice answer check, correct/incorrect feedback, retry, previous/next navigation, question list, and vocabulary panel.
- For the 12 records flagged `videoDescriptionAudio`, the generated audio reads the short description shown in the source video. The extra “missing source audio / simulated dialogue” note is intentionally not shown for this group, per the user's request. Other reconstructed records may still show an explanation that their dialogue is simulated.
- Some early material was reconstructed from on-screen content because the first 50-question video had no audio track. Accuracy is not uniform across all 194 records; use source evidence before changing any of it.

### Listening Part 2 — implemented, 16 sets

- 16 exercises, four speakers per exercise, 64 speaker audio files, 64 descriptions, and 64 transcript strings are present in the current runtime data.
- Each speaker has an audio player, optional expandable description/transcript, and a dropdown matching the speaker to one of four descriptions. Checking requires all four selections and reports each result.
- Descriptions and transcript layout were updated from user screenshots. In particular, keep the visible vertical separation between the description and transcript (`.part2-transcript-content p + p` has a 38px top margin), bolding behavior, and spacing around the literal `=>` separator. Do not normalize these strings just for style.
- Prior checkpoints say the 64 audio clips were cut from the source video's audio using visible playback timers; not every clip boundary has been independently listened to and verified.

### Listening Part 3 — implemented, 16 sets; content intentionally incomplete where source is incomplete

- 16 records, 64 visible statements, 9 audio files, 7 records without audio, 7 records without a transcript, and no unverified (`null`) answers are present in the current runtime data.
- The UI has an exercise list, prompt, audio or source “no audio” state, expandable transcript, statement dropdowns (`Man` / `Woman` / `Both`), navigation, and partial scoring. It only includes verified answers in the score and labels unverified answers instead of guessing.
- Full user-video titles for all 16 questions are in `assets/listening-part3.js`. Keep their spelling, punctuation, casing, and unusual `W` spellings as recorded; they are deliberately source-faithful, not text to clean up. The title is used in both the list card and exercise heading.
- Seven no-audio records are represented without fabricated audio. Missing transcript/statement material is marked or omitted based on what the source showed. Do not infer the missing parts.
- The latest screenshots now cover Q1–Q16. Q1 has its Vietnamese instructions, nine transcript lines, and four statements; Q3 has its complete eight-line transcript; Q5, Q8, Q9, Q14, and Q15 have their visible transcript content; Q10, Q12, Q13, and Q16 show the source's `Chưa có mô tả` text where applicable. Q11 and Q14 now include statement 4, and Q15 contains the full visible volunteer-program description and transcript.
- All 64 Part 3 answers are populated. Transcript evidence and user-provided answer sequences were used to fill the previously blank answers; where the user provided a sequence, it takes precedence over transcript-derived choices.

### Listening Part 4 — implemented, 30 sets; source gaps remain explicit

- 30 sets and 60 visible questions are in `assets/listening-part4.js`; all 30 sets currently have two question records.
- 29 WAV files were extracted from the supplied video. Q19 is represented with `audio: null` because no WAV exists in the project; the latest screenshot shows a 0:06 source player, so the list now says the audio file is missing from the project rather than absent from the source. Several other clips are only six seconds long and are visibly identified as partial rather than extended.
- The UI provides the prompt, available audio/source note, expandable descriptions with known answers, translations, topics, transcripts, or tips as supplied, per-question single-choice cards, partial scoring, retry, and previous/next/list navigation.
- Q1–Q30 have been updated from the supplied screenshots with source-visible question content and descriptions where supplied. Q16, Q18, and Q21 now include the visible transcripts; Q17's second-question options match the screenshot; Q23's second question now includes all three visible options and its screenshot-confirmed answer.
- Only verified answer keys are scored. The current runtime has no `null` answer keys. Source-derived OCR text and answer keys have not all been independently verified against the original video.
- Q7's Vietnamese translation is difficult to read in the screenshot; the current text is `Giấc ngủ cần tránh ồn và xa rời xã truyền thông`. Verify against a clearer source before changing it.

### Listening overview and other skills

- The Listening landing page has a breadcrumb, heading/subtitle, count pill, and four Part cards. Parts 1–4 open their respective exercise lists.
- Current code dynamically displays Part 1 = 194, Part 2 = 16, Part 3 = 16, and Part 4 = 30.
- Reading has an overview with four cards: Part 1 (4 exercises), Part 2–3 (10), Part 4 (5), and Part 5 (3), for the advertised total of 22. Part 1 has four source-based exercises from the supplied video; each has five selectable gaps, completeness checking, per-gap scoring, an answer/explanation panel, and retry. All ten Part 2–3 exercises are implemented from the two supplied videos, with five numbered slots, a sentence bank, click-to-place/drag-and-drop, completeness checking, per-slot scoring, answer/explanation panels, and retry. Part 4 has all five source-based sets, each with four profiles and seven matching questions. It allows checking with unanswered selections, scores blanks as incorrect, scrolls to the result, and displays per-question feedback, the answer key, Vietnamese profile explanations, answer cues, and retry. The attached answer screenshots confirm all five answer keys, including Extreme sports Q1–Q2. Part 5 has three source-based sets, each with seven passages and seven heading choices, answer keys, per-passage feedback, retry, and the mnemonic hints shown in the video; the third set's result says no explanation is available.
- The Reading flow has an overview, Part question list, and question detail. The detail uses a question count, sticky bottom navigation/check controls, and no countdown. The Reading timer is hidden; Writing/Speaking timing remains separate. These layout changes were based on `2026-11-17 17-11-31.mp4`.
- Writing opens on a topic-selection landing page matching the supplied video: breadcrumb, Writing title/subtitle, 30-topic and 50-minute badges, a mock-test banner, and numbered topic cards. The videos `2026-11-17 19-30-51.mp4` and `2026-11-17 19-53-48.mp4` together show all 30 topics and their displayed Part prompts; follow-up screenshots provide detailed corrections for Art, Book, Business, Car, College, Community, Computer, Debate, English, Fashion, Film, Fitness, Food, Garden, Health, Beautiful Home, Language, Museum, Music, Nature, Outdoor, Photography, Reading, Science, Social, Sports, Technology, Travel, TV, and Walking Clubs. Verified prompts from these sources are stored per topic and Part in `writingSourceExercises`; partial question lists retain their displayed numbering, and unseen incoming-email text remains explicitly unavailable instead of being invented. The timer is 50 minutes. Writing answers are held in memory during the current attempt and are not saved to disk.
- Writing answers and the aggregate AI feedback are held in memory during the current attempt and answers are restored when switching between Parts; they are not saved to disk. Completing Writing opens one results page and sends all four Parts in a single request to `functions/api/writing-feedback.js`. Feedback gives a non-official estimated CEFR level, rubric scores, corrections, and non-empty sample responses. Prompts include each task's word limits and sentence/paragraph guidance; the endpoint counts words and retries out-of-range samples up to twice, but returns feedback if a non-empty sample remains outside the limit. By default it uses the Cloudflare Workers AI binding `AI` with `@cf/meta/llama-3.3-70b-instruct-fp8-fast`, after enforcing the D1 binding `WRITING_RATE_LIMITS` limits of 5 attempts per rolling 10 minutes and 15 per rolling 24 hours per IP; one full Writing submission counts as one attempt. D1 IP keys are HMAC-hashed with `WRITING_RATE_LIMIT_HASH_SECRET` (falling back to `GEMINI_API_KEY` for existing deployments). An optional personal key is saved only in browser localStorage and sent to the endpoint only for scoring, bypassing the D1 limiter: `AQ...` keys try Google Cloud Express Mode first and then the Gemini API through Cloudflare AI Gateway on auth/endpoint errors; other keys use Cloudflare AI Gateway directly. Only content type and API-key headers are sent upstream; client IP/forwarding headers are not forwarded. Google rejection status, code, and message are returned to the user and logged with API-key values redacted.
- Speaking now has a 20-card set selector matching the supplied AptisPractice video. Sets 1–20 include visible questions and pictures from the video or user-supplied screenshots; unseen prompts remain explicitly marked rather than invented. Set 5 Part 4 has all three visible questions but no visible picture. Set 16–20 images are stored locally under `assets/speaking/`. Timers are visible per question where applicable. A continuous microphone recording starts with the Part 1 timer and continues across Parts until completion, while separate MediaRecorder blobs are kept for Parts 1–4. The result flow sends each Part's audio, task/questions, and image files together to `functions/api/speaking-feedback.js`; Cloudflare Whisper transcribes per Part, Llama 3.2 Vision describes supplied images, and Llama 3.3 grades the grouped transcript against the prompts and visual descriptions. The account owner must accept Meta's Llama 3.2 Vision license before first use. The results page provides individual or all-Part audio downloads. Pronunciation and fluency are not graded from transcripts.
- Speaking timing is an explicit user requirement: **Part 1: 30 seconds total for all three prompts; Part 2: 45 seconds per question; Part 3: 45 seconds per question; Part 4: 60 seconds to prepare, then 120 seconds to answer all three questions.** Only Part 1 is started manually. On entering Parts 2–4, timers start automatically; visible questions in Parts 2–3 run in sequence, and Part 4 starts with preparation. Part 4 also has a “Bỏ qua chuẩn bị” button that starts the 120-second answer timer immediately; without skipping, preparation still transitions automatically. At timer completion, Speaking automatically advances to the next Part once every visible timed response in the current Part has finished. Speaking has no separate 12-minute session countdown; only its Part/question timers are shown. Do not reinterpret Part 1 as 30 seconds per prompt or Part 4 as a 60-second response.
- The guide catalog has 12 cards and all 12 articles are available. The final three articles cover short Part 2–3 answers across club topics, beginner Writing prompts with sample emails, and three combined Speaking Part 4 stories. These use the existing `guide-info` renderer with tables and examples. Reference links are rendered as labeled, clickable resources, including relevant Speaking/Writing videos and the Speaking Part 4 pronunciation and prompt files. The catalog is opened from both home and top navigation; article pages return to the catalog.
- The home banner says work is not saved. The “Sẵn sàng/Chưa lưu” status is only UI feedback; there is no actual save implementation. The profile/account button is also presentational.

## 4. User requirements and history

Chronological work history was reviewed from the local checkpoints `001`–`014` and the accessible conversation history.

1. Create AptisPractice from the user's initial screenshots/video.
2. Clarify Speaking timers as total time across three prompts: 30 / 45 / 45 / 60 seconds by Part.
3. Add Listening Part 1 question sets in batches from videos: 1–50, 51–100, 101–150, and 151–194; include audio and descriptions that match the recording/screen.
4. Replace synthesized audio with source recordings when a video actually contains an audio track. Clearly distinguish source recordings from synthesized audio.
5. Add Listening overview cards for the four Parts and preserve navigation into existing Part 1.
6. Add Listening Part 2 (16 sets, four speakers each), with source-matching descriptions/transcripts/audio.
7. Reformat Part 2 descriptions to match the user's video: separate lines/paragraphs and vertical spacing. The user specifically supplied later corrections, including Part 1/2/3/6/7 descriptions and requested continued updates.
8. Add Listening Part 3 from the supplied video, then update all 16 displayed titles from what the recording shows.
9. For questions with no source audio, still use the description visible in the video where available; do not replace it with an invented dialogue. The user explicitly requested removal of a particular explanatory line for the no-audio descriptions.
10. The user is preparing to use another GitHub Copilot account and wants this file to let work continue in the existing local project.
11. Add Listening Part 4 from `2026-11-17 12-41-07.mp4`, including all source-visible titles/prompts/options, the available source audio, expandable descriptions, and working exercise navigation/checking. Keep uncertain answers and unavailable/partial audio clearly marked instead of inventing replacements.
12. Update Listening Part 4's first 15 exercises from the latest screenshots, including question content and descriptions; leave Q16–Q30 unchanged unless separately requested.
13. Update the remaining Listening Part 4 exercises from the latest screenshots, including the missing Q23 options/answer and available description text; do not fabricate Q19's unavailable local audio file.
14. Update Reading Part 1 question 1 from the supplied video: five inline gaps with source options, required selections before checking, score feedback, correct answers/explanations, and a retry action.
15. Include Reading questions 2–4 because they are also shown in `2026-11-17 16-40-45.mp4`; remove the Reading countdown.
16. Match the Reading overview, Part question list, and question-detail layout to `2026-11-17 17-11-31.mp4`, including the question count and fixed bottom controls. Do not invent content for other Reading parts that only appear as overview cards.
17. Continue Reading Part 2–3 from `2026-11-17 17-15-04.mp4`: implement all five detailed ordering exercises shown (Q1–Q5), retain the visible Q6–Q9 titles, and do not invent details that the video does not show.
18. Complete Reading Part 2–3 Q6–Q10 from `2026-11-17 17-42-12.mp4`, matching the visible titles, fixed opening sentences, ordering content, and explanations.
19. Implement all five Reading Part 4 sets from `2026-11-17 18-08-17.mp4`, including four profiles, seven questions, answer keys, checking, feedback, and retry.
20. Verify the Reading Part 4 answer keys against the five supplied result screenshots and allow empty selections to be checked as incorrect answers, matching the demonstrated result view.
21. Implement Reading Part 5 from `2026-11-17 18-32-46.mp4`: all three seven-passage sets, heading choices, source-confirmed answers, checking, feedback, and the visible mnemonic notes.
22. Update Writing with the topic/Part prompts visible in `2026-11-17 19-30-51.mp4`; preserve the four-Part flow, add source-based topic selection, and set the timer to 50 minutes.
23. Match the Writing screen shown before starting a task in `2026-11-17 19-30-51.mp4`: display the topic grid, 50-minute exam information, and a per-topic four-Part entry flow. Do not invent topic names or prompts not visible in the source.
24. Continue the Writing topic list and add source-visible prompts from `2026-11-17 19-53-48.mp4`, including topics 25–30. Preserve source numbering and mismatches, and mark content that is not shown rather than inferring it.

Source videos referenced in the accessible history (stored outside this repo):

- `2026-11-16 11-32-35.mp4` — Part 1 questions 1–50; no audio track, so generated audio was used.
- `2026-11-16 16-26-04.mp4` — Part 1 questions 51–100; audio exists, but some questions show no audio.
- `2026-11-16 19-09-01.mp4` — Part 1 questions 101–150; source recordings extracted where available; Q125 had no audio in the video.
- `2026-11-16 21-27-37.mp4` — Part 1 questions 151–194; source recordings plus synthesized audio for the 12 questions whose video showed no audio.
- `2026-11-16 22-09-13.mp4` — Listening Part 2.
- `2026-11-16 23-40-57.mp4` — Listening Part 3.
- `2026-11-17 16-40-45.mp4` — Reading Part 1 question 1.
- `2026-11-17 17-11-31.mp4` — Reading overview, Part 1 question list, and question-detail interface.
- `2026-11-17 17-15-04.mp4` — Reading Part 2–3 list and detailed exercises Q1–Q5; Q6–Q9 titles are visible without exercise details, and Q10 is not shown.
- `2026-11-17 17-42-12.mp4` — Reading Part 2–3 Q6–Q10, including titles, fixed opening sentences, answer sequences, and visible explanations/translations.
- `2026-11-17 18-08-17.mp4` — all five Reading Part 4 sets, profile text, questions, and answer keys.
- `2026-11-17 18-32-46.mp4` — all three Reading Part 5 sets, passage text, heading options, answer keys, and visible mnemonic notes.
- `2026-11-17 19-30-51.mp4` — Writing topic list and the visible Part prompts for Art Club, Business Club, Car Club, College, Community Club, Health Club, Film Club, Book Club, Computer Club, Debate Club, Fitness Club, and Food Club.
- `2026-11-17 19-53-48.mp4` — remaining Writing topics and source-visible prompts for Beautiful Home, Language, Museum, Music, Nature, Outdoor, Photography, Reading, Science, Social, Sports, Technology, Travel, TV, and Walking Clubs.
- `2026-11-18 22-01-32.mp4` — guide catalog titles and the visible Speaking picture-description vocabulary article.
- `2026-11-18 22-58-13.mp4` — the visible Speaking B2/C1 guide content, including scoring criteria, answer development, connectors, grammar patterns, and vocabulary groups.
- `2026-11-18 23-01-07.mp4` — the Writing B2/C guide templates, Food Club model answer, and themed collocations.
- `2026-11-18 23-53-42.mp4` — Part 2–3 short answers, beginner Writing prompts and sample emails, and combined Speaking Part 4 story models.
- `2026-11-18 23-35-10.mp4` — course rules and schedule, Aptis registration/scoring FAQs, and email-writing templates.
- `2026-11-18 23-43-47.mp4` — Writing Part 2–3 ideas, email Part 4 suggestions, and beginner A2 writing/speaking templates with Part 1 Q&A.

The videos are not in `assets/`; do not assume another machine/account can access those exact local paths. The current question data and WAVs are the in-repository copies.

## 5. Design and UX conventions

- Use the existing light theme: page background `#f6f8fc`, white surfaces, primary blue `#2163f6`, dark text around `#17243b`, muted text `#718097`, and light borders `#e5e9f0`.
- Typography is `Inter`, then `Segoe UI`, Arial, sans-serif. The header is sticky and translucent; the main content is centered with a maximum width around 1500px.
- Cards use rounded corners, subtle borders, and restrained hover effects. Primary actions are blue; positive feedback/available states are green; incomplete states use muted amber.
- Maintain keyboard focus outlines, ARIA labels/roles, and `prefers-reduced-motion` behavior.
- Responsive rules exist around 1100px, 640px, and 440px. Keep the two-column desktop grids and ensure titles/transcripts can wrap on narrow screens.
- Reading question detail has a compact header with question count, one exercise card containing the prompt and five inline-gap rows, and a fixed bottom action bar. Do not add a Reading countdown.
- Reading Part 2–3 ordering tasks use five numbered slots and a sentence bank; support click-to-place, native drag-and-drop, and removing a placed sentence by clicking its slot. Stack the two columns at narrow widths and keep the fixed action bar usable.
- Preserve the current Vietnamese labels and the mix of English Aptis prompts. Source text supplied by the user should not be “corrected” unless asked.

## 6. JavaScript and data rules

- Keep the plain-script architecture unless the user asks for a migration: data is attached to `window.listeningPart1Questions` through `window.listeningPart4Questions`; `script.js` consumes those globals.
- Part 1 uses integer `answer` indexes into `options`; `recordedAudioQuestions` determines source-recorded audio, while the `.map()` step supplies generated audio paths/source metadata. `reconstructed` and `videoDescriptionAudio` affect disclosure/labels.
- Part 2 stores the answer as a matching choice and maps it to `answerIndex` for checking. `description`, `transcriptLead`, and `transcript` control source text and bolding.
- Part 3 uses statement objects `{ number, text, answer }`; `answer: null` means unverified and must remain excluded from scoring.
- Part 4 uses integer `answer` indexes into `options`; `null` means unverified and is excluded from scoring. `hideAnswerHeading`, `numberAnswers`, `translation`, `tip`, `topic`, `transcript`, and `transcriptLabel` control the screenshot-matched description display.
- Reading Part 2–3 Q1–Q10 are defined in `readingPart23Questions` in `script.js`; `correctOrder` stores zero-based sentence-bank indexes in final order. Each task has a fixed opening sentence before its five numbered slots. `answerText` preserves a source mismatch between the Q6 bank wording (“bright clothes”) and its explanation wording (“colorful clothes”).
- Audio paths are local relative paths under `assets/audio/`. Avoid external audio/CDN dependencies.
- Listening audio is paused/reset when switching questions or returning to the list. Keep that behavior when editing navigation.
- Use `textContent`/DOM nodes for transcript rendering; preserve source line/paragraph boundaries. If adding data to interpolated list markup, ensure the source string is trusted/escaped.
- There is no persistence layer. Do not describe the “Chưa lưu” indicator as actual autosave.

## 7. Known issues, past corrections, and remaining work

### Corrections already made

- Initial Listening UI had only four examples; it was expanded in batches to 194 Part 1 questions.
- The user noticed audio was missing for questions 51–100. The video did contain AAC audio; source clips were later extracted where available.
- The user noticed some descriptions were invented or did not match recordings. Subsequent Part 1 transcript corrections used local ASR and source frames; later no-audio questions were changed to use only the description actually visible in the video. This concern remains a strict rule for future work.
- Part 2 descriptions were revised from user screenshots and the spacing/bold formatting was adjusted to mirror those screenshots.
- Part 3 initially only had short English topic names; all 16 titles now include their Vietnamese/source-video title text.
- Reading Part 1 Q1–Q4's generic samples were replaced with the five-gap exercises shown in the supplied video. Each requires all five choices before scoring, highlights correct/incorrect gaps, shows an answer key and explanations, and can be retried. Browser checks after the latest UI changes confirmed all four score 5/5 when correct, retry clears selections and feedback, previous/next navigation works, and returning to the list succeeds. These four exercises are not a complete Reading bank.
- The Reading overview/Part list/detail layout was changed to match `2026-11-17 17-11-31.mp4`. Reading no longer has a countdown; its question detail has a fixed bottom action bar.
- Reading Part 2–3 Q1–Q10 now render from the supplied videos. Browser checks confirmed Q1–Q5 and Q6–Q10 each score 5/5 in their source answer orders; Q6 retry clears the task, all five new fixed opening sentences appear, the Q8 prompt matches the video, and Q10 displays as question 10/10. A retry-handler variable-shadowing bug was fixed earlier; Part 1 retry was rechecked and still restores the check button and clears all five gaps.
- Responsive browser verification at 390px confirmed the ordering layout stacks to one column and the document has no horizontal overflow.
- Browser click attempts sometimes timed out while the page was animating. Direct browser-page evaluation was used to verify navigation/rendering afterward; do not mistake those tool timeouts for a source-code failure.

### Current caveats / not verified as complete

- Part 1 has 69 synthesized WAVs and 53 records marked reconstructed. Do not assume every transcript or answer is a verbatim source transcript; verify the specific question against source evidence before editing or claiming exactness.
- Part 2 audio timing was inferred from on-screen player timers. The project has not established that every one of the 64 clips has been listened through and boundary-checked.
- Part 3 has only 9 audio clips, and the no-audio items still have no invented audio or transcripts. The current count of 29 unverified statements is expected; do not fill unknown answer keys by guessing.
- Part 4's 30-set flow, 60 questions, and 29 available clips are implemented. Q19's screenshot shows a 0:06 player, but its local WAV is missing; multiple other clips are only six seconds. Q1–Q30 now reflect the supplied screenshots, but the full source/OCR data still needs a set-by-set comparison with the video before claiming full accuracy.
- Reading Part 2–3 Q1 still has video-resolution uncertainties (including the spelling `Ms Kamur` and some Vietnamese translation text). In Q6, the source bank says “bright clothes” while its answer explanation says “colorful clothes”; both are retained in their respective places. Q8's video only showed the Vietnamese translation for the first answer sentence, so translations for its other sentences are intentionally absent rather than guessed.
- Reading/Writing/Speaking are not complete Aptis banks. Reading Part 1 Q1–Q4, Part 2–3 Q1–Q10, Part 4 Q1–Q5, and Part 5 Q1–Q3 are source-based; Writing contains the prompts visible across the two supplied videos, and Speaking has partial, source-based data for sets 1–20. Reading Part 5 preserves the source's unusual heading wording, including “Uniformity is as a disadvantage.”
- There is no automated test/build command. Browser checks confirmed the Reading timer is hidden; the Writing timer is 50 minutes per the new video. A 390px-wide viewport had no horizontal overflow in the Reading detail or bottom action bar. These checks and representative Listening navigation/audio/scoring are not a full regression suite.

## 8. Git/worktree and preservation rules for the next AI

- The existing worktree was already dirty before this documentation task. `git status` has shown `.gitignore` deleted and many `.venv` files deleted, plus existing untracked project/assets. Do **not** restore, delete, clean, stage, or commit these unrelated changes without explicit user instruction.
- Never run `git clean`, `git reset --hard`, or broad cleanup commands. Do not recreate `.gitignore` or `.venv` merely because they appear absent/deleted.
- Do not delete or overwrite WAVs, question data, or user-supplied corrections as a cleanup shortcut. Do not rename audio files without updating data references.
- Do not fabricate missing prompts, descriptions, transcripts, statements, or answer keys; retain explicit unknowns and source notes.
- Do not silently change the displayed title spelling/casing/punctuation from the videos, including unusual `W` characters.
- Do not claim an item is implemented based only on a static count. Confirm that its dataset, rendering path, and interactions exist.
- Do not store GitHub credentials/tokens in the repository or this document. Switching Copilot accounts does not itself move the local repository or change its Git remote; check authentication/remote only when the user asks to publish or switch Git identity.
- `PROJECT_CONTEXT.md` was created as a prior handoff deliverable. Keep it synchronized with later verified code changes, but do not use it as a reason to expand unrelated site scope.

## 9. Recommended next steps, in priority order

1. Start future work by reading this file, then check `git status` without modifying or cleaning the worktree.
2. Verify uncertain Reading Part 2–3 wording only against clearer source material: Q1 spelling/translations, Q6 “bright” vs. “colorful clothes”, and any missing Q8 translations. Preserve the differences and omissions until verified.
3. If continuing Reading content, Part 4 Q1–Q5 and Part 5 Q1–Q3 are implemented from their supplied videos; verify any additional content against the exact source before extending them.
4. For any other content correction, open the exact dataset record and compare it with the relevant user screenshot/video or audio. Do not fill gaps by inference.
5. If improving Listening accuracy, prioritize user-identified Part 1 transcript/audio mismatches and review Part 2 clip boundaries against the source before rewriting descriptions. If continuing Part 4 work, investigate whether Q19 audio can be recovered and compare screenshot-derived text with the original; do not synthesize missing audio.
6. For Speaking, ask for screenshots showing the remaining missing questions across sets 1–20; keep unseen prompts marked as unavailable instead of inventing them.
7. Validate changes in the browser with the smallest relevant path: question list, audio loading, transcript/description toggle, answer checking, previous/next navigation, and responsive wrapping. No Node or automated test runner is currently available.
