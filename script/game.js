const myGame = document.getElementById("myGame");
const ctx = myGame.getContext("2d");

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

for (let i = 1; i < 5; i++) {
  const img = new Image();
  img.src = `assets/sprite/bird-${i}.png`;
  spriteArr.push(img);
}

class Bird {
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

  drawBird() {
    if (this.spritePos === 4) {
      this.spritePos = 0;
    }
    ctx.beginPath();
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

  move() {
    this.positionX += this.moveX;
    this.positionY += this.moveY;
  }

  changeX(val) {
    this.moveX = val;
  }
  changeY(val) {
    this.moveY = val;
  }

  static createBird(spawnAmt) {
    for (let i = 0; i < spawnAmt; i++) {
      birdArr[i] = new Bird();
    }
  }
}

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

function randomMovementY() {
  for (let i = 0; i < birdArr.length; i++) {
    birdArr[i].changeY(-movementSpeed);
  }
}

function checkSideways() {
  for (let i = 0; i < birdArr.length; i++) {
    if (
      // checking the position of the bird on the right side
      birdArr[i].positionX + birdArr[i].moveX >
        myGame.width - birdArr[i].width ||
      //   cecking the position of the bird on he left side
      birdArr[i].positionX + birdArr[i].moveX < 0
    ) {
      birdArr[i].changeX(-birdArr[i].moveX);
    }
  }
}

function checkbirdDeath() {
  for (let i = 0; i < birdArr.length; i++) {
    // Checking if bird is shot or not
    if (
      birdArr[i].positionX < shotX + 20 &&
      birdArr[i].positionX + birdArr[i].width > shotX &&
      birdArr[i].positionY < shotY + 20 &&
      birdArr[i].positionY + birdArr[i].height > shotY
    ) {
      score += 100;
      birdArr.splice(i, 1);
      return;
    }
  }
}

function checkbirdSurvive() {
  for (let i = 0; i < birdArr.length; i++) {
    const { positionY, moveY, height } = birdArr[i];
    if (positionY + moveY < 0 - height) {
      lives--;
      birdArr.splice(i, 1);
      const audio = new Audio("./assets/sounds/break.mp3");
      audio.volume = volume;
      audio.play();
    }
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

function drawScore() {
  ctx.font = "32px Indie Flower";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: ${score}`, 8, 40);
}

function drawLives() {
  for (let i = 0; i < lives; i++) {
    const img = new Image();
    img.src = "./assets/images/heart.png";
    ctx.drawImage(img, myGame.width - 50 - 40 * i, 10);
  }
}

function update() {
  //   check if the bird is flying sideways
  checkSideways();
  checkbirdDeath();
  checkbirdSurvive();
}

function draw() {
  ctx.clearRect(0, 0, myGame.width, myGame.height);
  update();
  for (let i = 0; i < birdArr.length; i++) {
    birdArr[i].drawBird();
    birdArr[i].move();
  }

  drawScore();
  drawLives();
  if (startGame) {
    setTimeout(() => {
      requestAnimationFrame(draw);
    }, 2000 / 25);
  }
}

myGame.addEventListener("mousedown", (e) => {
  shotX = e.clientX - myGame.offsetLeft;
  shotY = e.clientY - myGame.offsetTop;

  let audio = new Audio("./assets/sounds/gunshot.mp3");
  audio.volume = volume;
  audio.play();
});

myGame.addEventListener("mouseup", (e) => {
  shotX = null;
  shotY = null;
});

function addBird() {
  let birdCount = Math.floor(Math.random() * maxBirdSpawn + 1);
  for (let i = 0; i < birdCount; i++) {
    let tempbird = new Bird();
    birdArr.push(tempbird);
  }
}

setInterval(function () {
  requestAnimationFrame(randomMovementX);
  requestAnimationFrame(randomMovementY);
}, 1000);

setInterval(() => {
  movementSpeed += 1;
}, 5000);

setInterval(() => {
  addBirdSpeed -= 500;
}, 10000);
