let gBall;
let lPaddle;
let rPaddle;
let player1 = 0;
let player2 = 0;

let pingSound;

function preload(){
  pingSound = loadSound("assets/2.mp3")
}

function setup() {
  createCanvas(800, 400);
  gBall = new Ball(width / 2, height / 2, 3, 3);
  lPaddle = new paddle(0, height / 2 - 30);
  rPaddle = new paddle(width - 20, height / 2 - 30);


}

function draw() {
  background(20);

  // --- SCORE DISPLAY ---
  textAlign(CENTER, CENTER);
  textSize(64);
  fill(255);
  text(nf(player1, 3), width / 2 - 100, 50); // left score
  text(":", width / 2, 50);
  text(nf(player2, 3), width / 2 + 100, 50); // right score

  // --- PADDLES ---
  lPaddle.show();
  rPaddle.show();

  // --- BALL BEHAVIOR ---
  gBall.move();
  gBall.checkCollisionPaddle(lPaddle);
  gBall.checkCollisionPaddle(rPaddle);
  gBall.checkCollisionWall();
  gBall.show();

  let point = gBall.checkWinner();
  if (point == 1) {
    if (player1 < 999) player1++;  // cap at 999
    gBall.reset();
  } else if (point == 2) {
    if (player2 < 999) player2++;  // cap at 999
    gBall.reset();
  }

  // --- PADDLE CONTROLS ---
  if (keyIsDown(UP_ARROW)) {
    rPaddle.moveUp();
  } else if (keyIsDown(DOWN_ARROW)) {
    rPaddle.moveDown();
  }

  if (keyIsDown(87)) { // W key
    lPaddle.moveUp();
  } else if (keyIsDown(83)) { // S key
    lPaddle.moveDown();
  }
}
