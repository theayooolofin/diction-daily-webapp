const DAILY_COUNT = 5;
const HISTORY_LIMIT = 150;
const STORAGE_KEY = "diction-daily-state-v1";

const WORD_BANK = [
  { id: "abundant", word: "abundant", part: "adjective", meaning: "Existing in large quantities; plentiful.", example: "Her garden produced abundant tomatoes this summer." },
  { id: "articulate", word: "articulate", part: "adjective", meaning: "Able to express ideas clearly and effectively.", example: "He gave an articulate explanation of the plan." },
  { id: "benevolent", word: "benevolent", part: "adjective", meaning: "Kind and generous toward others.", example: "The benevolent donor funded the school library." },
  { id: "coherent", word: "coherent", part: "adjective", meaning: "Logical and consistent; easy to understand.", example: "Your paragraph is clear and coherent." },
  { id: "diligent", word: "diligent", part: "adjective", meaning: "Showing careful and persistent effort.", example: "She is diligent about reviewing vocabulary each day." },
  { id: "eloquent", word: "eloquent", part: "adjective", meaning: "Fluent and persuasive in speaking or writing.", example: "The speaker gave an eloquent speech." },
  { id: "feasible", word: "feasible", part: "adjective", meaning: "Possible to do successfully.", example: "Practicing for ten minutes daily is feasible." },
  { id: "genuine", word: "genuine", part: "adjective", meaning: "Real and sincere; not fake.", example: "Her interest in language learning is genuine." },
  { id: "hinder", word: "hinder", part: "verb", meaning: "To create difficulties that slow progress.", example: "Background noise can hinder pronunciation practice." },
  { id: "illustrate", word: "illustrate", part: "verb", meaning: "To explain by giving examples.", example: "Use a sentence to illustrate a new word." },
  { id: "judicious", word: "judicious", part: "adjective", meaning: "Showing good judgment and careful thinking.", example: "A judicious study plan improves retention." },
  { id: "keen", word: "keen", part: "adjective", meaning: "Very eager, sharp, or intense.", example: "She has a keen ear for pronunciation." },
  { id: "lucid", word: "lucid", part: "adjective", meaning: "Expressed clearly; easy to understand.", example: "His definition of the word was lucid." },
  { id: "meticulous", word: "meticulous", part: "adjective", meaning: "Very careful and precise.", example: "Meticulous pronunciation drills improve clarity." },
  { id: "novice", word: "novice", part: "noun", meaning: "A beginner in a field or activity.", example: "Every fluent speaker started as a novice." },
  { id: "obtain", word: "obtain", part: "verb", meaning: "To get or acquire something.", example: "You can obtain better accents through practice." },
  { id: "pragmatic", word: "pragmatic", part: "adjective", meaning: "Focused on practical results.", example: "A pragmatic routine helps you stay consistent." },
  { id: "refine", word: "refine", part: "verb", meaning: "To improve by making small changes.", example: "Record and refine your pronunciation daily." },
  { id: "resilient", word: "resilient", part: "adjective", meaning: "Able to recover quickly from difficulties.", example: "A resilient learner keeps practicing after mistakes." },
  { id: "succinct", word: "succinct", part: "adjective", meaning: "Expressed clearly in few words.", example: "Give a succinct meaning before moving on." },
  { id: "tangible", word: "tangible", part: "adjective", meaning: "Clear and noticeable; real.", example: "Daily speaking gives tangible improvement." },
  { id: "uphold", word: "uphold", part: "verb", meaning: "To support or maintain.", example: "They uphold a daily learning habit." },
  { id: "versatile", word: "versatile", part: "adjective", meaning: "Able to adapt to many different uses.", example: "English is a versatile language skill." },
  { id: "withstand", word: "withstand", part: "verb", meaning: "To resist or endure something.", example: "With practice, you can withstand speaking anxiety." },
  { id: "yearn", word: "yearn", part: "verb", meaning: "To deeply desire something.", example: "Many learners yearn to speak confidently." },
  { id: "zealous", word: "zealous", part: "adjective", meaning: "Showing great energy and enthusiasm.", example: "A zealous student reviews new words each night." },
  { id: "accentuate", word: "accentuate", part: "verb", meaning: "To make something more noticeable.", example: "Stress can accentuate syllables in words." },
  { id: "clarify", word: "clarify", part: "verb", meaning: "To make an idea clear and easier to understand.", example: "Ask questions to clarify unfamiliar meanings." },
  { id: "discreet", word: "discreet", part: "adjective", meaning: "Careful and tactful in speech or behavior.", example: "Be discreet when correcting someone else's pronunciation." },
  { id: "emulate", word: "emulate", part: "verb", meaning: "To imitate in order to match or improve.", example: "Try to emulate native speakers' rhythm." },
  { id: "fluent", word: "fluent", part: "adjective", meaning: "Able to speak smoothly and easily.", example: "Consistent practice helps you become fluent." },
  { id: "intonation", word: "intonation", part: "noun", meaning: "The rise and fall of voice while speaking.", example: "Correct intonation makes speech sound natural." },
  { id: "nuance", word: "nuance", part: "noun", meaning: "A subtle difference in meaning or expression.", example: "Pronunciation can change the nuance of a sentence." },
  { id: "precise", word: "precise", part: "adjective", meaning: "Exact and accurate.", example: "Use precise mouth movement for difficult sounds." },
  { id: "vocalize", word: "vocalize", part: "verb", meaning: "To produce sounds with your voice.", example: "Vocalize each syllable slowly before speeding up." }
];

const PRONUNCIATION_MAP = {
  abundant: "uh-BUN-duhnt",
  articulate: "ar-TIK-yuh-luht",
  benevolent: "buh-NEV-uh-luhnt",
  coherent: "koh-HEER-uhnt",
  diligent: "DIL-uh-juhnt",
  eloquent: "EL-uh-kwuhnt",
  feasible: "FEE-zuh-buhl",
  genuine: "JEN-yoo-in",
  hinder: "HIN-der",
  illustrate: "IL-uh-strayt",
  judicious: "joo-DISH-uhs",
  keen: "KEEN",
  lucid: "LOO-sid",
  meticulous: "muh-TIK-yuh-luhs",
  novice: "NAH-vis",
  obtain: "ub-TAYN",
  pragmatic: "prag-MAT-ik",
  refine: "rih-FINE",
  resilient: "rih-ZIL-yuhnt",
  succinct: "suhk-SINKT",
  tangible: "TAN-juh-buhl",
  uphold: "up-HOHLD",
  versatile: "VUR-suh-tyl",
  withstand: "with-STAND",
  yearn: "YURN",
  zealous: "ZEL-uhs",
  accentuate: "ak-SEN-choo-ayt",
  clarify: "KLAIR-uh-fy",
  discreet: "dih-SKREET",
  emulate: "EM-yuh-layt",
  fluent: "FLOO-uhnt",
  intonation: "in-toh-NAY-shuhn",
  nuance: "NOO-ahns",
  precise: "prih-SYSE",
  vocalize: "VOH-kuh-lyz"
};

const WORD_BANK_ENRICHED = WORD_BANK.map((item) => ({
  ...item,
  sound: PRONUNCIATION_MAP[item.id] || item.word.toUpperCase()
}));

const WORD_BY_ID = Object.fromEntries(
  WORD_BANK_ENRICHED.map((item) => [item.id, item])
);

const todayDateEl = document.getElementById("todayDate");
const progressTextEl = document.getElementById("progressText");
const progressFillEl = document.getElementById("progressFill");
const streakTextEl = document.getElementById("streakText");
const wordCounterEl = document.getElementById("wordCounter");
const wordTextEl = document.getElementById("wordText");
const wordMetaEl = document.getElementById("wordMeta");
const wordSoundEl = document.getElementById("wordSound");
const wordMeaningEl = document.getElementById("wordMeaning");
const wordExampleEl = document.getElementById("wordExample");
const speechStatusEl = document.getElementById("speechStatus");
const dailyMessageEl = document.getElementById("dailyMessage");
const wordListEl = document.getElementById("wordList");
const historyListEl = document.getElementById("historyList");
const wordStageEl = document.getElementById("wordStage");
const playSoundBtn = document.getElementById("playSoundBtn");
const speakBtn = document.getElementById("speakBtn");
const markBtn = document.getElementById("markBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const newSetBtn = document.getElementById("newSetBtn");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognitionInProgress = false;
let lastRenderedWordId = "";

const dateKey = getDateKey();
const appState = loadState();
ensureStateShape(appState);

if (!appState[dateKey]) {
  const defaultWordIds = getDailyWords(dateKey, DAILY_COUNT).map((item) => item.id);
  appState[dateKey] = createDayState(defaultWordIds);
  addHistoryEntry(defaultWordIds, "Daily set");
}

const dayState = appState[dateKey];
sanitizeDayState(dayState);

let dailyWords = hydrateWords(dayState.wordIds);
if (dailyWords.length !== DAILY_COUNT) {
  dayState.wordIds = normalizeWordIds(dayState.wordIds, "fallback");
  dailyWords = hydrateWords(dayState.wordIds);
}

addHistoryEntry(dayState.wordIds, "Current set");
adjustCurrentIndex();
saveState(appState);
render();

playSoundBtn.addEventListener("click", () => {
  const word = dailyWords[dayState.currentIndex];
  if (!word) {
    return;
  }

  speakWord(word.word);
  setStatus(`Playing "${word.word}".`, "info");
});

speakBtn.addEventListener("click", () => {
  const word = dailyWords[dayState.currentIndex];
  runSpeechCheck(word);
});

markBtn.addEventListener("click", () => {
  const word = dailyWords[dayState.currentIndex];
  if (!word) {
    return;
  }

  markCompleted(word.id);
  setStatus(`Marked "${word.word}" as practiced.`, "success");
});

nextBtn.addEventListener("click", () => {
  if (!dailyWords.length) {
    return;
  }

  dayState.currentIndex = (dayState.currentIndex + 1) % dailyWords.length;
  saveState(appState);
  render();
  setStatus(`Moved to "${dailyWords[dayState.currentIndex].word}".`, "info");
});

newSetBtn.addEventListener("click", () => {
  if (recognitionInProgress) {
    setStatus("Wait for the current speaking check to finish.", "error");
    return;
  }

  const confirmed = window.confirm("Generate a new 5-word set? This resets progress for the current set.");
  if (!confirmed) {
    return;
  }

  const freshWordIds = generateRandomWordIds(dayState.wordIds);
  applyNewWordSet(freshWordIds, "Manual generate");
  setStatus("Generated a fresh set of 5 words.", "success");
});

resetBtn.addEventListener("click", () => {
  const confirmed = window.confirm("Reset today's progress for this set?");
  if (!confirmed) {
    return;
  }

  dayState.completed = [];
  dayState.currentIndex = 0;
  saveState(appState);
  render();
  setStatus("Progress reset for the current set.", "info");
});

document.addEventListener("keydown", handleShortcuts);

function getDateKey() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getDailyWords(seedText, count) {
  const words = [...WORD_BANK_ENRICHED];
  const rand = seededRandom(seedText);

  for (let i = words.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }

  return words.slice(0, count);
}

function seededRandom(seedText) {
  let seed = 2166136261;
  for (let i = 0; i < seedText.length; i += 1) {
    seed ^= seedText.charCodeAt(i);
    seed = Math.imul(seed, 16777619);
  }
  seed >>>= 0;

  return function random() {
    seed += 0x6d2b79f5;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_) {
    return {};
  }
}

function ensureStateShape(state) {
  if (!Array.isArray(state.__generatedHistory)) {
    state.__generatedHistory = [];
    return;
  }

  state.__generatedHistory = state.__generatedHistory
    .filter((entry) => entry && Array.isArray(entry.wordIds))
    .map((entry) => {
      const wordIds = normalizeWordIds(entry.wordIds, "history");
      return {
        createdAt: typeof entry.createdAt === "string" ? entry.createdAt : new Date().toISOString(),
        dateKey: typeof entry.dateKey === "string" ? entry.dateKey : "",
        source: typeof entry.source === "string" ? entry.source : "Generated",
        wordIds,
        signature: typeof entry.signature === "string" ? entry.signature : buildSetSignature(wordIds)
      };
    })
    .slice(0, HISTORY_LIMIT);
}

function createDayState(wordIds) {
  return {
    completed: [],
    currentIndex: 0,
    wordIds: normalizeWordIds(wordIds, "create-day")
  };
}

function sanitizeDayState(state) {
  state.wordIds = normalizeWordIds(state.wordIds, "day-state");

  if (!Array.isArray(state.completed)) {
    state.completed = [];
  }
  state.completed = state.completed.filter((id) => state.wordIds.includes(id));

  if (typeof state.currentIndex !== "number" || Number.isNaN(state.currentIndex)) {
    state.currentIndex = 0;
  }

  state.currentIndex = Math.max(0, Math.min(state.wordIds.length - 1, Math.floor(state.currentIndex)));
}

function normalizeWordIds(wordIds, seedLabel) {
  const uniqueIds = [];
  const seen = new Set();

  if (Array.isArray(wordIds)) {
    for (let i = 0; i < wordIds.length; i += 1) {
      const id = wordIds[i];
      if (WORD_BY_ID[id] && !seen.has(id)) {
        uniqueIds.push(id);
        seen.add(id);
      }
      if (uniqueIds.length >= DAILY_COUNT) {
        break;
      }
    }
  }

  if (uniqueIds.length < DAILY_COUNT) {
    const fallbackIds = getDailyWords(`${dateKey}-${seedLabel}-fill`, WORD_BANK_ENRICHED.length).map((item) => item.id);
    for (let i = 0; i < fallbackIds.length; i += 1) {
      const id = fallbackIds[i];
      if (!seen.has(id)) {
        uniqueIds.push(id);
        seen.add(id);
      }
      if (uniqueIds.length >= DAILY_COUNT) {
        break;
      }
    }
  }

  return uniqueIds.slice(0, DAILY_COUNT);
}

function hydrateWords(wordIds) {
  return normalizeWordIds(wordIds, "hydrate")
    .map((id) => WORD_BY_ID[id])
    .filter(Boolean);
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {
    // Ignore storage failures and keep app usable in-memory.
  }
}

function adjustCurrentIndex() {
  if (!dailyWords.length) {
    dayState.currentIndex = 0;
    return;
  }

  if (dayState.completed.length >= DAILY_COUNT) {
    dayState.currentIndex = DAILY_COUNT - 1;
    return;
  }

  const activeWord = dailyWords[dayState.currentIndex];
  if (!activeWord || !dayState.completed.includes(activeWord.id)) {
    return;
  }

  const nextIndex = dailyWords.findIndex((word) => !dayState.completed.includes(word.id));
  if (nextIndex >= 0) {
    dayState.currentIndex = nextIndex;
  }
}

function render() {
  if (!dailyWords.length) {
    setStatus("Could not load words for today.", "error");
    return;
  }

  const currentWord = dailyWords[dayState.currentIndex];
  const completedCount = dayState.completed.length;
  const doneToday = completedCount >= DAILY_COUNT;
  const progressPercent = Math.round((completedCount / DAILY_COUNT) * 100);
  const streak = calculateStreak(appState, dateKey);

  todayDateEl.textContent = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  progressTextEl.textContent = `${completedCount}/${DAILY_COUNT} words completed`;
  progressFillEl.style.width = `${progressPercent}%`;
  streakTextEl.textContent = `${streak} day${streak === 1 ? "" : "s"}`;

  wordCounterEl.textContent = `Word ${dayState.currentIndex + 1} of ${DAILY_COUNT}`;
  wordTextEl.textContent = currentWord.word;
  wordMetaEl.textContent = currentWord.part;
  wordSoundEl.textContent = `Pronunciation: ${currentWord.sound}`;
  wordMeaningEl.textContent = currentWord.meaning;
  wordExampleEl.textContent = currentWord.example;

  const isDone = dayState.completed.includes(currentWord.id);
  markBtn.disabled = isDone;
  markBtn.textContent = isDone ? "Practiced" : "Mark practiced";

  if (recognitionInProgress) {
    speakBtn.disabled = true;
    speakBtn.textContent = "Listening...";
    newSetBtn.disabled = true;
  } else if (!SpeechRecognition) {
    speakBtn.disabled = true;
    speakBtn.textContent = "Speech unavailable";
    newSetBtn.disabled = false;
  } else {
    speakBtn.disabled = false;
    speakBtn.textContent = "Start speaking";
    newSetBtn.disabled = false;
  }

  dailyMessageEl.textContent = doneToday ? "Daily goal reached." : "";

  if (lastRenderedWordId !== currentWord.id) {
    animateWordStage();
    lastRenderedWordId = currentWord.id;
  }

  renderWordList();
  renderHistory();
}

function renderWordList() {
  wordListEl.innerHTML = "";

  for (let i = 0; i < dailyWords.length; i += 1) {
    const item = dailyWords[i];
    const done = dayState.completed.includes(item.id);
    const active = i === dayState.currentIndex;

    const li = document.createElement("li");
    li.className = "word-list-item";
    li.tabIndex = 0;
    li.setAttribute("role", "button");
    li.setAttribute("aria-label", `Go to word ${i + 1}: ${item.word}`);

    if (done) {
      li.classList.add("done");
    }
    if (active) {
      li.classList.add("active");
    }

    li.innerHTML = `
      <div class="word-main">
        <span class="word-title">${item.word}</span>
        <p class="word-subtitle">${item.part} | ${item.sound}</p>
      </div>
      <span class="word-pill ${done ? "done" : "pending"}">${done ? "Done" : "Pending"}</span>
    `;

    li.addEventListener("click", () => {
      dayState.currentIndex = i;
      saveState(appState);
      render();
      setStatus(`Selected "${item.word}".`, "info");
    });

    li.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        li.click();
      }
    });

    wordListEl.appendChild(li);
  }
}

function renderHistory() {
  historyListEl.innerHTML = "";

  const history = Array.isArray(appState.__generatedHistory) ? appState.__generatedHistory : [];
  if (!history.length) {
    const emptyItem = document.createElement("li");
    const emptyText = document.createElement("p");
    emptyText.className = "history-empty";
    emptyText.textContent = "No generated sets yet.";
    emptyItem.appendChild(emptyText);
    historyListEl.appendChild(emptyItem);
    return;
  }

  for (let i = 0; i < history.length; i += 1) {
    const entry = history[i];
    const li = document.createElement("li");
    li.className = "history-item";

    const meta = document.createElement("p");
    meta.className = "history-meta";
    meta.textContent = `${entry.source || "Generated"} | ${formatHistoryTimestamp(entry)}`;

    const words = document.createElement("p");
    words.className = "history-words";
    const wordNames = (entry.wordIds || [])
      .map((id) => WORD_BY_ID[id]?.word)
      .filter(Boolean);
    words.textContent = wordNames.join(", ");

    li.appendChild(meta);
    li.appendChild(words);
    historyListEl.appendChild(li);
  }
}

function formatHistoryTimestamp(entry) {
  const date = new Date(entry.createdAt);
  if (Number.isNaN(date.getTime())) {
    return entry.dateKey || "Unknown date";
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function buildSetSignature(wordIds) {
  return [...wordIds].sort().join("|");
}

function addHistoryEntry(wordIds, source) {
  const normalizedIds = normalizeWordIds(wordIds, "history-add");
  const signature = buildSetSignature(normalizedIds);

  const exists = appState.__generatedHistory.some(
    (entry) => entry.dateKey === dateKey && (entry.signature || buildSetSignature(entry.wordIds)) === signature
  );
  if (exists) {
    return;
  }

  appState.__generatedHistory.unshift({
    createdAt: new Date().toISOString(),
    dateKey,
    source,
    wordIds: normalizedIds,
    signature
  });

  if (appState.__generatedHistory.length > HISTORY_LIMIT) {
    appState.__generatedHistory.length = HISTORY_LIMIT;
  }
}

function generateRandomWordIds(previousWordIds) {
  const allIds = WORD_BANK_ENRICHED.map((item) => item.id);
  let candidate = allIds.slice(0, DAILY_COUNT);

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const shuffled = [...allIds];
    shuffleInPlace(shuffled);
    candidate = shuffled.slice(0, DAILY_COUNT);

    if (!sameWordSet(candidate, previousWordIds)) {
      break;
    }
  }

  return candidate;
}

function shuffleInPlace(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
}

function sameWordSet(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
    return false;
  }

  const bSet = new Set(b);
  return a.every((id) => bSet.has(id));
}

function applyNewWordSet(wordIds, source) {
  dayState.wordIds = normalizeWordIds(wordIds, "apply-set");
  dayState.completed = [];
  dayState.currentIndex = 0;
  dailyWords = hydrateWords(dayState.wordIds);
  addHistoryEntry(dayState.wordIds, source);
  saveState(appState);
  render();
}

function speakWord(text) {
  if (!("speechSynthesis" in window)) {
    setStatus("Text-to-speech is not available in this browser.", "error");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function runSpeechCheck(targetWord) {
  if (!targetWord) {
    return;
  }

  if (!SpeechRecognition) {
    setStatus("Speech recognition is not available in this browser.", "error");
    return;
  }

  if (recognitionInProgress) {
    return;
  }

  recognitionInProgress = true;
  render();

  if (!navigator.onLine) {
    recognitionInProgress = false;
    render();
    setStatus("You appear to be offline. Speech recognition may fail.", "error");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;

  setStatus(`Listening: say "${targetWord.word}" (${targetWord.sound}) clearly.`, "info");

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript || "";
    const match = isPronunciationMatch(transcript, targetWord.word);

    if (match) {
      markCompleted(targetWord.id);
      setStatus(`Heard "${transcript}". Pronunciation matched.`, "success");
    } else {
      setStatus(`Heard "${transcript}". Try again and aim for "${targetWord.word}".`, "error");
    }
  };

  recognition.onerror = (event) => {
    const blocked = event.error === "not-allowed" || event.error === "service-not-allowed";
    if (blocked) {
      setStatus("Microphone permission is blocked. Allow mic access and try again.", "error");
      return;
    }

    setStatus("Could not capture speech. Try again in a quieter room.", "error");
  };

  recognition.onend = () => {
    recognitionInProgress = false;
    render();
  };

  try {
    recognition.start();
  } catch (_) {
    recognitionInProgress = false;
    render();
    setStatus("Speech recognition could not start. Try again.", "error");
  }
}

function isPronunciationMatch(spokenText, expectedWord) {
  const spoken = normalizeWord(spokenText);
  const expected = normalizeWord(expectedWord);
  if (!spoken || !expected) {
    return false;
  }

  if (spoken === expected || spoken.includes(expected)) {
    return true;
  }

  const firstToken = spoken.split(" ")[0];
  const distance = levenshteinDistance(firstToken, expected);
  const threshold = expected.length <= 5 ? 1 : 2;
  return distance <= threshold;
}

function normalizeWord(text) {
  return text.toLowerCase().replace(/[^a-z ]/g, " ").replace(/\s+/g, " ").trim();
}

function levenshteinDistance(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) {
    dp[i][0] = i;
  }
  for (let j = 0; j < cols; j += 1) {
    dp[0][j] = j;
  }

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[a.length][b.length];
}

function markCompleted(wordId) {
  if (dayState.completed.includes(wordId)) {
    return;
  }

  dayState.completed.push(wordId);
  adjustCurrentIndex();
  saveState(appState);
  render();
}

function setStatus(text, tone = "info") {
  speechStatusEl.textContent = text;
  speechStatusEl.classList.remove("info", "success", "error");
  speechStatusEl.classList.add(tone);
}

function animateWordStage() {
  wordStageEl.classList.remove("swap");
  void wordStageEl.offsetWidth;
  wordStageEl.classList.add("swap");
}

function calculateStreak(state, todayKey) {
  let streak = 0;
  let cursorKey = todayKey;

  while (true) {
    const day = state[cursorKey];
    if (!day || !Array.isArray(day.completed) || day.completed.length < DAILY_COUNT) {
      break;
    }
    streak += 1;
    cursorKey = shiftDateKey(cursorKey, -1);
  }

  return streak;
}

function shiftDateKey(dateString, offsetDays) {
  const [yyyy, mm, dd] = dateString.split("-").map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  date.setDate(date.getDate() + offsetDays);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function handleShortcuts(event) {
  const targetTag = event.target?.tagName || "";
  const isTyping = targetTag === "INPUT" || targetTag === "TEXTAREA" || targetTag === "SELECT";

  if (isTyping || event.ctrlKey || event.metaKey || event.altKey) {
    return;
  }

  const key = event.key.toLowerCase();
  if (key === " " || key === "spacebar") {
    event.preventDefault();
    playSoundBtn.click();
  } else if (key === "s") {
    speakBtn.click();
  } else if (key === "m") {
    markBtn.click();
  } else if (key === "n") {
    nextBtn.click();
  } else if (key === "g") {
    newSetBtn.click();
  }
}
