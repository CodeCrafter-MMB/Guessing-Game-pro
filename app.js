// update 

// Initialize game variables
let randomNumber = Math.floor(Math.random() * 10) + 1;
let lives = 3;
const livesDisplay = document.getElementById("lives");
const messageDisplay = document.getElementById("message");
const guessInput = document.getElementById("guessInput");
const submitGuessButton = document.getElementById("submitGuess");
const restartGameButton = document.getElementById("restartGame");

// Display initial lives
updateLives();

// Function to update lives display
function updateLives() {
  if (lives > 0) {
    livesDisplay.innerHTML = "❤️".repeat(lives);
  } else {
    livesDisplay.innerHTML = "💔".repeat(3); // Display broken hearts when lives reach 0
  }
}

// Function to initialize the game logic generator
function initializeGameLogic() {
  function* gameLogic() {
    while (lives > 0) {
      const guess = yield;

      if (guess === randomNumber) {
        messageDisplay.textContent =
          "🎉 Congratulations! You guessed the correct number!";
        endGame(true);
        return;
      } else {
        lives--;
        if (lives > 0) {
          messageDisplay.textContent = `Wrong guess! Try again.`;
          updateLives();
        } else {
          messageDisplay.textContent = `😞 Game Over! The correct number was ${randomNumber}.`;
          updateLives(); // Update lives to show broken hearts
          endGame(false);
          return;
        }
      }
    }
  }

  return gameLogic();
}

// Initialize generator
let game = initializeGameLogic();
game.next();

// Handle guess submissions
submitGuessButton.addEventListener("click", () => {
  const guess = Number(guessInput.value);

  if (isNaN(guess) || guess < 1 || guess > 10) {
    messageDisplay.textContent = "Please enter a number between 1 and 10.";
    return;
  }

  game.next(guess);
  guessInput.value = "";
});

// Function to handle end of the game
function endGame(win) {
  submitGuessButton.disabled = true;
  restartGameButton.classList.remove("hidden");
  guessInput.disabled = true;
}

// Restart game
restartGameButton.addEventListener("click", () => {
  randomNumber = Math.floor(Math.random() * 10) + 1;
  lives = 3;
  updateLives();
  messageDisplay.textContent = "Guess a number between 1 and 10:";
  guessInput.disabled = false;
  submitGuessButton.disabled = false;
  restartGameButton.classList.add("hidden");
  game = initializeGameLogic(); // Restart the game generator
  game.next();
});
