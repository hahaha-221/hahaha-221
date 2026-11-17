const questionOptions = (name, options) => `
  <div class="choice-list" role="radiogroup" aria-label="${name}">
    ${options.map((option, index) => `
      <label class="choice-option">
        <input type="radio" name="${name}" value="${String.fromCharCode(65 + index)}" />
        <span>${String.fromCharCode(65 + index)}. ${option}</span>
      </label>
    `).join("")}
  </div>
`;

const readingGapSelect = (number, options, answer) => `
  <select class="reading-gap-select" aria-label="Chỗ trống ${number}" data-reading-gap data-answer="${answer}">
    <option value="">—</option>
    ${options.map((option) => `<option value="${option}">${option}</option>`).join("")}
  </select>
`;

const readingGapTask = (number, title, sentences, explanation) => `
  <section class="reading-exercise-card" aria-label="Reading Part 1 question ${number}">
    <div class="prompt-card reading-exercise-title"><strong>${title}</strong></div>
    <ul class="question-list reading-gap-list">
      ${sentences.map((sentence, index) => `
        <li class="question-card">${sentence.before}${readingGapSelect(index + 1, sentence.options, sentence.answer)}${sentence.after}</li>
      `).join("")}
    </ul>
  </section>
  <section class="reading-gap-feedback" data-reading-feedback aria-live="polite" hidden>
    <div class="reading-gap-result" data-reading-result>
      <div><strong>Kết quả bài làm</strong><p data-reading-score></p></div>
      <button class="secondary-button" type="button" data-reading-retry>Làm lại câu này</button>
    </div>
    <div class="prompt-card">
      <strong>Đáp án đúng</strong>
      <ol class="reading-answer-key">${sentences.map((sentence) => `<li>${sentence.answer}</li>`).join("")}</ol>
      <h3>Giải thích đáp án</h3>
      ${explanation}
    </div>
  </section>
`;

const readingOrderTask = (number, title, sentences, correctOrder, explanationTitle, openingSentence = "", prompt = "Write a short text (20-30 words).") => `
  <section class="reading-order-exercise-card" data-reading-order aria-label="Reading Part 2–3 question ${number}: ${title}">
    <div class="reading-order-prompt">
      <strong>${prompt}</strong>
      <p>Bấm vào một câu ở cột bên phải rồi bấm vào ô số thứ tự để đặt câu (hoặc kéo thả). Bấm vào câu đã đặt để bỏ ra.</p>
    </div>
    <div class="reading-order-layout">
      <div class="reading-order-arrangement">
        ${openingSentence ? `
          <div class="reading-order-intro">
            <span>0</span>
            <span>${openingSentence}</span>
          </div>
        ` : ""}
        <ol class="reading-order-slots" aria-label="Thứ tự câu">
          ${Array.from({ length: 5 }, (_, index) => `
            <li>
              <button class="reading-order-slot" type="button" data-reading-order-slot="${index}" data-sentence-index="" aria-label="Ô thứ tự ${index + 1}">
                <span class="reading-order-slot-number">${index + 1}</span>
                <span class="reading-order-slot-text"></span>
              </button>
            </li>
          `).join("")}
        </ol>
      </div>
      <div class="reading-sentence-bank" role="group" aria-label="Các câu cần sắp xếp">
        ${sentences.map((sentence, index) => `
          <button class="reading-sentence-option" type="button" data-reading-sentence="${index}" aria-pressed="false" draggable="true">
            <span class="reading-sentence-grip" aria-hidden="true">⋮⋮</span>
            <span class="reading-sentence-text">${sentence.text}</span>
          </button>
        `).join("")}
      </div>
    </div>
  </section>
  <section class="reading-gap-feedback reading-order-feedback" data-reading-feedback aria-live="polite" hidden>
    <div class="reading-gap-result" data-reading-result>
      <div><strong>Kết quả bài làm</strong><p data-reading-score></p></div>
      <button class="secondary-button" type="button" data-reading-retry>Làm lại câu này</button>
    </div>
    <div class="prompt-card">
      <strong>Thứ tự đúng</strong>
      <ol class="reading-order-answer-key">
        ${openingSentence ? `<li>0. ${openingSentence}</li>` : ""}
        ${correctOrder.map((sentenceIndex) => {
          const sentence = sentences[sentenceIndex];
          return `<li>${sentence.answerText || sentence.text}</li>`;
        }).join("")}
      </ol>
      <h3>Giải thích đáp án</h3>
      <strong class="reading-order-explanation-title">${explanationTitle}</strong>
      ${correctOrder.map((sentenceIndex) => {
        const sentence = sentences[sentenceIndex];
        return `<p>${sentence.answerText || sentence.text}${sentence.translation ? `<br />${sentence.translation}` : ""}</p>`;
      }).join("")}
    </div>
  </section>
`;

const readingMatchingTask = (number, title, people, questions, answers, explanations) => `
  <section class="reading-matching-exercise" data-reading-matching aria-label="Reading Part 4 question ${number}: ${title}">
    <div class="reading-matching-prompt"><strong>${title}</strong></div>
    <div class="reading-matching-layout">
      <div class="reading-matching-profiles" aria-label="Bốn ý kiến">
        ${people.map((person) => `
          <article class="reading-matching-profile">
            <h2>${person.name}</h2>
            <p>${person.text}</p>
          </article>
        `).join("")}
      </div>
      <ol class="reading-matching-questions" aria-label="Câu hỏi ghép người">
        ${questions.map((question, index) => `
          <li class="reading-matching-question">
            <label for="reading-match-${number}-${index}"><span>${index + 1}.</span> ${question}</label>
            <select id="reading-match-${number}-${index}" data-reading-match data-answer="${answers[index]}" aria-label="${index + 1}. ${question}">
              <option value="">- Select person -</option>
              ${people.map((person) => `<option value="${person.name}">${person.name}</option>`).join("")}
            </select>
            <p class="reading-matching-feedback" data-reading-match-feedback hidden></p>
          </li>
        `).join("")}
      </ol>
    </div>
  </section>
  <section class="reading-matching-results" data-reading-feedback aria-live="polite" hidden>
    <div class="reading-gap-result" data-reading-result>
      <div><strong>Kết quả bài làm</strong><p data-reading-score></p></div>
      <button class="secondary-button" type="button" data-reading-retry>Làm lại câu này</button>
    </div>
    <div class="prompt-card">
      <strong>Đáp án đúng</strong>
      <ol class="reading-matching-answer-key">
        ${questions.map((question, index) => `<li>${question} — <strong>${answers[index]}</strong></li>`).join("")}
      </ol>
      <div class="reading-matching-explanations">
        <h3>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 4.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12H5a2 2 0 0 1-2-2zM5 2.5v12a2 2 0 0 0 2 2m1-12h6m-6 3h6" /></svg>
          Giải thích đáp án
        </h3>
        ${explanations.map((explanation) => `
          <article class="reading-matching-explanation">
            <p class="reading-matching-explanation-lead"><strong>${explanation.name}:</strong> ${explanation.lead}</p>
            <p class="reading-matching-explanation-translation">${explanation.translation}</p>
            <ul>${explanation.points.map((point) => `<li>${point}</li>`).join("")}</ul>
          </article>
        `).join("")}
      </div>
    </div>
  </section>
`;

const readingHeadingTask = (number, title, hint, passages, options, answers, explanation) => `
  <section class="reading-heading-exercise" data-reading-heading-exercise aria-label="Reading Part 5 question ${number}: ${title}">
    <div class="reading-heading-prompt"><strong>${title} : ${hint}</strong></div>
    <ol class="reading-heading-questions" aria-label="Ghép tiêu đề với đoạn văn">
      ${passages.map((passage, index) => `
        <li class="reading-heading-question">
          <label for="reading-heading-${number}-${index}">${index + 1}.</label>
          <select id="reading-heading-${number}-${index}" data-reading-heading data-answer="${answers[index]}" aria-label="${index + 1}. Chọn tiêu đề">
            <option value="">- Select -</option>
            ${options.map((option) => `<option value="${option}">${option}</option>`).join("")}
          </select>
          <p>${passage}</p>
          <p class="reading-heading-feedback" data-reading-heading-feedback hidden></p>
        </li>
      `).join("")}
    </ol>
  </section>
  <section class="reading-heading-results" data-reading-feedback aria-live="polite" hidden>
    <div class="reading-gap-result" data-reading-result>
      <div><strong>Kết quả bài làm</strong><p data-reading-score></p></div>
      <button class="secondary-button" type="button" data-reading-retry>Làm lại câu này</button>
    </div>
    <div class="prompt-card">
      <strong>Đáp án đúng</strong>
      <ol class="reading-heading-answer-key">
        ${answers.map((answer) => `<li>${answer}</li>`).join("")}
      </ol>
      <h3>Giải thích đáp án</h3>
      <p class="reading-heading-explanation">${explanation || "Chưa có giải thích cho bài này."}</p>
    </div>
  </section>
`;

const readingUnavailableTask = (number) => `
  <section class="reading-order-exercise-card reading-unavailable-task" role="status" aria-label="Reading Part 2–3 question ${number}">
    Nội dung chi tiết của câu này chưa xuất hiện trong video đã gửi.
  </section>
`;

const formatSpeakingCountdown = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainder = String(seconds % 60).padStart(2, "0");
  return `${String(minutes).padStart(2, "0")}:${remainder}`;
};

const responseTimer = ({ mode = "answer", duration, preparation = 0, startLabel, status }) => {
  const initialSeconds = mode === "extended" ? preparation : duration;
  return `
    <div class="response-timer-control" data-response-timer-control>
      <output class="speaking-timer-countdown" data-response-countdown role="timer" aria-label="Thời gian còn lại" aria-live="off">${formatSpeakingCountdown(initialSeconds)}</output>
      <div class="response-timer-actions">
        <button
          class="response-button"
          type="button"
          data-response-timer
          data-response-mode="${mode}"
          data-response-duration="${duration}"
          data-response-preparation="${preparation}"
          data-response-start-label="${startLabel}"
        >${startLabel}</button>
        ${mode === "extended"
          ? `<button class="response-button response-skip-button" type="button" data-response-skip-preparation>Bỏ qua chuẩn bị</button>`
          : ""}
      </div>
      <p class="speaking-timer-status" data-response-status aria-live="polite">${status}</p>
    </div>
  `;
};

const responseCard = (question, index, { questionCount, timerSeconds } = {}) => `
  <li class="question-card">
    ${questionCount ? `<span class="speaking-question-progress">QUESTION ${index + 1} OF ${questionCount}</span>` : ""}
    <strong>${index + 1}. ${question}</strong>
    <textarea class="answer-area" aria-label="${question}" placeholder="Ghi chú câu trả lời của bạn..."></textarea>
    ${timerSeconds
      ? responseTimer({
        duration: timerSeconds,
        startLabel: "Bắt đầu trả lời · 45 giây",
        status: "Sẵn sàng · 45 giây cho câu này.",
      })
      : ""}
  </li>
`;

const speakingPartTitles = [
  "Personal Information",
  "Describe a Picture",
  "Compare Two Pictures",
  "Extended Discussion",
];

const renderSpeakingPartBody = (exam, partIndex) => {
  const part = exam.parts[partIndex];
  if (!part) {
    return `
      <div class="speaking-unavailable" role="status">
        <strong>Nội dung Part ${partIndex + 1} chưa xuất hiện rõ trong video nguồn.</strong>
        <p>Chưa thêm câu hỏi hoặc hình thay thế để tránh sai khác với đề gốc.</p>
      </div>
    `;
  }

  const promptCount = part.questions.length;
  const questionCount = promptCount + (part.missingQuestions || 0);
  const questionTimerSeconds = partIndex === 1 || partIndex === 2 ? 45 : null;
  const questions = part.questions.map((question, index) => responseCard(question, index, {
    questionCount,
    timerSeconds: questionTimerSeconds,
  })).join("");
  const images = part.images.map((image) => `
    <figure class="speaking-image-card">
      <img src="${image.src}" alt="${image.alt}" loading="lazy" />
    </figure>
  `).join("");
  const partialNote = part.missingQuestions
    ? `<p class="speaking-source-note">Video chỉ hiển thị ${promptCount}/3 câu hỏi; ${part.missingQuestions} câu còn lại chưa được bổ sung.</p>`
    : "";
  const imageNote = part.sourceNote
    ? `<p class="speaking-source-note">${part.sourceNote}</p>`
    : "";
  const partInstructions = [
    "Bạn có tổng cộng 30 giây để trả lời cả 3 câu hỏi.",
    "Bạn có 45 giây cho mỗi câu hỏi.",
    "Bạn có 45 giây cho mỗi câu hỏi.",
    "Bạn có 1 phút chuẩn bị, sau đó 2 phút để trả lời cả 3 câu hỏi.",
  ][partIndex];
  const partTimer = partIndex === 0
    ? responseTimer({
      duration: 30,
      startLabel: "Bắt đầu · 30 giây cho 3 câu",
      status: "Sẵn sàng · đếm giờ chung cho cả 3 câu.",
    })
    : partIndex === 3
      ? responseTimer({
        mode: "extended",
        duration: 120,
        preparation: 60,
        startLabel: "Bắt đầu chuẩn bị · 1 phút",
        status: "60 giây chuẩn bị, sau đó 120 giây trả lời cả 3 câu.",
      })
      : "";

  return `
    <div class="task-callout speaking-part-intro speaking-part-intro-${partIndex + 1}">
      <strong>Part ${partIndex + 1} · ${speakingPartTitles[partIndex]}</strong>
      <p>${partInstructions}</p>
    </div>
    ${images ? `<div class="speaking-image-grid" data-image-count="${part.images.length}">${images}</div>` : ""}
    ${partIndex === 0 ? partTimer : ""}
    ${partialNote}${imageNote}
    <ul class="question-list">${questions}</ul>
    ${partIndex === 3 ? partTimer : ""}
  `;
};

const listeningQuestions = window.listeningPart1Questions;
const listeningPart2Questions = window.listeningPart2Questions;
const listeningPart3Questions = window.listeningPart3Questions;
const listeningPart4Questions = window.listeningPart4Questions;
const speakingExamData = window.speakingExamData;
const listenAudioSource = document.getElementById("listenAudioSource");

const writingFormTask = (instruction, questions, note = "", maxWords = 10) => `
  <div class="prompt-card"><strong>Form Filling</strong><p>${instruction}</p></div>
  <p>Please fill in the form below.</p>
  <ul class="question-list">
    ${questions.map((question, index) => `
      <li class="question-card">
        <strong>${typeof question === "string" ? index + 1 : question.number}. ${typeof question === "string" ? question : question.text}</strong>
        <input class="answer-input" aria-label="Writing answer ${typeof question === "string" ? index + 1 : question.number}" maxlength="100" />
        <p class="inline-hint">Maximum ${maxWords} words</p>
      </li>
    `).join("")}
  </ul>
  ${note ? `<p class="inline-hint">${note}</p>` : ""}
`;

const writingShortTextTask = (situation) => `
  <p>Write a short text (20-30 words).</p>
  <div class="prompt-card"><strong>Tình huống</strong><p>${situation}</p></div>
  <div class="prompt-card"><strong>Gợi ý</strong><p>Write roughly 20-30 words.</p></div>
  <p class="inline-hint">Giới hạn: 20-45 từ</p>
  <textarea class="answer-area" aria-label="Writing short text" maxlength="400" placeholder="Viết câu trả lời của bạn ở đây..."></textarea>
  <p class="inline-hint word-count">0 words</p>
`;

const writingChatTask = (introduction, messages) => `
  <p>${introduction}</p>
  <ul class="question-list">
    ${messages.map((message, index) => `
      <li class="question-card">
        <strong>${typeof message === "string" ? index + 1 : message.number}. ${typeof message === "string" ? message : message.text}</strong>
        <p class="inline-hint">Giới hạn: 30-60 từ</p>
        <textarea class="answer-area" aria-label="Writing chat response ${typeof message === "string" ? index + 1 : message.number}" maxlength="600" placeholder="Viết câu trả lời của bạn ở đây..."></textarea>
        <p class="inline-hint word-count">0 words</p>
      </li>
    `).join("")}
  </ul>
  ${messages.length < 3 ? `<p class="inline-hint">Video chỉ hiển thị các tin nhắn được liệt kê.</p>` : ""}
`;

const writingEmailTask = (introduction, email, tasks) => `
  <p>${introduction}</p>
  <section class="writing-email">
    <h3>INCOMING EMAIL</h3>
    <div class="writing-email-context">${email.context}</div>
    <div class="writing-email-message">
      <p>Dear Member,</p>
      ${email.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      <p>Best regards,<br />The Management</p>
    </div>
  </section>
  ${email.body.length ? "" : `<p class="inline-hint">Video không hiển thị nội dung email nguồn của chủ đề này.</p>`}
  ${tasks.length ? tasks.map((task, index) => `
    <section class="writing-email-task">
      <h3>Task ${index + 1}: ${task.title}</h3>
      <div class="prompt-card">${task.prompt}</div>
      <p class="inline-hint">Giới hạn: ${task.range}</p>
      <textarea class="answer-area ${index === 1 ? "large" : ""}" aria-label="${task.title}" maxlength="${task.maxLength}" placeholder="Write your answer here..."></textarea>
      <p class="inline-hint word-count">0 words</p>
    </section>
  `).join("") : `<p class="inline-hint">Video chưa hiển thị phần yêu cầu trả lời bên dưới email.</p>`}
  ${tasks.length === 1 ? `<p class="inline-hint">Video không hiển thị đầy đủ yêu cầu còn lại.</p>` : ""}
`;

const writingSourceExercises = [
  {
    id: "art-club",
    topic: "Art Club",
    parts: {
      0: writingFormTask("You want to join a sports club. Fill in the form.", [
        "What kinds of art do you like?",
        "Who is your favorite artist?",
        "How often do you draw or paint?",
        "What art materials do you usually use?",
        "Why do you want to join the art club?",
      ]),
      1: writingShortTextTask("Tell me a painting or a photo that you like."),
      2: writingChatTask("Respond to the messages in the group.", [
        "I kept a painting for a long time. Tell me a thing that you have had for a long time.",
        "I would like to learn to paint, but I have not found an effective way. Should I take a course at my local college? Please give me some advice.",
        "Street art—where people paint on buildings—is becoming popular. However, some people criticize it as bad. What is your opinion?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "Art Club",
        body: [
          "The Art Club is organizing a talk to the public to attract more attention. We are going to invite an artist to give a talk to the members. As a club member, could you suggest an artist to join our conversation, and what topic should they share to gain more attention? We would like to have both young and old members.”",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend - also a member of the",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Write an email to the organizer of the plan.",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "business-club",
    topic: "Business Club",
    parts: {
      0: writingFormTask("You have 5 messages from a member of the Business Club. Write short answers (1-5 words) to each message. Recommended time: 3 minutes.", [
        "What is your hobby?",
        "What is your favourite food?",
        "What is your favourite time of a day?",
        "How do you get to work?",
        "Where are you from?",
      ]),
      1: writingShortTextTask("Now you've become a new member of the Business club. Fill in the form. Write in sentences. Use 20-30 words. Where do you usually go shopping?"),
      2: writingChatTask("You are speaking to fellow members of the Business club in a group chat. Respond to them in full sentences (30-40 words per answer).", [
        "I know there are a lot of successful small businesses these days. Tell me about a successful small business in your area.",
        "I have a friend who wants to open a second coffee shop. She opened her first one a year ago and it was quite successful. What advice do you have to help her be more successful in her second shop?",
        "Can you tell me what qualities and skills are needed to create a successful small business?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "Business club",
        body: [
          "Currently our club is planning to support local individuals who want to start up a small business. The club has 2 proposals: First, create a call center where customers can call to ask questions and request help. Second, create free courses to support local universities nearby. Let us know which option you would use and why.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write a short email to your friend (about 50 words) about your choice and the idea.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Write an email to the manager of the club (about 120-150 words) about your choice and why.",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "car-club",
    topic: "Car Club",
    parts: {
      0: writingFormTask("You want to join a Car club. Fill in the form.", [
        "Do you like traveling by motorbike or car?",
        "What is your job?",
        "What do you do in your free time?",
        "What is the weather like today?",
        "Who do you want to travel with?",
      ]),
      1: writingShortTextTask("You are a new member of a Car club. Fill in the form. Write in sentences. Do you usually travel by car?"),
      2: writingChatTask("You are a member of a Car club. You are talking to three other members in the book club chat room. Talk to them using sentences. Use 30-40 words.", [
        { number: 1, text: "A: Tell me about a time you traveled by car." },
        { number: 2, text: "B: Tell me about memories when traveling by car." },
        { number: 3, text: "C: Should we take public transportation or buy a car?" },
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You are a member of the Car Club. You have received this email from the club:",
        body: [
          "\"There will be a car program running across Europe. The program invites the Car Club to send 2 representatives (1 main driver and 1 passenger) and both must have good driving skills. Do you have any suggestions for the above positions?\"",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Email to a friend (50 words):",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "college",
    topic: "College",
    parts: {
      0: writingFormTask("You have 5 messages from a member of the College. Write short answers (1-5 words) to each message. Recommended time: 3 minutes.", [
        "Which sport do you like to play the most?",
        "What did you do last night?",
        "Do you like shopping?",
        "What are you wearing today?",
        "What is your favorite kind of music?",
      ]),
      1: writingShortTextTask("Please tell us when you can attend courses and what you want to study."),
      2: writingChatTask("Respond to the messages in the group.", [
        { number: 1, text: "A. Hi! Welcome to college. What course are you doing, and why did you choose it?" },
        { number: 2, text: "Welcome! How do you feel about the college so far?" },
        { number: 3, text: "Did you hear that the college sports club has closed? What do you think about this?" },
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You are a member of a college. You received this email from the college administrator.",
        body: [
          "We are writing to inform you that the end-of-course exams will occur two weeks earlier. Your exam, scheduled for the 21st of next month, will now happen on the 7th of next month. We apologize for any difficulty this may cause.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend. Write about your feelings and what the college should do about the situation. Write about 50 words.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the administrator",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "community-club",
    topic: "Community Club",
    parts: {
      0: writingFormTask("You want to join a sports club. Fill in the form.", [
        "What's the weather like today?",
        "What do you usually do in the evening?",
        "Where would you like to live?",
        "Which season of the year do you like?",
        "Where do you like to go in the summer?",
      ]),
      1: writingShortTextTask("You are a new member of a Community Club. Fill in the form. Write in sentences. Use 20-30 words. Where do you usually go shopping?"),
      2: writingChatTask("You are a member of a Community Club. You are talking to three other members in the Community Club chat room. Talk to them using sentences. Use 30-40 words.", [
        "My friend wants to go to the hair salon, but her car isn't working. Can you suggest some ways for her to get there?",
        "Volunteering provides great learning opportunities, helps others a lot. Do you agree?",
        "Do you agree with the view that volunteering is a form of learning, especially for young people? Why?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You are a member of a Community Club. You received this email from the club.",
        body: [
          "Our club needs support with several tasks this year. First, we need more members who can actively participate in our ongoing projects. Second, we are looking for creative ideas to develop new activities. Could you share some suggestions with us to help support our projects this year?",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend. Write about your feelings and what you would like to do. Write about 50 words.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "health-club",
    topic: "Health Club",
    parts: {
      0: writingFormTask("You want to join a health club. Fill in the form. Use 1-5 words.", [
        "Where are you from?",
        "What's the weather like today?",
        "What do you do in your free time?",
        "First language?",
        "Who do you usually go to the movies with?",
      ]),
      1: writingShortTextTask("You are a new member of a health club. Fill in the form. Write in sentences. Use 20 - 30 words. Please tell me what classes you want to take and what times and days suit you."),
      2: writingChatTask("You are a member of a health club. You are talking to three other members in the health club chat room. Talk to them using sentences. Use 30 - 40 words.", [
        "Hi! Welcome to the club. How did you hear about the club?",
        "Hi! What do you hope to achieve by joining the club?",
        "What do you think of the health club facilities? Should we change anything?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "A manager of the health club has an announcement for the club's members",
        body: [
          "Because of personal reasons, the instructor will be away for two weeks. We will use our facilities by ourselves without the assistance of an instructor. I am so sorry about this situation and hope you are doing well in the next two weeks.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "film-club",
    topic: "Film Club",
    parts: {
      0: writingFormTask("You want to join a sports club. Fill in the form.", [
        "What's your favorite sport?",
        "How many people are in your family?",
        "What did you do yesterday?",
        "How do you go to school?",
        "What's your hobby?",
      ]),
      1: writingShortTextTask("You are a new member of a film club. Fill in the form. Write in sentences. Use 20-30 words. Please write some of your favorite films and why you like watching them."),
      2: writingChatTask("You are a member of a film club. You are talking to three other members in the food club chat room. Talk to them using sentences. Use 30 - 40 words.", [
        "Hi. Welcome to the club. How often do you watch films?",
        "Hi. Can you remember the first film that you watched? What was it like?",
        "What would you like to learn from the film club?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "YOU ARE A MEMBER OF A FILM CLUB. YOU RECEIVED THIS EMAIL FROM THE CLUB.",
        body: [
          "We are writing to tell you that the guest actor, James Mc Avoy, will unfortunately not be able to give a talk at our next club meeting due to personal reasons. He has requested we reschedule the talk for the next year in either January or March. Please contact the club secretary if you have a preference for one of the two months. Our meeting will take place as usual with a discussion on the advantages and disadvantages of learning on the Internet.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "book-club",
    topic: "Book Club",
    parts: {
      0: writingFormTask("You want to join a sports club. Fill in the form.", [
        "What's your favorite hobby?",
        "How do you get to work?",
        "What do you like to do in the evening?",
        "What kinds of movies do you like?",
        "What's your favorite food?",
      ]),
      1: writingShortTextTask("You are a new member of a book club. Fill in the form. Write in sentences. Use 20-30 words. Please tell me about your free time and hobbies?"),
      2: writingChatTask("You are a member of a book club. You are talking to three other members in the book club chat room. Talk to them using sentences. Use 30-40 words.", [
        "A: Hi! Welcome to the club. When and where do you like reading books?",
        "B: Hi! I want to give my friend a book. What would you suggest I buy?",
        "C: Do online books replace traditional books? What do you think about that?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You are a member of a book club. You received this email from the club.",
        body: [
          "The club will hold a talk show/event. Who do you want to invite? What is the theme? Please suggest both young and old people",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write to a friend.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Write an email to the manager of the club. (120-150 words)",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "computer-club",
    topic: "Computer Club",
    parts: {
      0: writingFormTask("You want to join a computer club. Fill in the form. Use 1-5 words.", [
        "Where are you from?",
        "What's the weather like today?",
        "What do you do in your free time?",
        "What is your first language?",
        "Who do you usually go to the movies with?",
      ]),
      1: writingShortTextTask("You are a new member of a computer club. Fill in the form. Write in sentences. Use 20-30 words. Part 2: When and where do you use a computer?"),
      2: writingChatTask("Respond to the messages in the group.", [
        "My grandmother doesn’t know how to use the computer. Your solutions",
        "The last time you used your computer. Your purpose.",
        "Nowadays, people use computers a lot. This is not good. Your opinion",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "Computer CLUB",
        body: [
          "We are making some changes to the website because we want more people to join us. As you know, the website at the moment is very simple and we would be interested to hear some ideas about ways to make it more attractive and why you think it would be attract more visitors.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "debate-club",
    topic: "Debate Club",
    parts: {
      0: writingFormTask("You want to join a Debate Club. You have 5 messages from a member of the club. Write short answers (1-5 words) to each message. Recommended time: 3 minutes.", [
        "Where are you from?",
        "Where do you want to go on holiday?",
        "What do you like to do in the evening?",
        "What's your favorite sports?",
        "What's your first language?",
      ]),
      1: writingShortTextTask("What do you usually talk about with your friends?"),
      2: writingChatTask("Respond to the messages in the group.", [
        "Hi! Nowadays, there are many ways to update news. How do you keep up with world issues?",
        "Next week, I will participate in a debate in front of 50 people. How can I make a good impression?",
        "Before deciding something, consider two sides of the problem. What do you think about that?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "Debate Club",
        body: [
          "We want to encourage many young people to join the club. Unfortunately, young people usually think that debating is not for them. What do you think are the benefits of debate and speaking in public? Please list two benefits that you feel are the most important and why.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend, also a club member. Write about how you feel and what you think the club should do. Write about 50 words.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "english-club",
    topic: "English Club",
    parts: {
      0: writingFormTask("You want to join a English Club. You have 5 messages from a member of the club. Write short answers (1-5 words) to each message. Recommended time: 3 minutes.", [
        "Where did you go last night?",
        "What do you like doing with your friend?",
        "Which sport do you like to play the most?",
        "What did you do last night?",
        "Do you like shopping?",
      ]),
      1: writingShortTextTask("What do you usually use the internet for?"),
      2: writingChatTask("You are a member of an English Club. You are talking to three other members in the English club chat room. Talk to them using sentences. Use 30 - 40 words.", [
        "I usually spend 6 hours a day studying English. How do you learn English?",
        "English is a popular language in the world. What are your thoughts on this idea?",
        "When do you usually use English?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "English Club",
        body: [
          "As more new words and phrases are added to the language, many people strongly react to this issue. Some gladly accept while others argue that there should be rules for language. Write a letter to your friend and the club manager to express your views and explain why many people react like this.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "fashion-club",
    topic: "Fashion Club",
    parts: {
      0: writingFormTask("You want to join a sports club. Fill in the form.", [
        "What are you wearing today?",
        "How many people are in your family?",
        "What did you do yesterday?",
        "How do you go to school?",
        "What's your hobby?",
      ]),
      1: writingShortTextTask("You are a new member of a fashion club. Fill in the form. Write in sentences. Use 20-30 words. When was the last time you went shopping for clothes?"),
      2: writingChatTask("You are a member of a fashion club. You are talking to three other members in the fashion club chat room. Talk to them using sentences. Use 30 - 40 words.", [
        "Some people like to buy clothes to try on themselves. Some prefer to buy online. How do you like it and why?",
        "Hi! Why did you decide to join the club?",
        "Why do people like fashion?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "Fashion Club",
        body: [
          "We are going to hold an event with famous designers who will talk about their clothing designs and answer members' questions. We need feed back on organization. There are two opinions that should be held online, while others want to organize a fashion show event. State your opinion.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "fitness-club",
    topic: "Fitness Club",
    parts: {
      0: writingFormTask("You want to join a sports club. Fill in the form.", [
        "What is your hobby?",
        "Why do you want to join a club?",
        "What's the weather like today?",
        "How do you relax?",
        "Why do you learn English?",
      ]),
      1: writingShortTextTask("You are a new member of a fitness club. Fill in the form. Write in sentences. Use 20 - 30 words. Please talk about the last time you had to run somewhere."),
      2: writingChatTask("You are a member of a fitness club. You are talking to three other members in the fitness club chat room. Talk to them using sentences. Use 30 - 40 words.", [
        "I often go jogging because it is good for my health. What about you?",
        "How can the quality of the fitness club be improved?",
        "Nowadays, technology makes people's lives more accessible but also makes them lazy and dislike exercise. Do you agree with this opinion?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You are a member of a fitness club. You received this email from the club.",
        body: [
          "Some of the club’s equipment is old and needs to be replaced. Our club plans to hold a sponsorship event to raise money to upgrade sports equipment. Some people also think the club should increase the membership fee to 50%. Please give your opinions.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club.",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "food-club",
    topic: "Food Club",
    parts: {
      0: writingFormTask("You want to join a Food Club. You have 5 messages from a member of the club. Write short answers (1-5 words) to each message. Recommended time: 3 minutes.", [
        "What is your full name?",
        "What is your surname?",
        "What did you do yesterday?",
        "What do you like to do every morning?",
        "What do you do in your free time?",
      ]),
      1: writingShortTextTask("What did you eat for breakfast?"),
      2: writingChatTask("Respond to the messages in the group.", [
        "Nowadays, many people order pizza instead of cooking by themselves when busy. What about you? When you are busy, what do you usually eat?",
        "Is it essential for children to participate in cooking courses at school?",
        "Should a tax be imposed on unhealthy food?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You are a member of a food club. You received this email from the club.",
        body: [
          "Our club will meet next week and invite some chefs to our town. However, we have new members in this meeting who just started learning to cook. Therefore, please share your ideas for this event and ways to encourage people to attend our club to learn how to cook.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "garden-club",
    topic: "Garden Club",
    parts: {
      0: writingFormTask("You want to join a sports club. Fill in the form.", [
        "What's your job?",
        "What are you going to do tomorrow?",
        "What will you do after work?",
        "What sports do you like?",
        "What is your favorite color?",
      ]),
      1: writingShortTextTask("Describe a garden or a park near your home? Write in sentences. Use 20-30 words."),
      2: writingChatTask("You are a member of a garden club. You are talking to three other members in the garden club chat room. Talk to them using sentences. Use 30 - 40 words.", [
        { number: 1, text: "I don't live in the countryside, so when I want to appreciate nature, I have to go to the park. How about you?" },
        { number: 2, text: "I am planning to buy a house, do you think I should buy a house with a garden or without a garden?" },
        { number: 3, text: "People should pay a small fee to maintain public parks and gardens. What do you think?" },
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You are a member of the garden club. You received this email from the club.",
        body: [
          "The city council wants to encourage more people to participate in gardening. The council has two proposals. One is to plant 50 new trees and new species of flowers at the local park. The second is to offer practical workshops in gardening skills at the local college. Which proposal should we support?",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "beautiful-home-club",
    topic: "Beautiful Home Club",
    parts: {
      0: writingFormTask("You want to join a Beautiful Home Club. You have 5 messages from a member of the club. Write short answers (1-5 words) to each message. Recommended time: 3 minutes.", [
        "What is your first school?",
        "What's the weather like today?",
        "What is your favorite type of music?",
        "What kinds of movies do you like?",
        "What is your favorite film?",
      ]),
      1: writingShortTextTask("Describe where you live (20-30 words)"),
      2: writingChatTask("You are a member of a home living club. You are talking to three other members in the home living chat room. Use 30-40 words.", [
        { number: 1, text: "You must stay in the bedroom but share with your brother. How do you feel?" },
        { number: 2, text: "Living in the city or the countryside is better. Do you agree? Why?" },
        { number: 3, text: "Nowadays, old buildings are demolished and replaced with modern buildings. I feel we should protect historic buildings. What do you think about protecting historic buildings?" },
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You are a member of a home living club.",
        body: [
          "Many young families want to buy a house or an apartment. The club wants the members to make suggestions to help them find homes.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend",
          range: "50-75 từ",
          maxLength: 500,
        },
      ]),
    },
  },
  {
    id: "language-club",
    topic: "Language Club",
    parts: {
      0: writingFormTask("You want to join a Language Club. You have 5 messages from a member of the club. Write short answers (1-5 words) to each message. Recommended time: 3 minutes.", [
        "What is your favorite animal?",
        "What is your first language?",
        "Who do you usually go to the movie with?",
        "What is your favorite time of the day?",
        "What's the weather like today?",
      ]),
      1: writingShortTextTask("You are a new member of the Language Club. Fill in the form. Write in sentences. Use 20-30 words. Recommended time: 7 minutes. Tell me your free time and interests?"),
      2: writingChatTask("You are a member of the language club. You are talking to three other members in the language club chat room. Use 30 - 40 words.", [
        "Why did you choose this course?",
        "How have you found the course so far? What has been challenging?",
        "What are you hoping to do when you finish the course?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You are a member of the language club and received this email from the club.",
        body: [
          "The club will have a lecture soon and needs a speaker. Write an email expressing your desire to be a speaker and giving the topic of the talk.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "museum-club",
    topic: "Museum Club",
    parts: {
      0: writingFormTask("You want to join a museum club. You have 5 messages from a member of the club. Write short answers (1-5 words) to each message. Recommended time: 3 minutes.", [
        "What's your hobby?",
        "How do you get to work?",
        "What do you like to do in the evening?",
        "What kinds of movies do you like?",
        "What's your favorite food?",
      ]),
      1: writingShortTextTask("You are a new member of the Museum Club. Fill in the form. Write in sentences. Use 20-30 words. Recommended time: 7 minutes. Tell me the last time you went to a museum?"),
      2: writingChatTask("You are a member of a museum club. You are talking to three other members in the museum club chat room. Talk to them using sentences. Use 30 - 40 words.", [
        "Tell a museum you visited when you were a child?",
        "Which do you prefer, the History Museum or Sports Museum?",
        "Nowadays, many museums use technology to create online exhibitions. Will that be successful?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "Museum Club",
        body: [
          "Currently, the museum club is considering that members may pay a fee to visit museums. Please give your opinion?",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "music-club",
    topic: "Music Club",
    parts: {
      0: writingFormTask("You want to join a music club. You have 5 messages from a member of the club. Write short answers (1-5 words) to each message. Recommended time: 3 minutes.", [
        "How many phones do you have?",
        "How often do you go shopping?",
        "Where are you from?",
        "Where do you live?",
        "Where would you like to live?",
      ]),
      1: writingShortTextTask("Please tell us about the last time you listened to music."),
      2: writingChatTask("You are a member of a music club. You are talking to three other members in the music club chat room. Talk to them using sentences. Use 30 - 40 words.", [
        "Hi! How often do you listen to music?",
        "I plan to give my son music lessons, but he doesn't like it. What should I do?",
        "Do you agree that music is essential in a culture",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "Phàn nàn vì thường xuyên mở nhạc muộn",
        body: [
          "Our club has recently had some concerts and plays music at night. However, residents living near our club complain about the noise from our concerts. Please give me some suggestions to solve this problem,",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friends. Write about your feelings and ask for advice on how to deal with them. Write about 50 words. You have 10 minutes.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "nature-club",
    topic: "Nature Club",
    parts: {
      0: writingFormTask("You want to join a nature club. Fill in the form. Use 1-5 words.", [
        "What's your favorite sport?",
        "How many people are in your family?",
        "What did you do yesterday?",
        "How do you go to school?",
        "What's your hobby?",
      ]),
      1: writingShortTextTask("You are a new member of a nature club. Fill in the form. Write in sentences. Use 20-30 words. Please tell me about your free time and hobbies?"),
      2: writingChatTask("You are a member of a nature club. You are talking to three other members in the nature club chat room. Talk to them using sentences. Use 30 - 40 words.", [
        { number: 1, text: "Hi! Welcome to the club. Where do you like to visit?" },
        { number: 2, text: "Hi! Why did you decide to join the club?" },
        { number: 3, text: "The bigger the club, the more environmentally conscious people are, right?" },
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You are a member of a nature club. You received this email from the club.",
        body: [
          "The club wants to make a plan for the young people because they just love to stay home and play games.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "outdoor-club",
    topic: "Outdoor Club",
    parts: {
      0: writingFormTask("You want to join a outdoor club. You have 5 messages from a member of the club. Write short answers (1-5 words) to each message. Recommended time: 3 minutes.", [
        "Who do you usually go to the movies with?",
        "Do you like to take photos?",
        "Where do you like to go on holiday?",
        "What's your favorite color?",
        "What did you do last night?",
      ]),
      1: writingShortTextTask("Why did you join?"),
      2: writingChatTask("Respond to the messages in the group.", [
        "What kinds of outdoor activities do you often do?",
        "How often and what time can you come to the club?",
        "What are the most popular outdoor activities in your country?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You received this email from the secretary of the club",
        body: [
          "Our outdoor club will organize an outdoor event at the end of this month. There will be two options: Going to the mountain or traveling to the beach. We want members to raise their voices and suggest activities to make the event more appealing to members so that children can join.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "photography-club",
    topic: "Photography Club",
    parts: {
      0: writingFormTask("You want to join a photography club. Fill in the form. Use 1-5 words.", [
        "Where are you from?",
        "What's the weather like today?",
        "What do you do in your free time?",
        "First language?",
        "Who do you usually go to the movies with?",
      ]),
      1: writingShortTextTask("You are a new member of a photography club. Fill in the form. Write in sentences. Use 20-30 words. What is your favorite time and place to take pictures?"),
      2: writingChatTask("You are a member of a photography club. You are talking to three other members in the photography club chat room. Talk to them using sentences. Use 30 - 40 words.", [
        "Hi! Welcome to the club. What is your favorite photo?",
        "Hi! What kind of photos do you like to take?",
        "Is it reasonable to take pictures with the phone?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You are a member of a photography club. You received this email from the club.",
        body: [
          "Last year, the club held a contest, but there was only one category. This year, the club will be divided into women, men, and children under 16.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "reading-club",
    topic: "Reading Club",
    parts: {
      0: writingFormTask("You want to join a sports club. Fill in the form.", [
        "How is the weather today?",
        "What is your favorite season of the year?",
        "What do you like to do every morning?",
        "What do you like to do in your free time?",
        "What did you do last night?",
      ]),
      1: writingShortTextTask("When was the last time you read a book, and how was the book?"),
      2: writingChatTask("Respond to the messages in the group.", [
        "I like reading sports magazines. Do you like them? Why?",
        "How often do you read? Who do you read with?",
        "Nowadays, children prefer playing games to reading books. Do you think this is worrying? Why?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You received this email from the manager of the club",
        body: [
          "The club received an email about a new library, and we need to brainstorm how to design it to appeal to both young and old.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "science-club",
    topic: "Science Club",
    parts: {
      0: writingFormTask("You want to join a sports club. Fill in the form.", [
        "What is your favorite color?",
        "What is your first school?",
        "What do you do in your free time?",
        "What is your favorite sport?",
        "What did you do last night?",
      ]),
      1: writingShortTextTask("Do you like Science? Why? (Write in sentences about 20-30 words)"),
      2: writingChatTask("You are in a club chat room with three club members. You will answer and exchange some opinions with those three people. Write answers in sentences about 30-40 words.", [
        "Why did you decide to join our Science Club? How often can you attend?",
        "You learned about Science in school in the past. Do you remember anything about Science?",
        "Who is your favorite inventor or scientist? Why?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You have received an email from the Science Club about next month's club exhibition.",
        body: [
          "Our club is preparing to organize the science exhibition next month. Both young people and older adults can take part in our activities. We are planning for our exhibition. Could you contribute some ideas for our event team? Does our club issue tickets for participants? I would like to hear your contribution.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "social-club",
    topic: "Social Club",
    parts: {
      0: writingFormTask("You want to join a social club. Fill in the form. Use 1-5 words.", [
        "What's the weather like today?",
        "How are you?",
        "What's your hobby?",
        "How do you get to work?",
        "What do you like to do in the evening?",
      ]),
      1: writingShortTextTask("You are a new member of a social club. Fill in the form. Write in sentences. Use 20 - 30 words. What do you like to do with friends, and where do you go?"),
      2: writingChatTask("You are a member of a social club. You are talking to three other members in the social club chat room. Talk to them using sentences. Use 30 - 40 words.", [
        "Where did you meet your friends for the first time, and how did you become friends?",
        "I have just moved to the city and want to make some friends. Can you give me some advice?",
        "It is much easier to make new friends because of computers and mobile phones. Do you agree? Why or why not?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You are a member of a social club. You received this email from the club.",
        body: [
          "We want to organize monthly face-to-face meetings. We want your suggestions about when and where we could meet. This would suit both young and old people. Please send us your suggestions and your reasons.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend. Write about your feelings and what you would like to do. Write about 50 words.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "sports-club",
    topic: "Sports Club",
    parts: {
      0: writingFormTask("You want to join a sports club. Fill in the form. Use 1-5 words.", [
        "What's the weather like today?",
        "How are you?",
        "What's your favorite hobby?",
        "How do you get to work?",
        "What do you like to do in the evening?",
      ]),
      1: writingShortTextTask("Now you've become a new member of the Sports club. Fill in the form. Write in sentences. Use 20-30 words. Why did you decide to join the club?"),
      2: writingChatTask("You are a member of a sports club. You are talking to three other members in the sports club chat room. Talk to them using sentences. Use 30 - 40 words.", [
        "When was the last time you played sports?",
        "I usually play sports with my friends and watch sports programs. What about you?",
        "I like playing sports with my friend, but my brother likes playing sports alone. What do you think about this issue?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You are a member of the sports club. You received this email from the club.",
        body: [
          "Please give your suggestions about the organization of playing sports for young members.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "technology-club",
    topic: "Technology Club (phiên bản 1)",
    parts: {
      0: writingFormTask("You want to join a sports club. Fill in the form.", [
        "Where are you from?",
        "What's the weather like today?",
        "What did you do last night?",
        "First language?",
        "What is your favorite color?",
      ]),
      1: writingShortTextTask("You are a new member of a technology club. Fill in the form. 20 - 30 words. What do you usually use your laptop for?"),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "TECHNOLOGY CLUB (phiên bản 1)",
        body: [
          "Members often post on the website's club. Lately, however, there have been a few negative comments on other members' posts. Please give your opinion on how to fix the situation.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend.",
          range: "40-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
      2: writingChatTask("Respond to the messages in the group.", [
        { number: 1, text: "Tell me a time you had problems with your technology device." },
        { number: 2, text: "I often help Grandma use the computer. Have you ever helped anyone?" },
        { number: 3, text: "Modern technology makes life easier. What's your opinion about this?" },
      ]),
    },
  },
  {
    id: "travel-club",
    topic: "Travel Club",
    parts: {
      0: writingFormTask("You want to join a sports club. Fill in the form.", [
        "What is your favorite subject in high school?",
        "What do you like doing with your friends?",
        "Where do you wanna go on holiday?",
        "Why are you interested in travel?",
        "Tell me a place you often visit?",
      ]),
      1: writingShortTextTask("Where do you usually travel on holiday?"),
      2: writingChatTask("Respond to the messages in the group.", [
        "Do you prefer to travel alone or with a group? Why?",
        { number: 2, text: "Tell me about an exciting summer vacation you went on." },
        { number: 3, text: "Traveling a long distance by some means of transportation is not good for the environment. Do you agree?" },
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "TRAVEL CLUB",
        body: [
          "Our club plans to encourage tourists to visit our area and expect them to behave politely. Please raise your voice and give some suggestions for this plan.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "tv-club",
    topic: "TV Club",
    parts: {
      0: writingFormTask("You want to join a TV club. Fill in the form. Use 1-5 words.", [
        "What is your name?",
        "What do you do?",
        "What is your favorite day?",
        "How do you travel around your city/town?",
        "What time do you get up?",
      ]),
      1: writingShortTextTask("Do you usually watch TV?"),
      2: writingChatTask("Respond to the messages in the group.", [
        "What do you like to do when you watch TV?",
        "Do you like watching TV alone or with others?",
        "Is it good for children to watch TV programs too much?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "You are a member of the TV club and you received an email",
        body: [
          "-The club is planning to organize a conference to invite all members. The members come from different countries and have only communicated with each other online before. The club would like to get your suggestions on the venue of this conference and the activities held during the conference.",
        ],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
  {
    id: "walking-club",
    topic: "Walking Club",
    parts: {
      0: writingFormTask("You want to join a sports club. Fill in the form.", [
        "What is the weather like today?",
        "Your favorite time of year?",
        "What do you usually do when you have free time?",
        "What is your favorite sport?",
        "A place you would like to visit in your country?",
      ]),
      1: writingShortTextTask("When and where do you like to walk?"),
      2: writingChatTask("Respond to the messages in the group.", [
        "I usually go for a walk. Do you like to walk or not?",
        "I like to walk, but when it rains, I get wet. Tell me about a time you had a bad experience while walking.",
        "Walking is the best form of exercise. What do you think when many people walk and know if it is good for your health?",
      ]),
      3: writingEmailTask("Read the email and complete the two tasks.", {
        context: "The club plans to organize a walk across European countries. A few group members suggested it, but it was said to be unrealistic. Please send your suggestions and your reasons.",
        body: ["-"],
      }, [
        {
          title: "Informal Email",
          prompt: "Write an email to your friend.",
          range: "50-75 từ",
          maxLength: 500,
        },
        {
          title: "Formal Email",
          prompt: "Email to the manager of the club:",
          range: "120-225 từ",
          maxLength: 1400,
        },
      ]),
    },
  },
];

const writingTopics = [
  { id: "art-club", title: "Art Club" },
  { id: "book-club", title: "Book Club" },
  { id: "business-club", title: "Business Club" },
  { id: "car-club", title: "Car Club" },
  { id: "college", title: "College" },
  { id: "community-club", title: "Community Club" },
  { id: "computer-club", title: "Computer Club" },
  { id: "debate-club", title: "Debate Club" },
  { id: "english-club", title: "English Club" },
  { id: "fashion-club", title: "Fashion Club" },
  { id: "film-club", title: "Film Club" },
  { id: "fitness-club", title: "Fitness Club" },
  { id: "food-club", title: "Food Club" },
  { id: "garden-club", title: "Garden Club" },
  { id: "health-club", title: "Health Club" },
  { id: "beautiful-home-club", title: "Beautiful Home Club" },
  { id: "language-club", title: "Language Club" },
  { id: "museum-club", title: "Museum Club" },
  { id: "music-club", title: "Music Club" },
  { id: "nature-club", title: "Nature Club" },
  { id: "outdoor-club", title: "Outdoor Club" },
  { id: "photography-club", title: "Photography Club" },
  { id: "reading-club", title: "Reading Club" },
  { id: "science-club", title: "Science Club" },
  { id: "social-club", title: "Social Club" },
  { id: "sports-club", title: "Sports Club" },
  { id: "technology-club", title: "Technology Club (phiên bản 1)" },
  { id: "travel-club", title: "Travel Club" },
  { id: "tv-club", title: "TV Club" },
  { id: "walking-club", title: "Walking Club" },
];

const skills = {
  Reading: {
    parts: [
      {
        kicker: "Reading · Part 1",
        title: "Choose the word that fits in the gap 01",
        body: readingGapTask(1, "Choose the word that fits in the gap 01", [
          { before: "In the ", after: ", I cycle to work.", options: ["sun", "morning", "market"], answer: "morning" },
          { before: "My ", after: " cycle to work with me.", options: ["friends", "house", "car"], answer: "friends" },
          { before: "Therefore, I ", after: " my car at my house.", options: ["stay", "burn", "leave"], answer: "leave" },
          { before: "I feel ", after: " after cycling to work.", options: ["big", "good", "beautiful"], answer: "good" },
          { before: "Then, I drink water and eat healthy ", after: ".", options: ["sugar", "beer", "food"], answer: "food" },
        ], `<p>Dear Jane,</p>
          <p>1. In the (sun/morning/market), I cycle to work.<br />Vào buổi sáng, tôi đạp xe đi làm</p>
          <p>2. My (friends/house/car) cycle to work with me.<br />Bạn tôi đạp xe đi làm cùng tôi</p>
          <p>3. Therefore, I (stay/burn/leave) my car at my house.<br />Do vậy, tôi để ô tô ở nhà</p>
          <p>4. I feel (big/good/beautiful) after cycling to work.<br />Tôi cảm thấy khỏe sau khi đạp xe đi làm</p>
          <p>5. Then, I drink water and eat healthy (sugar/beer/food).<br />Sau đó, tôi uống nước và ăn thức ăn tốt cho sức khỏe</p>`),
      },
      {
        kicker: "Reading · Part 1",
        title: "Choose the word that fits in the gap. (02)",
        body: readingGapTask(2, "Choose the word that fits in the gap 02", [
          { before: "When you are at the train ", after: ", go to the main gate.", options: ["school", "station", "river"], answer: "station" },
          { before: "The bus ", after: " are near.", options: ["towns", "stops", "places"], answer: "stops" },
          { before: "My house is on Parkan Street. It's ", after: ", so you can not miss it.", options: ["tired", "color", "green"], answer: "green" },
          { before: "After you come, we will have ", after: ".", options: ["dinner", "food", "eat"], answer: "dinner" },
          { before: "In the evening, we can watch some ", after: " together.", options: ["animals", "films", "bread"], answer: "films" },
        ], `<p>Dear Tom,</p>
          <p>1. When you are at the train (school/station/river), go to the main gate.<br />Khi bạn đến nhà ga xe lửa, đi đến cổng chính</p>
          <p>2. The bus (stops/towns/places) are near.<br />Điểm dừng xe bus ở gần đó</p>
          <p>3. My house is on Parkan Street. It's (tired/color/green), so you can not miss it.<br />Nhà của mình ở trên phố Parkan. Nó có màu xanh, vì vậy bạn dễ nhận ra nó</p>
          <p>4. After you come, we will have (dinner/food/eat).<br />Sau khi bạn đến, chúng ta sẽ ăn bữa tối</p>
          <p>5. In the evening, we can watch some (animals/films/bread) together.<br />Vào buổi tối chúng ta sẽ xem phim cùng nhau</p>
          <p>Talk to you soon!<br />Anna.</p>`),
      },
      {
        kicker: "Reading · Part 1",
        title: "Choose the word that fits in the gap 03",
        body: readingGapTask(3, "Choose the word that fits in the gap 03", [
          { before: "We are ", after: " in a small house in the village.", options: ["running", "staying", "seeing"], answer: "staying" },
          { before: "There are a lot of trees in the ", after: ".", options: ["garden", "room", "kitchen"], answer: "garden" },
          { before: "We go fishing with our ", after: ".", options: ["forest", "park", "children"], answer: "children" },
          { before: "Today, we are going to ", after: " the town by bus.", options: ["river", "visit", "house"], answer: "visit" },
          { before: "There are some ", after: " buildings there.", options: ["old", "slow", "fast"], answer: "old" },
        ], `<p>Hi Alex,</p>
          <p>Our family is going on a vacation.</p>
          <p>1. We are (staying) in a small house in the village.<br />Chúng tôi ở trong một ngôi nhà nhỏ trong làng.</p>
          <p>2. There are a lot of trees in the (garden).<br />Có rất nhiều cây ở trong vườn</p>
          <p>3. We go fishing with our (children)<br />Chúng tôi đi câu cá cùng các con</p>
          <p>4. Today, we are going to (visit) the town by bus.<br />Hôm nay, chúng mình sẽ đi thăm thị trấn bằng xe bus</p>
          <p>5. There are some (old) buildings there.<br />Có một số tòa nhà cũ ở đó</p>
          <p>Love,<br />Anna</p>`),
      },
      {
        kicker: "Reading · Part 1",
        title: "Choose the word that fits in the gap. (04)",
        body: readingGapTask(4, "Choose the word that fits in the gap 04", [
          { before: "I ", after: " the area where I live now.", options: ["love", "run", "should"], answer: "love" },
          { before: "My house has a kitchen but it is very ", after: ".", options: ["tall", "small", "short"], answer: "small" },
          { before: "I work at a ", after: " and I sell clothes.", options: ["car", "window", "shop"], answer: "shop" },
          { before: "Everyday I talk to many ", after: ".", options: ["people", "animals", "trees"], answer: "people" },
          { before: "I am on my holiday and I'm excited that I can ", after: " you soon.", options: ["art", "play", "visit"], answer: "visit" },
        ], `<p>Hi James,</p>
          <p>1. I (love/run/should) the area where I live now.<br />Tôi rất yêu nơi tôi sống</p>
          <p>2. My house has a kitchen but it is very (tall/small/short).<br />Nhà tôi có nhà bếp nhưng nó rất nhỏ</p>
          <p>3. I work at a (car/window/shop) and I sell clothes.<br />Tôi làm việc tại một cửa hàng và bán quần áo</p>
          <p>4. Everyday I talk to many (people/animals/trees).<br />Mỗi ngày tôi nói chuyện với nhiều người</p>
          <p>5. I am on my holiday and I'm excited that I can (art/play/visit) you soon.<br />Tôi đang đi nghỉ và rất vui vì sắp được đến thăm bạn</p>`),
      },
    ],
  },
  Writing: {
    duration: 50 * 60,
    parts: [
      {
        kicker: "Writing · Part 1",
        title: "Form Filling",
        body: "",
      },
      {
        kicker: "Writing · Part 2",
        title: "Short Text",
        body: "",
      },
      {
        kicker: "Writing · Part 3",
        title: "Chat Responses",
        body: "",
      },
      {
        kicker: "Writing · Part 4",
        title: "Email Writing",
        body: "",
      },
    ],
  },
  Speaking: {
    duration: 12 * 60,
    parts: [],
  },
};

const readingPart23Questions = [
  {
    kicker: "Reading · Part 2–3",
    title: "Weekend activities/ Sporty Day",
    available: true,
    correctOrder: [3, 2, 0, 4, 1],
    body: readingOrderTask(1, "Weekend activities/ Sporty Day", [
      { text: "After receiving the prize, the children's activities and competitions began.", translation: "Sau khi nhận giải thưởng, các hoạt động và cuộc thi của trẻ em bắt đầu." },
      { text: "They were all very hungry after all these, so they enjoyed tasty food and drinks with their parents", translation: "Sau khi chơi xong, các em rất đói và ăn cùng với cha mẹ của mình." },
      { text: "Sixty men and women ran in this, and Ms Kamur won with a very fast time" },
      { text: "It started early on Saturday morning with a ten-mile race for adults.", translation: "Sự kiện được tổ chức vào sáng thứ Bảy, có cuộc đua 10 mét dành cho người lớn." },
      { text: "These activities included football, jumping, and swimming and they had lots of fun.", translation: "Các hoạt động gồm đá bóng, bơi lội, nhảy dây,... các em nhỏ chơi cùng nhau rất vui vẻ." },
    ], [3, 2, 0, 4, 1], "Weekend activities/ Sporty Day - Hoạt động cuối tuần"),
  },
  {
    kicker: "Reading · Part 2–3",
    title: "Making Films",
    available: true,
    correctOrder: [1, 4, 3, 2, 0],
    body: readingOrderTask(2, "Making Films", [
      { text: "Things have changed over time, and some of them have earned millions of dollars after appearing in films.", translation: "Ngày nay mọi thứ đã thay đổi, diễn viên và nhà làm phim có thể kiếm được hàng triệu đô la từ việc xuất hiện trong phim." },
      { text: "The films in that period were different from the films of today.", translation: "Những bộ phim cũ rất khác so với phim ngày nay." },
      { text: "This lack of money mostly affected actors, and they didn't earn much", translation: "Do thiếu tiền, các diễn viên cũng có ít cơ hội kiếm tiền từ việc diễn xuất." },
      { text: "In addition to these technical limitations, film producers also had a very low budget", translation: "Không chỉ có những hạn chế về công nghệ, mà các bộ phim còn có kinh phí thấp." },
      { text: "This is because they were black and white, and there was no sound.", translation: "Đó là vì các bộ phim thời đó chỉ có màu đen trắng, và đôi khi còn không có âm thanh." },
    ], [1, 4, 3, 2, 0], "Making Films - Phim ảnh"),
  },
  {
    kicker: "Reading · Part 2–3",
    title: "History of travel",
    available: true,
    correctOrder: [0, 3, 2, 4, 1],
    body: readingOrderTask(3, "History of travel", [
      { text: "In the past, transportation was only available to the rich.", translation: "Trong quá khứ, phương tiện giao thông chỉ dành cho người giàu." },
      { text: "It is more convenient to travel to other part of the world due to the improvement in transports", translation: "Việc di chuyển đến các khu vực khác trên thế giới trở nên thuận tiện hơn nhờ sự phát triển của giao thông vận tải." },
      { text: "After these two means of transport, travelling becomes even easier with airplanes", translation: "Sau hai phương tiện này, việc đi lại còn trở nên dễ dàng hơn với máy bay." },
      { text: "The invention of cars and trains had changed everything and made travelling cheaper.", translation: "Sự ra đời của ô tô và tàu hỏa đã thay đổi mọi thứ và khiến việc đi lại trở nên rẻ hơn." },
      { text: "Because flying with them is so fast, more people now go abroad for holiday and business.", translation: "Vì máy bay rất nhanh, nên ngày nay nhiều người đi nước ngoài để du lịch và công tác hơn." },
    ], [0, 3, 2, 4, 1], "Lịch sử của việc đi lại"),
  },
  {
    kicker: "Reading · Part 2–3",
    title: "New Café in Town",
    available: true,
    correctOrder: [1, 3, 2, 0, 4],
    body: readingOrderTask(4, "New Café in Town", [
      { text: "I had to choose one of those, so I decided to choose the most expensive sandwich.", translation: "Tôi buộc phải chọn một món trong đó, vì vậy tôi đã gọi món sandwich đắt nhất." },
      { text: "It was full of people, and the staff were working hard on their first day.", translation: "Ở đó rất nhiều người, nhân viên thì làm việc chăm chỉ trong ngày đầu tiên." },
      { text: "When I first looked at the menu, I was disappointed since I hoped to see a variety of dishes.", translation: "Khi tôi xem thực đơn, tôi thấy thất vọng vì tôi mong có nhiều món đa dạng hơn." },
      { text: "Despite the crowd, they found me a nice table and brought me a menu.", translation: "Mặc dù rất đông nhưng nhân viên vẫn xếp cho tôi một bàn đẹp và mang thực đơn tới." },
      { text: "It was really good with cheese topping, and I would definitely go back to this place.", translation: "Nó có vị khá ngon với lớp phủ phô mai, và tôi chắc chắn sẽ quay lại chỗ này." },
    ], [1, 3, 2, 0, 4], "New Café in Town - Quán cafe mới", "Last week I went to a new opening cafe on Corner Street"),
  },
  {
    kicker: "Reading · Part 2–3",
    title: "Writing about a place/ Homework next week",
    available: true,
    correctOrder: [2, 1, 3, 4, 0],
    body: readingOrderTask(5, "Writing about a place/ Homework next week", [
      { text: "There may not be many of those, but still you will see some common areas.", translation: "Có thể không thấy nhiều điểm tương đồng nhưng chắc chắn bạn sẽ nhận thấy một số điểm chung." },
      { text: "These must include data on its people, language, and history", translation: "Bài viết phải bao gồm các thông tin như con người, ngôn ngữ và lịch sử." },
      { text: "Before starting writing, you should do research on many details of that place.", translation: "Trước khi bắt đầu viết, bạn cần nghiên cứu và tìm hiểu thêm chi tiết về địa điểm đó." },
      { text: "While giving information about three areas, you will also compare it with your own country", translation: "Khi cung cấp thông tin về 3 lĩnh vực này, bạn cũng sẽ so sánh chúng với đất nước của bạn." },
      { text: "This comparison will understand the similarities between the two countries.", translation: "Sự so sánh này có thể giúp bạn tìm ra những điểm tương đồng giữa hai quốc gia." },
    ], [2, 1, 3, 4, 0], "Writing about a place/ Homework next week - Viết về một địa điểm"),
  },
  {
    kicker: "Reading · Part 2–3",
    title: "A famous singer Jade Nobelston",
    available: true,
    correctOrder: [2, 0, 3, 1, 4],
    body: readingOrderTask(6, "A famous singer Jade Nobelston", [
      { text: "During this education, he started to perform on stage", translation: "Trong quá trình học tập, anh ấy bắt đầu biểu diễn trên sân khấu" },
      { text: "This strange ways of dressing and his songs attracted people's attention", translation: "Phong cách ăn mặc khác biệt và các bài hát của anh ấy thu hút sự chú ý của mọi người" },
      { text: "Before becoming famous at a young age, he studied art and music at high school", translation: "Trước khi trở nên nổi tiếng, anh ấy học nghệ thuật và âm nhạc ở trường phổ thông" },
      { text: "During his performances on stage, he likes to wear bright clothes and paint his face.", answerText: "During his performances on stage, he likes to wear colorful clothes and paint his face.", translation: "Khi biểu diễn trên sân khấu, anh ấy thích mặc những bộ đồ sặc sỡ và vẽ mặt" },
      { text: "They started to follow him on social media and he is now very famous", translation: "Họ bắt đầu theo dõi anh ấy trên mạng xã hội và bây giờ anh ấy nổi tiếng" },
    ], [2, 0, 3, 1, 4], "A famous singer Jade Nobelston - Ca sĩ nổi tiếng", "Jade Nobelston is a famous stage singer and performer."),
  },
  {
    kicker: "Reading · Part 2–3",
    title: "University Welcome Day",
    available: true,
    correctOrder: [0, 4, 1, 2, 3],
    body: readingOrderTask(7, "University Welcome Day", [
      { text: "The day will begin at 10 a.m. in the morning with a short presentation.", translation: "Chương trình sẽ bắt đầu lúc 10 giờ sáng, với phần thuyết trình ngắn về trường đại học." },
      { text: "These staff members will give you a guided tour in the buildings and our sport facilities in small groups", translation: "Các nhân viên sẽ dẫn bạn tham quan tòa nhà và cơ sở vật chất theo từng nhóm nhỏ" },
      { text: "During this visit, you will need to stay with these students until lunch break.", translation: "Trong buổi tham quan, các bạn sẽ ở lại tới giờ ăn trưa" },
      { text: "This meal will be provided on the second floor of the engineering building", translation: "Bữa ăn sẽ được cung cấp trên tầng 2 của tòa nhà kĩ thuật" },
      { text: "At the end of this talk, you will meet the heads of departments and teachers.", translation: "Cuối phần nói chuyện, các bạn sẽ gặp gỡ các trưởng khoa và giáo viên" },
    ], [0, 4, 1, 2, 3], "University Welcome Day - Ngày chào đón tân sinh viên", "All students will attend the welcoming day on Monday, the 19th."),
  },
  {
    kicker: "Reading · Part 2–3",
    title: "Music festivals",
    available: true,
    correctOrder: [2, 4, 1, 3, 0],
    body: readingOrderTask(8, "Music festivals", [
      { text: "He performed for two hours and everyone had great fun." },
      { text: "Many of them arrived early and visited nearby shops while they were waiting for it to begin." },
      { text: "The local authority planned, sponsored, and paid for everything.", translation: "Chính quyền địa phương đã lên kế hoạch, tài trợ và chi trả toàn bộ chi phí." },
      { text: "The staff there had a busy day, but they were able to close early and watch the famous singer perform." },
      { text: "Because it was free, more than 5,000 people attended" },
    ], [2, 4, 1, 3, 0], "Music festivals - Lễ hội âm nhạc", "Last Saturday, a live music show was held in town park", "Music festivals"),
  },
  {
    kicker: "Reading · Part 2–3",
    title: "The first American woman in space",
    available: true,
    correctOrder: [0, 1, 3, 2, 4],
    body: readingOrderTask(9, "The first American woman in space", [
      { text: "With the support from parents, Mae went to university to study Science", translation: "Với sự ủng hộ từ cha mẹ, Mae đã vào đại học để học ngành Khoa học" },
      { text: "Her degree allows her to get a seat on the training course in the USA.", translation: "Tấm bằng đại học giúp cô được nhận vào khóa huấn luyện tại Hoa Kỳ" },
      { text: "As a part of this group, she traveled in space and did a lot of experiments there", translation: "Là một phần của nhóm này, cô đã du hành vào vũ trụ và thực hiện nhiều thí nghiệm tại đó" },
      { text: "This is about space and it helps her to become a member of a research team.", translation: "Khóa học này liên quan đến không gian, và giúp cô trở thành thành viên của một nhóm nghiên cứu." },
      { text: "Some of those were about growing plants and some animals in a spaceship.", translation: "Một số thí nghiệm trong số đó liên quan đến việc trồng cây và nuôi động vật trong tàu vũ trụ." },
    ], [0, 1, 3, 2, 4], "The first American woman in space - Người phụ nữ Mỹ đầu tiên bay vào vũ trụ", "Her father was a skilled worker and her mother was a teacher"),
  },
  {
    kicker: "Reading · Part 2–3",
    title: "End of term project",
    available: true,
    correctOrder: [4, 3, 2, 1, 0],
    body: readingOrderTask(10, "End of term project", [
      { text: "After this time, other students are able to ask questions and you need to answer them", translation: "Sau phần trình bày, các bạn khác sẽ đặt câu hỏi và bạn cần trả lời chúng." },
      { text: "Your presentation offer your key points and you have around 5 minutes to talk", translation: "Bài thuyết trình cần nêu bật những điểm chính và kéo dài khoảng 5 phút." },
      { text: "Then you need to use images and written work to create a presentation", translation: "Sau đó, bạn sẽ sử dụng những hình ảnh và bài viết này để tạo một bài thuyết trình trước lớp." },
      { text: "It needs to include relevant images and your own text about the topic", translation: "Bài làm cần có hình ảnh liên quan và phần viết của chính bạn về chủ đề đó." },
      { text: "For end of term project, you need to choose at least 2 of these", translation: "Bài tập cuối kỳ bạn cần chọn ít nhất hai trong số các phần này." },
    ], [4, 3, 2, 1, 0], "End of term project - Bài tập cuối kỳ", "This semester we have studied several chapters about local history in the class"),
  },
];

const readingPart4Questions = [
  {
    kicker: "Reading · Part 4",
    title: "The music festival",
    available: true,
    questionCount: 7,
    body: readingMatchingTask(1, "The music festival", [
      { name: "James", text: "This is my first time going to a concert, and the experience was quite mixed. During the first two days, the music was rather ordinary, and the event would have been far more enjoyable if there had been just a little sunshine to brighten things up. Luckily, the last day completely changed my impression, as I finally got to see my favorite singers. Meeting them and enjoying the performances made the whole trip memorable and truly special." },
      { name: "Lisa", text: "I attend music festivals every year, and over time it has become something of a personal tradition. I really enjoy the energetic atmosphere where people come together to share music and excitement. This particular festival, however, felt quite different from what I am used to. The weather conditions were less than perfect, though it didn’t bother me that much, as I have enjoyed festivals in the rain before. The venue was moderately convenient and the performances themselves were rather unremarkable. To be honest, I doubt I will choose to come back in the future." },
      { name: "Robert", text: "I don't like one particular kinds of music being played at festivals, as I much prefer a variety of genres to enjoy and dance to. Luckily, this event truly lived up to what I was hoping for. The songs and melodies were absolutely impressive, leaving a strong impression on me. Although there was some rain, I actually felt it made the atmosphere even more vibrant and fun. One drawback, however, the cost was quite high, which many students, including me, found difficult to afford. Organizers should reconsider the price more carefully." },
      { name: "Christina", text: "My band and I went to the music festival, and we delivered the kind of performance our audience has come to expect from us. The show turned out to be truly memorable, not only because of the energy on stage but also because some of our ex-band members were present. It felt great to reconnect with them and share stories after the performance. The atmosphere overall was very positive, and the crowd seemed to enjoy every moment. The only real challenge was that the venue was located quite far from the main road, which made moving our instruments and equipment rather inconvenient." },
    ], [
      "Who was not impressed by the event overall?",
      "Who thought the event was expensive?",
      "Who is disappointed with the weather?",
      "Who likes meeting old friends?",
      "Who enjoyed the final day of the music event?",
      "Who thought the location was not good?",
      "Who enjoyed all the music at the music event?",
    ], ["Lisa", "Robert", "James", "Christina", "James", "Christina", "Robert"], [
      {
        name: "James",
        lead: "Lần đầu tiên đi xem ca nhạc (This is my first time), thời tiết (weather) và ngày cuối cùng (final day).",
        translation: "Đây là lần đầu tiên tôi đi xem hòa nhạc, và trải nghiệm này khá lẫn lộn. Trong hai ngày đầu, âm nhạc khá bình thường, và sự kiện chắc chắn sẽ thú vị hơn nhiều nếu có một chút nắng để làm mọi thứ tươi sáng hơn. May mắn thay, ngày cuối cùng đã hoàn toàn thay đổi ấn tượng của tôi, vì cuối cùng tôi cũng được gặp những ca sĩ yêu thích của mình. Gặp họ và thưởng thức những màn trình diễn đã khiến cả chuyến đi trở nên đáng nhớ và thật đặc biệt.",
        points: ["Thất vọng về thời tiết.", "Thích ngày cuối cùng của sự kiện âm nhạc."],
      },
      {
        name: "Lisa",
        lead: "Tôi tham gia (I attend music festival) lễ hội âm nhạc mà không thấy ấn tượng gì (not impressed).",
        translation: "Tôi tham dự các lễ hội âm nhạc hàng năm, và theo thời gian, điều đó đã trở thành một thói quen cá nhân của tôi. Tôi thực sự thích bầu không khí sôi động, nơi mọi người cùng nhau chia sẻ âm nhạc và sự hào hứng. Tuy nhiên, lễ hội lần này cảm thấy khác xa với những gì tôi quen thuộc. Thời tiết không mấy thuận lợi, nhưng điều đó cũng không khiến tôi bận tâm lắm, vì tôi từng tận hưởng những lễ hội dưới mưa trước đây. Địa điểm tổ chức ở mức tạm được và các màn biểu diễn thì khá bình thường. Thành thật mà nói, tôi nghi ngờ việc lựa chọn quay lại trong tương lai.",
        points: ["Không ấn tượng với toàn bộ sự kiện."],
      },
      {
        name: "Robert",
        lead: "Tôi không thích (I don't like) một thể loại âm nhạc nào mà thích tất cả (all the music), nhưng chúng đắt (expensive).",
        translation: "Tôi không thích khi tại các lễ hội chỉ phát một thể loại nhạc duy nhất, vì tôi thích có sự đa dạng về thể loại để thưởng thức và nhảy theo hơn. May mắn thay, sự kiện lần này thực sự đáp ứng đúng mong đợi của tôi. Những bài hát và giai điệu thật sự ấn tượng, để lại trong tôi một ấn tượng sâu sắc. Mặc dù có một chút mưa, nhưng tôi cảm thấy điều đó khiến bầu không khí trở nên sống động và vui vẻ hơn. Tuy nhiên, một điểm trừ là giá vé khá cao, khiến nhiều sinh viên, bao gồm cả tôi, cảm thấy khó có thể chi trả.",
        points: ["Thích tất cả các tiết mục âm nhạc tại sự kiện.", "Nghĩ rằng sự kiện này đắt đỏ."],
      },
      {
        name: "Christina",
        lead: "Ban nhạc (My band) gặp lại những người bạn cũ (ex-band members) ở cùng một địa điểm (location).",
        translation: "Ban nhạc của tôi và tôi đã được mời biểu diễn tại lễ hội này, và chúng tôi đã mang đến một màn trình diễn đúng như những gì khán giả mong đợi ở chúng tôi. Buổi biểu diễn thật sự đáng nhớ, không chỉ vì năng lượng trên sân khấu mà còn vì một số thành viên cũ và những người từng hợp tác với chúng tôi cũng có mặt. Thật tuyệt khi được gặp lại họ và cùng nhau chia sẻ những câu chuyện sau buổi diễn. Bầu không khí nhìn chung rất tích cực, và khán giả dường như đều tận hưởng từng khoảnh khắc. Thử thách duy nhất là địa điểm tổ chức nằm khá xa đường chính, khiến việc di chuyển nhạc cụ và thiết bị trở nên khá bất tiện.",
        points: ["Thích gặp lại những người bạn cũ.", "Nghĩ rằng địa điểm tổ chức không tốt."],
      },
    ]),
  },
  {
    kicker: "Reading · Part 4",
    title: "Extreme sports",
    available: true,
    questionCount: 7,
    body: readingMatchingTask(2, "Extreme sports", [
      { name: "Jose", text: "I don't usually like sports, but once I tried sea diving at the invitation of my friends. I fell in love with this sport ever since my first attempt. Extreme sports can be very dangerous; therefore, before I decided to take it up as a hobby, I made sure that I fully understood all the guidance from my expert trainers, who have years of experience. This helped me improve myself and feel more confident." },
      { name: "Marisol", text: "Some people like jumping out of aeroplanes or exploring the sea. I'm a pilot, and I have never understood why people would put themselves into such danger. I once tried an extreme sport and realised I was right from the beginning. My job is already overwhelming and involves enough risky activities. Now, I prefer something more casual, such as baseball or volleyball." },
      { name: "Sira", text: "Doing free-diving requires a lot of patience and effort to become proficient. I live far away from the sea, so it is even more difficult for me. I can only do it a few times a year, which is never enough to satisfy my passion. Once I am in the water, I feel at home. I am surrounded by various types of fish and can almost touch them." },
      { name: "Boo", text: "As a child, I used to play sports because they were part of our school curriculum. I mean, whose school isn't? However, I have never enjoyed those activities. Some students are naturally gifted, as they have strong physiques and are able to endure long running sessions; however, not everyone is the same. For me, these lessons were rather a waste of time, as I preferred staying indoors and reading books." },
    ], [
      "Who enjoy playing extreme sports after first attempt",
      "Who enjoys the nature while doing sports.",
      "Who avoid doing any sports",
      "Who think extreme sports are not necessary for them.",
      "Who think training is important before doing extreme sports.",
      "Who wishes they are able to do extreme sports more often",
      "Who prefer traditional sports",
    ], ["Jose", "Sira", "Boo", "Marisol", "Jose", "Sira", "Marisol"], [
      {
        name: "Jose",
        lead: "Tôi không thích (I don't like) nhưng sau lần đầu đã nỗ lực (first attempt), tôi chú trọng tập luyện (training).",
        translation: "Tôi không thích thể thao, nhưng một lần tôi thử lặn biển theo lời mời của người bạn. Tôi bắt đầu yêu môn thể thao mạo hiểm này ngay từ lần đầu tiên. Thể thao mạo hiểm có thể gây nguy hiểm, do vậy trước khi quyết định chọn nó như một sở thích, tôi luôn chắc chắn hiểu kĩ những hướng dẫn từ các huấn luyện viên, những người có nhiều năm kinh nghiệm. Điều này giúp tôi tiến bộ và tự tin hơn.",
        points: ["Thấy thích thể thao mạo hiểm sau khi thử chơi một lần.", "Cho rằng việc tập luyện trước khi tham gia là quan trọng."],
      },
      {
        name: "Marisol",
        lead: "Một số người thích (some people like) thể thao truyền thống (traditional sports) và thấy thể thao mạo hiểm không cần thiết (not necessary).",
        translation: "Nhiều người yêu thích việc nhảy ra khỏi những chiếc máy bay hoặc khám phá biển. Tôi là một phi công, tôi chưa từng hiểu được tại sao mọi người lại đưa bản thân mình vào nguy hiểm như vậy. Tôi cũng từng thử chơi thể thao mạo hiểm và nhận ra rằng quan điểm của tôi là đúng. Công việc của tôi vốn đã căng thẳng và đủ rủi ro rồi. Bây giờ tôi ưu tiên những hoạt động thông thường hơn như chơi bóng chày hoặc bóng chuyền.",
        points: ["Thể thao mạo hiểm là không cần thiết.", "Ưu tiên các môn truyền thống hơn."],
      },
      {
        name: "Sira",
        lead: "Lặn tự do (doing free diving) thường xuyên (often) để tận hưởng thiên nhiên (nature).",
        translation: "Lặn tự do đòi hỏi sự kiên nhẫn và nỗ lực để trở nên thành thạo. Tôi sống xa biển nên với tôi môn này càng khó khăn hơn. Tôi chỉ có thể làm nó vài lần mỗi năm, điều này chưa bao giờ đủ để thỏa mãn đam mê. Khi tôi trong làn nước, tôi cảm giác mình như ở nhà. Tôi được bao quanh bởi nhiều loại cá và gần như có thể chạm vào chúng.",
        points: ["Thích tận hưởng thiên nhiên khi chơi thể thao.", "Ước có thể chơi thể thao mạo hiểm thường xuyên hơn."],
      },
      {
        name: "Boo",
        lead: "Khi còn nhỏ (as a child), tôi né tránh (avoid) thể thao.",
        translation: "Khi còn là một đứa trẻ, tôi đã từng chơi thể thao vì chúng là một phần trong chương trình ở trường. Ý tôi là, làm gì có trường nào không dạy thể thao? Tuy nhiên tôi chưa từng thích hoạt động này. Nhiều học sinh có năng khiếu tự nhiên, họ có thể lực tốt để chịu những bài chạy bền, nhưng không phải ai cũng được như vậy. Đối với tôi, những bài học này khá mất thời gian. Tôi thích ở nhà và đọc sách hơn.",
        points: ["Né tránh chơi thể thao."],
      },
    ]),
  },
  {
    kicker: "Reading · Part 4",
    title: "Childhood activities",
    available: true,
    questionCount: 7,
    body: readingMatchingTask(3, "Childhood activities", [
      { name: "Sarah", text: "As a child, I played board games with my friends. The rules were simple, easy and straightforward to grasp, which made the games enjoyable and accessible. As I grew older, I came to believe that board games could be a wonderful way for families to bond. However, modern games have become far more complex, with numerous rules and a wide range of characters to choose from. Although I truly enjoyed playing with my two boys and we often laughed together, I found that learning how to play required quite a bit of effort." },
      { name: "William", text: "I preferred to play outdoors with my friends (peers) when I was small. Fortunately, the weather where we lived was usually pleasant, so we often spent hours running around and chasing each other on the field. At times, we would lie down on the grass and make funny faces, enjoying the carefree moments of childhood. Those memories remain incredibly precious to me and shaped my desire to be surrounded by people. Even now, I find it difficult to stay at home alone for long." },
      { name: "Sophia", text: "I wasn't able to move much as a child and even now. Instead, I was captivated by books (books are my companions) and often preferred reading in my free time. There was a library I frequently visited, where I could lose myself in different stories for hours. Nowadays, I don't read as much as I used to, but I also don't go out very often because I spend time on my computer. I especially enjoy interactive games, as they allow me to socialize and connect with people online." },
      { name: "Jack", text: "I enjoy playing outdoors. On gloomy days, which happened quite often, I would stare sadly out of the window, wishing I could be outside. There wasn't much to do indoors back then until one day my mother surprised me with a box full of art supplies. Inside were vibrant palettes, paintbrushes of different sizes, and stacks of clean paper. That was the moment I discovered another passion: painting. I could spend hours simply gazing at a blank canvas, imagining what picture I might bring to life next." },
    ], [
      "Who preferred reading books as a child?",
      "Who enjoyed doing arts as a child?",
      "Who enjoyed playing with other children in the past?",
      "Who thought traditional games were much simpler?",
      "Who enjoyed playing games with their children?",
      "Who wished they could spend more time outdoors?",
      "Who enjoyed playing modern games?",
    ], ["Sophia", "Jack", "William", "Sarah", "Sarah", "Jack", "Sophia"], [
      {
        name: "Sarah",
        lead: "Khi còn nhỏ (As a child), thấy các trò chơi đơn giản (simpler), hiện tại chơi với con (their children).",
        translation: "Khi còn nhỏ, tôi dành nhiều thời gian chơi cờ với các bạn. Quy luật trò chơi đơn giản và dễ nắm bắt khiến trò chơi thú vị và dễ chơi. Khi lớn dần tôi nhận thấy chơi cờ là cách kết nối tuyệt vời với gia đình. Tuy nhiên những trò chơi bây giờ phức tạp hơn, với nhiều quy định và đa dạng nhân vật. Mặc dù tôi rất thích chơi cùng hai con trai và chúng tôi chơi vui vẻ, nhưng tôi nhận thấy rằng cũng cần phải nỗ lực học hỏi mới có thể chơi được.",
        points: ["Thích chơi cùng các con.", "Thấy các trò chơi truyền thống đơn giản hơn nhiều."],
      },
      {
        name: "William",
        lead: "Tôi ưu tiên (I prefer) chơi với những bạn nhỏ khác (other children).",
        translation: "Tôi thích chơi ngoài trời cùng các bạn khi tôi còn nhỏ. Rất may mắn là thời tiết nơi tôi sống thường dễ chịu, vì vậy chúng tôi dành nhiều giờ chạy nhảy lòng vòng và đuổi bắt trên cánh đồng. Vào những lúc đó, chúng tôi muốn nằm dài trên bãi cỏ, làm những khuôn mặt hài hước, tận hưởng khoảnh khắc vô lo của tuổi thơ. Những kỉ niệm đó luôn là vô giá với tôi và hình thành trong tôi mong muốn được sống giữa mọi người. Ngay cả bây giờ, tôi thấy rất khó khi ở nhà một mình lâu.",
        points: ["Thích chơi với bạn bè khi còn nhỏ."],
      },
      {
        name: "Sophia",
        lead: "Tôi đã không vận động nhiều (I wasn't able to move) vì tôi thích đọc sách (books), chơi game (games).",
        translation: "Tôi đã không vận động nhiều khi còn nhỏ và đến cả bây giờ vẫn vậy. Thay vì thế, tôi bị thu hút bởi việc đọc sách khi có thời gian rảnh. Tôi thường đến một thư viện, nơi mà tôi chìm đắm vào những câu chuyện khác nhau hàng giờ. Hiện nay, tôi không còn đọc được nhiều như trước đây, nhưng tôi cũng vẫn không hay đi ra ngoài vì tôi dùng máy tính nhiều. Tôi đặc biệt thích các game tương tác vì nó giúp tôi kết nối xã hội và liên kết online với mọi người.",
        points: ["Thích đọc sách khi còn nhỏ.", "Thích chơi các game hiện đại."],
      },
      {
        name: "Jack",
        lead: "Tôi thích chơi ngoài trời (I enjoy playing outdoors) nên ước (wish) được ra ngoài nhiều và thích có nghệ thuật (art) nữa.",
        translation: "Tôi thích chơi ngoài trời. Vào những hôm thời tiết âm u, có khá nhiều ngày mưa như vậy, tôi sẽ buồn bã nhìn ra ngoài cửa sổ, mong ước mình có thể được ra ngoài. Không có nhiều thứ để làm khi ở trong nhà cho đến một ngày mẹ đưa cho tôi một hộp dụng cụ nghệ thuật. Bên trong hộp là một bảng màu sống động, cọ vẽ nhiều kích cỡ, và một xấp giấy. Đó chính là khoảnh khắc tôi tìm được một đam mê mới: vẽ tranh. Tôi có thể dành hàng giờ chỉ đơn giản là nhìn vào những tờ giấy trắng trơn và tưởng tượng xem kế tiếp mình sẽ sáng tạo bức tranh nào lên đó.",
        points: ["Thích nghệ thuật khi còn nhỏ.", "Mong ước được ra ngoài nhiều hơn."],
      },
    ]),
  },
  {
    kicker: "Reading · Part 4",
    title: "Topic: Volunteering",
    available: true,
    questionCount: 7,
    body: readingMatchingTask(4, "Volunteering", [
      { name: "Boyd", text: "I understand many young people like volunteering abroad, but honestly, I feel most people are more interested in traveling. I believe we should use our time more meaningfully. Each town has many people in need. Their situations are difficult, and they don't have the means to improve their quality of life. They are individuals who have contributed a lot to the country. Sharing stories with them helps us understand the differences between generations. We can also broaden our knowledge about local history, traditions, and culture through their experiences." },
      { name: "Chirish", text: "My mother was very involved with local charities because she is part of that organization, but I'm not into it. I prefer volunteering abroad because I can develop soft skills – something that will benefit my future career. Also, meeting new people helps me expand my network and create valuable connections I can use later in my professional life." },
      { name: "Noah", text: "I'm busy with work these days and rarely have any free time to do anything, so spending even a few hours volunteering is difficult. I would have to take half a day off work. I see many people in need and they genuinely require some extra financial support. That's something I can help with because I earn a good salary. Making monthly donations is not a problem for me; it's how I show my support and contribution." },
      { name: "Chinua", text: "I don't have many financial resources but I believe there are many ways we can show kindness through volunteering. I'm retired now, and I currently help build houses for people in need. I work with a volunteering organization that already has clear plans in place. Through this work, I've had the chance to experience different foreign cultures. We're often sent to various countries to carry out these projects, so it's also a great way to travel while doing something meaningful. The job involves physical labor, so we're able to improve our physical health something that some people only begin to notice after a while." },
    ], [
      "Who thinks volunteering enjoys physical benefits?",
      "Who thinks volunteering is a good way to make friends?",
      "Who thinks volunteering is a good reason to travel?",
      "Who thinks volunteering should help local communities?",
      "Who thinks volunteering is good for culture?",
      "Who thinks volunteering can help advance career?",
      "Who thinks volunteering can be helped by giving money?",
    ], ["Chinua", "Chirish", "Chinua", "Boyd", "Boyd", "Chirish", "Noah"], [
      {
        name: "Boyd",
        lead: "Tôi hiểu (I understand) về văn hóa (culture) cộng đồng địa phương (local community).",
        translation: "Một số người thích ra nước ngoài làm tình nguyện, nhưng thực lòng mà nói, mọi người chủ yếu thích đi du lịch là chính. Tôi cho rằng chúng ta nên sử dụng thời gian ý nghĩa hơn. Mỗi thành phố đều có nhiều người cần giúp đỡ. Hoàn cảnh của họ khó khăn, và họ không có đủ phương tiện để cải thiện cuộc sống. Họ là những cá nhân đã đóng góp nhiều cho đất nước. Chia sẻ những câu chuyện cùng họ giúp chúng ta hiểu hơn sự khác biệt giữa các thế hệ. Chúng ta cũng có thể mở rộng kiến thức về lịch sử truyền thống, văn hóa địa phương thông qua những trải nghiệm của họ.",
        points: ["Nghĩ rằng việc hỗ trợ cộng đồng địa phương là hữu ích.", "Cho rằng có thể nâng cao kiến thức về văn hóa."],
      },
      {
        name: "Chirish",
        lead: "Mẹ tôi (My mother) kết bạn (make friends) để phát triển công việc (career).",
        translation: "Mẹ tôi khuyên tôi làm tình nguyện tại địa phương bởi vì bà là một phần của cộng đồng đó, nhưng tôi lại không hứng thú. Tôi thích ra nước ngoài làm tình nguyện hơn bởi vì tôi có thể phát triển được các kĩ năng mềm, là điều rất hữu ích cho nghề nghiệp tương lai của tôi. Thêm nữa gặp gỡ những người mới giúp tôi mở rộng các mối quan hệ và tạo ra những kết nối có giá trị cho công việc của mình.",
        points: ["Muốn nâng cao sự nghiệp trong tương lai.", "Muốn kết bạn mới."],
      },
      {
        name: "Noah",
        lead: "Tôi bận rộn (busy) kiếm tiền (money).",
        translation: "Tôi quá bận rộn và hiếm khi có thời gian rảnh để làm gì, vì vậy dành ra vài giờ làm tình nguyện cũng rất khó khăn. Nếu làm tình nguyện tôi phải nghỉ làm nửa ngày. Tôi thấy nhiều người cần giúp đỡ và họ cần hỗ trợ tài chính. Đây là điều tôi có thể giúp vì tôi có mức lương tốt. Quyên góp đều đặn hàng tháng không thành vấn đề đối với tôi, nó cũng là cách tôi thể hiện sự ủng hộ và đóng góp của mình.",
        points: ["Giúp hỗ trợ công việc từ thiện bằng tiền."],
      },
      {
        name: "Chinua",
        lead: "Tôi không có nguồn lực tài chính (I don't have many financial resources) để đi du lịch (travel) và tôi chú trọng thể chất (physical benefits).",
        translation: "Tôi không có nhiều nguồn thu tài chính nhưng tôi tin rằng có nhiều cách để chúng ta thể hiện lòng tốt thông qua việc làm tình nguyện. Bây giờ tôi đã nghỉ hưu, và hiện tại tôi đang giúp xây nhà cho những người có hoàn cảnh khó khăn. Tôi làm việc với một tổ chức tình nguyện đã có sẵn các kế hoạch rõ ràng. Thông qua công việc này, tôi đã có cơ hội trải nghiệm nhiều nền văn hóa nước ngoài khác nhau. Chúng tôi thường được cử đến nhiều quốc gia để thực hiện các dự án này, vì vậy đây cũng là một cách tuyệt vời để đi du lịch trong khi làm điều ý nghĩa. Công việc này bao gồm lao động chân tay, nên chúng tôi có thể cải thiện sức khỏe thể chất, điều mà nhiều người chỉ nhận ra sau một thời gian.",
        points: ["Làm tình nguyện giúp cải thiện sức khỏe thể chất.", "Là một cách để đi du lịch."],
      },
    ]),
  },
  {
    kicker: "Reading · Part 4",
    title: "Choosing a Career",
    available: true,
    questionCount: 7,
    body: readingMatchingTask(5, "Choosing a Career", [
      { name: "Olivia", text: "When I finished school, I didn't really know what I wanted to do. Some people advised me to get a job right away. However, I preferred to gain some practical experience first. That's why I applied for many volunteering roles. Even though I didn't earn any money, I was able to try different kinds of work. Looking back, I'm happy with my decision because of the useful knowledge I gained." },
      { name: "Chirish", text: "I went straight to university after I graduated from high school. I had always wanted to become a teacher, so there was no need to look at other careers. Three months ago, I joined an internship at a local school. It was really an eye-opening experience, although the workload was heavier than I thought. Still, I believe it was very worthwhile." },
      { name: "Emma", text: "As a child, I lived near a plumber and sometimes worked with her. She asked me to do easy jobs like checking for pipe leaks or fastening the nails with a screw. So later, it felt natural for me to study at university to become an electrician. Now that I see there are short online electrical courses, I wish I had chosen that instead." },
      { name: "Grace", text: "After school, I wanted some time to figure out what I really wanted. So I started looking for temporary jobs. However, it was difficult to find one because most companies didn't accept people without experience. In the end, a game company contacted me and I agreed to work with them. The job was hybrid, so sometimes I worked in the evenings, but that was fine for me." },
    ], [
      "Who enjoyed working when training?",
      "Who think they benefited from working for free?",
      "Who thinks their training was too long?",
      "Who enjoys working in a flexible work environment?",
      "Who did not want to change to other careers?",
      "Who thinks it was hard to get the first job?",
      "Who enjoyed doing things with their hands?",
    ], ["Chirish", "Olivia", "Emma", "Grace", "Chirish", "Grace", "Emma"], [
      {
        name: "Olivia",
        lead: "Khi tôi học xong (When I finished school), tôi đi làm miễn phí (free).",
        translation: "Khi tôi học xong, tôi thật sự không biết mình muốn làm gì. Một số người khuyên tôi nên đi làm ngay. Tuy nhiên, tôi lại muốn có thêm kinh nghiệm thực tế trước đã. Đó là lý do tôi đã nộp đơn cho nhiều công việc tình nguyện khác nhau. Mặc dù không kiếm được tiền, nhưng tôi có cơ hội thử nhiều loại công việc khác nhau. Nhìn lại, tôi thấy hài lòng với quyết định của mình vì những kiến thức hữu ích mà tôi đã học được.",
        points: ["Nghĩ rằng họ đã được lợi từ việc làm không lương."],
      },
      {
        name: "Chirish",
        lead: "Tôi vào thẳng đại học (I went straight to university) vì không muốn đổi nghề (change) khác và để học việc (training).",
        translation: "Tôi đã vào thẳng đại học sau khi tốt nghiệp trung học. Tôi luôn muốn trở thành một giáo viên, nên không cần phải xem xét các nghề khác. Ba tháng trước, tôi đã tham gia một kỳ thực tập tại một trường học địa phương. Đó thực sự là một trải nghiệm mở mang tầm mắt, mặc dù khối lượng công việc nặng hơn tôi nghĩ. Tuy vậy, tôi tin rằng đó là một trải nghiệm rất đáng giá.",
        points: ["Không muốn thay đổi sang nghề nào khác.", "Thích kì tập huấn."],
      },
      {
        name: "Emma",
        lead: "Khi còn nhỏ (As a child) thích làm việc chân tay (hand) và tôi thấy học đại học quá lâu (long).",
        translation: "Khi còn nhỏ, tôi sống gần một người thợ sửa ống nước và đôi khi làm việc cùng cô ấy. Cô ấy nhờ tôi làm những việc đơn giản như kiểm tra chỗ rò rỉ của ống hoặc vặn chặt đinh vít. Vì vậy, sau này tôi cảm thấy rất tự nhiên khi học đại học để trở thành thợ điện. Bây giờ khi thấy có các khóa học điện ngắn hạn trực tuyến, tôi ước gì mình đã chọn điều đó thay vì học đại học.",
        points: ["Thích làm những việc bằng tay.", "Cho rằng khóa đào tạo của họ quá dài."],
      },
      {
        name: "Grace",
        lead: "Khi học xong (After school) rồi thích môi trường linh hoạt (flexible) nhưng khó tìm được việc (hard).",
        translation: "Sau khi học xong, tôi muốn có thời gian để xác định rõ mình thật sự muốn gì. Vì vậy, tôi bắt đầu tìm kiếm các công việc tạm thời. Tuy nhiên, rất khó để tìm được vì hầu hết các công ty không nhận người chưa có kinh nghiệm. Cuối cùng, một công ty trò chơi đã liên hệ với tôi và tôi đồng ý làm việc với họ. Công việc theo hình thức kết hợp, nên đôi khi tôi làm vào buổi tối, nhưng điều đó hoàn toàn ổn với tôi.",
        points: ["Thật khó để có được công việc đầu tiên.", "Thích làm việc trong môi trường linh hoạt."],
      },
    ]),
  },
];

const readingPart5Questions = [
  {
    kicker: "Reading · Part 5",
    title: "The Arrival of the Four-Day Work Week",
    available: true,
    questionCount: 7,
    body: readingHeadingTask(1, "The Arrival of the Four-Day Work Week", "Linh (Life) - Buộc (Benefits) - Phải (finance) - Có (Challenges) - Được (Difficult) - Phúc (People) - Sao (Solution)", [
      "For many decades, working five or even six days a week was seen as the norm. However, with modern technology, changing values, and a greater focus on work-life balance, that lifestyle is becoming less relevant. Employees and companies alike are beginning to question whether spending most of one's week at work is still necessary or productive.",
      "Supporters of the four-day work week argue that it offers numerous advantages for workers. With an extra day off, employees have more time to rest, spend with family, or pursue hobbies. Studies show that many people become more focused and productive when working fewer hours, leading to better performance and increased job satisfaction.",
      "Despite its appeal, a shorter work week can also lead to financial strain. Businesses may face higher costs due to hiring additional staff or adjusting pay structures. Some industries—especially those that rely on hourly workers—might struggle to maintain profit margins, potentially resulting in reduced services or even layoffs.",
      "Not all employees adjust easily to a new schedule. Some may find it difficult to complete the same amount of work in fewer days, which can increase pressure and stress. In fast-paced industries, unexpected challenges may arise, such as scheduling conflicts or missed deadlines, making the transition more complicated than expected.",
      "For those who have followed a traditional work schedule for years, switching to a four-day week can be uncomfortable. Old habits and routines are hard to break, and some individuals may resist change even if it's beneficial. It often takes time and support to help people adapt to a new way of working.",
      "Although the four-day week sounds ideal for many, it might not be fair to everyone. For example, essential workers, healthcare staff, or those in hospitality may not have the option to reduce their hours. This could create inequality between different groups of employees and cause tension in the workplace.",
      "Rather than applying a four-day week to all companies, experts suggest looking at flexible solutions. Some propose allowing employees to choose their working days, while others support shorter daily hours. These alternatives can offer similar benefits without disrupting businesses that rely on traditional schedules.",
    ], [
      "Unfair for some people",
      "A way of life now out of date",
      "Alternative solutions worth considering",
      "Undesirable financial consequences",
      "Difficult to give up old habits",
      "Benefits for employees",
      "Unforeseen challenges for employees",
    ], [
      "A way of life now out of date",
      "Benefits for employees",
      "Undesirable financial consequences",
      "Unforeseen challenges for employees",
      "Difficult to give up old habits",
      "Unfair for some people",
      "Alternative solutions worth considering",
    ], "Linh (Life) - Buộc (Benefits) - Phải (finance) - Có (Challenges) - Được (Difficult) - Phúc (People) - Sao (Solution)"),
  },
  {
    kicker: "Reading · Part 5",
    title: "Mountain Summits",
    available: true,
    questionCount: 7,
    body: readingHeadingTask(2, "Mountain Summits", "Mai (mountains) - Anh (achievement) - Phải (Publicizing) - Wa (wrong) - Đó (disturbing) - Sớm (sustainability) - Rối (Relationship)", [
      "Even before the nineteenth century, mountains had always exerted a powerful attraction on travelers. They captivated visitors largely because of their natural beauty and the sense of awe inspired by dramatic landscapes. For early explorers, climbing to the summit was primarily about enjoyment and wonder, rather than proving personal strength. In contrast, today the peak is no longer seen merely as a scenic viewpoint but as a highly symbolic destination. Reaching the top has increasingly come to represent success, endurance, and a once-in-a-lifetime accomplishment that many people aspire to achieve.",
      "For a large number of climbers, conquering a mountain summit embodies profound personal significance. The “summit” is often interpreted as a metaphor for success in life, a clear representation of overcoming barriers and pushing human limits. The physical obstacles encountered on the climb mirror psychological struggles, which makes the achievement deeply rewarding. Over time, mountaineering has evolved into a cultural practice where people challenge themselves for adventure, resilience, and self-affirmation. Consequently, the scenery or encounters along the trail have become secondary to the psychological triumph of standing at the very top.",
      "Mountaineering as a celebrated “achievement” has been amplified by the phenomenon of the “summit selfie.” Even in the pre-digital era, photographs at the summit were considered valuable mementos, proof of the effort invested. What began as a way to preserve memories gradually turned into an opportunity to broadcast one's success to others. The rise of social media has intensified this trend, as climbers are often more concerned with curating a perfect image than immersing themselves in the experience. In many cases, the journey itself becomes overshadowed by the simple desire to showcase the fact of having reached the summit.",
      "From this picture, critics conclude that the summit has become an end in itself, often detached from the original spirit of exploration. Many people now seem to disregard the multifaceted nature of mountaineering, treating it simply as a fashionable objective. For some, neither the genuine process of climbing nor the authentic arrival at the peak matters, as their motivation is largely external. Furthermore, the preparation that should accompany such an endeavor—rigorous physical training, budgeting, and logistical planning—is frequently underestimated. As a result, the experience risks being superficial, emphasizing prestige rather than true engagement with the mountain.",
      "The photograph captured by Thomas in 1993 exposed the unsettling reality of contemporary mountaineering. It depicted hundreds of people queuing in a single file line to reach the summit - an image that contrasts starkly with the solitude once associated with genuine exploration. The climbers' expressions reflected exhaustion and frustration rather than determination or joy, suggesting that the climb had lost its authenticity. Once published online, the image provoked widespread debate about whether the meaning of summiting had been reduced to mere spectacle. For many critics, it illustrated how the essence of mountaineering has been compromised by mass participation and social validation.",
      "One of the most urgent debates surrounding contemporary mountaineering concerns sustainability. Popular climbing destinations often suffer from waste accumulation, environmental degradation, and disrespect for local ecosystems. Many activists argue that this trend-driven approach to climbing must be reconsidered in order to preserve fragile landscapes. Responsibility, they emphasize, should be integral to every stage of the climbing journey, from preparation to leaving the site clean. Ultimately, they believe that the summit can only be considered “worthwhile” if the path toward it contributes positively to both the environment and the climber's personal growth.",
      "Perhaps the time has come to reassess our perspective on climbing and return to its more authentic roots. Instead of pursuing mountains solely for recognition, individuals could rediscover the joy of walking, observing, and slowing down. In her autobiography, Cherke described how hiking offered her moments of reflection and a deeper connection with the natural world. Such experiences remind us that mountains provide not only physical challenges but also opportunities for serenity and contemplation. By cultivating a more intimate relationship with nature, climbing may once again regain its balance between personal fulfillment and environmental respect.",
    ], [
      "A focus on sustainability",
      "A unique sense of achievement",
      "Our changing the definition of mountains",
      "Publicizing one's achievements",
      "A more intimate relationship",
      "A disturbing revelation",
      "The wrong priority",
    ], [
      "Our changing the definition of mountains",
      "A unique sense of achievement",
      "Publicizing one's achievements",
      "The wrong priority",
      "A disturbing revelation",
      "A focus on sustainability",
      "A more intimate relationship",
    ], "Mai (mountains) - Anh (achievement) - Phải (Publicizing) - Wa (wrong) - Đó (disturbing) - Sớm (sustainability) - Rối (Relationship)"),
  },
  {
    kicker: "Reading · Part 5",
    title: "Famous Female Mathematician – Emmy Noether",
    available: true,
    questionCount: 7,
    body: readingHeadingTask(3, "Famous Female Mathematician – Emmy Noether", "Ông (obscures) - Pio (pioneer) - Muốn (men) - có (career) - Lon (labels) - Bia (balance) - Uông (Uniformity)", [
      "In 2014, Maryam Mirzakhani achieved something unexpected—she won the Fields Medal, becoming the first woman ever to receive it. It was a landmark moment in the history of mathematics, yet public reaction was mixed. Much of the media attention focused more on her being a woman than on the substance of her mathematical work. Comparisons with male predecessors sometimes implied her success was less significant. This raised the question: do science and math still implicitly belong to men?",
      "Even before Maryam, women have made noteworthy contributions to mathematics. Maria Gaetana Agnesi, an 18th-century Italian scholar, was the first to author a complete calculus text and to receive a university professorship in mathematics. Her work laid foundations in algebra, calculus, and analytical methods. Agnesi's institutionally sanctioned success showed that precedent for women's excellence existed far earlier than modern discourse often acknowledges.",
      "Philippa Garrett Fawcett is another such example. In 1890, she scored highest in the Cambridge Mathematical Tripos—more than 13% above the next-highest student—but was denied the formal title of Senior Wrangler because that distinction was reserved only for men. Although she was widely praised and her result was publicly known, she did not receive the official honour. Her case illustrates how institutional practices sidelined women, even when they clearly surpassed the norms. Society applauded her, but did not grant her equal status.",
      "Mary Cartwright had a mathematical career spanning over six decades. Her work in nonlinear differential equations laid the groundwork for chaos theory, influencing both mathematics and engineering. Despite the challenges faced by women in academia during her time, she maintained a consistent output of high-quality research throughout her life.",
      "When female mathematicians are described as “women geniuses” or “female prodigies,” the gender label, while well-intended, often implies that excellence is rare among women. Such terms, though celebratory, can unintentionally reinforce the idea that women's success in mathematics is unusual, rather than simply the result of talent and hard work.",
      "Recognition from awards and institutions has only recently begun to address the imbalance. Historically, major scientific prizes were almost exclusively awarded to men. But as awareness of gender bias has grown, some institutions have introduced policies to ensure women are given fair consideration - for example by selecting women for award shortlists or imposing minimum numbers. These steps have had effects, though critics ask whether they might lead to tokenism or whether merit is being compromised. Still, many argue that without these interventions, equality cannot be realized.",
      "In efforts to level the playing field, some institutions have implemented standardized criteria for admissions or research evaluation. However, such uniform methods can sometimes ignore the diverse paths and challenges faced by individuals, particularly women balancing academic and societal expectations. A one-size-fits-all approach may not always foster true equity. Traditions of male dominance continue to influence science and education. Studies confirm that having diverse voices brings more creativity, more robust ideas, better science. When women are excluded or under-recognised, we lose potential breakthroughs. Deep-seated cultural assumptions slow change. For progress, society must act—through education, policy, and cultural change to value ability over gender.",
    ], [
      "Attempting to create a gender balance",
      "A long career showing exceptional ability",
      "Acknowledging achievement of a pioneer",
      "Gender obscures achievements",
      "Men unfairly credited",
      "Uniformity is as a disadvantage",
      "Labels can change perspective",
    ], [
      "Gender obscures achievements",
      "Acknowledging achievement of a pioneer",
      "Men unfairly credited",
      "A long career showing exceptional ability",
      "Labels can change perspective",
      "Attempting to create a gender balance",
      "Uniformity is as a disadvantage",
    ], ""),
  },
];

const getReadingQuestions = (partId) => {
  if (partId === "1") {
    return skills.Reading.parts;
  }
  if (partId === "2-3") {
    return readingPart23Questions;
  }
  if (partId === "4") {
    return readingPart4Questions;
  }
  if (partId === "5") {
    return readingPart5Questions;
  }
  return [];
};

const readingParts = [
  {
    id: "1",
    label: "Part 1",
    heading: "Reading · Part 1",
    title: "Reading Practice - Part 1",
    description: "Chọn từ phù hợp điền vào chỗ trống",
    count: 4,
  },
  {
    id: "2-3",
    label: "Part 2–3",
    heading: "Reading · Part 2–3",
    title: "Reading Practice - Part 2-3",
    description: "Sắp xếp các câu theo đúng thứ tự",
    count: 10,
  },
  {
    id: "4",
    label: "Part 4",
    heading: "Reading · Part 4",
    title: "Reading Practice - Part 4",
    description: "Đọc ý kiến 4 người và ghép người phù hợp với từng câu hỏi",
    count: 5,
  },
  {
    id: "5",
    label: "Part 5",
    heading: "Reading · Part 5",
    title: "Reading Practice - Part 5",
    description: "Ghép tiêu đề với đoạn văn",
    count: 3,
  },
];

const homeView = document.getElementById("homeView");
const practiceView = document.getElementById("practiceView");
const readingView = document.getElementById("readingView");
const writingView = document.getElementById("writingView");
const writingTopicGrid = document.getElementById("writingTopicGrid");
const practiceBackButton = document.getElementById("practiceBackButton");
const readingLandingPanel = document.getElementById("readingLandingPanel");
const readingPartPanel = document.getElementById("readingPartPanel");
const readingPartGrid = document.getElementById("readingPartGrid");
const readingPartTitle = document.getElementById("readingPartTitle");
const readingPartDescription = document.getElementById("readingPartDescription");
const readingPartCount = document.getElementById("readingPartCount");
const readingBreadcrumbPart = document.getElementById("readingBreadcrumbPart");
const readingStartBanner = document.getElementById("readingStartBanner");
const readingStartTitle = document.getElementById("readingStartTitle");
const readingStartDescription = document.getElementById("readingStartDescription");
const readingQuestionTotal = document.getElementById("readingQuestionTotal");
const readingQuestionGrid = document.getElementById("readingQuestionGrid");
const readingQuestionHeading = document.getElementById("readingQuestionHeading");
const readingQuestionPartLabel = document.getElementById("readingQuestionPartLabel");
const readingQuestionTitle = document.getElementById("readingQuestionTitle");
const readingQuestionCount = document.getElementById("readingQuestionCount");
const readingBottomLeft = document.getElementById("readingBottomLeft");
const readingCheckButton = document.getElementById("readingCheckButton");
const practiceHeading = document.getElementById("practiceHeading");
const partTabs = document.getElementById("partTabs");
const taskKicker = document.getElementById("taskKicker");
const practiceTitle = document.getElementById("practiceTitle");
const taskBody = document.getElementById("taskBody");
const timerDisplay = document.getElementById("timer");
const timerChip = timerDisplay.closest(".timer-chip");
const saveStatus = document.getElementById("saveStatus");
const progressLabel = document.getElementById("progressLabel");
const previousButton = document.getElementById("previousPart");
const nextButton = document.getElementById("nextPart");
const toast = document.getElementById("toast");
const speakingView = document.getElementById("speakingView");
const speakingTopicGrid = document.getElementById("speakingTopicGrid");
const speakingTopicCount = document.getElementById("speakingTopicCount");
const listeningView = document.getElementById("listeningView");
const listeningLandingPanel = document.getElementById("listeningLandingPanel");
const listeningListPanel = document.getElementById("listeningListPanel");
const listeningDetailPanel = document.getElementById("listeningDetailPanel");
const listeningPartGrid = document.getElementById("listeningPartGrid");
const questionGrid = document.getElementById("questionGrid");
const listeningTotalCount = document.getElementById("listeningTotalCount");
const listeningPart1Count = document.getElementById("listeningPart1Count");
const listeningPart2Count = document.getElementById("listeningPart2Count");
const listeningPart3Count = document.getElementById("listeningPart3Count");
const listeningPart4Count = document.getElementById("listeningPart4Count");
const partQuestionCount = document.getElementById("partQuestionCount");
const listeningListTitle = document.getElementById("listeningListTitle");
const listeningListDescription = document.getElementById("listeningListDescription");
const listenQuestionTitle = document.getElementById("listenQuestionTitle");
const listenDetailPartLabel = document.getElementById("listenDetailPartLabel");
const listenProgress = document.getElementById("listenProgress");
const listenPromptText = document.getElementById("listenPromptText");
const listenAudio = document.getElementById("listenAudio");
const transcriptToggle = document.getElementById("transcriptToggle");
const transcriptLabel = document.getElementById("transcriptLabel");
const transcriptContent = document.getElementById("transcriptContent");
const listenOptions = document.getElementById("listenOptions");
const listenFeedback = document.getElementById("listenFeedback");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackScore = document.getElementById("feedbackScore");
const retryQuestion = document.getElementById("retryQuestion");
const vocabularyPanel = document.getElementById("vocabularyPanel");
const vocabularyEntries = document.getElementById("vocabularyEntries");
const checkAnswerButton = document.getElementById("checkAnswer");
const previousQuestionButton = document.getElementById("previousQuestion");
const nextQuestionButton = document.getElementById("nextQuestion");
const listenPart1ExerciseCard = document.getElementById("listenPart1ExerciseCard");
const listenPart1Footer = document.getElementById("listenPart1Footer");
const listenPart2ExerciseCard = document.getElementById("listenPart2ExerciseCard");
const listenPart2Footer = document.getElementById("listenPart2Footer");
const listenPart3ExerciseCard = document.getElementById("listenPart3ExerciseCard");
const listenPart3Footer = document.getElementById("listenPart3Footer");
const listenPart4ExerciseCard = document.getElementById("listenPart4ExerciseCard");
const listenPart4Footer = document.getElementById("listenPart4Footer");
const part2Speakers = document.getElementById("part2Speakers");
const part2Feedback = document.getElementById("part2Feedback");
const part2FeedbackTitle = document.getElementById("part2FeedbackTitle");
const part2FeedbackScore = document.getElementById("part2FeedbackScore");
const part2CheckAnswerButton = document.getElementById("part2CheckAnswer");
const part2PreviousQuestionButton = document.getElementById("part2PreviousQuestion");
const part2NextQuestionButton = document.getElementById("part2NextQuestion");
const part3Prompt = document.getElementById("part3Prompt");
const part3Audio = document.getElementById("part3Audio");
const part3TranscriptToggle = document.getElementById("part3TranscriptToggle");
const part3TranscriptLabel = document.getElementById("part3TranscriptLabel");
const part3TranscriptContent = document.getElementById("part3TranscriptContent");
const part3SourceNote = document.getElementById("part3SourceNote");
const part3Statements = document.getElementById("part3Statements");
const part3Feedback = document.getElementById("part3Feedback");
const part3FeedbackTitle = document.getElementById("part3FeedbackTitle");
const part3FeedbackScore = document.getElementById("part3FeedbackScore");
const part3CheckAnswerButton = document.getElementById("part3CheckAnswer");
const part3PreviousQuestionButton = document.getElementById("part3PreviousQuestion");
const part3NextQuestionButton = document.getElementById("part3NextQuestion");
const part4Prompt = document.getElementById("part4Prompt");
const part4Audio = document.getElementById("part4Audio");
const part4DescriptionToggle = document.getElementById("part4DescriptionToggle");
const part4DescriptionLabel = document.getElementById("part4DescriptionLabel");
const part4Description = document.getElementById("part4Description");
const part4Questions = document.getElementById("part4Questions");
const part4Feedback = document.getElementById("part4Feedback");
const part4FeedbackTitle = document.getElementById("part4FeedbackTitle");
const part4FeedbackScore = document.getElementById("part4FeedbackScore");
const part4CheckAnswerButton = document.getElementById("part4CheckAnswer");
const part4PreviousQuestionButton = document.getElementById("part4PreviousQuestion");
const part4NextQuestionButton = document.getElementById("part4NextQuestion");
let activeListeningQuestion = 0;
let activeListeningPart = 1;
let selectedListeningAnswer = null;
let listeningAnswerChecked = false;

let activeSkill = null;
let activePart = 0;
let writingAnswerDrafts = [];
let secondsRemaining = 0;
let timerInterval = null;
let responseInterval = null;
let activeResponseControl = null;
let toastTimeout = null;

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
};

const stopResponseTimer = (statusText = "Đã dừng") => {
  window.clearInterval(responseInterval);
  responseInterval = null;
  if (activeResponseControl) {
    const button = activeResponseControl.querySelector("[data-response-timer]");
    const countdown = activeResponseControl.querySelector("[data-response-countdown]");
    const status = activeResponseControl.querySelector("[data-response-status]");
    const skipPreparationButton = activeResponseControl.querySelector("[data-response-skip-preparation]");
    const initialSeconds = button.dataset.responseMode === "extended"
      ? Number(button.dataset.responsePreparation)
      : Number(button.dataset.responseDuration);
    countdown.textContent = formatSpeakingCountdown(initialSeconds);
    button.disabled = false;
    button.textContent = button.dataset.responseStartLabel;
    status.textContent = statusText;
    if (skipPreparationButton) {
      skipPreparationButton.hidden = false;
    }
  }
  activeResponseControl = null;
};

const startResponseTimer = (responseButton, skipPreparation = false) => {
  stopResponseTimer();
  const control = responseButton.closest("[data-response-timer-control]");
  const countdown = control.querySelector("[data-response-countdown]");
  const status = control.querySelector("[data-response-status]");
  const skipPreparationButton = control.querySelector("[data-response-skip-preparation]");
  const isExtended = responseButton.dataset.responseMode === "extended";
  let phase = isExtended && !skipPreparation ? "preparation" : "answer";
  let remaining = phase === "preparation"
    ? Number(responseButton.dataset.responsePreparation)
    : Number(responseButton.dataset.responseDuration);
  activeResponseControl = control;
  responseButton.disabled = true;
  responseButton.textContent = phase === "preparation" ? "Đang đếm ngược..." : "Đang trả lời...";
  if (skipPreparationButton) {
    skipPreparationButton.hidden = phase !== "preparation";
  }
  status.textContent = phase === "preparation"
    ? "Đang chuẩn bị."
    : isExtended
      ? "Bỏ qua chuẩn bị. Đang trả lời cả 3 câu."
      : "Đang trả lời.";
  countdown.textContent = formatSpeakingCountdown(remaining);
  responseInterval = window.setInterval(() => {
    remaining = Math.max(remaining - 1, 0);
    countdown.textContent = formatSpeakingCountdown(remaining);
    if (remaining > 0) {
      return;
    }
    if (phase === "preparation") {
      phase = "answer";
      remaining = Number(responseButton.dataset.responseDuration);
      countdown.textContent = formatSpeakingCountdown(remaining);
      status.textContent = "Đang trả lời cả 3 câu.";
      if (skipPreparationButton) {
        skipPreparationButton.hidden = true;
      }
      return;
    }
    if (remaining === 0) {
      window.clearInterval(responseInterval);
      responseInterval = null;
      activeResponseControl = null;
      status.textContent = "Hết thời gian.";
      responseButton.textContent = "Làm lại";
      responseButton.disabled = false;
      if (skipPreparationButton) {
        skipPreparationButton.hidden = true;
      }
    }
  }, 1000);
};

const hideToast = () => {
  window.clearTimeout(toastTimeout);
  toast.classList.remove("is-visible");
};

const setReadingOrderSlot = (slot, sentenceIndex) => {
  const sentence = taskBody.querySelector(`[data-reading-sentence="${sentenceIndex}"]`);
  if (!sentence || sentence.hidden || slot.dataset.sentenceIndex !== "") {
    return false;
  }
  slot.dataset.sentenceIndex = String(sentenceIndex);
  slot.classList.add("is-filled");
  slot.querySelector(".reading-order-slot-text").textContent = sentence.querySelector(".reading-sentence-text").textContent;
  slot.setAttribute("aria-label", `Bỏ câu khỏi ô số thứ tự ${Number(slot.dataset.readingOrderSlot) + 1}`);
  sentence.hidden = true;
  sentence.classList.remove("is-selected");
  sentence.setAttribute("aria-pressed", "false");
  return true;
};

const clearReadingOrderSlot = (slot) => {
  if (slot.dataset.sentenceIndex === "") {
    return;
  }
  const sentence = taskBody.querySelector(`[data-reading-sentence="${slot.dataset.sentenceIndex}"]`);
  if (sentence) {
    sentence.hidden = false;
    sentence.disabled = false;
    sentence.classList.remove("is-selected");
    sentence.setAttribute("aria-pressed", "false");
  }
  slot.dataset.sentenceIndex = "";
  slot.classList.remove("is-filled", "is-correct", "is-incorrect", "is-drag-over");
  slot.querySelector(".reading-order-slot-text").textContent = "";
  slot.setAttribute("aria-label", `Ô thứ tự ${Number(slot.dataset.readingOrderSlot) + 1}`);
};

const stopSession = () => {
  window.clearInterval(timerInterval);
  stopResponseTimer("Sẵn sàng");
  listenAudio.pause();
  listenAudio.currentTime = 0;
  pausePart2Audio();
  pausePart3Audio();
  pausePart4Audio();
};

const startSessionTimer = (seconds) => {
  window.clearInterval(timerInterval);
  secondsRemaining = seconds;
  timerDisplay.textContent = formatTime(secondsRemaining);
  timerInterval = window.setInterval(() => {
    secondsRemaining = Math.max(0, secondsRemaining - 1);
    timerDisplay.textContent = formatTime(secondsRemaining);
    if (secondsRemaining === 0) {
      window.clearInterval(timerInterval);
      showToast("Đã hết thời gian luyện tập.");
    }
  }, 1000);
};

const renderTabs = () => {
  partTabs.innerHTML = activeSkill.parts.map((part, index) => `
    <button class="part-tab" type="button" role="tab" id="part-tab-${index}" aria-selected="${index === activePart}" aria-controls="taskBody" data-part="${index}">
      ${activeSkill.name === "Reading" ? `Câu ${index + 1}` : `${index + 1}. Part ${index + 1}`}
    </button>
  `).join("");
};

const markAnswerUnsaved = () => {
  saveStatus.textContent = "Chưa lưu";
  saveStatus.style.color = "#a77524";
  document.querySelector(".saved-dot").style.background = "#e9ab3a";
};

const bindAnswerStatus = (container) => {
  container.querySelectorAll(".answer-area, .answer-input, input[type=radio], select").forEach((field) => {
    field.addEventListener("input", markAnswerUnsaved);
    field.addEventListener("change", markAnswerUnsaved);
  });
};

const getWritingFields = () => {
  if (activePart === 0) {
    return [...taskBody.querySelectorAll(".question-card .answer-input")];
  }

  if (activePart === 1) {
    return [...taskBody.querySelectorAll(".answer-area")];
  }

  if (activePart === 2) {
    return [...taskBody.querySelectorAll(".question-card .answer-area")];
  }

  if (activePart === 3) {
    return [...taskBody.querySelectorAll(".writing-email-task .answer-area")];
  }

  return [];
};

const captureWritingAnswers = () => {
  if (activeSkill?.name !== "Writing" || !writingAnswerDrafts[activePart]) {
    return;
  }
  writingAnswerDrafts[activePart] = getWritingFields().map((field) => field.value);
};

const restoreWritingAnswers = () => {
  const savedAnswers = writingAnswerDrafts[activePart] || [];
  getWritingFields().forEach((field, index) => {
    const answer = savedAnswers[index];
    if (typeof answer === "string") {
      field.value = answer;
      field.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
};

const renderPart = () => {
  const part = activeSkill.parts[activePart];
  taskKicker.textContent = part.kicker;
  practiceTitle.textContent = part.title;
  const isReading = activeSkill.name === "Reading";
  taskBody.setAttribute("aria-labelledby", isReading ? "readingQuestionTitle" : `part-tab-${activePart}`);
  taskBody.innerHTML = part.body;
  if (activeSkill.name === "Writing") {
    restoreWritingAnswers();
  }
  progressLabel.textContent = `${activeSkill.name} · Part ${activePart + 1} / ${activeSkill.parts.length}`;
  previousButton.disabled = activePart === 0;
  if (isReading) {
    readingQuestionPartLabel.textContent = part.kicker;
    readingQuestionTitle.textContent = part.title;
    readingQuestionCount.textContent = `Câu ${activePart + 1}/${activeSkill.parts.length}`;
    previousButton.textContent = "← Câu trước";
    previousButton.style.visibility = "visible";
    nextButton.innerHTML = activePart === activeSkill.parts.length - 1
      ? "Hoàn thành <span aria-hidden=\"true\">→</span>"
      : "Tiếp theo <span aria-hidden=\"true\">→</span>";
    readingCheckButton.hidden = part.available === false;
  } else {
    previousButton.textContent = "Quay lại";
    previousButton.style.visibility = activePart === 0 ? "hidden" : "visible";
    nextButton.innerHTML = activePart === activeSkill.parts.length - 1
      ? "Hoàn thành <span aria-hidden=\"true\">✓</span>"
      : "Tiếp theo <span aria-hidden=\"true\">→</span>";
    partTabs.querySelectorAll(".part-tab").forEach((tab, index) => {
      tab.setAttribute("aria-selected", String(index === activePart));
      tab.tabIndex = index === activePart ? 0 : -1;
    });
  }
  bindAnswerStatus(taskBody);
};

const setActiveNav = (skillName = null) => {
  document.querySelectorAll(".nav-link").forEach((link) => link.classList.remove("is-active"));
  const activeLink = skillName
    ? document.querySelector(`.nav-link[data-start="${skillName}"]`)
    : document.querySelector(".nav-link[data-home]");
  activeLink?.classList.add("is-active");
};

let activeReadingPartId = "1";

const renderReadingLanding = () => {
  readingPartGrid.innerHTML = readingParts.map((part) => `
    <button class="reading-part-card" type="button" data-reading-part="${part.id}">
      <span class="reading-part-card-top">
        <span class="reading-part-label">${part.label}</span>
        <span class="reading-part-arrow" aria-hidden="true">→</span>
      </span>
      <strong class="reading-part-title">${part.title}</strong>
      <span class="reading-part-description">${part.description}</span>
      <span class="reading-part-card-bottom">${part.count} bài</span>
    </button>
  `).join("");
};

const renderWritingLanding = () => {
  writingTopicGrid.innerHTML = writingTopics.map((topic, index) => {
    const number = index + 1;
    const unavailable = topic.unavailable === true;
    return `
      <button class="writing-topic-card" type="button" data-writing-topic="${topic.id}" ${unavailable ? "disabled" : ""} aria-label="${unavailable ? `Chủ đề ${number}, tên chưa hiển thị trong video nguồn` : `${number}. ${topic.title}, 4 Part, 50 phút`}">
        <span class="writing-topic-card-top">
          <span class="writing-topic-number">${String(number).padStart(2, "0")}</span>
          <span class="writing-topic-arrow" aria-hidden="true">→</span>
        </span>
        <strong>${topic.title}</strong>
        <span class="writing-topic-meta">${unavailable ? "Chưa rõ tên nguồn" : "4 Part · 50 phút"}</span>
      </button>
    `;
  }).join("");
};

const renderSpeakingLanding = () => {
  const topics = speakingExamData.topics;
  const availableCount = topics.filter((topic) => topic.available).length;
  speakingTopicCount.textContent = `${availableCount}/${topics.length} đề có nội dung một phần · 4 Part`;
  speakingTopicGrid.innerHTML = topics.map((topic, index) => {
    const available = topic.available === true
      && speakingExamData.exams.some((exam) => exam.id === topic.id);
    return `
      <button class="writing-topic-card speaking-topic-card" type="button" data-speaking-topic="${topic.id}" ${available ? "" : "disabled"} aria-label="${available ? `Đề ${index + 1}: ${topic.title}, 4 Part` : `Đề ${index + 1}, nội dung chưa có trong video nguồn`}" >
        <span class="writing-topic-card-top">
          <span class="writing-topic-number">${String(index + 1).padStart(2, "0")}</span>
          <span class="writing-topic-arrow" aria-hidden="true">${available ? "→" : ""}</span>
        </span>
        <strong>${topic.title}</strong>
        <span class="writing-topic-meta">${available ? "4 Part · một số nội dung theo video nguồn" : "Nội dung đang được cập nhật"}</span>
        <span class="speaking-topic-start" aria-hidden="true">${available ? "Bắt đầu" : "Chưa có nội dung"}</span>
      </button>
    `;
  }).join("");
};

const startSpeaking = () => {
  hideToast();
  stopSession();
  activeSkill = null;
  homeView.classList.add("is-hidden");
  practiceView.classList.add("is-hidden");
  readingView.classList.add("is-hidden");
  listeningView.classList.add("is-hidden");
  writingView.classList.add("is-hidden");
  speakingView.classList.remove("is-hidden");
  timerChip.hidden = true;
  renderSpeakingLanding();
  setActiveNav("Speaking");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const startSpeakingTest = (topicId) => {
  const topic = speakingExamData.topics.find((item) => item.id === topicId);
  const exam = speakingExamData.exams.find((item) => item.id === topicId);
  if (!topic || !exam) {
    return;
  }
  const parts = exam.parts.map((_, index) => ({
    kicker: `Speaking · Đề ${topicId} · Part ${index + 1}`,
    title: `${speakingPartTitles[index]} · Đề ${topicId}`,
    body: renderSpeakingPartBody(exam, index),
  }));
  hideToast();
  stopSession();
  activeSkill = { ...skills.Speaking, name: "Speaking", parts, topicTitle: topic.title };
  activePart = 0;
  homeView.classList.add("is-hidden");
  readingView.classList.add("is-hidden");
  listeningView.classList.add("is-hidden");
  writingView.classList.add("is-hidden");
  speakingView.classList.add("is-hidden");
  practiceView.classList.remove("is-hidden", "is-reading-detail");
  practiceView.setAttribute("aria-labelledby", "practiceTitle");
  practiceBackButton.innerHTML = '<span aria-hidden="true">←</span> Danh sách bộ đề';
  practiceHeading.hidden = false;
  readingQuestionHeading.hidden = true;
  partTabs.hidden = false;
  readingBottomLeft.hidden = true;
  readingCheckButton.hidden = true;
  timerChip.hidden = false;
  setActiveNav("Speaking");
  saveStatus.textContent = "Chưa lưu";
  saveStatus.style.color = "";
  document.querySelector(".saved-dot").style.background = "";
  renderTabs();
  renderPart();
  startSessionTimer(skills.Speaking.duration);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const startWriting = () => {
  hideToast();
  stopSession();
  activeSkill = null;
  homeView.classList.add("is-hidden");
  practiceView.classList.add("is-hidden");
  readingView.classList.add("is-hidden");
  listeningView.classList.add("is-hidden");
  speakingView.classList.add("is-hidden");
  writingView.classList.remove("is-hidden");
  practiceView.classList.remove("is-reading-detail");
  timerChip.hidden = true;
  renderWritingLanding();
  setActiveNav("Writing");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const startWritingTopic = (topicId) => {
  const topic = writingTopics.find((item) => item.id === topicId);
  if (!topic || topic.unavailable) {
    return;
  }
  const exercise = writingSourceExercises.find((item) => item.id === topic.id);
  const parts = skills.Writing.parts.map((part, index) => ({
    ...part,
    kicker: `Writing · ${topic.title} · Part ${index + 1}`,
    title: `${part.title} · ${topic.title}`,
    body: exercise?.parts[index] ?? `
      <div class="writing-unavailable" role="status">
        <strong>Nội dung Part ${index + 1} chưa có trong video nguồn.</strong>
        <p>Không tạo đề thay thế để tránh sai khác với tài liệu gốc.</p>
      </div>
    `,
  }));
  hideToast();
  stopSession();
  activeSkill = { ...skills.Writing, parts, name: "Writing", topicId: topic.id, topicTitle: topic.title };
  activePart = 0;
  writingAnswerDrafts = Array.from({ length: skills.Writing.parts.length }, () => []);
  homeView.classList.add("is-hidden");
  readingView.classList.add("is-hidden");
  listeningView.classList.add("is-hidden");
  speakingView.classList.add("is-hidden");
  writingView.classList.add("is-hidden");
  practiceView.classList.remove("is-hidden");
  practiceView.classList.remove("is-reading-detail");
  practiceView.setAttribute("aria-labelledby", "practiceTitle");
  practiceBackButton.innerHTML = '<span aria-hidden="true">←</span> Danh sách chủ đề';
  practiceHeading.hidden = false;
  readingQuestionHeading.hidden = true;
  partTabs.hidden = false;
  readingBottomLeft.hidden = true;
  readingCheckButton.hidden = true;
  timerChip.hidden = false;
  setActiveNav("Writing");
  saveStatus.textContent = "Chưa lưu";
  saveStatus.style.color = "";
  document.querySelector(".saved-dot").style.background = "";
  renderTabs();
  renderPart();
  startSessionTimer(skills.Writing.duration);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const openReadingPart = (partId) => {
  const part = readingParts.find((item) => item.id === partId);
  if (!part) {
    return;
  }
  hideToast();
  activeReadingPartId = part.id;
  readingLandingPanel.hidden = true;
  readingPartPanel.hidden = false;
  readingBreadcrumbPart.textContent = part.label;
  readingPartTitle.textContent = part.heading;
  readingPartDescription.textContent = part.description;
  readingPartCount.textContent = `${part.count} bài`;
  const questions = getReadingQuestions(part.id);
  readingStartBanner.hidden = questions.length === 0;
  readingStartTitle.textContent = `Luyện cả ${part.label}`;
  readingStartDescription.textContent = part.id === "1"
    ? "Làm lần lượt 4 bài, bấm “Kiểm tra” để xem kết quả. Mỗi lần vào bài là một lượt làm mới."
    : part.id === "4"
      ? "Làm lần lượt 5 bài. Mỗi bài gồm 4 đoạn ý kiến và 7 câu hỏi ghép người phù hợp."
      : part.id === "5"
        ? "Làm lần lượt 3 bài. Mỗi bài gồm 7 đoạn văn cần ghép với tiêu đề phù hợp."
        : "Làm lần lượt 10 bài. Video đã gửi có nội dung chi tiết cho câu 1–5; các câu còn lại chưa có đủ dữ liệu.";
  readingQuestionTotal.textContent = `${part.count} bài`;

  if (questions.length > 0) {
    readingQuestionGrid.innerHTML = questions.map((question, index) => `
      <article class="reading-question-card">
        <span class="reading-question-label">Câu ${index + 1}</span>
        <h2>${question.title}</h2>
        <p>${question.available === false ? "Nội dung chi tiết chưa có trong video" : `${question.questionCount || 5} câu hỏi`}</p>
        ${question.available === false
          ? '<button class="primary-button" type="button" disabled>Nội dung chưa có</button>'
          : `<button class="primary-button" type="button" data-reading-question="${index}">Bắt đầu luyện <span aria-hidden="true">→</span></button>`}
      </article>
    `).join("");
    return;
  }

  readingQuestionGrid.innerHTML = `
    <div class="reading-empty-state" role="status">
      Nội dung luyện tập cho ${part.label} đang được cập nhật theo tài liệu nguồn.
    </div>
  `;
};

const startReading = () => {
  hideToast();
  stopSession();
  activeSkill = null;
  homeView.classList.add("is-hidden");
  practiceView.classList.add("is-hidden");
  writingView.classList.add("is-hidden");
  listeningView.classList.add("is-hidden");
  speakingView.classList.add("is-hidden");
  readingView.classList.remove("is-hidden");
  practiceView.classList.remove("is-reading-detail");
  readingQuestionHeading.hidden = true;
  practiceHeading.hidden = false;
  partTabs.hidden = false;
  readingBottomLeft.hidden = true;
  readingCheckButton.hidden = true;
  timerChip.hidden = true;
  renderReadingLanding();
  readingLandingPanel.hidden = false;
  readingPartPanel.hidden = true;
  setActiveNav("Reading");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const startReadingQuestion = (questionIndex) => {
  const questions = getReadingQuestions(activeReadingPartId);
  if (!Number.isInteger(questionIndex) || questionIndex < 0 || questionIndex >= questions.length) {
    return;
  }
  hideToast();
  stopSession();
  activeSkill = { ...skills.Reading, parts: questions, name: "Reading" };
  activePart = questionIndex;
  homeView.classList.add("is-hidden");
  writingView.classList.add("is-hidden");
  readingView.classList.add("is-hidden");
  listeningView.classList.add("is-hidden");
  speakingView.classList.add("is-hidden");
  practiceView.classList.remove("is-hidden");
  practiceView.classList.add("is-reading-detail");
  practiceView.setAttribute("aria-labelledby", "readingQuestionTitle");
  practiceHeading.hidden = true;
  readingQuestionHeading.hidden = false;
  partTabs.hidden = true;
  readingBottomLeft.hidden = false;
  readingCheckButton.hidden = false;
  timerChip.hidden = true;
  setActiveNav("Reading");
  renderPart();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const returnToReadingList = () => {
  hideToast();
  stopSession();
  activeSkill = null;
  practiceView.classList.add("is-hidden");
  practiceView.classList.remove("is-reading-detail");
  readingQuestionHeading.hidden = true;
  practiceHeading.hidden = false;
  partTabs.hidden = false;
  readingBottomLeft.hidden = true;
  readingCheckButton.hidden = true;
  timerChip.hidden = false;
  readingView.classList.remove("is-hidden");
  openReadingPart(activeReadingPartId);
  setActiveNav("Reading");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const renderQuestionList = () => {
  const isPart2 = activeListeningPart === 2;
  const isPart3 = activeListeningPart === 3;
  const isPart4 = activeListeningPart === 4;
  const questions = isPart2
    ? listeningPart2Questions
    : isPart3
      ? listeningPart3Questions
      : isPart4 ? listeningPart4Questions : listeningQuestions;
  listeningListTitle.textContent = `Listening · Part ${activeListeningPart}`;
  listeningListDescription.textContent = isPart2
    ? "Nghe bốn người nói và ghép mỗi người với câu mô tả phù hợp."
    : isPart3
      ? "Nghe cuộc thảo luận và chọn người nói có ý kiến phù hợp với từng nhận định."
      : isPart4
        ? "Nghe bài nói dài và chọn đáp án cho từng câu hỏi."
        : "Nghe đoạn hội thoại ngắn, chọn đáp án và kiểm tra kết quả.";
  partQuestionCount.textContent = isPart2
    ? `${questions.length} bài · audio ghi âm`
    : isPart3
      ? `${questions.length} bài · audio theo nguồn video`
      : isPart4
        ? `${questions.length} bài · ${questions.reduce((count, item) => count + item.questions.length, 0)} câu · audio theo nguồn video`
        : `${questions.length} câu · audio ghi âm + tổng hợp`;
  questionGrid.innerHTML = questions.map((question, index) => `
    <article class="list-question-card">
      <span class="question-number">${isPart2 || isPart3 || isPart4 ? `Bài ${index + 1}` : `Câu ${index + 1}`}</span>
      <h2>${question.title}</h2>
      <p>${isPart2
        ? "4 người nói · 4 đoạn audio ghi âm"
        : isPart3
          ? `${question.statements.length} nhận định · ${question.audio ? "có audio" : "không có audio trong nguồn"}`
          : isPart4
            ? `${question.questions.length} câu hỏi · ${question.audio ? "audio theo nguồn video" : "không có audio trong dự án"}`
        : `1 câu hỏi · ${question.videoDescriptionAudio
        ? "Audio tổng hợp đọc mô tả từ video"
        : question.audioSource === "recorded" ? "Audio ghi âm từ video" : "Audio tổng hợp"}`}</p>
      <button class="primary-button" type="button" data-question="${index}">Bắt đầu luyện <span aria-hidden="true">→</span></button>
    </article>
  `).join("");
};

const renderListeningLanding = () => {
  const questionCount = listeningQuestions.length;
  listeningTotalCount.textContent = `${questionCount} câu · ${listeningPart2Questions.length} bài Part 2 · ${listeningPart3Questions.length} bài Part 3 · ${listeningPart4Questions.length} bài Part 4`;
  listeningPart1Count.textContent = `${questionCount} câu hỏi`;
  listeningPart2Count.textContent = `${listeningPart2Questions.length} bài`;
  listeningPart3Count.textContent = `${listeningPart3Questions.length} bài`;
  listeningPart4Count.textContent = `${listeningPart4Questions.length} bài`;
};

const renderListeningQuestion = () => {
  const question = listeningQuestions[activeListeningQuestion];
  selectedListeningAnswer = null;
  listeningAnswerChecked = false;
  listenDetailPartLabel.textContent = "Listening · Part 1";
  listenPart1ExerciseCard.classList.remove("is-hidden");
  listenPart1Footer.classList.remove("is-hidden");
  listenPart2ExerciseCard.classList.add("is-hidden");
  listenPart2Footer.classList.add("is-hidden");
  listenPart3ExerciseCard.classList.add("is-hidden");
  listenPart3Footer.classList.add("is-hidden");
  listenPart4ExerciseCard.classList.add("is-hidden");
  listenPart4Footer.classList.add("is-hidden");
  listenQuestionTitle.textContent = question.title;
  listenPromptText.textContent = question.title;
  listenAudioSource.textContent = question.videoDescriptionAudio
    ? "Audio tổng hợp đọc mô tả từ video"
    : question.audioSource === "recorded" ? "Audio ghi âm trích từ video" : "Audio tổng hợp";
  listenProgress.textContent = `Câu ${activeListeningQuestion + 1}/${listeningQuestions.length}`;
  listenAudio.pause();
  listenAudio.src = question.audio;
  listenAudio.load();
  const transcriptParagraphs = question.transcript.map((line) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = line;
    return paragraph;
  });
  if (question.reconstructed && !question.videoDescriptionAudio) {
    const note = document.createElement("p");
    note.className = "transcript-note";
    note.textContent = question.videoDescriptionAudio
      ? "Video gốc không có audio; phần mô tả bên dưới được chép nguyên văn từ video."
      : "Lời thoại mô phỏng được biên soạn từ câu hỏi và lựa chọn trong video.";
    transcriptParagraphs.unshift(note);
  }
  transcriptContent.replaceChildren(...transcriptParagraphs);
  transcriptContent.hidden = true;
  transcriptToggle.setAttribute("aria-expanded", "false");
  transcriptLabel.textContent = "Xem mô tả";
  listenOptions.innerHTML = question.options.map((option, index) => `
    <label class="listening-option">
      <input type="radio" name="listening-answer" value="${index}" />
      <span>${option}</span>
    </label>
  `).join("");
  listenFeedback.hidden = true;
  listenFeedback.classList.remove("is-incorrect");
  vocabularyPanel.classList.add("is-hidden");
  vocabularyEntries.innerHTML = question.vocabulary.map(([word, meaning]) => `
    <div class="vocabulary-entry"><strong>${word}</strong><span>${meaning}</span></div>
  `).join("");
  checkAnswerButton.hidden = false;
  previousQuestionButton.disabled = activeListeningQuestion === 0;
  nextQuestionButton.textContent = activeListeningQuestion === listeningQuestions.length - 1
    ? "Hoàn thành →"
    : "Tiếp theo →";
};

const pausePart2Audio = () => {
  part2Speakers.querySelectorAll("audio").forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
};

const pausePart3Audio = () => {
  const audio = part3Audio.querySelector("audio");
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
};

const renderListeningPart2Question = () => {
  const question = listeningPart2Questions[activeListeningQuestion];
  pausePart2Audio();
  pausePart3Audio();
  listenDetailPartLabel.textContent = "Listening · Part 2";
  listenQuestionTitle.textContent = question.title;
  listenProgress.textContent = `Bài ${activeListeningQuestion + 1}/${listeningPart2Questions.length}`;
  listenAudio.pause();
  listenAudio.currentTime = 0;
  listenPart1ExerciseCard.classList.add("is-hidden");
  listenPart1Footer.classList.add("is-hidden");
  listenPart2ExerciseCard.classList.remove("is-hidden");
  listenPart2Footer.classList.remove("is-hidden");
  listenPart3ExerciseCard.classList.add("is-hidden");
  listenPart3Footer.classList.add("is-hidden");
  listenPart4ExerciseCard.classList.add("is-hidden");
  listenPart4Footer.classList.add("is-hidden");
  part2Feedback.hidden = true;
  part2Feedback.classList.remove("is-incorrect");
  part2CheckAnswerButton.hidden = false;
  part2PreviousQuestionButton.disabled = activeListeningQuestion === 0;
  part2NextQuestionButton.textContent = activeListeningQuestion === listeningPart2Questions.length - 1
    ? "Hoàn thành →"
    : "Bài tiếp theo →";
  part2Speakers.replaceChildren();

  question.speakers.forEach((speaker, index) => {
    const card = document.createElement("section");
    card.className = "part2-speaker-card";
    card.dataset.speakerIndex = String(index);

    const heading = document.createElement("h3");
    heading.textContent = speaker.name;
    card.append(heading);

    const audio = document.createElement("audio");
    audio.controls = true;
    audio.preload = "metadata";
    audio.src = speaker.audio;
    audio.setAttribute("aria-label", `${speaker.name} audio`);
    card.append(audio);

    if (speaker.description || speaker.transcript) {
      const details = document.createElement("details");
      details.className = "part2-transcript";
      const summary = document.createElement("summary");
      summary.textContent = "Xem mô tả";
      const descriptionContent = document.createElement("div");
      descriptionContent.className = "part2-transcript-content";
      if (speaker.description) {
        const description = document.createElement("p");
        const answerSeparator = speaker.description.indexOf("=>");
        if (answerSeparator < 0) {
          const text = document.createElement("strong");
          text.textContent = speaker.description;
          description.append(text);
        } else {
          const answerText = speaker.description.slice(answerSeparator + 2);
          const answerWhitespace = answerText.match(/^\s*/)[0];
          description.append(
            document.createTextNode(speaker.description.slice(0, answerSeparator + 2)),
            document.createTextNode(answerWhitespace),
          );
          const answer = document.createElement("strong");
          answer.textContent = answerText.trim();
          description.append(answer);
        }
        descriptionContent.append(description);
      }
      if (speaker.transcript) {
        const transcript = document.createElement("p");
        if (speaker.transcriptLead && speaker.transcript.startsWith(speaker.transcriptLead)) {
          const lead = document.createElement("strong");
          lead.textContent = speaker.transcriptLead;
          transcript.append(lead, document.createTextNode(speaker.transcript.slice(speaker.transcriptLead.length)));
        } else {
          transcript.textContent = speaker.transcript;
        }
        descriptionContent.append(transcript);
      }
      details.append(summary, descriptionContent);
      card.append(details);
    }

    const answerLabel = document.createElement("label");
    answerLabel.className = "part2-answer-label";
    answerLabel.textContent = `Ghép mô tả cho ${speaker.name}`;
    const select = document.createElement("select");
    select.className = "part2-answer-select";
    select.dataset.part2Answer = "";
    select.setAttribute("aria-label", `Chọn mô tả cho ${speaker.name}`);
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Chọn câu mô tả";
    select.append(placeholder);
    question.options.forEach((option, optionIndex) => {
      const choice = document.createElement("option");
      choice.value = String(optionIndex);
      choice.textContent = option;
      select.append(choice);
    });
    answerLabel.append(select);
    card.append(answerLabel);

    const status = document.createElement("p");
    status.className = "part2-speaker-status";
    status.dataset.part2Status = "";
    status.hidden = true;
    card.append(status);
    part2Speakers.append(card);
  });
};

const renderListeningPart3Question = () => {
  const question = listeningPart3Questions[activeListeningQuestion];
  pausePart3Audio();
  pausePart2Audio();
  listenDetailPartLabel.textContent = "Listening · Part 3";
  listenQuestionTitle.textContent = question.title;
  listenProgress.textContent = `Bài ${activeListeningQuestion + 1}/${listeningPart3Questions.length}`;
  listenAudio.pause();
  listenAudio.currentTime = 0;
  listenPart1ExerciseCard.classList.add("is-hidden");
  listenPart1Footer.classList.add("is-hidden");
  listenPart2ExerciseCard.classList.add("is-hidden");
  listenPart2Footer.classList.add("is-hidden");
  listenPart3ExerciseCard.classList.remove("is-hidden");
  listenPart3Footer.classList.remove("is-hidden");
  listenPart4ExerciseCard.classList.add("is-hidden");
  listenPart4Footer.classList.add("is-hidden");
  part3Feedback.hidden = true;
  part3Feedback.classList.remove("is-incorrect");
  part3CheckAnswerButton.hidden = false;
  part3PreviousQuestionButton.disabled = activeListeningQuestion === 0;
  part3NextQuestionButton.textContent = activeListeningQuestion === listeningPart3Questions.length - 1
    ? "Hoàn thành →"
    : "Bài tiếp theo →";

  part3Prompt.textContent = question.prompt;
  part3Audio.replaceChildren();
  if (question.audio) {
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.preload = "metadata";
    audio.src = question.audio;
    audio.setAttribute("aria-label", `Audio bài ${activeListeningQuestion + 1}`);
    audio.addEventListener("error", () => {
      showToast("Không tải được audio. Hãy thử tải lại bài.");
    });
    part3Audio.append(audio);
  } else {
    const unavailable = document.createElement("p");
    unavailable.className = "part3-no-audio";
    unavailable.textContent = question.audioNote || "No audio available";
    part3Audio.append(unavailable);
  }

  const transcriptParagraphs = question.transcript.map((line) => {
    const paragraph = document.createElement("p");
    const speakerSeparator = line.indexOf(":");
    if (speakerSeparator > 0) {
      const speaker = document.createElement("strong");
      speaker.textContent = line.slice(0, speakerSeparator + 1);
      paragraph.append(speaker, document.createTextNode(line.slice(speakerSeparator + 1)));
    } else {
      paragraph.textContent = line;
    }
    return paragraph;
  });
  if (!transcriptParagraphs.length) {
    const note = document.createElement("p");
    note.textContent = question.transcriptNote || "Mô tả chưa xuất hiện trong video đã gửi.";
    transcriptParagraphs.push(note);
  }
  part3TranscriptContent.replaceChildren(...transcriptParagraphs);
  part3TranscriptContent.hidden = true;
  part3TranscriptToggle.setAttribute("aria-expanded", "false");
  part3TranscriptLabel.textContent = "Xem mô tả";
  part3SourceNote.textContent = question.sourceNote || "";
  part3SourceNote.hidden = !question.sourceNote;

  part3Statements.replaceChildren();
  question.statements.forEach((statement, index) => {
    const card = document.createElement("section");
    card.className = "part3-statement-card";
    card.dataset.statementIndex = String(index);

    const label = document.createElement("label");
    label.className = "part3-statement-label";
    label.textContent = `${statement.number}. ${statement.text}`;

    const select = document.createElement("select");
    select.className = "part2-answer-select";
    select.dataset.part3Answer = "";
    select.setAttribute("aria-label", `Chọn người nói cho nhận định ${statement.number}`);
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "-- Chọn --";
    select.append(placeholder);
    ["Man", "Woman", "Both"].forEach((option) => {
      const choice = document.createElement("option");
      choice.value = option;
      choice.textContent = option;
      select.append(choice);
    });
    label.append(select);
    card.append(label);

    const status = document.createElement("p");
    status.className = "part3-statement-status";
    status.dataset.part3Status = "";
    status.hidden = true;
    card.append(status);
    part3Statements.append(card);
  });
};

const pausePart4Audio = () => {
  const audio = part4Audio.querySelector("audio");
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
};

const renderListeningPart4Question = () => {
  const exercise = listeningPart4Questions[activeListeningQuestion];
  pausePart2Audio();
  pausePart3Audio();
  pausePart4Audio();
  listenDetailPartLabel.textContent = "Listening · Part 4";
  listenQuestionTitle.textContent = exercise.title;
  listenProgress.textContent = `Bài ${activeListeningQuestion + 1}/${listeningPart4Questions.length}`;
  listenAudio.pause();
  listenAudio.currentTime = 0;
  listenPart1ExerciseCard.classList.add("is-hidden");
  listenPart1Footer.classList.add("is-hidden");
  listenPart2ExerciseCard.classList.add("is-hidden");
  listenPart2Footer.classList.add("is-hidden");
  listenPart3ExerciseCard.classList.add("is-hidden");
  listenPart3Footer.classList.add("is-hidden");
  listenPart4ExerciseCard.classList.remove("is-hidden");
  listenPart4Footer.classList.remove("is-hidden");
  part4Prompt.textContent = exercise.prompt;

  part4Audio.replaceChildren();
  if (exercise.audio) {
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.preload = "metadata";
    audio.src = exercise.audio;
    audio.setAttribute("aria-label", `Audio bài ${activeListeningQuestion + 1}`);
    audio.addEventListener("error", () => {
      showToast("Không tải được audio. Hãy thử tải lại bài.");
    });
    part4Audio.append(audio);
  } else {
    const unavailable = document.createElement("p");
    unavailable.className = "part4-source-note";
    unavailable.textContent = "Video nguồn không có audio để luyện nghe.";
    part4Audio.append(unavailable);
  }
  if (exercise.audioNote) {
    const audioNote = document.createElement("p");
    audioNote.className = "part4-source-note";
    audioNote.textContent = exercise.audioNote;
    part4Audio.append(audioNote);
  }

  const descriptionParagraphs = [];
  if (exercise.hideAnswerHeading !== true) {
    const answerHeading = document.createElement("p");
    const answerLabel = document.createElement("strong");
    answerLabel.textContent = "Đáp án:";
    answerHeading.append(answerLabel);
    descriptionParagraphs.push(answerHeading);
  }
  exercise.questions.forEach((question, index) => {
    const answerLine = document.createElement("p");
    const number = exercise.numberAnswers === false ? "" : `${index + 1}. `;
    if (question.answer === null) {
      answerLine.textContent = `${number}Đáp án chưa được xác nhận trong video nguồn.`;
    } else {
      answerLine.textContent = `${number}${question.descriptionAnswer || question.options[question.answer]}`;
    }
    descriptionParagraphs.push(answerLine);
  });
  if (exercise.translation) {
    const translation = document.createElement("p");
    translation.className = "part4-translation";
    translation.textContent = exercise.translation;
    descriptionParagraphs.push(translation);
  }
  if (exercise.tip) {
    const tip = document.createElement("p");
    tip.className = exercise.boldTipLabel ? "part4-tip part4-tip-source" : "part4-tip";
    if (exercise.boldTipLabel) {
      const tipLabel = document.createElement("strong");
      tipLabel.textContent = "Mẹo: ";
      tip.append(tipLabel, document.createTextNode(exercise.tip));
    } else {
      tip.textContent = `Mẹo: ${exercise.tip}`;
    }
    descriptionParagraphs.push(tip);
  }
  if (exercise.sourceNote) {
    const sourceNote = document.createElement("p");
    sourceNote.className = "transcript-note";
    sourceNote.textContent = exercise.sourceNote;
    descriptionParagraphs.push(sourceNote);
  }
  if (exercise.showTranscriptLabel) {
    const transcriptLabel = document.createElement("p");
    transcriptLabel.className = "part4-transcript-label";
    transcriptLabel.textContent = exercise.transcriptLabel || "Transcript:";
    descriptionParagraphs.push(transcriptLabel);
  }
  if (exercise.topic) {
    const topic = document.createElement("p");
    topic.className = exercise.showTranscriptLabel ? "part4-topic" : "part4-topic-spaced";
    topic.textContent = `Topic: ${exercise.topic}`;
    descriptionParagraphs.push(topic);
  }
  if (exercise.transcript) {
    exercise.transcript.forEach((paragraphText) => {
      const paragraph = document.createElement("p");
      paragraph.className = "part4-transcript-paragraph";
      paragraph.textContent = paragraphText;
      descriptionParagraphs.push(paragraph);
    });
  }
  part4Description.replaceChildren(...descriptionParagraphs);
  part4Description.hidden = true;
  part4DescriptionToggle.setAttribute("aria-expanded", "false");
  part4DescriptionLabel.textContent = "Xem mô tả";

  part4Questions.replaceChildren();
  exercise.questions.forEach((question, questionIndex) => {
    const card = document.createElement("fieldset");
    card.className = "part4-question-card";
    card.dataset.part4QuestionIndex = String(questionIndex);

    const title = document.createElement("legend");
    title.className = "part4-question-title";
    title.textContent = `${questionIndex + 1}. ${question.prompt}`;
    card.append(title);

    const options = document.createElement("div");
    options.className = "part4-options";
    if (question.options.length < 2) {
      const sourceNote = document.createElement("p");
      sourceNote.className = "part4-question-source-note";
      sourceNote.textContent = question.options.length
        ? `Lựa chọn hiển thị trong video: ${question.options[0]}. Các lựa chọn còn lại không xuất hiện đầy đủ nên chưa thể luyện câu này.`
        : "Các lựa chọn không xuất hiện đầy đủ trong video nên chưa thể luyện câu này.";
      options.append(sourceNote);
    } else {
      question.options.forEach((option, optionIndex) => {
        const label = document.createElement("label");
        label.className = "listening-option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = `part4-${activeListeningQuestion}-${questionIndex}`;
        input.value = String(optionIndex);

        const text = document.createElement("span");
        text.textContent = option;
        label.append(input, text);
        options.append(label);
      });
    }
    card.append(options);

    const status = document.createElement("p");
    status.className = "part4-question-status";
    status.dataset.part4Status = "";
    status.hidden = true;
    card.append(status);
    part4Questions.append(card);
  });

  part4Feedback.hidden = true;
  part4Feedback.classList.remove("is-incorrect");
  part4CheckAnswerButton.hidden = false;
  part4PreviousQuestionButton.disabled = activeListeningQuestion === 0;
  part4NextQuestionButton.textContent = activeListeningQuestion === listeningPart4Questions.length - 1
    ? "Hoàn thành →"
    : "Bài tiếp theo →";
};

listenAudio.addEventListener("error", () => {
  showToast("Không tải được audio. Hãy thử tải lại câu hỏi.");
});

const openListeningQuestion = (index) => {
  activeListeningPart = 1;
  pausePart2Audio();
  pausePart3Audio();
  pausePart4Audio();
  activeListeningQuestion = index;
  listeningListPanel.classList.add("is-hidden");
  listeningDetailPanel.classList.remove("is-hidden");
  renderListeningQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const openListeningPart2Question = (index) => {
  activeListeningPart = 2;
  pausePart4Audio();
  activeListeningQuestion = index;
  listeningListPanel.classList.add("is-hidden");
  listeningDetailPanel.classList.remove("is-hidden");
  renderListeningPart2Question();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const openListeningPart3Question = (index) => {
  activeListeningPart = 3;
  pausePart4Audio();
  activeListeningQuestion = index;
  listeningListPanel.classList.add("is-hidden");
  listeningDetailPanel.classList.remove("is-hidden");
  renderListeningPart3Question();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const openListeningPart4Question = (index) => {
  activeListeningPart = 4;
  activeListeningQuestion = index;
  listeningListPanel.classList.add("is-hidden");
  listeningDetailPanel.classList.remove("is-hidden");
  renderListeningPart4Question();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const showListeningList = () => {
  listenAudio.pause();
  listenAudio.currentTime = 0;
  pausePart2Audio();
  pausePart3Audio();
  pausePart4Audio();
  listeningLandingPanel.classList.add("is-hidden");
  listeningDetailPanel.classList.add("is-hidden");
  listeningListPanel.classList.remove("is-hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const showListeningLanding = () => {
  listenAudio.pause();
  listenAudio.currentTime = 0;
  pausePart2Audio();
  pausePart3Audio();
  pausePart4Audio();
  listeningLandingPanel.classList.remove("is-hidden");
  listeningListPanel.classList.add("is-hidden");
  listeningDetailPanel.classList.add("is-hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const startListening = () => {
  stopSession();
  activeSkill = null;
  homeView.classList.add("is-hidden");
  practiceView.classList.add("is-hidden");
  readingView.classList.add("is-hidden");
  writingView.classList.add("is-hidden");
  speakingView.classList.add("is-hidden");
  listeningView.classList.remove("is-hidden");
  renderListeningLanding();
  showListeningLanding();
  setActiveNav("Listening");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const checkListeningAnswer = () => {
  if (selectedListeningAnswer === null) {
    showToast("Chọn một đáp án trước khi kiểm tra.");
    return;
  }
  listeningAnswerChecked = true;
  const question = listeningQuestions[activeListeningQuestion];
  const isCorrect = selectedListeningAnswer === question.answer;
  listenOptions.querySelectorAll(".listening-option").forEach((option, index) => {
    const radio = option.querySelector("input");
    radio.disabled = true;
    if (index === question.answer) {
      option.classList.add("is-correct");
    } else if (index === selectedListeningAnswer) {
      option.classList.add("is-incorrect");
    }
  });
  feedbackTitle.textContent = isCorrect ? "✓ Chính xác!" : "Chưa chính xác";
  feedbackScore.textContent = isCorrect
    ? "Kết quả bài làm: Đúng 1/1 · Điểm 100%"
    : `Kết quả bài làm: Đúng 0/1 · Đáp án: ${question.options[question.answer]}`;
  listenFeedback.classList.toggle("is-incorrect", !isCorrect);
  listenFeedback.hidden = false;
  checkAnswerButton.hidden = true;
};

const checkListeningPart2Answer = () => {
  const selects = [...part2Speakers.querySelectorAll("[data-part2-answer]")];
  if (selects.some((select) => select.value === "")) {
    showToast("Chọn mô tả cho cả bốn người nói trước khi kiểm tra.");
    return;
  }

  const question = listeningPart2Questions[activeListeningQuestion];
  let correctCount = 0;
  question.speakers.forEach((speaker, index) => {
    const card = part2Speakers.querySelector(`[data-speaker-index="${index}"]`);
    const select = selects[index];
    const status = card.querySelector("[data-part2-status]");
    const isCorrect = Number(select.value) === speaker.answerIndex;
    if (isCorrect) {
      correctCount += 1;
    }
    select.disabled = true;
    card.classList.toggle("is-correct", isCorrect);
    card.classList.toggle("is-incorrect", !isCorrect);
    status.textContent = isCorrect
      ? "✓ Chính xác"
      : `✕ Đáp án: ${question.options[speaker.answerIndex]}`;
    status.hidden = false;
  });

  part2FeedbackTitle.textContent = correctCount === question.speakers.length
    ? "✓ Chính xác!"
    : "Đã hoàn thành";
  part2FeedbackScore.textContent = `Kết quả: Đúng ${correctCount}/${question.speakers.length}`;
  part2Feedback.classList.toggle("is-incorrect", correctCount < question.speakers.length);
  part2Feedback.hidden = false;
  part2CheckAnswerButton.hidden = true;
};

const checkListeningPart3Answer = () => {
  const selects = [...part3Statements.querySelectorAll("[data-part3-answer]")];
  if (selects.some((select) => select.value === "")) {
    showToast("Chọn người nói cho tất cả nhận định trước khi kiểm tra.");
    return;
  }

  const question = listeningPart3Questions[activeListeningQuestion];
  let correctCount = 0;
  let scoredCount = 0;
  let unverifiedCount = 0;
  question.statements.forEach((statement, index) => {
    const card = part3Statements.querySelector(`[data-statement-index="${index}"]`);
    const select = selects[index];
    const status = card.querySelector("[data-part3-status]");
    const isVerified = statement.answer !== null;
    const isCorrect = isVerified && select.value === statement.answer;
    if (isVerified) {
      scoredCount += 1;
      if (isCorrect) {
        correctCount += 1;
      }
    } else {
      unverifiedCount += 1;
    }

    select.disabled = true;
    card.classList.toggle("is-correct", isCorrect);
    card.classList.toggle("is-incorrect", isVerified && !isCorrect);
    card.classList.toggle("is-unverified", !isVerified);
    status.textContent = !isVerified
      ? "Đáp án chưa được xác nhận trong video nguồn"
      : isCorrect ? "✓ Chính xác" : `✕ Đáp án: ${statement.answer}`;
    status.hidden = false;
  });

  part3FeedbackTitle.textContent = unverifiedCount
    ? "Đã chấm các đáp án có trong nguồn"
    : correctCount === scoredCount ? "✓ Chính xác!" : "Đã hoàn thành";
  part3FeedbackScore.textContent = scoredCount
    ? `Kết quả: Đúng ${correctCount}/${scoredCount}${unverifiedCount ? ` · ${unverifiedCount} đáp án chưa có nguồn đối chiếu` : ""}`
    : "Video không hiển thị đáp án để đối chiếu cho bài này.";
  part3Feedback.classList.toggle("is-incorrect", correctCount < scoredCount);
  part3Feedback.hidden = false;
  part3CheckAnswerButton.hidden = true;
};

const checkListeningPart4Answer = () => {
  const exercise = listeningPart4Questions[activeListeningQuestion];
  const cards = [...part4Questions.querySelectorAll("[data-part4-question-index]")];
  const selectedAnswers = cards.map((card) => card.querySelector('input[type="radio"]:checked'));
  if (selectedAnswers.some((answer, index) => exercise.questions[index].options.length >= 2 && !answer)) {
    showToast("Chọn đáp án cho tất cả câu trong bài trước khi kiểm tra.");
    return;
  }

  let correctCount = 0;
  let scoredCount = 0;
  let unverifiedCount = 0;
  exercise.questions.forEach((question, questionIndex) => {
    const card = cards[questionIndex];
    const hasEnoughOptions = question.options.length >= 2;
    const selected = selectedAnswers[questionIndex] ? Number(selectedAnswers[questionIndex].value) : null;
    const status = card.querySelector("[data-part4-status]");
    const isVerified = question.answer !== null && hasEnoughOptions;
    const isCorrect = isVerified && selected === question.answer;
    if (isVerified) {
      scoredCount += 1;
      if (isCorrect) {
        correctCount += 1;
      }
    } else {
      unverifiedCount += 1;
    }

    card.querySelectorAll(".listening-option").forEach((option, optionIndex) => {
      const input = option.querySelector("input");
      input.disabled = true;
      if (isVerified && optionIndex === question.answer) {
        option.classList.add("is-correct");
      } else if (isVerified && optionIndex === selected) {
        option.classList.add("is-incorrect");
      }
    });
    card.classList.toggle("is-correct", isCorrect);
    card.classList.toggle("is-incorrect", isVerified && !isCorrect);
    card.classList.toggle("is-unverified", !isVerified);
    status.textContent = !isVerified
      ? hasEnoughOptions
        ? "Đáp án chưa được xác nhận trong video nguồn."
        : "Chưa thể chấm: video nguồn không hiển thị đủ lựa chọn."
      : isCorrect ? "✓ Chính xác" : `✕ Đáp án: ${question.options[question.answer]}`;
    status.hidden = false;
  });

  part4FeedbackTitle.textContent = unverifiedCount
    ? "Đã chấm các đáp án có trong nguồn"
    : correctCount === scoredCount ? "✓ Chính xác!" : "Đã hoàn thành";
  part4FeedbackScore.textContent = scoredCount
    ? `Kết quả: Đúng ${correctCount}/${scoredCount}${unverifiedCount ? ` · ${unverifiedCount} đáp án chưa có nguồn đối chiếu` : ""}`
    : "Video không hiển thị đáp án để đối chiếu cho bài này.";
  part4Feedback.classList.toggle("is-incorrect", correctCount < scoredCount);
  part4Feedback.hidden = false;
  part4CheckAnswerButton.hidden = true;
};

const startPractice = (skillName) => {
  if (skillName === "Listening") {
    startListening();
    return;
  }
  if (skillName === "Reading") {
    startReading();
    return;
  }
  if (skillName === "Writing") {
    startWriting();
    return;
  }
  if (skillName === "Speaking") {
    startSpeaking();
    return;
  }
  const skill = skills[skillName];
  if (!skill) {
    return;
  }
  stopSession();
  activeSkill = { ...skill, name: skillName };
  activePart = 0;
  homeView.classList.add("is-hidden");
  readingView.classList.add("is-hidden");
  writingView.classList.add("is-hidden");
  listeningView.classList.add("is-hidden");
  speakingView.classList.add("is-hidden");
  practiceView.classList.remove("is-hidden");
  practiceView.classList.remove("is-reading-detail");
  practiceView.setAttribute("aria-labelledby", "practiceTitle");
  practiceBackButton.innerHTML = '<span aria-hidden="true">←</span> Trang chủ';
  readingQuestionHeading.hidden = true;
  practiceHeading.hidden = false;
  partTabs.hidden = false;
  readingBottomLeft.hidden = true;
  readingCheckButton.hidden = true;
  setActiveNav(skillName);
  saveStatus.textContent = "Chưa lưu";
  saveStatus.style.color = "";
  document.querySelector(".saved-dot").style.background = "";
  timerChip.hidden = false;
  renderTabs();
  renderPart();
  if (skill.duration) {
    startSessionTimer(skill.duration);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const returnHome = () => {
  stopSession();
  activeSkill = null;
  practiceView.classList.add("is-hidden");
  listeningView.classList.add("is-hidden");
  readingView.classList.add("is-hidden");
  writingView.classList.add("is-hidden");
  speakingView.classList.add("is-hidden");
  practiceBackButton.innerHTML = '<span aria-hidden="true">←</span> Trang chủ';
  practiceView.classList.remove("is-reading-detail");
  practiceView.setAttribute("aria-labelledby", "practiceTitle");
  readingQuestionHeading.hidden = true;
  practiceHeading.hidden = false;
  partTabs.hidden = false;
  readingBottomLeft.hidden = true;
  readingCheckButton.hidden = true;
  timerChip.hidden = false;
  homeView.classList.remove("is-hidden");
  setActiveNav();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

document.querySelectorAll("[data-start]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    startPractice(button.dataset.start);
  });
});

readingView.addEventListener("click", (event) => {
  const partButton = event.target.closest("[data-reading-part]");
  if (partButton) {
    openReadingPart(partButton.dataset.readingPart);
    return;
  }
  if (event.target.closest("[data-reading-overview]")) {
    readingPartPanel.hidden = true;
    readingLandingPanel.hidden = false;
    return;
  }
  if (event.target.closest("[data-reading-start-first]")) {
    startReadingQuestion(0);
    return;
  }
  const questionButton = event.target.closest("[data-reading-question]");
  if (questionButton) {
    startReadingQuestion(Number(questionButton.dataset.readingQuestion));
  }
});

writingView.addEventListener("click", (event) => {
  const topicButton = event.target.closest("[data-writing-topic]");
  if (topicButton && !topicButton.disabled) {
    startWritingTopic(topicButton.dataset.writingTopic);
  }
});

speakingView.addEventListener("click", (event) => {
  const topicButton = event.target.closest("[data-speaking-topic]");
  if (topicButton && !topicButton.disabled) {
    startSpeakingTest(topicButton.dataset.speakingTopic);
  }
});

practiceView.addEventListener("click", (event) => {
  if (event.target.closest("[data-reading-list]")) {
    returnToReadingList();
  }
});

document.querySelectorAll("[data-home]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (link.id === "practiceBackButton" && activeSkill?.name === "Writing") {
      startWriting();
      return;
    }
    if (link.id === "practiceBackButton" && activeSkill?.name === "Speaking") {
      startSpeaking();
      return;
    }
    returnHome();
  });
});

document.querySelectorAll("[data-guide]").forEach((button) => {
  button.addEventListener("click", () => {
    if (activeSkill || !listeningView.classList.contains("is-hidden")) {
      returnHome();
      window.setTimeout(() => document.getElementById("overview").scrollIntoView({ behavior: "smooth" }), 0);
      return;
    }
    document.getElementById("overview").scrollIntoView({ behavior: "smooth" });
  });
});

questionGrid.addEventListener("click", (event) => {
  const startButton = event.target.closest("[data-question]");
  if (startButton) {
    if (activeListeningPart === 2) {
      openListeningPart2Question(Number(startButton.dataset.question));
    } else if (activeListeningPart === 3) {
      openListeningPart3Question(Number(startButton.dataset.question));
    } else if (activeListeningPart === 4) {
      openListeningPart4Question(Number(startButton.dataset.question));
    } else {
      openListeningQuestion(Number(startButton.dataset.question));
    }
  }
});

document.getElementById("detailBack").addEventListener("click", showListeningList);
document.getElementById("questionListButton").addEventListener("click", showListeningList);
document.getElementById("partListBack").addEventListener("click", showListeningLanding);

listeningPartGrid.addEventListener("click", (event) => {
  const partCard = event.target.closest("[data-listening-part]");
  if (!partCard) {
    return;
  }
  const partNumber = Number(partCard.dataset.listeningPart);
  if (partNumber === 1) {
    activeListeningPart = 1;
    renderQuestionList();
    showListeningList();
    return;
  }
  if (partNumber === 2) {
    activeListeningPart = 2;
    renderQuestionList();
    showListeningList();
    return;
  }
  if (partNumber === 3) {
    activeListeningPart = 3;
    renderQuestionList();
    showListeningList();
    return;
  }
  if (partNumber === 4) {
    activeListeningPart = 4;
    renderQuestionList();
    showListeningList();
    return;
  }
  showToast(`Listening Part ${partNumber} đang được cập nhật.`);
});

listenOptions.addEventListener("change", (event) => {
  if (event.target.matches('input[name="listening-answer"]') && !listeningAnswerChecked) {
    selectedListeningAnswer = Number(event.target.value);
  }
});

transcriptToggle.addEventListener("click", () => {
  const expanded = transcriptToggle.getAttribute("aria-expanded") !== "true";
  transcriptToggle.setAttribute("aria-expanded", String(expanded));
  transcriptContent.hidden = !expanded;
  transcriptLabel.textContent = expanded ? "Ẩn mô tả" : "Xem mô tả";
});

checkAnswerButton.addEventListener("click", checkListeningAnswer);

retryQuestion.addEventListener("click", renderListeningQuestion);

previousQuestionButton.addEventListener("click", () => {
  if (activeListeningQuestion > 0) {
    openListeningQuestion(activeListeningQuestion - 1);
  }
});

nextQuestionButton.addEventListener("click", () => {
  if (activeListeningQuestion < listeningQuestions.length - 1) {
    openListeningQuestion(activeListeningQuestion + 1);
    return;
  }
  showListeningList();
  showToast(`Bạn đã hoàn thành ${listeningQuestions.length} câu Listening!`);
});

document.getElementById("part2QuestionListButton").addEventListener("click", showListeningList);
part2CheckAnswerButton.addEventListener("click", checkListeningPart2Answer);
document.getElementById("part3QuestionListButton").addEventListener("click", showListeningList);
part3CheckAnswerButton.addEventListener("click", checkListeningPart3Answer);
document.getElementById("part4QuestionListButton").addEventListener("click", showListeningList);
part4CheckAnswerButton.addEventListener("click", checkListeningPart4Answer);

part2PreviousQuestionButton.addEventListener("click", () => {
  if (activeListeningQuestion > 0) {
    openListeningPart2Question(activeListeningQuestion - 1);
  }
});

part2NextQuestionButton.addEventListener("click", () => {
  if (activeListeningQuestion < listeningPart2Questions.length - 1) {
    openListeningPart2Question(activeListeningQuestion + 1);
    return;
  }
  showListeningList();
  showToast(`Bạn đã hoàn thành ${listeningPart2Questions.length} bài Listening Part 2!`);
});

part3TranscriptToggle.addEventListener("click", () => {
  const expanded = part3TranscriptToggle.getAttribute("aria-expanded") !== "true";
  part3TranscriptToggle.setAttribute("aria-expanded", String(expanded));
  part3TranscriptContent.hidden = !expanded;
  part3TranscriptLabel.textContent = expanded ? "Ẩn mô tả" : "Xem mô tả";
});

part3PreviousQuestionButton.addEventListener("click", () => {
  if (activeListeningQuestion > 0) {
    openListeningPart3Question(activeListeningQuestion - 1);
  }
});

part3NextQuestionButton.addEventListener("click", () => {
  if (activeListeningQuestion < listeningPart3Questions.length - 1) {
    openListeningPart3Question(activeListeningQuestion + 1);
    return;
  }
  showListeningList();
  showToast(`Bạn đã hoàn thành ${listeningPart3Questions.length} bài Listening Part 3!`);
});

part4DescriptionToggle.addEventListener("click", () => {
  const expanded = part4DescriptionToggle.getAttribute("aria-expanded") !== "true";
  part4DescriptionToggle.setAttribute("aria-expanded", String(expanded));
  part4Description.hidden = !expanded;
  part4DescriptionLabel.textContent = expanded ? "Ẩn mô tả" : "Xem mô tả";
});

part4PreviousQuestionButton.addEventListener("click", () => {
  if (activeListeningQuestion > 0) {
    openListeningPart4Question(activeListeningQuestion - 1);
  }
});

part4NextQuestionButton.addEventListener("click", () => {
  if (activeListeningQuestion < listeningPart4Questions.length - 1) {
    openListeningPart4Question(activeListeningQuestion + 1);
    return;
  }
  showListeningList();
  showToast(`Bạn đã hoàn thành ${listeningPart4Questions.length} bài Listening Part 4!`);
});

document.getElementById("part4RetryQuestion").addEventListener("click", renderListeningPart4Question);

document.getElementById("vocabularyButton").addEventListener("click", () => {
  const isHidden = vocabularyPanel.classList.toggle("is-hidden");
  document.getElementById("vocabularyButton").setAttribute("aria-expanded", String(!isHidden));
});

document.querySelectorAll("[data-toast]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showToast(link.dataset.toast);
  });
});

partTabs.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-part]");
  if (!tab || !activeSkill) {
    return;
  }
  if (activeSkill.name === "Writing") {
    captureWritingAnswers();
  }
  activePart = Number(tab.dataset.part);
  stopResponseTimer();
  renderPart();
});

previousButton.addEventListener("click", () => {
  if (!activeSkill) {
    return;
  }
  if (activePart > 0) {
    if (activeSkill.name === "Writing") {
      captureWritingAnswers();
    }
    activePart -= 1;
    stopResponseTimer();
    renderPart();
  }
});

nextButton.addEventListener("click", () => {
  if (!activeSkill) {
    return;
  }
  if (activePart < activeSkill.parts.length - 1) {
    if (activeSkill.name === "Writing") {
      captureWritingAnswers();
    }
    activePart += 1;
    stopResponseTimer();
    renderPart();
    return;
  }
  if (activeSkill.name === "Reading") {
    returnToReadingList();
    return;
  }
  if (activeSkill.name === "Speaking") {
    startSpeaking();
    showToast("Bạn đã hoàn thành bộ đề Speaking!");
    return;
  }
  stopSession();
  showToast("Bạn đã hoàn thành lượt luyện tập!");
  returnHome();
});

practiceView.addEventListener("click", (event) => {
  const readingSentence = event.target.closest("[data-reading-sentence]");
  if (readingSentence && taskBody.contains(readingSentence)) {
    const selectedSentence = taskBody.querySelector(".reading-sentence-option.is-selected");
    if (selectedSentence && selectedSentence !== readingSentence) {
      selectedSentence.classList.remove("is-selected");
      selectedSentence.setAttribute("aria-pressed", "false");
    }
    const isSelected = readingSentence.classList.toggle("is-selected");
    readingSentence.setAttribute("aria-pressed", String(isSelected));
    hideToast();
    return;
  }

  const readingOrderSlot = event.target.closest("[data-reading-order-slot]");
  if (readingOrderSlot && taskBody.contains(readingOrderSlot)) {
    if (readingOrderSlot.dataset.sentenceIndex !== "") {
      clearReadingOrderSlot(readingOrderSlot);
      hideToast();
      return;
    }
    const selectedSentence = taskBody.querySelector(".reading-sentence-option.is-selected");
    if (!selectedSentence) {
      showToast("Chọn một câu ở cột bên phải trước.");
      return;
    }
    setReadingOrderSlot(readingOrderSlot, selectedSentence.dataset.readingSentence);
    hideToast();
    return;
  }

  const checkButton = event.target.closest("[data-reading-check]");
  if (checkButton) {
    const headings = [...taskBody.querySelectorAll("[data-reading-heading]")];
    if (headings.length > 0) {
      hideToast();
      const correctCount = headings.reduce((count, heading) => {
        const isCorrect = heading.value === heading.dataset.answer;
        const question = heading.closest(".reading-heading-question");
        const feedback = question.querySelector("[data-reading-heading-feedback]");
        heading.classList.toggle("is-correct", isCorrect);
        heading.classList.toggle("is-incorrect", !isCorrect);
        heading.disabled = true;
        question.classList.toggle("is-correct", isCorrect);
        question.classList.toggle("is-incorrect", !isCorrect);
        feedback.textContent = isCorrect ? "Correct." : `Incorrect. Answer: ${heading.dataset.answer}`;
        feedback.hidden = false;
        return count + Number(isCorrect);
      }, 0);
      const result = taskBody.querySelector("[data-reading-result]");
      result.classList.toggle("is-correct", correctCount === headings.length);
      result.classList.toggle("is-incorrect", correctCount !== headings.length);
      taskBody.querySelector("[data-reading-score]").textContent =
        `Đúng: ${correctCount}/${headings.length} · Điểm: ${Math.round((correctCount / headings.length) * 100)}%`;
      const feedback = taskBody.querySelector("[data-reading-feedback]");
      feedback.hidden = false;
      checkButton.hidden = true;
      window.setTimeout(() => {
        const feedbackTop = feedback.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo(0, Math.max(0, feedbackTop));
      }, 0);
      return;
    }

    const matches = [...taskBody.querySelectorAll("[data-reading-match]")];
    if (matches.length > 0) {
      hideToast();
      const correctCount = matches.reduce((count, match) => {
        const isCorrect = match.value === match.dataset.answer;
        const question = match.closest(".reading-matching-question");
        const feedback = question.querySelector("[data-reading-match-feedback]");
        match.classList.toggle("is-correct", isCorrect);
        match.classList.toggle("is-incorrect", !isCorrect);
        match.disabled = true;
        question.classList.toggle("is-correct", isCorrect);
        question.classList.toggle("is-incorrect", !isCorrect);
        feedback.textContent = isCorrect ? "Correct." : `Incorrect. Answer: ${match.dataset.answer}`;
        feedback.hidden = false;
        return count + Number(isCorrect);
      }, 0);
      const result = taskBody.querySelector("[data-reading-result]");
      result.classList.toggle("is-correct", correctCount === matches.length);
      result.classList.toggle("is-incorrect", correctCount !== matches.length);
      taskBody.querySelector("[data-reading-score]").textContent =
        `Đúng: ${correctCount}/${matches.length} · Điểm: ${Math.round((correctCount / matches.length) * 100)}%`;
      const feedback = taskBody.querySelector("[data-reading-feedback]");
      feedback.hidden = false;
      checkButton.hidden = true;
      window.setTimeout(() => {
        const feedbackTop = feedback.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo(0, Math.max(0, feedbackTop));
      }, 0);
      return;
    }

    if (taskBody.querySelector("[data-reading-order]")) {
      const slots = [...taskBody.querySelectorAll("[data-reading-order-slot]")];
      if (slots.some((slot) => slot.dataset.sentenceIndex === "")) {
        showToast("Đặt đủ 5 câu vào ô thứ tự trước khi kiểm tra.");
        return;
      }

      const correctOrder = activeSkill.parts[activePart].correctOrder;
      const correctCount = slots.reduce((count, slot, index) => {
        const isCorrect = Number(slot.dataset.sentenceIndex) === correctOrder[index];
        slot.classList.toggle("is-correct", isCorrect);
        slot.classList.toggle("is-incorrect", !isCorrect);
        slot.disabled = true;
        return count + Number(isCorrect);
      }, 0);
      taskBody.querySelectorAll("[data-reading-sentence]").forEach((sentence) => {
        sentence.disabled = true;
      });
      const result = taskBody.querySelector("[data-reading-result]");
      result.classList.toggle("is-correct", correctCount === slots.length);
      result.classList.toggle("is-incorrect", correctCount !== slots.length);
      taskBody.querySelector("[data-reading-score]").textContent =
        `Đúng ${correctCount}/${slots.length} · Điểm ${Math.round((correctCount / slots.length) * 100)}%`;
      taskBody.querySelector("[data-reading-feedback]").hidden = false;
      checkButton.hidden = true;
      hideToast();
      return;
    }

    const gaps = [...taskBody.querySelectorAll("[data-reading-gap]")];
    if (gaps.some((gap) => !gap.value)) {
      showToast("Chọn đáp án cho cả 5 chỗ trống trước khi kiểm tra.");
      return;
    }

    hideToast();
    const correctCount = gaps.reduce((count, gap) => {
      const isCorrect = gap.value === gap.dataset.answer;
      gap.classList.toggle("is-correct", isCorrect);
      gap.classList.toggle("is-incorrect", !isCorrect);
      gap.disabled = true;
      return count + Number(isCorrect);
    }, 0);
    const result = taskBody.querySelector("[data-reading-result]");
    result.classList.toggle("is-correct", correctCount === gaps.length);
    result.classList.toggle("is-incorrect", correctCount !== gaps.length);
    taskBody.querySelector("[data-reading-score]").textContent =
      `Đúng ${correctCount}/${gaps.length} · Điểm ${Math.round((correctCount / gaps.length) * 100)}%`;
    taskBody.querySelector("[data-reading-feedback]").hidden = false;
    checkButton.hidden = true;
    return;
  }

  const readingRetryButton = event.target.closest("[data-reading-retry]");
  if (readingRetryButton) {
    taskBody.querySelectorAll("[data-reading-order-slot]").forEach((slot) => {
      slot.disabled = false;
      clearReadingOrderSlot(slot);
    });
    taskBody.querySelectorAll("[data-reading-sentence]").forEach((sentence) => {
      sentence.hidden = false;
      sentence.disabled = false;
      sentence.classList.remove("is-selected");
      sentence.setAttribute("aria-pressed", "false");
    });
    taskBody.querySelectorAll("[data-reading-gap]").forEach((gap) => {
      gap.value = "";
      gap.disabled = false;
      gap.classList.remove("is-correct", "is-incorrect");
    });
    taskBody.querySelectorAll("[data-reading-heading]").forEach((heading) => {
      heading.value = "";
      heading.disabled = false;
      heading.classList.remove("is-correct", "is-incorrect");
      const question = heading.closest(".reading-heading-question");
      question.classList.remove("is-correct", "is-incorrect");
      question.querySelector("[data-reading-heading-feedback]").hidden = true;
    });
    taskBody.querySelectorAll("[data-reading-match]").forEach((match) => {
      match.value = "";
      match.disabled = false;
      match.classList.remove("is-correct", "is-incorrect");
      const question = match.closest(".reading-matching-question");
      question.classList.remove("is-correct", "is-incorrect");
      question.querySelector("[data-reading-match-feedback]").hidden = true;
    });
    taskBody.querySelector("[data-reading-result]").classList.remove("is-correct", "is-incorrect");
    taskBody.querySelector("[data-reading-feedback]").hidden = true;
    readingCheckButton.hidden = activeSkill.parts[activePart].available === false;
    return;
  }

  const skipPreparationButton = event.target.closest("[data-response-skip-preparation]");
  if (skipPreparationButton && !skipPreparationButton.hidden) {
    const responseButton = skipPreparationButton
      .closest("[data-response-timer-control]")
      .querySelector("[data-response-timer]");
    startResponseTimer(responseButton, true);
    return;
  }

  const responseButton = event.target.closest("[data-response-timer]");
  if (responseButton) {
    startResponseTimer(responseButton);
  }

});

taskBody.addEventListener("dragstart", (event) => {
  const sentence = event.target.closest("[data-reading-sentence]");
  if (!sentence || sentence.hidden || sentence.disabled) {
    return;
  }
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", sentence.dataset.readingSentence);
});

taskBody.addEventListener("dragover", (event) => {
  const slot = event.target.closest("[data-reading-order-slot]");
  if (slot && !slot.disabled) {
    event.preventDefault();
    slot.classList.add("is-drag-over");
  }
});

taskBody.addEventListener("dragleave", (event) => {
  const slot = event.target.closest("[data-reading-order-slot]");
  if (slot) {
    slot.classList.remove("is-drag-over");
  }
});

taskBody.addEventListener("drop", (event) => {
  const slot = event.target.closest("[data-reading-order-slot]");
  if (!slot || slot.disabled) {
    return;
  }
  event.preventDefault();
  slot.classList.remove("is-drag-over");
  const sentenceIndex = event.dataTransfer.getData("text/plain");
  if (sentenceIndex) {
    setReadingOrderSlot(slot, sentenceIndex);
  }
});

taskBody.addEventListener("input", (event) => {
  if (event.target.matches("textarea, .answer-input")) {
    const counter = event.target.closest(".question-card, .writing-email-task")?.querySelector(".word-count");
    if (counter) {
      const count = event.target.value.trim().split(/\s+/).filter(Boolean).length;
      counter.textContent = `${count} ${count === 1 ? "word" : "words"}`;
    }
  }
});
