document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const choices = document.querySelectorAll(".choice");
  const playerScoreEl = document.getElementById("player-score");
  const computerScoreEl = document.getElementById("computer-score");
  const resultDisplay = document.getElementById("result-display");
  const playerChoiceEl = document.getElementById("player-choice");
  const computerChoiceEl = document.getElementById("computer-choice");
  const resultMessageEl = document.getElementById("result-message");
  const resultDescriptionEl = document.getElementById("result-description");
  const playAgainBtn = document.getElementById("play-again-btn");
  const historyList = document.getElementById("history-list");
  const winsCountEl = document.getElementById("wins-count");
  const lossesCountEl = document.getElementById("losses-count");
  const drawsCountEl = document.getElementById("draws-count");
  const winRateEl = document.getElementById("win-rate");
  const helpModal = document.getElementById("help-modal");
  const modalClose = document.getElementById("modal-close");
  const confettiContainer = document.getElementById("confetti-container");

  // Game state
  let playerScore = 0;
  let computerScore = 0;
  let wins = 0;
  let losses = 0;
  let draws = 0;
  let gameHistory = [];
  let isAnimating = false;

  // Icon mapping
  const choiceIcons = {
    stone: "fas fa-hand-rock",
    paper: "fas fa-hand-paper",
    scissor: "fas fa-hand-scissors",
  };

  // Initialize the game
  function init() {
    // Show help modal on first visit
    if (!localStorage.getItem("rpsFirstVisit")) {
      setTimeout(() => {
        helpModal.classList.add("show");
      }, 1000);
      localStorage.setItem("rpsFirstVisit", "true");
    }

    // Load game state from localStorage
    loadGameState();

    // Event listeners
    choices.forEach((choice) => {
      choice.addEventListener("click", () => {
        if (!isAnimating) {
          const playerChoice = choice.getAttribute("data-choice");
          playRound(playerChoice);
        }
      });
    });

    playAgainBtn.addEventListener("click", resetRound);
    modalClose.addEventListener("click", () => {
      helpModal.classList.remove("show");
    });

    // Close modal when clicking outside
    helpModal.addEventListener("click", (e) => {
      if (e.target === helpModal) {
        helpModal.classList.remove("show");
      }
    });
  }

  // Play a round of the game
  function playRound(playerChoice) {
    isAnimating = true;

    // Show result display with animation
    resultDisplay.classList.add("show");

    // Set player choice
    playerChoiceEl.innerHTML = `<i class="${choiceIcons[playerChoice]}"></i>`;
    playerChoiceEl.classList.add("pulse");

    // Show computer thinking animation
    computerChoiceEl.innerHTML = '<i class="fas fa-cog fa-spin"></i>';
    resultMessageEl.textContent = "Computer is thinking...";
    resultDescriptionEl.textContent = "The computer is making its move";

    // Disable choices during animation
    choices.forEach((choice) => {
      choice.style.pointerEvents = "none";
      choice.style.opacity = "0.5";
    });

    // Computer makes its move after a delay
    setTimeout(() => {
      const computerChoice = getComputerChoice();
      computerChoiceEl.innerHTML = `<i class="${choiceIcons[computerChoice]}"></i>`;
      computerChoiceEl.classList.add("pulse");

      // Determine the winner
      const result = determineWinner(playerChoice, computerChoice);

      // Update UI based on result
      updateGame(result, playerChoice, computerChoice);

      // Re-enable choices
      setTimeout(() => {
        choices.forEach((choice) => {
          choice.style.pointerEvents = "auto";
          choice.style.opacity = "1";
        });
        playerChoiceEl.classList.remove("pulse");
        computerChoiceEl.classList.remove("pulse");
        isAnimating = false;
      }, 1000);
    }, 1500);
  }

  // Get computer's random choice
  function getComputerChoice() {
    const choices = ["stone", "paper", "scissor"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  }

  // Determine the winner
  function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      return "draw";
    }

    if (
      (playerChoice === "stone" && computerChoice === "scissor") ||
      (playerChoice === "paper" && computerChoice === "stone") ||
      (playerChoice === "scissor" && computerChoice === "paper")
    ) {
      return "win";
    }

    return "lose";
  }

  // Update game state and UI
  function updateGame(result, playerChoice, computerChoice) {
    // Update scores
    if (result === "win") {
      playerScore++;
      wins++;
      resultMessageEl.textContent = "You Win!";
      resultDescriptionEl.textContent = `${capitalizeFirstLetter(
        playerChoice
      )} beats ${capitalizeFirstLetter(computerChoice)}`;
      resultMessageEl.style.background =
        "linear-gradient(to right, var(--success), var(--primary))";
      createConfetti();
    } else if (result === "lose") {
      computerScore++;
      losses++;
      resultMessageEl.textContent = "You Lose!";
      resultDescriptionEl.textContent = `${capitalizeFirstLetter(
        computerChoice
      )} beats ${capitalizeFirstLetter(playerChoice)}`;
      resultMessageEl.style.background =
        "linear-gradient(to right, var(--danger), var(--accent))";
    } else {
      draws++;
      resultMessageEl.textContent = "Draw!";
      resultDescriptionEl.textContent = `Both chose ${capitalizeFirstLetter(
        playerChoice
      )}`;
      resultMessageEl.style.background =
        "linear-gradient(to right, var(--warning), var(--secondary))";
    }

    // Update score displays
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    winsCountEl.textContent = wins;
    lossesCountEl.textContent = losses;
    drawsCountEl.textContent = draws;

    // Calculate and update win rate
    const totalGames = wins + losses + draws;
    const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
    winRateEl.textContent = `${winRate}%`;

    // Add to history
    addToHistory(result, playerChoice, computerChoice);

    // Show play again button
    playAgainBtn.style.display = "block";

    // Save game state
    saveGameState();
  }

  // Add result to history
  function addToHistory(result, playerChoice, computerChoice) {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const historyItem = {
      result,
      playerChoice,
      computerChoice,
      time: timeString,
      timestamp: now.getTime(),
    };

    gameHistory.unshift(historyItem);

    // Update history UI
    updateHistoryUI();

    // Keep only the last 20 items
    if (gameHistory.length > 20) {
      gameHistory.pop();
    }
  }

  // Update history UI
  function updateHistoryUI() {
    historyList.innerHTML = "";

    gameHistory.forEach((item) => {
      const li = document.createElement("li");
      li.className = "history-item";

      li.innerHTML = `
              <div class="history-move history-player">
                  <i class="${choiceIcons[item.playerChoice]}"></i>
                  <span>${capitalizeFirstLetter(item.playerChoice)}</span>
              </div>
              <div class="history-result ${item.result}">
                  ${item.result.toUpperCase()}
              </div>
              <div class="history-move history-computer">
                  <span>${capitalizeFirstLetter(item.computerChoice)}</span>
                  <i class="${choiceIcons[item.computerChoice]}"></i>
              </div>
              <div class="history-time">
                  ${item.time}
              </div>
          `;

      historyList.appendChild(li);
    });
  }

  // Reset the round (show initial state)
  function resetRound() {
    playerChoiceEl.innerHTML = '<i class="fas fa-question"></i>';
    computerChoiceEl.innerHTML = '<i class="fas fa-question"></i>';
    resultMessageEl.textContent = "Make your move!";
    resultDescriptionEl.textContent =
      "Choose stone, paper, or scissors to begin the game";
    resultMessageEl.style.background =
      "linear-gradient(to right, var(--primary), var(--secondary))";
    playAgainBtn.style.display = "none";
  }

  // Create confetti effect
  function createConfetti() {
    // Clear existing confetti
    confettiContainer.innerHTML = "";

    // Create new confetti elements
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";

      // Random properties
      const size = Math.random() * 10 + 5;
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 2;
      const delay = Math.random() * 5;

      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.background = color;
      confetti.style.left = `${left}%`;
      confetti.style.animationDuration = `${animationDuration}s`;
      confetti.style.animationDelay = `${delay}s`;

      confettiContainer.appendChild(confetti);
    }
  }

  // Save game state to localStorage
  function saveGameState() {
    const gameState = {
      playerScore,
      computerScore,
      wins,
      losses,
      draws,
      gameHistory,
    };

    localStorage.setItem("rpsGameState", JSON.stringify(gameState));
  }

  // Load game state from localStorage
  function loadGameState() {
    const savedState = localStorage.getItem("rpsGameState");

    if (savedState) {
      const gameState = JSON.parse(savedState);

      playerScore = gameState.playerScore || 0;
      computerScore = gameState.computerScore || 0;
      wins = gameState.wins || 0;
      losses = gameState.losses || 0;
      draws = gameState.draws || 0;
      gameHistory = gameState.gameHistory || [];

      // Update UI
      playerScoreEl.textContent = playerScore;
      computerScoreEl.textContent = computerScore;
      winsCountEl.textContent = wins;
      lossesCountEl.textContent = losses;
      drawsCountEl.textContent = draws;

      const totalGames = wins + losses + draws;
      const winRate =
        totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
      winRateEl.textContent = `${winRate}%`;

      updateHistoryUI();
    }
  }

  // Helper function to capitalize first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Initialize the game
  init();
});
// scroll animation.
function scrollAnimation() {
  const scrollElements = document.querySelectorAll(".scroll-animate");

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const elementOutofView = (el) => {
    return !elementInView(el);
  };

  const displayScrollElement = (element) => {
    element.classList.add("scrolled");
  };

  const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
  };

  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el);
    }
  });
}
