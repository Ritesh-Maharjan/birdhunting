// creating the game context
const myGame = document.getElementById("myGame");
const ctx = myGame.getContext("2d");

// setting up the variables
let birdArr = [];
let shotX = null;
let shotY = null;
let score = 0;
let lives = 3;
let movementSpeed;
let addBirdSpeed;
const maxBirdSpawn = 3;
let volume = 0.25;
const spriteArr = [];

// storing all the images that makes the bird animation in sprite array
for (let i = 1; i < 5; i++) {
  const img = new Image();
  img.src = `assets/sprite/bird-${i}.png`;
  spriteArr.push(img);
}

// Bird class to create multiple instance of a bird
class Bird {
  // setting up the bird properties
  constructor() {
    this.height = 40;
    this.width = 40;
    this.positionX = Math.random() * (myGame.width - this.width);
    this.positionY = myGame.height - this.height;
    this.moveX = 0;
    this.moveY = 0;
    this.dead = false;
    this.spritePos = 0;
  }

  // drawing the bird in the game
  drawBird() {
    // if end of sprites, want to go to first sprite to continue the animation
    if (this.spritePos === 4) {
      this.spritePos = 0;
    }
    ctx.beginPath();
    // drawing the bird, takes image, position in X axis, position in Y axis, height and width of the image
    ctx.drawImage(
      spriteArr[this.spritePos],
      this.positionX,
      this.positionY,
      this.height,
      this.width
    );
    ctx.fill();
    ctx.closePath();
    this.spritePos++;
  }

  // moving the bird
  move() {
    this.positionX += this.moveX;
    this.positionY += this.moveY;
  }

  // changing the position of the bird so that it moves in both right and left
  changeX(val) {
    this.moveX = val;
  }
  // changing the position of the bird so that it moves in both up and down
  changeY(val) {
    this.moveY = val;
  }

  // creating multiple instances of the bird to start the game
  static createBird(spawnAmt) {
    for (let i = 0; i < spawnAmt; i++) {
      birdArr[i] = new Bird();
    }
  }
}

// function to move the birds randomly in X axis i.e. left to right
function randomMovementX() {
  for (let i = 0; i < birdArr.length; i++) {
    // to move the birds randomly to both right and left sie
    if (Math.random() > 0.5) {
      birdArr[i].changeX(-movementSpeed);
    } else {
      birdArr[i].changeX(movementSpeed);
    }
  }
}

// function to move the birds fly up
function randomMovementY() {
  for (let i = 0; i < birdArr.length; i++) {
    birdArr[i].changeY(-movementSpeed);
  }
}

// changing the position of the bird so that it doesnt go out of screen
function checkSideways() {
  for (let i = 0; i < birdArr.length; i++) {
    if (
      // checking the position of the bird on the right side
      birdArr[i].positionX + birdArr[i].moveX >
        myGame.width - birdArr[i].width ||
      // checking the position of the bird on he left side
      birdArr[i].positionX + birdArr[i].moveX < 0
    ) {
      birdArr[i].changeX(-birdArr[i].moveX);
    }
  }
}

// checking if the bird is dead and removing them from game by kicking them out of bird array
function checkbirdDeath() {
  for (let i = 0; i < birdArr.length; i++) {
    // Checking if bird is shot or not
    if (
      birdArr[i].positionX < shotX + 20 &&
      birdArr[i].positionX + birdArr[i].width > shotX &&
      birdArr[i].positionY < shotY + 20 &&
      birdArr[i].positionY + birdArr[i].height > shotY
    ) {
      // adding points if the bird is shot
      score += 100;
      birdArr.splice(i, 1);
      return;
    }
  }
}

// checking if the bird survived till they got out of screen
function checkbirdSurvive() {
  for (let i = 0; i < birdArr.length; i++) {
    const { positionY, moveY, height } = birdArr[i];

    // if the bird survived till they got out of screen
    if (positionY + moveY < 0 - height) {
      lives--;
      birdArr.splice(i, 1);
      const audio = new Audio("./assets/sounds/break.mp3");
      audio.volume = volume;
      audio.play();
    }
    // if all our health is over
    if (lives === 0) {
      const audio = new Audio("./assets/sounds/gameover.mp3");
      scoreEl.innerText = score;
      gameOverMenu.style.display = "flex";
      startGame = false;
      myGame.style.display = "none";
      setTimeout(() => {
        audio.volume = volume;
        audio.play();
      }, 1000);
    }
  }
}

// drawing the score
function drawScore() {
  ctx.font = "32px Indie Flower";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: ${score}`, 8, 40);
}

// drawing the lvies
function drawLives() {
  for (let i = 0; i < lives; i++) {
    const img = new Image();
    img.src = "./assets/images/heart.png";
    ctx.drawImage(img, myGame.width - 50 - 40 * i, 10);
  }
}

function update() {
  //   check if the bird is flying sideways/ their death and survival
  checkSideways();
  checkbirdDeath();
  checkbirdSurvive();
}

// drawing the bird
function draw() {
  ctx.clearRect(0, 0, myGame.width, myGame.height);
  // updating the bird if they survived, going out of bonds or dead
  update();
  for (let i = 0; i < birdArr.length; i++) {
    birdArr[i].drawBird();
    birdArr[i].move();
  }

  // drawing the score and lives
  drawScore();
  drawLives();

  // starting the game by running the requestAnimationFrame
  if (startGame) {
    setTimeout(() => {
      requestAnimationFrame(draw);
    }, 2000 / 25);
  }
}

// checking where the gun was shot
myGame.addEventListener("mousedown", (e) => {
  shotX = e.clientX - myGame.offsetLeft;
  shotY = e.clientY - myGame.offsetTop;

  let audio = new Audio("./assets/sounds/gunshot.mp3");
  audio.volume = volume;
  audio.play();
});

// reseting the gun shot
myGame.addEventListener("mouseup", (e) => {
  shotX = null;
  shotY = null;
});

// adding the bird randomly once game starts
function addBird() {
  let birdCount = Math.floor(Math.random() * maxBirdSpawn + 1);
  for (let i = 0; i < birdCount; i++) {
    let tempbird = new Bird();
    birdArr.push(tempbird);
  }
}

// chaing the movement of the bird every 1 second
setInterval(function () {
  requestAnimationFrame(randomMovementX);
  requestAnimationFrame(randomMovementY);
}, 1000);

// increasing the speed of the bird every 5 seconds
setInterval(() => {
  movementSpeed += 1;
}, 5000);

// Increase the bird adding speed every 10 seconds
setInterval(() => {
  addBirdSpeed -= 500;
}, 10000);
