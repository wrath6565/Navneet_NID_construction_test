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

// 🌫️ cloud overlay image for foggy memory
let cloudOverlay;

// Background images array
let backgroundImages = [];

// 🔊 Audio for memory backgrounds
let aSounds = [];          // will hold p5.SoundFile objects for a1..a5
let aSoundsLoaded = [false, false, false, false, false]; // track loaded state
let currentSoundIndex = -1; // index of currently playing sound in memory (-1 = none)

function preload() {
  // Load player sprites
  spriteSheetRight = loadImage('Image/02.png'); // right-facing sprite
  spriteSheetLeft = loadImage('Image/03.png'); // left-facing sprite

  // Load background images
  backgroundImages.push(loadImage('Image/p1.png'));
  backgroundImages.push(loadImage('Image/p2.png'));
  backgroundImages.push(loadImage('Image/p3.png'));
  backgroundImages.push(loadImage('Image/p4.png'));
  backgroundImages.push(loadImage('Image/p5.png'));

  // Load the fog/cloud overlay image
  cloudOverlay = loadImage('Image/c1.png');

  // Load audio files for each background (p1 -> a1, p2 -> a2, ...)
  // Using callbacks to log success/failure
  let paths = [
    'Image/a1.mp3',
    'Image/a2.mp3',
    'Image/a3.mp3',
    'Image/a4.mp3',
    'Image/a5.mp3'
  ];

  for (let i = 0; i < paths.length; i++) {
    // wrap index in closure for callback
    ((idx) => {
      try {
        let s = loadSound(
          paths[idx],
          // success callback
          () => {
            console.log(`Audio loaded: ${paths[idx]} (index ${idx})`);
            aSounds[idx] = s;
            aSoundsLoaded[idx] = true;
          },
          // error callback
          (err) => {
            console.error(`Failed to load audio: ${paths[idx]}`, err);
            aSounds[idx] = null;
            aSoundsLoaded[idx] = false;
          }
        );
      } catch (e) {
        console.error('Exception while calling loadSound for', paths[idx], e);
        aSounds[idx] = null;
        aSoundsLoaded[idx] = false;
      }
    })(i);
  }
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

  // Helpful console note
  console.log("Setup complete. Note: If audio doesn't play, ensure p5.sound.js is included and user interacted (click/press).");
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

    // Show fog overlay during the entire first phase (playing)
    image(cloudOverlay, 0, 0, width, height);

    drawPlayerManual();

    // Ensure no memory sounds play while not in memory
    stopMemorySoundIfPlaying();

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

    // Keep fog overlay visible throughout fastCycle
    image(cloudOverlay, 0, 0, width, height);

    drawPlayerSprite();

    // Ensure no memory sounds play while not in memory
    stopMemorySoundIfPlaying();

  } else if (gameState === "fastCycleEnd") {
    background(0); // black screen
    fill(255, 204, 0);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("✨ You enjoyed your Diwali ✨", width / 2, height / 2 - 40);
    textSize(18);
    fill(255);
    text("Press ENTER to relive the memory of Diwali", width / 2, height / 2 + 20);

    // Ensure no memory sounds play while not in memory
    stopMemorySoundIfPlaying();

  } else if (gameState === "memory") {
    drawBackground();
    drawPlayerSprite();

    // Start/resume the appropriate audio for the current background
    manageMemoryAudio();

    // movement logic in memory mode
    if (keyIsDown(RIGHT_ARROW)) {
      playerX += playerSpeed;
      playerDirection = "right";

      if (playerX > width) {
        if (currentBg < backgroundImages.length - 1) {
          currentBg++;
          playerX = 0;
        } else {
          playerX = width;
        }
      }
    }

    if (keyIsDown(LEFT_ARROW)) {
      playerX -= playerSpeed;
      playerDirection = "left";

      if (playerX + frameWidth < 0) {
        if (currentBg > 0) {
          currentBg--;
          playerX = width - frameWidth;
        } else {
          playerX = 0;
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
    fill(255, 204, 0);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("✨ You enjoyed your Diwali ✨", width / 2, height / 2 - 40);
    textSize(18);
    fill(255);
    text("Press ESC to end the process", width / 2, height / 2 + 10);
    text("or", width / 2, height / 2 + 35);
    text("Press ENTER to relive the memory of Diwali", width / 2, height / 2 + 60);

    // Ensure no memory sounds play while not in memory
    stopMemorySoundIfPlaying();
  }
}

function drawBackground() {
  image(backgroundImages[currentBg], 0, 0, width, height);
}

// Draw player sprite with animation
function drawPlayerSprite() {
  let frames = playerDirection === "right" ? spriteFramesRight : spriteFramesLeft;

  // animate only when moving
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW)) {
    frameCounter++;
    if (frameCounter % 5 === 0) {
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

  // When user presses ENTER to relive memory: resetGame() then switch to memory.
  // This is a user gesture so resuming the audio context here helps browser autoplay policies.
  if ((gameState === "end" || gameState === "fastCycleEnd") && keyCode === ENTER) {
    resetGame();
    try { if (typeof getAudioContext === 'function') getAudioContext().resume(); } catch (e) {}
    gameState = "memory";
  }

  // always resume audio context on any key press (helps autoplay restrictions)
  try { if (typeof getAudioContext === 'function') getAudioContext().resume(); } catch (e) {}
}

function mousePressed() {
  // resume audio context on click too (helpful for mobile / browsers)
  try { if (typeof getAudioContext === 'function') getAudioContext().resume(); } catch (e) {}
}

function resetGame() {
  currentBg = 0;
  playerX = 0;
  playerY = 790; // keep player at same visible height
  sparkles = [];
  currentFrame = 0;
  frameCounter = 0;
  playerDirection = "right";

  // stop any memory audio when resetting
  stopMemorySoundIfPlaying();
}

/* -----------------------
   Audio helper functions
   ----------------------- */

// Ensure we only play the sound that matches the current background while in memory,
// and stop the previous sound when the background changes or when leaving memory.
function manageMemoryAudio() {
  // sanity: if no sounds loaded yet, skip
  if (!aSounds || aSounds.length === 0) return;

  // if the index doesn't match, switch sounds
  if (currentSoundIndex !== currentBg) {
    // stop previous
    if (currentSoundIndex !== -1 && aSounds[currentSoundIndex] && aSounds[currentSoundIndex].isPlaying()) {
      try { aSounds[currentSoundIndex].stop(); } catch (e) { console.warn('stop error', e); }
    }

    // set new index
    currentSoundIndex = currentBg;

    // play new sound if loaded
    let s = aSounds[currentSoundIndex];
    if (s && aSoundsLoaded[currentSoundIndex]) {
      try {
        // resume audio context in case browser blocked it until a user gesture
        if (typeof getAudioContext === 'function') getAudioContext().resume();
      } catch (e) {}

      try {
        // loop the background audio so it continues while user navigates
        s.loop();
        console.log('Now playing audio index', currentSoundIndex);
      } catch (e) {
        console.error('Error while trying to play sound index', currentSoundIndex, e);
      }
    } else {
      console.warn('Audio not ready for background index', currentSoundIndex);
    }
  }
}

// Stop any playing memory audio and reset index
function stopMemorySoundIfPlaying() {
  if (currentSoundIndex !== -1 && aSounds[currentSoundIndex]) {
    try { aSounds[currentSoundIndex].stop(); } catch (e) { /* ignore */ }
  }
  currentSoundIndex = -1;
}
