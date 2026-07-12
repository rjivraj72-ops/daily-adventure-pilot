const storageKey = "dailyAdventurePilot";
const totalRounds = 8;

const starterQuestionBank = [
  { id: "memory-bathroom-pair", skill: "Memory", title: "Find the pair", prompt: "Match two things that go together.", question: "Toothbrush goes with...", answer: "Toothpaste", tags: ["Daily Routine"] },
  { id: "memory-food-pair", skill: "Memory", title: "Find the pair", prompt: "Match two things that go together.", question: "Bread goes with...", answer: "Butter", tags: ["Food"] },
  { id: "memory-travel-pair", skill: "Memory", title: "Travel pair", prompt: "Match two things used on a trip.", question: "Passport goes with...", answer: "Suitcase", tags: ["Travel"] },
  { id: "memory-exercise-pair", skill: "Memory", title: "Exercise pair", prompt: "Match two things used for movement.", question: "Running shoes go with...", answer: "Socks", tags: ["Exercise"] },

  { id: "money-change-5-3", skill: "Money Math", title: "Customer change", prompt: "A snack is $3. You pay $5. How much change?", question: "$5 minus $3", answer: "$2", tags: ["Food", "Business"] },
  { id: "money-two-items", skill: "Money Math", title: "Add the total", prompt: "A drink is $2 and a bar is $3.", question: "How much altogether?", answer: "$5", tags: ["Food", "Business"] },
  { id: "money-travel-ticket", skill: "Money Math", title: "Travel ticket", prompt: "A bus ticket is $4. You have $10.", question: "How much money is left?", answer: "$6", tags: ["Travel"] },
  { id: "money-exercise-water", skill: "Money Math", title: "After workout", prompt: "Water is $2. A snack is $4.", question: "What is the total?", answer: "$6", tags: ["Exercise", "Food"] },

  { id: "talk-today-plan", skill: "Talk Time", title: "Use a sentence", prompt: "Answer with I or my.", question: "What is one thing you want to do today?", answer: "Open response", tags: ["Daily Routine"] },
  { id: "talk-feeling", skill: "Talk Time", title: "Share a feeling", prompt: "Answer in one full sentence.", question: "How are you feeling today?", answer: "Open response", tags: ["Family"] },
  { id: "talk-travel-memory", skill: "Talk Time", title: "Travel memory", prompt: "Answer with who, what, and where.", question: "Tell me about a place you liked visiting.", answer: "Open response", tags: ["Travel"] },
  { id: "talk-exercise-favorite", skill: "Talk Time", title: "Exercise talk", prompt: "Answer with what and why.", question: "What exercise do you like best?", answer: "Open response", tags: ["Exercise"] },
  { id: "talk-music-choice", skill: "Talk Time", title: "Music talk", prompt: "Answer with what and why.", question: "What song or artist do you want to hear today?", answer: "Open response", tags: ["Music"] },

  { id: "family-mom-child", skill: "Family Words", title: "Family practice", prompt: "Think about family relationships.", question: "Your mom's child is her...", answer: "Son or daughter", tags: ["Family"] },
  { id: "family-dad-child", skill: "Family Words", title: "Family practice", prompt: "Think about family relationships.", question: "Your dad's child is his...", answer: "Son or daughter", tags: ["Family"] },
  { id: "family-sibling", skill: "Family Words", title: "Family practice", prompt: "Think about family relationships.", question: "Your brother or sister is your...", answer: "Sibling", tags: ["Family"] },
  { id: "family-grandparent", skill: "Family Words", title: "Family practice", prompt: "Think about family relationships.", question: "Your parent's mom is your...", answer: "Grandmother", tags: ["Family"] },

  { id: "language-water", skill: "Language Cards", title: "Spanish card", prompt: "Which Spanish word means water?", question: "Water", answer: "Agua", tags: ["Language Cards", "Food"] },
  { id: "language-hello", skill: "Language Cards", title: "Spanish card", prompt: "Which Spanish word means hello?", question: "Hello", answer: "Hola", tags: ["Language Cards"] },
  { id: "language-thank-you", skill: "Language Cards", title: "Spanish card", prompt: "Which Spanish phrase means thank you?", question: "Thank you", answer: "Gracias", tags: ["Language Cards"] },
  { id: "language-family", skill: "Language Cards", title: "Spanish card", prompt: "Which Spanish word means family?", question: "Family", answer: "Familia", tags: ["Language Cards", "Family"] },
  { id: "language-travel", skill: "Language Cards", title: "Spanish card", prompt: "Which Spanish word means trip?", question: "Trip", answer: "Viaje", tags: ["Language Cards", "Travel"] },

  { id: "routine-brush-teeth", skill: "Daily Routine", title: "Next step", prompt: "Pick what happens next.", question: "After brushing teeth, I...", answer: "Rinse", tags: ["Daily Routine"] },
  { id: "routine-wash-hands", skill: "Daily Routine", title: "Next step", prompt: "Pick what happens next.", question: "Before eating, I should...", answer: "Wash my hands", tags: ["Daily Routine", "Food"] },
  { id: "routine-pack-bag", skill: "Daily Routine", title: "Travel routine", prompt: "Pick what happens before leaving.", question: "Before a trip, I should...", answer: "Pack my bag", tags: ["Daily Routine", "Travel"] },
  { id: "routine-after-exercise", skill: "Daily Routine", title: "Exercise routine", prompt: "Pick what happens after exercise.", question: "After exercise, I should...", answer: "Drink water", tags: ["Daily Routine", "Exercise"] },

  { id: "business-greeting", skill: "Talk Time", title: "Customer greeting", prompt: "Use a clear sentence.", question: "What can you say when a customer says hello?", answer: "Open response", tags: ["Business"] },
  { id: "business-buyer-question", skill: "Daily Routine", title: "Buyer choice", prompt: "Think like a helpful business owner.", question: "A buyer asks a question. You should...", answer: "Answer clearly", tags: ["Business"] },
  { id: "business-thank-you", skill: "Talk Time", title: "Business manners", prompt: "Use a polite sentence.", question: "What can you say after someone buys something?", answer: "Open response", tags: ["Business"] },

  { id: "focus-breath", skill: "Daily Routine", title: "Finish strong", prompt: "One calm step at a time.", question: "What helps focus?", answer: "Take a breath", tags: ["Daily Routine"] },
  { id: "focus-one-thing", skill: "Memory", title: "Focus check", prompt: "Choose the helpful habit.", question: "When work feels hard, I can...", answer: "Do one step", tags: ["Daily Routine"] }
];

const questionLevels = {
  "memory-bathroom-pair": "beginner",
  "memory-food-pair": "beginner",
  "memory-travel-pair": "growing",
  "memory-exercise-pair": "growing",
  "money-change-5-3": "growing",
  "money-two-items": "beginner",
  "money-travel-ticket": "confident",
  "money-exercise-water": "growing",
  "talk-today-plan": "beginner",
  "talk-feeling": "beginner",
  "talk-travel-memory": "growing",
  "talk-exercise-favorite": "growing",
  "talk-music-choice": "growing",
  "family-mom-child": "beginner",
  "family-dad-child": "beginner",
  "family-sibling": "growing",
  "family-grandparent": "confident",
  "language-water": "beginner",
  "language-hello": "beginner",
  "language-thank-you": "growing",
  "language-family": "growing",
  "language-travel": "confident",
  "routine-brush-teeth": "beginner",
  "routine-wash-hands": "beginner",
  "routine-pack-bag": "growing",
  "routine-after-exercise": "growing",
  "business-greeting": "growing",
  "business-buyer-question": "confident",
  "business-thank-you": "growing",
  "focus-breath": "beginner",
  "focus-one-thing": "growing"
};

const levelLabels = {
  beginner: "Beginner",
  growing: "Growing",
  confident: "Confident"
};

const testerFeedbackPrompts = [
  "Think back to the first minute. Did Daily Adventure feel easy to start, or did anything slow you down?",
  "What did the learner seem to enjoy most? A question, a voice prompt, a button, a color, or just finishing a round?",
  "Was there any moment where the learner looked confused, distracted, or unsure what to do next?",
  "If you could change one thing before another family tries it, what would you change?"
];

const audioPrompts = {
  learnerStart: ["learner_start_01.mp3", "learner_start_02.mp3"],
  correct: ["correct_01.mp3", "correct_02.mp3"],
  tryAgain: ["try_again_01.mp3", "try_again_02.mp3"],
  talkSaved: ["talk_saved_01.mp3"],
  halfway: ["progress_halfway_01.mp3"],
  complete: ["progress_complete_01.mp3"],
  parentUnlock: ["parent_unlock_01.mp3"],
  parentLock: ["parent_lock_01.mp3"],
  testerFeedback: ["tester_feedback_01.mp3"]
};

const audioFallbackText = {
  learnerStart: "Welcome back. Your Daily Adventure is ready.",
  correct: "Yes. That was a strong answer.",
  tryAgain: "Good try. Take a breath and pick another answer.",
  talkSaved: "Talk Time saved. Thanks for sharing your answer.",
  halfway: "You are halfway there. Keep the energy steady.",
  complete: "Daily Adventure complete. Nice work today.",
  parentUnlock: "Parent area unlocked. You can review progress and feedback.",
  parentLock: "Parent area locked. Returning to the learner app.",
  testerFeedback: testerFeedbackPrompts[0]
};

const localStore = {
  load() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || { families: [], activeFamilyId: null };
    } catch {
      return { families: [], activeFamilyId: null };
    }
  },
  save(data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }
};

let state = localStore.load();
let parentUnlocked = false;
let currentAudio = null;

function saveState() {
  localStore.save(state);
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function dayIndex() {
  const start = new Date("2026-01-01T00:00:00");
  const today = new Date(`${todayKey()}T00:00:00`);
  return Math.floor((today - start) / 86400000);
}

function uid(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function scoreQuestion(question, family) {
  const goals = family.goals || [];
  const interests = family.interests || [];
  const goalMatch = goals.includes(question.skill) || goals.some((goal) => question.tags.includes(goal));
  const interestMatch = interests.some((interest) => question.tags.includes(interest));
  const levelMatch = allowedLevelsForFamily(family).includes(questionLevel(question));
  return (goalMatch ? 3 : 0) + (interestMatch ? 2 : 0) + (levelMatch ? 2 : 0);
}

function rotate(list, start) {
  if (!list.length) return [];
  const index = start % list.length;
  return [...list.slice(index), ...list.slice(0, index)];
}

function uniqueById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function getDailyActivities(family) {
  const day = dayIndex();
  const scored = starterQuestionBank.map((question) => ({
    ...question,
    level: questionLevel(question),
    score: scoreQuestion(question, family)
  }));
  const allowedLevels = allowedLevelsForFamily(family);
  const levelReady = scored.filter((question) => allowedLevels.includes(question.level));
  const preferred = rotate(levelReady.filter((question) => question.score > 0), day);
  const backup = rotate(levelReady.filter((question) => question.score === 0), day * 2);
  const fallback = rotate(scored.filter((question) => !allowedLevels.includes(question.level)), day * 3);
  const byGoal = (family.goals || [])
    .map((goal, goalIndex) => rotate(levelReady.filter((question) => question.skill === goal), day + goalIndex)[0])
    .filter(Boolean);

  return uniqueById([...byGoal, ...preferred, ...backup, ...fallback]).slice(0, totalRounds);
}

function questionLevel(question) {
  return question.level || questionLevels[question.id] || "growing";
}

function ageSuggestedLevel(ageRange) {
  const map = {
    "8-12": "beginner",
    "13-17": "growing",
    "18-25": "growing",
    "26+": "confident"
  };
  return map[ageRange] || "growing";
}

function allowedLevelsForFamily(family) {
  const level = family.startingLevel || ageSuggestedLevel(family.ageRange);
  if (level === "beginner") return ["beginner", "growing"];
  if (level === "confident") return ["growing", "confident"];
  return ["beginner", "growing", "confident"];
}

function activityKey(activity) {
  return `${todayKey()}-${activity.id}`;
}

function isOpenResponse(activity) {
  return activity.answer === "Open response";
}

function normalizeAnswer(value) {
  return String(value || "").trim().toLowerCase().replace(/[.!?]/g, "");
}

function correctAnswers(activity) {
  if (activity.answer === "Son or daughter") return ["son", "daughter", "son or daughter"];
  return [activity.answer];
}

function answerChoices(activity) {
  if (isOpenResponse(activity)) return [];
  const choicesBySkill = {
    Memory: ["Toothpaste", "Butter", "Suitcase", "Socks", "Fork", "Notebook", "Remote"],
    "Money Math": ["$2", "$3", "$4", "$5", "$6", "$8"],
    "Family Words": ["Son or daughter", "Sibling", "Grandmother", "Parent", "Friend"],
    "Language Cards": ["Agua", "Hola", "Gracias", "Familia", "Viaje", "Adios"],
    "Daily Routine": ["Rinse", "Wash my hands", "Pack my bag", "Drink water", "Answer clearly", "Take a breath", "Do one step"]
  };
  const pool = choicesBySkill[activity.skill] || ["Yes", "No", "Maybe"];
  const choices = uniqueById([activity.answer, ...pool].map((choice) => ({ id: choice, label: choice }))).slice(0, 4).map((choice) => choice.label);
  return rotate(choices, dayIndex() + activity.id.length);
}

function latestAttemptFor(session, key) {
  return [...session.attempts].reverse().find((attempt) => attempt.questionKey === key) || null;
}

function getActiveFamily() {
  return state.families.find((family) => family.id === state.activeFamilyId) || state.families[0] || null;
}

function setActiveFamily(id) {
  state.activeFamilyId = id;
  saveState();
}

function getSession(family) {
  const date = todayKey();
  let session = family.sessions.find((item) => item.date === date);
  if (!session) {
    session = {
      id: uid("session"),
      date,
      completed: [],
      attempts: [],
      talkTime: [],
      createdAt: new Date().toISOString()
    };
    family.sessions.push(session);
    saveState();
  }
  return session;
}

function selectedValues(form, name) {
  return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function toast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const note = document.createElement("div");
  note.className = "toast";
  note.textContent = message;
  document.body.appendChild(note);
  window.setTimeout(() => note.remove(), 2400);
}

function navigate(view) {
  window.location.hash = view;
}

function currentView() {
  const view = (window.location.hash || "").replace("#", "");
  if (view) return view;
  return state.families.length ? "child" : "setup";
}

function adultOnlyView(view) {
  return ["setup", "parent", "admin", "parent-menu"].includes(view);
}

function render() {
  const view = currentView();
  updateModeSwitch(view);
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === view);
  });

  if (!state.families.length && view !== "setup") return renderSetup();
  if (adultOnlyView(view) && state.families.length && !parentUnlocked) return renderParentAccess(view);
  if (view === "child") return renderChild();
  if (view === "parent-access") return renderParentAccess("parent-menu");
  if (view === "parent-menu") return renderParentMenu();
  if (view === "parent") return renderParent();
  if (view === "admin") return renderAdmin();
  return renderSetup();
}

function updateModeSwitch(view) {
  const switchLink = document.querySelector("#modeSwitch");
  if (!switchLink) return;
  const inAdultArea = adultOnlyView(view) || view === "parent-access";
  switchLink.textContent = inAdultArea && parentUnlocked ? "Learner" : "Parent";
  switchLink.href = inAdultArea && parentUnlocked ? "#child" : parentUnlocked ? "#parent-menu" : "#parent-access";
  switchLink.classList.toggle("active", inAdultArea);
}

function mountTemplate(id) {
  const app = document.querySelector("#app");
  const template = document.querySelector(id);
  app.innerHTML = "";
  app.appendChild(template.content.cloneNode(true));
  app.focus({ preventScroll: true });
}

function renderSetup() {
  mountTemplate("#setup-view");
  const form = document.querySelector("#family-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const family = {
      id: uid("family"),
      parentName: formData.get("parentName").trim(),
      parentEmail: formData.get("parentEmail").trim(),
      childName: formData.get("childName").trim(),
      ageRange: formData.get("ageRange"),
      startingLevel: formData.get("startingLevel"),
      familyPin: formData.get("familyPin").trim(),
      voiceStyle: formData.get("voiceStyle"),
      voiceEnabled: formData.get("voiceEnabled") === "true",
      goals: selectedValues(form, "goals"),
      interests: selectedValues(form, "interests"),
      consentAccepted: Boolean(formData.get("consentAccepted")),
      createdAt: new Date().toISOString(),
      sessions: [],
      notes: [],
      feedback: []
    };

    state.families.push(family);
    state.activeFamilyId = family.id;
    saveState();
    parentUnlocked = false;
    toast(`${family.childName}'s pilot setup is ready.`);
    navigate("child");
  });
}

function renderParentAccess(targetView = "parent-menu") {
  mountTemplate("#parent-access-view");
  if (!state.families.length) {
    toast("Create a family setup first.");
    navigate("setup");
    return;
  }

  const family = getActiveFamily();
  const form = document.querySelector("#parent-pin-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const enteredPin = new FormData(form).get("parentPinEntry").trim();
    if (enteredPin !== family.familyPin) {
      toast("That PIN did not match.");
      return;
    }
    parentUnlocked = true;
    playPrompt("parentUnlock", family, { force: true });
    toast("Parent area unlocked.");
    navigate(targetView);
  });
}

function renderParentMenu() {
  mountTemplate("#parent-menu-view");
  document.querySelector("#lockParentArea").addEventListener("click", () => {
    const family = getActiveFamily();
    parentUnlocked = false;
    playPrompt("parentLock", family, { force: true });
    toast("Parent area locked.");
    navigate("child");
  });
}

function populateFamilySelect(select, activeId) {
  select.innerHTML = state.families.map((family) => (
    `<option value="${family.id}" ${family.id === activeId ? "selected" : ""}>${escapeHtml(family.childName)}'s family</option>`
  )).join("");
  select.addEventListener("change", () => {
    setActiveFamily(select.value);
    render();
  });
}

function renderChild() {
  mountTemplate("#child-view");
  if (!state.families.length) {
    document.querySelector("#activityGrid").innerHTML = `<p class="empty">Create a family setup first.</p>`;
    return;
  }

  const family = getActiveFamily();
  const session = getSession(family);

  document.querySelector("#childFamilyLabel").textContent = `${family.childName}'s Daily Adventure`;
  document.querySelector("#childGreeting").textContent = `Hi, ${family.childName}. Ready for today's adventure?`;
  document.querySelector("#childIntro").textContent = buildChildIntro(family);
  updateVoiceToggle(family);
  updateChildProgress(session);

  const activities = getDailyActivities(family);
  const talkActivity = activities.find((activity) => activity.skill === "Talk Time");
  if (talkActivity) {
    document.querySelector("#talkPrompt").textContent = talkActivity.question;
  }

  const grid = document.querySelector("#activityGrid");
  grid.innerHTML = activities.map((activity, index) => {
    const key = activityKey(activity);
    const isComplete = session.completed.includes(key);
    const latestAttempt = latestAttemptFor(session, key);
    return `
      <article class="activity-card ${isComplete ? "complete" : ""}">
        <small>${escapeHtml(activity.skill)} · ${escapeHtml(levelLabels[activity.level] || "Growing")}</small>
        <h3>${escapeHtml(activity.title)}</h3>
        <p>${escapeHtml(activity.prompt)}</p>
        <strong>${escapeHtml(activity.question)}</strong>
        ${renderAnswerControl(activity, index, isComplete, latestAttempt)}
      </article>
    `;
  }).join("");

  grid.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target.closest("[data-activity-form]");
    if (!form) return;
    const index = Number(form.dataset.activityForm);
    const formData = new FormData(form);
    const answer = String(formData.get("activityAnswer") || "").trim();
    submitActivityAnswer(family, index, answer);
    renderChild();
  });

  document.querySelector("#voiceToggle").addEventListener("click", () => {
    family.voiceEnabled = !family.voiceEnabled;
    saveState();
    updateVoiceToggle(family);
    if (family.voiceEnabled) playPrompt("learnerStart", family);
    toast(`Voice ${family.voiceEnabled ? "on" : "off"}.`);
  });

  document.querySelector("#saveTalkTime").addEventListener("click", () => {
    const response = document.querySelector("#talkResponse").value.trim();
    if (!response) {
      toast("Add a Talk Time answer first.");
      return;
    }
    session.talkTime.push({
      prompt: document.querySelector("#talkPrompt").textContent,
      response,
      createdAt: new Date().toISOString()
    });
    saveState();
    document.querySelector("#talkResponse").value = "";
    playPrompt("talkSaved", family);
    toast("Talk Time saved for the parent dashboard.");
  });
}

function renderAnswerControl(activity, index, isComplete, latestAttempt) {
  if (isComplete) {
    return `
      <div class="answer-result correct">
        <span>Done</span>
        <strong>${escapeHtml(latestAttempt?.selectedAnswer || activity.answer)}</strong>
      </div>
    `;
  }

  const feedback = latestAttempt && !latestAttempt.isCorrect
    ? `<p class="answer-hint">Good try. Pick another answer.</p>`
    : "";

  if (isOpenResponse(activity)) {
    return `
      <form class="answer-form" data-activity-form="${index}">
        <textarea name="activityAnswer" rows="3" required placeholder="Type or dictate an answer."></textarea>
        ${feedback}
        <button class="secondary-action" type="submit">Save answer</button>
      </form>
    `;
  }

  return `
    <form class="answer-form" data-activity-form="${index}">
      <div class="answer-options">
        ${answerChoices(activity).map((choice, choiceIndex) => `
          <label>
            <input type="radio" name="activityAnswer" value="${escapeHtml(choice)}" ${choiceIndex === 0 ? "required" : ""}>
            <span>${escapeHtml(choice)}</span>
          </label>
        `).join("")}
      </div>
      ${feedback}
      <button class="secondary-action" type="submit">Check answer</button>
    </form>
  `;
}

function updateVoiceToggle(family) {
  const button = document.querySelector("#voiceToggle");
  if (!button) return;
  button.textContent = family.voiceEnabled === false ? "Voice off" : "Voice on";
  button.classList.toggle("is-muted", family.voiceEnabled === false);
}

function buildChildIntro(family) {
  const interestsList = family.interests || [];
  const interests = interestsList.length ? interestsList.join(", ") : "their interests";
  const level = levelLabels[family.startingLevel || ageSuggestedLevel(family.ageRange)] || "Growing";
  return `Today's ${level.toLowerCase()} path uses ${interests} to make practice feel personal.`;
}

function playPrompt(name, family, options = {}) {
  const force = Boolean(options.force);
  if ((!force && family?.voiceEnabled === false) || !audioPrompts[name]?.length) return;
  const prompts = audioPrompts[name];
  const file = prompts[Math.floor(Math.random() * prompts.length)];
  const fallback = audioFallbackText[name] || options.fallback || "";

  try {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(`audio/${file}`);
    currentAudio.play().catch(() => speakFallback(fallback, family, force));
  } catch {
    speakFallback(fallback, family, force);
  }
}

function speakFallback(message, family, force = false) {
  if (!message) return;
  if ((!force && family?.voiceEnabled === false) || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.rate = family?.voiceStyle === "calm" ? 0.86 : 0.95;
  utterance.pitch = family?.voiceStyle === "playful_hype" ? 1.08 : 1;
  window.speechSynthesis.speak(utterance);
}

function updateChildProgress(session) {
  const done = session.completed.length;
  document.querySelector("#roundCount").textContent = `${done} of ${totalRounds}`;
  document.querySelector("#progressBar").style.width = `${Math.round((done / totalRounds) * 100)}%`;
}

function submitActivityAnswer(family, index, selectedAnswer) {
  const session = getSession(family);
  const activity = getDailyActivities(family)[index];
  if (!activity) return;
  if (!selectedAnswer) {
    toast("Choose or type an answer first.");
    return;
  }

  const key = activityKey(activity);
  const isCorrect = isOpenResponse(activity) || correctAnswers(activity).some((answer) => normalizeAnswer(answer) === normalizeAnswer(selectedAnswer));
  const attemptNumber = session.attempts.filter((attempt) => attempt.questionKey === key).length + 1;

  if (isCorrect && !session.completed.includes(key)) {
    session.completed.push(key);
  }

  session.attempts.push({
    skill: activity.skill,
    level: activity.level,
    questionKey: key,
    questionText: activity.question,
    selectedAnswer,
    correctAnswer: activity.answer,
    isCorrect,
    attemptNumber,
    createdAt: new Date().toISOString()
  });

  if (isCorrect && isOpenResponse(activity)) {
    session.talkTime.push({
      prompt: activity.question,
      response: selectedAnswer,
      createdAt: new Date().toISOString()
    });
  }

  saveState();
  const promptName = completionPromptName(session, isCorrect);
  playPrompt(promptName, family);
  toast(audioFallbackText[promptName]);
}

function completionPromptName(session, isCorrect) {
  if (!isCorrect) return "tryAgain";
  if (session.completed.length >= totalRounds) return "complete";
  if (session.completed.length === Math.ceil(totalRounds / 2)) return "halfway";
  return "correct";
}

function renderParent() {
  mountTemplate("#parent-view");
  if (!state.families.length) {
    document.querySelector("#parentDashboard").innerHTML = `<p class="empty">Create a family setup first.</p>`;
    return;
  }

  const family = getActiveFamily();
  const session = getSession(family);
  populateFamilySelect(document.querySelector("#familySelectParent"), family.id);

  const percent = Math.round((session.completed.length / totalRounds) * 100);
  document.querySelector("#parentScore").textContent = `${percent}%`;
  document.querySelector("#parentDashboard").innerHTML = buildDashboardHtml(family, session);

  document.querySelector("#copySummary")?.addEventListener("click", async () => {
    const text = buildParentSummary(family, session);
    await navigator.clipboard.writeText(text);
    toast("Parent summary copied.");
  });

  document.querySelector("#feedbackForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    family.feedback = family.feedback || [];
    family.feedback.push({
      setupEase: formData.get("setupEase"),
      learnerEnjoyed: formData.get("learnerEnjoyed"),
      firstMinute: formData.get("firstMinute").trim(),
      learnerMoment: formData.get("learnerMoment").trim(),
      confusing: formData.get("confusing").trim(),
      addNext: formData.get("addNext").trim(),
      createdAt: new Date().toISOString()
    });
    saveState();
    event.currentTarget.reset();
    toast("Pilot feedback saved. Thank you.");
    renderParent();
  });

  document.querySelector("#playFeedbackPrompt")?.addEventListener("click", () => {
    playPrompt("testerFeedback", family, { force: true });
    toast("Feedback prompt playing.");
  });
}

function buildDashboardHtml(family, session) {
  const attempts = session.attempts;
  const talk = session.talkTime;
  const practice = nextPracticeAreas(family, attempts);
  const stats = attemptStats(attempts);
  return `
    <div class="dashboard-grid">
      <article class="dashboard-card">
        <small>Today</small>
        <strong>${session.completed.length} of ${totalRounds}</strong>
        <span>rounds complete</span>
      </article>
      <article class="dashboard-card">
        <small>Answers</small>
        <strong>${stats.correct} of ${stats.total}</strong>
        <span>correct attempts</span>
      </article>
      <article class="dashboard-card">
        <small>Practice</small>
        <strong>${practice[0] || "Keep going"}</strong>
        <span>top suggestion</span>
      </article>
    </div>
    <div class="list">
      <h3>Recent Talk Time</h3>
      ${talk.length ? talk.map((item) => `
        <article class="dashboard-card">
          <small>${formatTime(item.createdAt)}</small>
          <strong>${escapeHtml(item.prompt)}</strong>
          <span>${escapeHtml(item.response)}</span>
        </article>
      `).join("") : `<p class="empty">No Talk Time yet today.</p>`}
      <h3>Recent Attempts</h3>
      ${attempts.length ? [...attempts].reverse().slice(0, 6).map((attempt) => `
        <article class="dashboard-card">
          <small>${escapeHtml(attempt.skill)} · ${attempt.isCorrect ? "Correct" : "Try again"}</small>
          <strong>${escapeHtml(attempt.questionText)}</strong>
          <span>Answer: ${escapeHtml(attempt.selectedAnswer)}</span>
        </article>
      `).join("") : `<p class="empty">No attempts saved yet.</p>`}
      <h3>What to practice next</h3>
      ${practice.map((item) => `<article class="dashboard-card"><strong>${escapeHtml(item)}</strong><span>${escapeHtml(practiceActivity(item, family.childName))}</span></article>`).join("")}
      <button id="copySummary" class="secondary-action" type="button">Copy parent summary</button>
    </div>
    <form id="feedbackForm" class="feedback-form">
      <h3>Pilot feedback</h3>
      <div class="feedback-prompt-card">
        <small>Voice-ready tester prompt</small>
        ${testerFeedbackPrompts.map((prompt) => `<p>${escapeHtml(prompt)}</p>`).join("")}
        <button id="playFeedbackPrompt" class="secondary-action" type="button">Play prompt</button>
      </div>
      <p class="helper-text">A quick parent note helps us improve the experience for the next family.</p>
      <div class="form-grid">
        <label>
          Was setup easy?
          <select name="setupEase" required>
            <option value="">Choose one</option>
            <option>Yes, easy</option>
            <option>Mostly easy</option>
            <option>Confusing</option>
          </select>
        </label>
        <label>
          Did the learner enjoy it?
          <select name="learnerEnjoyed" required>
            <option value="">Choose one</option>
            <option>Yes</option>
            <option>Somewhat</option>
            <option>Not yet</option>
          </select>
        </label>
      </div>
      <label>
        First minute reaction
        <textarea name="firstMinute" rows="3" placeholder="Example: It was easy to start, but I was not sure where to tap next."></textarea>
      </label>
      <label>
        Learner moment
        <textarea name="learnerMoment" rows="3" placeholder="Example: They smiled at the voice prompt or liked the money question."></textarea>
      </label>
      <label>
        What felt confusing?
        <textarea name="confusing" rows="3" placeholder="Optional note"></textarea>
      </label>
      <label>
        What should we add next?
        <textarea name="addNext" rows="3" placeholder="Optional idea"></textarea>
      </label>
      <button class="primary-action" type="submit">Save pilot feedback</button>
    </form>
  `;
}

function attemptStats(attempts) {
  return {
    total: attempts.length,
    correct: attempts.filter((attempt) => attempt.isCorrect).length
  };
}

function nextPracticeAreas(family, attempts) {
  const goals = family.goals?.length ? family.goals : ["Talk Time", "Money Math", "Family Words"];
  const attemptedSkills = new Set(attempts.filter((item) => item.isCorrect).map((item) => item.skill));
  const missedSkills = attempts.filter((item) => !item.isCorrect).map((item) => item.skill);
  const notTried = goals.filter((goal) => !attemptedSkills.has(goal));
  return [...new Set([...missedSkills, ...notTried, ...goals])].slice(0, 3);
}

function practiceActivity(skill, childName) {
  const activities = {
    "Talk Time": `Ask ${childName} one who, what, where, when, or how question and help them answer in a full sentence.`,
    "Money Math": "Use real coins or bills and practice one small purchase.",
    "Language Cards": "Pick three everyday words and say them twice together.",
    "Family Words": "Look at a family photo and ask who each person is.",
    "Daily Routine": "Choose one routine and put the steps in order.",
    Memory: "Match two household items that go together."
  };
  return activities[skill] || "Practice one short activity together.";
}

function buildParentSummary(family, session) {
  const stats = attemptStats(session.attempts);
  return [
    `${family.childName}'s Daily Adventure summary`,
    `Date: ${session.date}`,
    `Completed: ${session.completed.length} of ${totalRounds}`,
    `Answer attempts: ${stats.correct} correct of ${stats.total}`,
    `Talk Time answers: ${session.talkTime.length}`,
    `Practice next: ${nextPracticeAreas(family, session.attempts).join(", ")}`
  ].join("\n");
}

function renderAdmin() {
  mountTemplate("#admin-view");
  document.querySelector("#familyCount").textContent = String(state.families.length);
  document.querySelector("#adminList").innerHTML = state.families.length
    ? state.families.map((family) => {
      const session = getSession(family);
      return `
        <article class="admin-card">
          <small>${escapeHtml(family.parentName)} ${family.parentEmail ? `· ${escapeHtml(family.parentEmail)}` : ""}</small>
          <strong>${escapeHtml(family.childName)}</strong>
          <span>${session.completed.length} of ${totalRounds} rounds today · ${levelLabels[family.startingLevel || ageSuggestedLevel(family.ageRange)] || "Growing"} level</span>
          <span>${family.goals.join(", ") || "No goals selected"}</span>
          <span>${(family.feedback || []).length} feedback note${(family.feedback || []).length === 1 ? "" : "s"} saved</span>
        </article>
      `;
    }).join("")
    : `<p class="empty">No pilot families yet.</p>`;

  document.querySelector("#exportPilotData").addEventListener("click", async () => {
    await navigator.clipboard.writeText(JSON.stringify(state, null, 2));
    toast("Pilot data copied as JSON.");
  });
}

function formatTime(value) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

window.addEventListener("hashchange", render);
render();
