let leftPaddle, rightPaddle;
let balls = [];
let malusBalls = [];
let leftScore = 0;
let rightScore = 0;

const MALUS_LIMIT = 1000; 
let apocalypseStart = null; 
let apocalypseDuration = 30000; 
let apocalypseFullTime = null; 
let diedShown = false;
let allowRestart = false; // allow restarting after black screen

function setup() {
  createCanvas(windowWidth-15, windowHeight-15);
  resetGame();
}

function draw() {
  // If player died and restart is allowed, show black screen
  if (diedShown) {
    background(0);
    fill(255, 0, 0);
    textSize(100);
    textAlign(CENTER, CENTER);
    text("YOU DIED", width / 2, height / 2 - 50);

    // If black screen wait is over, show restart text
    if (allowRestart) {
      textSize(32);
      fill(255);
      text("Press ENTER to start again", width / 2, height / 2 + 50);
    }
    return;
  }

  // Background transition
  if (apocalypseStart) {
    let elapsed = millis() - apocalypseStart;
    let t = constrain(elapsed / apocalypseDuration, 0, 1);
    background(lerpColor(color(0), color(255, 0, 0), t));

    if (t === 1 && !apocalypseFullTime) {
      apocalypseFullTime = millis();
    }

    // After 20 seconds of full red, show black screen
    if (apocalypseFullTime && millis() - apocalypseFullTime > 20000) {
      diedShown = true;
      allowRestart = true;
      return;
    }
  } else {
    background(0);
  }

  // Center dashed line
  stroke(255);
  for (let y = 0; y < height; y += 20) {
    line(width / 2, y, width / 2, y + 10);
  }

  // Show and update paddles
  leftPaddle.show();
  rightPaddle.show();
  leftPaddle.update();
  rightPaddle.update();

  // Normal balls
  for (let b of balls) {
    b.update();
    b.show();
    b.checkPaddle(leftPaddle);
    b.checkPaddle(rightPaddle);
  }

  // Malus balls
  for (let m of malusBalls) {
    m.update();
    m.show();
    m.checkPaddle(leftPaddle);
    m.checkPaddle(rightPaddle);

    if (
      millis() - m.spawnTime > 15000 &&
      !m.multiplied &&
      malusBalls.length < MALUS_LIMIT
    ) {
      m.multiplied = true;
      let remaining = MALUS_LIMIT - malusBalls.length;
      let spawnCount = min(10, remaining);
      for (let i = 0; i < spawnCount; i++) {
        malusBalls.push(new MalusBall(m.x, m.y));
      }
    }
  }

  // Trigger apocalypse
  if (malusBalls.length >= MALUS_LIMIT && !apocalypseStart) {
    apocalypseStart = millis();
  }

  // Display scores
  textSize(48);
  noStroke();
  fill(255);
  textAlign(CENTER, TOP);
  text(leftScore, width / 4, 40);
  text(rightScore, (3 * width) / 4, 40);
}

// Restart game on ENTER after death
function keyPressed() {
  if (diedShown && allowRestart && keyCode === ENTER) {
    resetGame();
  }

  if (!diedShown) {
    if (key === 'W' || key === 'w') leftPaddle.move(-15);
    if (key === 'S' || key === 's') leftPaddle.move(15);
    if (keyCode === UP_ARROW) rightPaddle.move(-15);
    if (keyCode === DOWN_ARROW) rightPaddle.move(15);
  }
}

function keyReleased() {
  if (!diedShown) {
    leftPaddle.move(0);
    rightPaddle.move(0);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  leftPaddle = new Paddle(30);
  rightPaddle = new Paddle(width - 40);
}

// Reset game to initial state
function resetGame() {
  leftPaddle = new Paddle(30);
  rightPaddle = new Paddle(width - 40);
  balls = [new Ball()];
  malusBalls = [];
  leftScore = 0;
  rightScore = 0;
  apocalypseStart = null;
  apocalypseFullTime = null;
  diedShown = false;
  allowRestart = false;
}

// Paddle class
class Paddle {
  constructor(x) {
    this.x = x;
    this.y = height / 2 - 60;
    this.w = 15;
    this.h = 120;
    this.yspeed = 0;
  }

  show() {
    noStroke();
    let alphaVal = map(sin(millis() * 0.005 + this.x), -1, 1, 0, 200);
    fill(255, alphaVal);
    rect(this.x, this.y, this.w, this.h, 5);
  }

  move(speed) {
    this.yspeed = speed;
  }

  update() {
    this.y += this.yspeed;
    this.y = constrain(this.y, 0, height - this.h);
  }
}

// Normal ball
class Ball {
  constructor(x = width / 2, y = height / 2) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.xspeed = random([-6, 6]);
    this.yspeed = random(-4, 4);
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r);
  }

  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;

    if (random(1) < 0.001) this.xspeed *= -1;
    if (random(1) < 0.001) this.yspeed = 0;

    if (this.y < 0 || this.y > height) this.yspeed *= -1;

    if (this.x < 0) { rightScore++; this.reset(); }
    if (this.x > width) { leftScore++; this.reset(); }
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xspeed = random([-6, 6]);
    this.yspeed = random(-4, 4);
  }

  checkPaddle(paddle) {
    if (
      this.x - this.r / 2 < paddle.x + paddle.w &&
      this.x + this.r / 2 > paddle.x &&
      this.y > paddle.y &&
      this.y < paddle.y + paddle.h
    ) {
      this.xspeed *= -1.1;
      if (malusBalls.length < MALUS_LIMIT) {
        malusBalls.push(new MalusBall(this.x, this.y));
      }
    }
  }
}

// Malus ball
class MalusBall extends Ball {
  constructor(x, y) {
    super(x, y);
    this.col = color(255, 0, 0);
    this.spawnTime = millis();
    this.multiplied = false;
  }

  show() {
    fill(this.col);
    ellipse(this.x, this.y, this.r);
  }

  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;

    if (random(1) < 0.002) this.xspeed *= -1;
    if (random(1) < 0.002) this.yspeed *= -1;
    if (random(1) < 0.001) this.xspeed = random(-8, 8);
    if (random(1) < 0.001) this.yspeed = random(-8, 8);

    if (this.y < 0 || this.y > height) this.yspeed *= -1;
    if (this.x < 0 || this.x > width) this.xspeed *= -1;
  }

  checkPaddle(paddle) {
    if (
      this.x - this.r / 2 < paddle.x + paddle.w &&
      this.x + this.r / 2 > paddle.x &&
      this.y > paddle.y &&
      this.y < paddle.y + paddle.h
    ) {
      this.xspeed *= -1.1;
      if (paddle === leftPaddle) leftScore--;
      if (paddle === rightPaddle) rightScore--;
    }
  }
}
