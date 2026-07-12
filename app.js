const storageKey = "dailyAdventurePilot";
const totalRounds = 8;

const starterActivities = [
  { skill: "Memory", title: "Find the pair", prompt: "Match two things that go together.", question: "Toothbrush goes with...", answer: "Toothpaste" },
  { skill: "Money Math", title: "Customer change", prompt: "A snack is $3. You pay $5. How much change?", question: "$5 minus $3", answer: "$2" },
  { skill: "Talk Time", title: "Use a sentence", prompt: "Answer with I or my.", question: "What is one thing you want to do today?", answer: "Open response" },
  { skill: "Family Words", title: "Family practice", prompt: "Think about who belongs to who.", question: "Keyaan is Zamaan's...", answer: "Brother" },
  { skill: "Language", title: "Spanish card", prompt: "Which Spanish word means water?", question: "Water", answer: "Agua" },
  { skill: "Routine", title: "Next step", prompt: "Pick what happens next.", question: "After brushing teeth, I...", answer: "Rinse" },
  { skill: "Business", title: "Buyer choice", prompt: "Think like a helpful business owner.", question: "A buyer asks a question. You should...", answer: "Answer clearly" },
  { skill: "Focus", title: "Finish strong", prompt: "One calm step at a time.", question: "What helps focus?", answer: "Take a breath" }
];

const voiceLines = {
  playful_hype: [
    "Brain power is online.",
    "That answer was smooth.",
    "Focus level unlocked.",
    "Team adventure is moving."
  ],
  calm: [
    "Take your time.",
    "One step at a time.",
    "Good calm focus.",
    "You are doing well."
  ],
  travel: [
    "Passport ready.",
    "Next stop, another challenge.",
    "That answer earned a stamp.",
    "Adventure mode is open."
  ],
  business: [
    "That is CEO thinking.",
    "Check the numbers.",
    "Smart move for the buyer.",
    "Keep the orders moving."
  ]
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

function saveState() {
  localStore.save(state);
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function uid(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
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
  return (window.location.hash || "#setup").replace("#", "");
}

function render() {
  const view = currentView();
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === view);
  });

  if (view === "child") return renderChild();
  if (view === "parent") return renderParent();
  if (view === "admin") return renderAdmin();
  return renderSetup();
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
      familyPin: formData.get("familyPin").trim(),
      voiceStyle: formData.get("voiceStyle"),
      goals: selectedValues(form, "goals"),
      interests: selectedValues(form, "interests"),
      consentAccepted: Boolean(formData.get("consentAccepted")),
      createdAt: new Date().toISOString(),
      sessions: [],
      notes: []
    };

    state.families.push(family);
    state.activeFamilyId = family.id;
    saveState();
    toast(`${family.childName}'s pilot setup is ready.`);
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
  populateFamilySelect(document.querySelector("#familySelectChild"), family.id);

  document.querySelector("#childFamilyLabel").textContent = `${family.childName}'s Daily Adventure`;
  document.querySelector("#childGreeting").textContent = `Hi, ${family.childName}. Ready for today's adventure?`;
  document.querySelector("#childIntro").textContent = buildChildIntro(family);
  updateChildProgress(session);

  const grid = document.querySelector("#activityGrid");
  grid.innerHTML = starterActivities.map((activity, index) => {
    const key = `${todayKey()}-${index}`;
    const isComplete = session.completed.includes(key);
    return `
      <article class="activity-card ${isComplete ? "complete" : ""}">
        <small>${escapeHtml(activity.skill)}</small>
        <h3>${escapeHtml(activity.title)}</h3>
        <p>${escapeHtml(activity.prompt)}</p>
        <strong>${escapeHtml(activity.question)}</strong>
        <button class="secondary-action" data-complete-activity="${index}" ${isComplete ? "disabled" : ""}>
          ${isComplete ? "Done" : "Mark complete"}
        </button>
      </article>
    `;
  }).join("");

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-complete-activity]");
    if (!button) return;
    const index = Number(button.dataset.completeActivity);
    completeActivity(family, index);
    renderChild();
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
    toast("Talk Time saved for the parent dashboard.");
  });
}

function buildChildIntro(family) {
  const interests = family.interests.length ? family.interests.join(", ") : "their interests";
  const voice = voiceLines[family.voiceStyle]?.[0] || "Let's begin.";
  return `${voice} Today's path uses ${interests} to make practice feel personal.`;
}

function updateChildProgress(session) {
  const done = session.completed.length;
  document.querySelector("#roundCount").textContent = `${done} of ${totalRounds}`;
  document.querySelector("#progressBar").style.width = `${Math.round((done / totalRounds) * 100)}%`;
}

function completeActivity(family, index) {
  const session = getSession(family);
  const activity = starterActivities[index];
  const key = `${todayKey()}-${index}`;
  if (!session.completed.includes(key)) {
    session.completed.push(key);
  }
  session.attempts.push({
    skill: activity.skill,
    questionKey: key,
    questionText: activity.question,
    selectedAnswer: activity.answer,
    correctAnswer: activity.answer,
    isCorrect: true,
    createdAt: new Date().toISOString()
  });
  saveState();
  const lines = voiceLines[family.voiceStyle] || voiceLines.playful_hype;
  toast(lines[session.completed.length % lines.length]);
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
}

function buildDashboardHtml(family, session) {
  const attempts = session.attempts;
  const talk = session.talkTime;
  const practice = nextPracticeAreas(family, attempts);
  return `
    <div class="dashboard-grid">
      <article class="dashboard-card">
        <small>Today</small>
        <strong>${session.completed.length} of ${totalRounds}</strong>
        <span>rounds complete</span>
      </article>
      <article class="dashboard-card">
        <small>Talk Time</small>
        <strong>${talk.length}</strong>
        <span>answers saved</span>
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
      <h3>What to practice next</h3>
      ${practice.map((item) => `<article class="dashboard-card"><strong>${escapeHtml(item)}</strong><span>${escapeHtml(practiceActivity(item, family.childName))}</span></article>`).join("")}
      <button id="copySummary" class="secondary-action" type="button">Copy parent summary</button>
    </div>
  `;
}

function nextPracticeAreas(family, attempts) {
  const goals = family.goals.length ? family.goals : ["Talk Time", "Money Math", "Family Words"];
  const attemptedSkills = new Set(attempts.map((item) => item.skill));
  const notTried = goals.filter((goal) => !attemptedSkills.has(goal));
  return [...notTried, ...goals].slice(0, 3);
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
  return [
    `${family.childName}'s Daily Adventure summary`,
    `Date: ${session.date}`,
    `Completed: ${session.completed.length} of ${totalRounds}`,
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
          <span>${session.completed.length} of ${totalRounds} rounds today · ${family.goals.join(", ") || "No goals selected"}</span>
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

