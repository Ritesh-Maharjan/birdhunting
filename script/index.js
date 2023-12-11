// setting up html elelemnts being used in the game
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
let muted = true;
const audioImg = document.getElementById("audioImg");

let startGame = false;

// change the volume of the audio
slider.oninput = function () {
  volume = this.value / 100;
  audioImg.src = "assets/images/audio.svg";
};

// toggling the mute audio/img
audioImg.addEventListener("click", () => {
  if (muted) {
    volume = 0;
    audioImg.src = "assets/images/mute.svg";
    slider.value = 0;
    muted = !muted;
  } else {
    volume = 50;
    audioImg.src = "assets/images/audio.svg";
    slider.value = 50;
    muted = !muted;
  }
});

// start game and hide menu
startGameBtn.addEventListener("click", () => {
  mainMenu.style.display = "none";
  myGame.style.display = "flex";
  gameStart();
});

// show instructions and hide menu
instructionBtn.addEventListener("click", () => {
  mainMenu.style.display = "none";
  instructionDiv.style.display = "flex";
});

// hiding instructions and showing menu
instructionDiv.addEventListener("click", () => {
  mainMenu.style.display = "flex";
  instructionDiv.style.display = "none";
});

// replay the game
playAgain.addEventListener("click", () => {
  gameOverMenu.style.display = "none";
  myGame.style.display = "block";
  gameStart();
});

// adding back to menu for all the back to menu buttons inside game
menuBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    backToMenu(e.target.getAttribute("data-name"));
  });
});

// credits page
creditsBtn.addEventListener("click", () => {
  mainMenu.style.display = "none";
  gameCredits.style.display = "flex";
});

// start game
function gameStart() {
  // setting up the all the variables
  startGame = true;
  score = 0;
  lives = 3;
  movementSpeed = 2;
  addBirdSpeed = 4000;
  birdArr = [];
  // creating the bird initially when game started
  Bird.createBird(maxBirdSpawn);
  draw();
  // clearing the old addbird interval when user replays otherwise will have tons of bird as user replays multipe games
  clearInterval(addBirdInterval);
  // adding the bird randomly every defined seconds
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
