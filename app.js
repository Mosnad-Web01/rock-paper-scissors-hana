// Prevent animation on load
setTimeout(() => {
    document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: ["rock", "spock"],  // Paper beats Rock and Spock
  },
  {
    name: "scissors",
    beats: ["paper", "lizard"],  // Scissors beat Paper and Lizard
  },
  {
    name: "rock",
    beats: ["scissors", "lizard"],  // Rock beats Scissors and Lizard
  },
  {
    name: "lizard",
    beats: ["spock", "paper"],  // Lizard beats Spock and Paper
  },
  {
    name: "spock",
    beats: ["scissors", "rock"],  // Spock beats Scissors and Rock
  },
];

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results-result");

const resultWinner = document.querySelector(".results-winner");
const resultText = document.querySelector(".results-text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score-number");
let score = 0;

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner(choice, aichoice);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  // Display both results immediately
  resultDivs.forEach((resultDiv, idx) => {
    resultDiv.innerHTML = `
      <div class="choice ${results[idx].name}">
        <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
      </div>
    `;
  });

  // Hide the game and show the results
  gameDiv.classList.add("hidden");
  resultsDiv.classList.remove("hidden");
}

function displayWinner(userChoice, aiChoice) {
  setTimeout(() => {
    // Check if the user or AI wins
    const userWins = isWinner(userChoice, aiChoice);
    const aiWins = isWinner(aiChoice, userChoice);

    // Clear previous winner classes
    resultDivs.forEach(div => div.classList.remove("winner"));

    // Display the result based on who wins
    if (userWins) {
      resultText.innerText = "you win";
      resultDivs[0].classList.add("winner");  // Mark the user result as winner
      keepScore(1);
    } else if (aiWins) {
      resultText.innerText = "you lose";
      resultDivs[1].classList.add("winner");  // Mark the AI result as winner
      keepScore(-1);
    } else {
      resultText.innerText = "draw";
    }

    // Show results
    resultWinner.classList.remove("hidden");
    resultsDiv.classList.add("show-winner");
  }, 1000);
}

function isWinner(choice1, choice2) {
  return choice1.beats.includes(choice2.name);
}

function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.remove("hidden");
  resultsDiv.classList.add("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.add("hidden");
  resultsDiv.classList.remove("show-winner");
});

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
