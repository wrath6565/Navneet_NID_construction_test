let currentBg = 0;
let playerX;
let playerY;
let playerSpeed = 8;

let gameState = "start"; // "start", "playing", "fastCycle", "fastCycleEnd", "memory", "end"
let cycleStartTime = 0;

let sparkles = [];

let spriteSheetRight, spriteSheetLeft;
let spriteFramesRight = [];
let spriteFramesLeft = [];
let frameWidth = 35; // adjust based on your sprite frame size
let frameHeight = 81;
let totalFrames = 8; // total frames in your sprite sheet
let currentFrame = 0;
let frameCounter = 0; // for animation timing

let playerDirection = "right"; // "right" or "left"

// Platform properties
let platformHeight = 100;

// Background images array
let backgroundImages = [];

function preload() {
  // Load player sprites
  spriteSheetRight = loadImage('Image/02.png'); // right-facing sprite
  spriteSheetLeft = loadImage('Image/03.png'); // left-facing sprite

  // Load background images
  backgroundImages.push(loadImage('Image/bg1.png'));
  backgroundImages.push(loadImage('Image/bg2.png'));
  backgroundImages.push(loadImage('Image/bg3.png'));
  backgroundImages.push(loadImage('Image/bg4.png'));
  backgroundImages.push(loadImage('Image/bg5.png'));
}

function setup() {
  createCanvas(1440, 1020);

  // Slice right-facing sprite sheet
  for (let i = 0; i < totalFrames; i++) {
    let frame = spriteSheetRight.get(i * frameWidth, 0, frameWidth, frameHeight);
    spriteFramesRight.push(frame);
  }

  // Slice left-facing sprite sheet
  for (let i = 0; i < totalFrames; i++) {
    let frame = spriteSheetLeft.get(i * frameWidth, 0, frameWidth, frameHeight);
    spriteFramesLeft.push(frame);
  }

  resetGame();
}

function draw() {
  if (gameState === "start") {
    background(0);
    fill(255, 204, 0);
    textAlign(CENTER, CENTER);
    textSize(40);
    text("🎆 Time to enjoy Diwali 🎆", width / 2, height / 2 - 30);
    textSize(20);
    fill(255);
    text("Press ENTER to start", width / 2, height / 2 + 30);

  } else if (gameState === "playing") {
    drawBackground();
    drawPlatform();
    drawPlayerManual();

  } else if (gameState === "fastCycle") {
    let elapsed = millis() - cycleStartTime;
    let bgInterval = 2000; // 2 seconds per background
    let overallProgress = elapsed / bgInterval;
    currentBg = floor(overallProgress);

    // If all backgrounds have cycled, go to black end screen
    if (currentBg >= backgroundImages.length) {
      gameState = "fastCycleEnd";
      return;
    }

    let within = overallProgress - currentBg;
    playerX = within * width;

    drawBackground();
    drawPlatform();
    drawPlayerSprite();

  } else if (gameState === "fastCycleEnd") {
    background(0); // black screen
    fill(255, 204, 0);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("✨ You enjoyed your Diwali ✨", width / 2, height / 2 - 40);
    textSize(18);
    fill(255);
    text("Press ENTER to relive the memory of Diwali", width / 2, height / 2 + 20);

  } else if (gameState === "memory") {
    drawBackground();
    drawPlatform();
    drawPlayerSprite();

    // movement logic in memory mode
    if (keyIsDown(RIGHT_ARROW)) {
      playerX += playerSpeed;
      playerDirection = "right";

      // move to next background if player crosses the right edge
      if (playerX > width) {
        if (currentBg < backgroundImages.length - 1) {
          currentBg++;
          playerX = 0;
        } else {
          playerX = width; // stay at right edge on last background
        }
      }
    }

    if (keyIsDown(LEFT_ARROW)) {
      playerX -= playerSpeed;
      playerDirection = "left";

      // move to previous background if player crosses left edge
      if (playerX + frameWidth < 0) {
        if (currentBg > 0) {
          currentBg--;
          playerX = width - frameWidth;
        } else {
          playerX = 0; // stay at left edge on first background
        }
      }
    }

    // sparkles
    if (random() < 0.05) {
      sparkles.push({
        x: random(width),
        y: height,
        size: random(3, 8),
        alpha: random(150, 255),
        speed: random(0.5, 2)
      });
    }

    for (let i = sparkles.length - 1; i >= 0; i--) {
      let s = sparkles[i];
      noStroke();
      fill(255, 255, 100, s.alpha);
      ellipse(s.x, s.y, s.size);
      s.y -= s.speed;
      s.alpha -= 1.5;
      if (s.alpha <= 0) sparkles.splice(i, 1);
    }

  } else if (gameState === "end") {
    drawBackground();
    drawPlatform();
    fill(255, 204, 0);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("✨ You enjoyed your Diwali ✨", width / 2, height / 2 - 40);
    textSize(18);
    fill(255);
    text("Press ESC to end the process", width / 2, height / 2 + 10);
    text("or", width / 2, height / 2 + 35);
    text("Press ENTER to relive the memory of Diwali", width / 2, height / 2 + 60);
  }
}

function drawBackground() {
  image(backgroundImages[currentBg], 0, 0, width, height);
}

function drawPlatform() {
  fill(0); // black
  noStroke();
  rect(0, height - platformHeight, width, platformHeight);
}

function drawPlayerSprite() {
  let frames = playerDirection === "right" ? spriteFramesRight : spriteFramesLeft;

  // animate only when moving
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW)) {
    frameCounter++;
    if (frameCounter % 5 === 0) { // slower animation
      currentFrame = (currentFrame + 1) % totalFrames;
    }
  }

  image(frames[currentFrame], playerX, playerY, frameWidth, frameHeight);
}

function drawPlayerManual() {
  drawPlayerSprite();

  if (keyIsDown(RIGHT_ARROW)) {
    playerX += playerSpeed;
    playerDirection = "right";
  }
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= playerSpeed;
    playerDirection = "left";
  }

  if (playerX > width) {
    currentBg = (currentBg + 1) % backgroundImages.length;
    playerX = -frameWidth;
  } else if (playerX + frameWidth < 0) {
    currentBg = (currentBg - 1 + backgroundImages.length) % backgroundImages.length;
    playerX = width;
  }
}

function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) gameState = "playing";
  if (gameState === "playing" && keyCode === RIGHT_ARROW) {
    playerX = 0;
    cycleStartTime = millis();
    gameState = "fastCycle";
  }
  if (gameState === "end" && keyCode === ESCAPE) noLoop();
  if ((gameState === "end" || gameState === "fastCycleEnd") && keyCode === ENTER) {
    resetGame();
    gameState = "memory";
  }
}

function resetGame() {
  currentBg = 0;
  playerX = 0;                  // 3/4 of the screen width
  playerY = 790; // stand on platform
  sparkles = [];
  currentFrame = 0;
  frameCounter = 0;
  playerDirection = "right";
}
