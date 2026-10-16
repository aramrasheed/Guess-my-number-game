"use strict";

// =========================================
// 1. INITIAL GAME VARIABLES
// =========================================

let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 5;
let highscore = 0;

let gameActive = true;

// =========================================
// 2. SELECT HTML ELEMENTS
// =========================================

const body = document.querySelector("body");

const messageElement = document.querySelector(".message");
const numberElement = document.querySelector(".number");
const guessInput = document.querySelector(".guess");

const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".highscore");

const checkButton = document.querySelector(".check");
const againButton = document.querySelector(".again");

// =========================================
// 3. DISPLAY GAME MESSAGES
// =========================================

const displayMessage = function (message) {
  messageElement.textContent = message;
};

// =========================================
// 4. CHECK THE PLAYER'S GUESS
// =========================================

checkButton.addEventListener("click", function () {
  // Prevent guessing after the game ends
  if (!gameActive) {
    return;
  }

  // Convert the input into a number
  const guess = Number(guessInput.value);

  // ---------------------------------------
  // A. Check for an empty input
  // ---------------------------------------

  if (guessInput.value.trim() === "") {
    displayMessage("⛔ No number!");

    // ---------------------------------------
    // B. Validate the guess
    // ---------------------------------------
  } else if (!Number.isInteger(guess) || guess < 1 || guess > 20) {
    displayMessage("⚠️ Enter a whole number from 1 to 20!");

    // ---------------------------------------
    // C. Player guesses correctly
    // ---------------------------------------
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number!");

    // Reveal the secret number
    numberElement.textContent = secretNumber;

    // Apply the green winning CSS class
    body.classList.add("winning");

    // Remove any previous game-over style
    body.classList.remove("game-over");

    // Increase the number box width
    numberElement.style.width = "30rem";

    // Update the high score if necessary
    if (score > highscore) {
      highscore = score;

      highscoreElement.textContent = highscore;
    }

    // Mark the game as finished
    gameActive = false;

    // ---------------------------------------
    // D. Player guesses incorrectly
    // ---------------------------------------
  } else {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");

      // Reduce the score
      score--;

      scoreElement.textContent = score;
    } else {
      // The player has run out of attempts
      score = 0;

      scoreElement.textContent = score;

      displayMessage("💥 You lost the game!");

      // Reveal the secret number
      numberElement.textContent = secretNumber;

      // Apply the game-over style
      body.classList.add("game-over");

      // Stop further guessing
      gameActive = false;
    }
  }
});

// =========================================
// 5. RESTART THE GAME
// =========================================

againButton.addEventListener("click", function () {
  // Restore the initial game variables
  score = 5;

  secretNumber = Math.trunc(Math.random() * 20) + 1;

  gameActive = true;

  // Remove special game states
  body.classList.remove("winning", "game-over");

  // Restore the initial message
  displayMessage("Start guessing...");

  // Hide the secret number
  numberElement.textContent = "?";

  // Restore the score
  scoreElement.textContent = score;

  // Clear the player's input
  guessInput.value = "";

  // Restore the original number box width
  numberElement.style.width = "";

  // Keep the high score unchanged
  highscoreElement.textContent = highscore;
});
// =========================================
// 12. DESIGNER WELCOME POP-UP
// =========================================

const designerPopup = document.querySelector("#designerPopup");
const popupStart = document.querySelector("#popupStart");
const popupClose = document.querySelector("#popupClose");

// Close the pop-up and start playing
const closeDesignerPopup = function () {
  designerPopup.classList.add("hidden");

  // Move keyboard focus to the guess input
  document.querySelector(".guess").focus();
};

// Start playing button
popupStart.addEventListener("click", closeDesignerPopup);

// Close button
popupClose.addEventListener("click", closeDesignerPopup);

// Close the pop-up by clicking outside the card
designerPopup.addEventListener("click", function (event) {
  if (event.target === designerPopup) {
    closeDesignerPopup();
  }
});

// Close the pop-up by pressing Escape
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !designerPopup.classList.contains("hidden")) {
    closeDesignerPopup();
  }
});
