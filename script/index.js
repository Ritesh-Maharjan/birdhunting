const mainMenu = document.getElementById("mainmenu");
const startGameBtn = document.getElementById("startGame");
const instructionBtn = document.getElementById("instructions");
const instructionDiv = document.getElementById("instructionDiv");
const gameOverMenu = document.getElementById("gameOverMenu");
const playAgain = document.getElementById("playAgain");
const scoreEl = document.getElementById("score");
const backToMenu = document.getElementById("backToMenu");
const slider = document.getElementById("myAudio")
let addBirdInterval;

let startGame = false;


slider.oninput = function() {
  volume = this.value / 100
}


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

backToMenu.addEventListener("click", () => {
  gameOverMenu.style.display = "none";
  mainMenu.style.display = "flex";
});

function gameStart() {
  startGame = true;
  score = 0;
  lives = 3;
  movementSpeed = 2;
  addBirdSpeed = 4000;
  birdArr = [];
  createBird();
  draw();
  clearInterval(addBirdInterval);
  addBirdInterval = setInterval(addBird, addBirdSpeed);
}
