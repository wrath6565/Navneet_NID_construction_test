let gBall;
let lPaddle;
let rPaddle;
let player1 = 0;
let player2 = 0;

let malusBall = null;
let malusActive = false;
let lastMalusTime = 0;
let malusDuration = 45000; // 45 seconds visible
let malusCooldown = 45000; // 45 seconds delay between spawns

function setup() {
  createCanvas(800, 400);
  gBall = new Ball(width / 2, height / 2, 5, 5);
  lPaddle = new Paddle(0, height / 2 - 30);
  rPaddle = new Paddle(width - 20, height / 2 - 30);
  lastMalusTime = millis();
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

  // --- MAIN BALL ---
  gBall.move();
  gBall.checkCollisionWall();
  gBall.checkCollisionPaddle(lPaddle);
  gBall.checkCollisionPaddle(rPaddle);
  gBall.show();

  // --- PADDLES ---
  lPaddle.show();
  rPaddle.show();

  // --- SCORE UPDATE ---
  let point = gBall.checkWinner();
  if (point == 1) {
    if (player1 < 999) player1++;
    gBall.reset();
  } else if (point == 2) {
    if (player2 < 999) player2++;
    gBall.reset();
  }

  // --- PLAYER CONTROLS ---
  if (keyIsDown(UP_ARROW)) rPaddle.moveUp();
  if (keyIsDown(DOWN_ARROW)) rPaddle.moveDown();
  if (keyIsDown(87)) lPaddle.moveUp(); // W
  if (keyIsDown(83)) lPaddle.moveDown(); // S

  // --- MALUS BALL TIMER SYSTEM ---
  let currentTime = millis();

  // Spawn malus ball after cooldown if inactive
  if (!malusActive && currentTime - lastMalusTime >= malusCooldown) {
    malusBall = new MalusBall(gBall.x, gBall.y, 5);
    malusActive = true;
    lastMalusTime = currentTime;
  }

  // Despawn after 45 seconds
  if (malusActive && currentTime - lastMalusTime >= malusDuration) {
    malusBall = null;
    malusActive = false;
    lastMalusTime = currentTime;
  }

  // --- MALUS BALL BEHAVIOR ---
  if (malusBall && malusBall.active) {
    malusBall.move();
    malusBall.checkCollisionWall();
    malusBall.checkCollisionPaddle(lPaddle, true);
    malusBall.checkCollisionPaddle(rPaddle, false);
    malusBall.show();
  } else if (malusBall && !malusBall.active) {
    // if hit a paddle, remove it immediately
    malusBall = null;
    malusActive = false;
    lastMalusTime = millis();
  }
}
