let gBall;
let lPaddle;
let rPaddle;
let malusBall = null; // the harmful ball

let player1 = 0;
let player2 = 0;
let totalHits = 0; // keeps track of total score changes for spawning

function setup() {
  createCanvas(800, 400);
  gBall = new Ball(width / 2, height / 2, 3, 3);
  lPaddle = new Paddle(0, height / 2 - 30);
  rPaddle = new Paddle(width - 20, height / 2 - 30);
}

function draw() {
  background(20);

  // --- SCORE DISPLAY ---
  textAlign(CENTER, CENTER);
  textSize(64);
  fill(255);
  text(nf(player1, 3), width / 2 - 100, 50);
  text(":", width / 2, 50);
  text(nf(player2, 3), width / 2 + 100, 50);

  // --- PADDLES ---
  lPaddle.show();
  rPaddle.show();

  // --- MAIN BALL ---
  gBall.move();
  gBall.checkCollisionPaddle(lPaddle);
  gBall.checkCollisionPaddle(rPaddle);
  gBall.checkCollisionWall();
  gBall.show();

  // --- SCORING ---
  let point = gBall.checkWinner();
  if (point == 1) {
    if (player1 < 999) player1++;
    gBall.reset();
    totalHits++;
  } else if (point == 2) {
    if (player2 < 999) player2++;
    gBall.reset();
    totalHits++;
  }

  // --- MALUS BALL SPAWN LOGIC ---
  if (totalHits % 5 === 0 && totalHits !== 0 && malusBall == null) {
    malusBall = new MalusBall(random(100, width - 100), random(50, height - 50));
  }

  // --- MALUS BALL BEHAVIOR ---
  if (malusBall) {
    malusBall.show();

    // check collision with paddles
    if (malusBall.checkCollision(lPaddle)) {
      if (player1 > 0) player1--;
      malusBall.hits++;
    }
    if (malusBall.checkCollision(rPaddle)) {
      if (player2 > 0) player2--;
      malusBall.hits++;
    }

    // despawn after 2 hits
    if (malusBall.hits >= 2) {
      malusBall = null;
    }
  }

  // --- PADDLE CONTROLS ---
  if (keyIsDown(UP_ARROW)) {
    rPaddle.moveUp();
  } else if (keyIsDown(DOWN_ARROW)) {
    rPaddle.moveDown();
  }

  if (keyIsDown(87)) {
    lPaddle.moveUp();
  } else if (keyIsDown(83)) {
    lPaddle.moveDown();
  }
}
