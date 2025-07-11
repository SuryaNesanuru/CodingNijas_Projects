const sentences = [
  "Typing is a skill you can improve.",
  "Practice makes perfect with typing speed.",
  "Accuracy matters more than speed.",
  "JavaScript is fun to learn by doing.",
  "Stay calm and keep typing smoothly."
];

let currentSentence = "";
let startTime, interval;
let keystrokes = 0;

const sentenceEl = document.getElementById("sentence");
const inputEl = document.getElementById("input");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const keystrokesEl = document.getElementById("keystrokes");
const restartBtn = document.getElementById("restart");
const bestWPMEl = document.getElementById("best-wpm");

function loadSentence() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceEl.innerHTML = currentSentence
    .split("")
    .map(char => `<span>${char}</span>`)
    .join("");
  inputEl.value = "";
  keystrokes = 0;
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100%";
  keystrokesEl.textContent = "0";
  clearInterval(interval);
}

function startTimer() {
  startTime = new Date();
  interval = setInterval(updateStats, 500);
}

function updateStats() {
  const elapsed = (new Date() - startTime) / 1000 / 60; // in minutes
  const wordsTyped = inputEl.value.trim().split(/\s+/).length;
  const wpm = Math.round(wordsTyped / elapsed);

  wpmEl.textContent = wpm;

  const correctChars = Array.from(inputEl.value)
    .filter((char, i) => char === currentSentence[i]).length;

  const accuracy = Math.round((correctChars / keystrokes) * 100) || 0;
  accuracyEl.textContent = `${accuracy}%`;

  if (inputEl.value === currentSentence) {
    clearInterval(interval);
    updateBestWPM(wpm);
  }
}

function updateBestWPM(currentWPM) {
  const bestWPM = parseInt(localStorage.getItem("bestWPM") || "0");
  if (currentWPM > bestWPM) {
    localStorage.setItem("bestWPM", currentWPM);
    bestWPMEl.textContent = currentWPM;
  }
}

function highlightText() {
  const spans = sentenceEl.querySelectorAll("span");
  const input = inputEl.value;

  spans.forEach((span, i) => {
    if (!input[i]) {
      span.classList.remove("correct", "incorrect");
    } else if (input[i] === currentSentence[i]) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
    }
  });
}

inputEl.addEventListener("input", () => {
  if (!startTime) startTimer();
  keystrokes++;
  keystrokesEl.textContent = keystrokes;
  highlightText();
  updateStats();
});

restartBtn.addEventListener("click", () => {
  loadSentence();
  startTime = null;
});

window.addEventListener("load", () => {
  loadSentence();
  bestWPMEl.textContent = localStorage.getItem("bestWPM") || "0";
});
