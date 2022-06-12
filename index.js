scissors = document.querySelector("#scissors-btn");
paper = document.querySelector("#paper-btn");
rock = document.querySelector("#rock-btn");
playagainBTN = document.querySelector("#playagain-btn");
selectedChoiceSection = document.querySelector("#selected-choice");
choicesSection = document.querySelector("#choices");
computerChoiceImage = document.querySelector("#comp-choice-img");
userChoiceImage = document.querySelector("#user-choice-img");
countdownTimer = document.querySelector("#countdown-timer");
scoreText = document.querySelector("#score-text");
stateText = document.querySelector("#state-text");
gameResult = document.querySelector("#game-result");
player = document.querySelector("lottie-player");
rulesBTN = document.querySelector("#rules-btn");
modal = document.querySelector("#modal");
modalCloseBTN = document.querySelector("#modal-close-btn");
let userChoice;
let computerChoice;
let score = 0;
const choices = ["paper", "scissors", "rock"];
const buttons = [paper, scissors, rock];
buttons.forEach((BTN) => {
  BTN.onclick = () => {
    userChoice = BTN.dataset.name;
    BTN.classList.add(`${BTN.dataset.name}-animation-onClick`);
    main();
  };
});
playagainBTN.onclick = () => {
  playagain();
};
const showUserChoice = () => {
  selectedChoiceSection.classList.remove("hide-content");
  choicesSection.classList.add("hide-content");
};
const playagain = () => {
  rock.classList.remove("rock-animation-onClick");
  paper.classList.remove("paper-animation-onClick");
  scissors.classList.remove("scissors-animation-onClick");
  selectedChoiceSection.classList.add("hide-content");
  choicesSection.classList.remove("hide-content");
  userChoiceImage.parentElement.classList.remove(`${userChoice}Image-outline`);
  computerChoiceImage.parentElement.classList.remove(
    `${computerChoice}Image-outline`
  );
  computerChoiceImage.src = "";
  computerChoiceImage.alt = "";
  stateText.innerHTML = "";
  gameResult.style.display = "none";
  selectedChoiceSection.style.gridTemplateColumns = "repeat(2, auto)";
  player.style.visibility = "hidden";
  playagainBTN.classList.remove(`clr-${computerChoice}`);
  playagainBTN.classList.remove(`clr-${userChoice}`);
};
const applySelectedImage = () => {
  userChoiceImage.src = `./assets/images/icon-${userChoice}.svg`;
  userChoiceImage.alt = `${userChoice}`;
  userChoiceImage.parentElement.classList.add(`${userChoice}Image-outline`);
};
const randomComputerChoice = () => {
  setTimeout(() => {
    const randomNumber = Math.floor(Math.random() * 3);
    computerChoice = choices[randomNumber];
    computerChoiceImage.src = `./assets/images/icon-${computerChoice}.svg`;
    computerChoiceImage.alt = `${computerChoice}`;
    computerChoiceImage.parentElement.classList.add(
      `${computerChoice}Image-outline`
    );
    setTimeout(() => {
      windrawlose();
      gameResult.style.display = "block";
      selectedChoiceSection.style.gridTemplateColumns = "repeat(3, auto)";
    }, 600);
  }, 1500);
  let seconds = 3;
  countdownTimer.innerHTML = "3";
  countdownTimer.style.display = "block";
  const interval = setInterval(() => {
    seconds = seconds - 1;
    countdownTimer.innerHTML = seconds;
    if (seconds < 1) {
      clearInterval(interval);
      countdownTimer.style.display = "none";
    }
  }, 500);
};
const windrawlose = () => {
  let state;
  if (userChoice === computerChoice) state = "draw";
  else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    state = "win";
    player.style.visibility = "visible";
    player.load("https://assets10.lottiefiles.com/packages/lf20_aEFaHc.json");
    score += 1;
    playagainBTN.classList.add(`clr-${userChoice}`);
  } else {
    state = "lose";
    score = score == 0 ? 0 : (score -= 1);
    player.style.visibility = "visible";
    player.load("https://assets5.lottiefiles.com/packages/lf20_t9nbbl1t.json");
    playagainBTN.classList.add(`clr-${computerChoice}`);
  }
  scoreText.innerHTML = `${score}`;
  stateText.innerHTML = `You ${state}`;
};
const main = () => {
  setTimeout(() => {
    showUserChoice();
    applySelectedImage();
    randomComputerChoice();
  }, 500);
};
rulesBTN.onclick = () => {
  modal.classList.toggle("hide-content");
};
modalCloseBTN.onclick = () => {
  modal.classList.add("hide-content");
};
