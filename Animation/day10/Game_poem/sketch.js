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
let frameWidth = 35;
let frameHeight = 81;
let totalFrames = 8;
let currentFrame = 0;
let frameCounter = 0;

let playerDirection = "right";

let backgroundImages = [];
let cloudOverlay;

// Audio
let aSounds = [];
let aSoundsLoaded = [false, false, false, false, false];
let currentSoundIndex = -1;

function preload() {
  spriteSheetRight = loadImage('Image/02.png');
  spriteSheetLeft = loadImage('Image/03.png');

  backgroundImages.push(loadImage('Image/p1.png'));
  backgroundImages.push(loadImage('Image/p2.png'));
  backgroundImages.push(loadImage('Image/p3.png'));
  backgroundImages.push(loadImage('Image/p4.png'));
  backgroundImages.push(loadImage('Image/p5.png'));

  cloudOverlay = loadImage('Image/c1.png');
}

function setup() {
  createCanvas(1440, 1020);

  for (let i = 0; i < totalFrames; i++) {
    spriteFramesRight.push(spriteSheetRight.get(i * frameWidth, 0, frameWidth, frameHeight));
    spriteFramesLeft.push(spriteSheetLeft.get(i * frameWidth, 0, frameWidth, frameHeight));
  }

  resetGame();
  loadMemoryAudio();
}

function loadMemoryAudio() {
  let paths = [
    'Image/a1.mp3',
    'Image/a2.mp3',
    'Image/a3.mp3',
    'Image/a4.mp3',
    'Image/a5.mp3'
  ];

  for (let i = 0; i < paths.length; i++) {
    loadSound(
      paths[i],
      (snd) => {
        aSounds[i] = snd;
        aSoundsLoaded[i] = true;
        console.log("Loaded:", paths[i]);
      },
      (err) => {
        console.warn("Failed to load:", paths[i]);
      }
    );
  }
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
    image(cloudOverlay, 0, 0, width, height);
    drawPlayerManual();
    stopMemorySoundIfPlaying();

  } else if (gameState === "fastCycle") {
    let elapsed = millis() - cycleStartTime;
    let bgInterval = 2000;
    let overallProgress = elapsed / bgInterval;
    currentBg = floor(overallProgress);

    if (currentBg >= backgroundImages.length) {
      gameState = "fastCycleEnd";
      return;
    }

    let within = overallProgress - currentBg;
    playerX = within * width;

    drawBackground();
    image(cloudOverlay, 0, 0, width, height);
    drawPlayerSprite();
    stopMemorySoundIfPlaying();

  } else if (gameState === "fastCycleEnd") {
    background(0);
    fill(255, 204, 0);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("✨ You enjoyed your Diwali ✨", width / 2, height / 2 - 40);
    textSize(18);
    fill(255);
    text("Press ENTER to relive the memory of Diwali", width / 2, height / 2 + 20);
    stopMemorySoundIfPlaying();

  } else if (gameState === "memory") {
    drawBackground();
    drawPlayerSprite();
    manageMemoryAudio();

    if (keyIsDown(RIGHT_ARROW)) {
      playerX += playerSpeed;
      playerDirection = "right";
      if (playerX > width) {
        if (currentBg < backgroundImages.length - 1) {
          currentBg++;
          playerX = 0;
        } else playerX = width;
      }
    }

    if (keyIsDown(LEFT_ARROW)) {
      playerX -= playerSpeed;
      playerDirection = "left";
      if (playerX + frameWidth < 0) {
        if (currentBg > 0) {
          currentBg--;
          playerX = width - frameWidth;
        } else playerX = 0;
      }
    }

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
    fill(255, 204, 0);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("✨ You enjoyed your Diwali ✨", width / 2, height / 2 - 40);
    textSize(18);
    fill(255);
    text("Press ESC to end the process", width / 2, height / 2 + 10);
    text("or", width / 2, height / 2 + 35);
    text("Press ENTER to relive the memory of Diwali", width / 2, height / 2 + 60);
    stopMemorySoundIfPlaying();
  }
}

function drawBackground() {
  image(backgroundImages[currentBg], 0, 0, width, height);
}

function drawPlayerSprite() {
  let frames = playerDirection === "right" ? spriteFramesRight : spriteFramesLeft;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW)) {
    frameCounter++;
    if (frameCounter % 5 === 0) currentFrame = (currentFrame + 1) % totalFrames;
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
    try { if (typeof getAudioContext === 'function') getAudioContext().resume(); } catch (e) {}
    gameState = "memory";
  }
}

function resetGame() {
  currentBg = 0;
  playerX = 0;
  playerY = 790;
  sparkles = [];
  currentFrame = 0;
  frameCounter = 0;
  playerDirection = "right";
  stopMemorySoundIfPlaying();
}

function manageMemoryAudio() {
  if (!aSounds || aSounds.length === 0) return;
  if (currentSoundIndex !== currentBg) {
    if (currentSoundIndex !== -1 && aSounds[currentSoundIndex] && aSounds[currentSoundIndex].isPlaying()) {
      try { aSounds[currentSoundIndex].stop(); } catch (e) {}
    }

    currentSoundIndex = currentBg;
    let s = aSounds[currentSoundIndex];
    if (s && aSoundsLoaded[currentSoundIndex]) {
      try { getAudioContext().resume(); } catch (e) {}
      try { s.loop(); console.log("Playing:", currentSoundIndex); } catch (e) {}
    }
  }
}

function stopMemorySoundIfPlaying() {
  if (currentSoundIndex !== -1 && aSounds[currentSoundIndex]) {
    try { aSounds[currentSoundIndex].stop(); } catch (e) {}
  }
  currentSoundIndex = -1;
}
