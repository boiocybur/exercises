"use strict";

function celebration() {
  const colors = ["#ffd400", "#fff475", "#ffe082", "#ffd54f"];

  confetti({
    particleCount: 250,
    spread: 120,
    origin: { x: 0.5, y: 0 },
    colors,
  });
}

let randomNumber = Math.floor(Math.random() * 101);

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.getElementById("submitguess");
const guessField = document.getElementById("guessField");

let guessCount = 1;
let resetButton;
console.log(randomNumber);

function checkGuess() {
  const raw = guessField.value.trim();
  const guess = Number.parseInt(raw, 10);
  if (raw === "") return;

  if (Number.isNaN(guess) || guess < 0 || guess > 100) {
    lastResult.textContent = "Indtast et tal mellem 0 og 100.";
    lastResult.classList.remove("win");
    animateOnce(lastResult, "shake");
    return;
  }

  if (guessCount === 1) {
    guesses.textContent = "Tidligere gæt: ";
  }
  const sep = guessCount === 1 ? "" : ", ";
  const span = document.createElement("span");
  span.textContent = (guessCount === 1 ? "" : ", ") + guess;
  span.className = "guess-pill pop";
  guesses.appendChild(span);

  if (guess === randomNumber) {
    lastResult.textContent = `Tillykke! Du gættede tallet ${randomNumber}.`;
    lastResult.classList.remove("shake");
    lastResult.classList.add("win");
    lowOrHi.textContent = "";
    celebration();
    endGame();
  } else if (guess > randomNumber) {
    lastResult.textContent = "Forkert gæt.";
    lowOrHi.textContent = "Dit gæt var for højt.";
  } else {
    lastResult.textContent = "Forkert gæt.";
    lowOrHi.textContent = "Dit gæt var for lavt.";
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
}

function endGame() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "Start forfra";
  resetButton.className = "resetBtn";
  document.querySelector(".card").appendChild(resetButton);
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  guessCount = 1;
  const resetParas = document.querySelectorAll(".resultParas p");
  resetParas.forEach((p) => (p.textContent = ""));
  lastResult.className = "lastResult";
  guesses.textContent = "";
  lowOrHi.textContent = "";
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();
  randomNumber = Math.floor(Math.random() * 101);
  if (resetButton) resetButton.remove();
}

guessSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  checkGuess();
});

guessField.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    checkGuess();
  }
});
