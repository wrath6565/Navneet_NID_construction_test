let gBall;
let lPaddle;
let rPaddle;
let malusBall = null;

let player1 = 0;
let player2 = 0;

// Timer variables (ms)
let lastSpawnTime = 0;
let spawnInterval = 45000; // 45 seconds between spawns
let malusLifetime = 45000; // malus stays 45 seconds
let malusSpawnedAt = 0;

function setup() {
  createCanvas(800, 400);

  gBall = new Ball(width / 2, height / 2, 3, 3);
  lPaddle = new Paddle(0, height / 2 - 30);
  rPaddle = new Paddle(width - 20, height / 2 - 30);

  lastSpawnTime = millis();
  malusSpawnedAt = 0;
}

function draw() {
  background(20);

  // Score display
  textAlign(CENTER, CENTER);
  textSize(64);
  fill(255);
  text(nf(player1, 3), width / 2 - 100, 50);
  text(":", width / 2, 50);
  text(nf(player2, 3), width / 2 + 100, 50);

  // Main ball
  gBall.move();
  gBall.checkCollisionPaddle(lPaddle);
  gBall.checkCollisionPaddle(rPaddle);
  gBall.checkCollisionWall();
  gBall.show();

  // Paddles
  lPaddle.show();
  rPaddle.show();

  // Scoring
  let point = gBall.checkWinner();
  if (point == 1) {
    if (player1 < 999) player1++;
    gBall.reset();
  } else if (point == 2) {
    if (player2 < 999) player2++;
    gBall.reset();
  }

  // --- Malus ball logic ---
  let currentTime = millis();

  // Spawn malus ball every 45s
  if (!malusBall && currentTime - lastSpawnTime >= spawnInterval) {
    const sx = random(50, width - 50);
    const sy = random(40, height - 40);
    malusBall = new MalusBall(sx, sy);
    malusSpawnedAt = currentTime;
  }

  if (malusBall) {
    malusBall.move();
    malusBall.show();

    // Check collisions
    if (malusBall.checkCollision(lPaddle)) {
      if (player1 > 0) player1--;
      lPaddle.y += 4; // prevent repeated collision
    }
    if (malusBall.checkCollision(rPaddle)) {
      if (player2 > 0) player2--;
      rPaddle.y += 4;
    }

    // Despawn after 45s
    if (currentTime - malusSpawnedAt >= malusLifetime) {
      malusBall = null;
      lastSpawnTime = currentTime;
    }
  }

  // Paddle controls
  if (keyIsDown(UP_ARROW)) rPaddle.moveUp();
  if (keyIsDown(DOWN_ARROW)) rPaddle.moveDown();
  if (keyIsDown(87)) lPaddle.moveUp(); // W
  if (keyIsDown(83)) lPaddle.moveDown(); // S
}
