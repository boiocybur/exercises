"use strict";

let computerensValg;
let brugerensValg;

const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const sten = document.querySelector(".rock");
const papir = document.querySelector(".paper");
const saks = document.querySelector(".scissors");

const win = document.getElementById("win");
const lose = document.getElementById("lose");
const draw = document.getElementById("draw");
const computerOptions = ["rock", "paper", "scissors"];

sten.addEventListener("click", rockClick);
papir.addEventListener("click", paperClick);
saks.addEventListener("click", scissorsClick);

function rockClick() {
  brugerensValg = "rock";
  træffeValg();
}
function paperClick() {
  brugerensValg = "paper";
  træffeValg();
}
function scissorsClick() {
  brugerensValg = "scissors";
  træffeValg();
}

function træffeValg() {
  const valgNummer = Math.floor(Math.random() * 3);
  computerensValg = computerOptions[valgNummer];
  vinderen(brugerensValg, computerensValg);
  nedtælling();
}

function vinderen(brugerensValg, computerensValg) {
  if (brugerensValg === computerensValg) {
    draw.classList.remove("hidden");
  } else if (
    (brugerensValg === "rock" && computerensValg === "scissors") ||
    (brugerensValg === "paper" && computerensValg === "rock") ||
    (brugerensValg === "scissors" && computerensValg === "paper")
  ) {
    win.classList.remove("hidden");
  } else {
    lose.classList.remove("hidden");
  }
}

function nedtælling() {
  win.classList.add("hidden");
  lose.classList.add("hidden");
  draw.classList.add("hidden");

  player1.classList.add("shake");
  player2.classList.add("shake");

  // animationend kommer fra AI som sagde animation ikke er en rigtig funktion. Blev snydt af add("shake") til at tro den virkede
  player1.addEventListener("animationend", function () {
    visValg(player1, brugerensValg);
    visValg(player2, computerensValg);
    vinderen(brugerensValg, computerensValg);
  });
}

function visValg(img, valg) {
  img.classList.remove("rock", "paper", "scissors", "shake");
  img.classList.add(valg);
}
