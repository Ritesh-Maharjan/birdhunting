const mainMenu = document.getElementById("mainmenu");
const startGameBtn = document.getElementById("startGame");
const instructionBtn = document.getElementById("instructions");
const instructionDiv = document.getElementById("instructionDiv");
const gameOverMenu = document.getElementById("gameOverMenu");
const playAgain = document.getElementById("playAgain");
const scoreEl = document.getElementById("score");
const menuBtn = document.querySelectorAll("#menuBtn");
const slider = document.getElementById("myAudio");
const creditsBtn = document.getElementById("credits");
const gameCredits = document.getElementById("gameCredits");
let addBirdInterval;

let startGame = false;

slider.oninput = function () {
  volume = this.value / 100;
};

startGameBtn.addEventListener("click", () => {
  mainMenu.style.display = "none";
  myGame.style.display = "flex";
  gameStart();
});

instructionBtn.addEventListener("click", () => {
  mainMenu.style.display = "none";
  instructionDiv.style.display = "flex";
});

instructionDiv.addEventListener("click", () => {
  mainMenu.style.display = "flex";
  instructionDiv.style.display = "none";
});

playAgain.addEventListener("click", () => {
  gameOverMenu.style.display = "none";
  myGame.style.display = "block";
  gameStart();
});

menuBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    backToMenu(e.target.getAttribute("data-name"));
  });
});

creditsBtn.addEventListener("click", () => {
  mainMenu.style.display = "none";
  gameCredits.style.display = "flex";
});

function gameStart() {
  startGame = true;
  score = 0;
  lives = 3;
  movementSpeed = 2;
  addBirdSpeed = 4000;
  birdArr = [];
  Bird.createBird(maxBirdSpawn);
  draw();
  clearInterval(addBirdInterval);
  addBirdInterval = setInterval(addBird, addBirdSpeed);
}

// function to go back to menu from all the pages
function backToMenu(div) {
  switch (div) {
    case "credits":
      gameCredits.style.display = "none";
      break;
    case "game":
      gameOverMenu.style.display = "none";
      break;
    case "instruction":
      instructionDiv.style.display = "none";
      break;
  }
  mainMenu.style.display = "flex";
}
