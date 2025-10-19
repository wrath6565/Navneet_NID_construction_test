let player;
let spriteSheet;
let bg1, bg2;

let wallImgs1 = []; // wall images for map 1
let wallImgs2 = []; // wall images for map 2
let walls = [];

let gameStarted = false;
let currentMap = 1;
let gameEnded = false;

// transition zones for each map
let transitionZone1 = { x: 700, y: 700, size: 100 };
let transitionZone2 = { x: 700, y: 700, size: 100 };

function preload() {
  spriteSheet = loadImage("images/02.png");

  // Load backgrounds
  bg1 = loadImage("images/bg1.png");
  bg2 = loadImage("images/bg2.png");

  // Load wall images for map 1 (13 different ones)
  for (let i = 0; i < 13; i++) {
    wallImgs1[i] = loadImage(`wall1/wall${i + 1}.png`);
  }

  // Load wall images for map 2 (13 different ones)
  for (let i = 0; i < 25; i++) {
    wallImgs2[i] = loadImage(`wall2/wall${i + 1}.png`);
  }
}

function setup() {
  createCanvas(800, 800);
  player = new Player(0, 0, spriteSheet, 5, 4);
  setupMap1();
}

function draw() {
  background(0);

  if (!gameStarted) {
    // Start screen
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("PRESS ENTER TO START", width / 2, height / 2);

  } else if (gameEnded) {
    // Ending screen
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("The devil is also trapped in hell", width / 2, height / 2);

  } else {
    // Draw current map background
    if (currentMap === 1) {
      image(bg1, 0, 0, width, height);
    } else if (currentMap === 2) {
      image(bg2, 0, 0, width, height);
    }

    // Draw walls
    for (let wall of walls) {
      wall.show();
    }

    // Player movement
    player.move(walls);
    player.show();

    // Handle transitions
    if (currentMap === 1) {
      noFill();
      noStroke();
      rect(transitionZone1.x, transitionZone1.y, transitionZone1.size, transitionZone1.size);

      if (playerTouchesZone(player, transitionZone1)) {
        changeToMap2();
      }

    } else if (currentMap === 2) {
      noFill();
      noStroke();
      rect(transitionZone2.x, transitionZone2.y, transitionZone2.size, transitionZone2.size);

      if (playerTouchesZone(player, transitionZone2)) {
        endGame();
      }
    }
  }
}

function keyPressed() {
  if (!gameStarted && keyCode === ENTER) {
    gameStarted = true;
  }
}

function playerTouchesZone(player, zone) {
  return (
    player.x < zone.x + zone.size &&
    player.x + player.frameW > zone.x &&
    player.y < zone.y + zone.size &&
    player.y + player.frameH > zone.y
  );
}

function changeToMap2() {
  currentMap = 2;
  setupMap2();
  player.x = 0;
  player.y = 0;
}

function endGame() {
  gameEnded = true;
}

// MAP 1 SETUP
function setupMap1() {
  walls = [];

  // Example — add different walls with different images/sizes
  walls.push(new Wall(104, 0, 34, 274,  wallImgs1[0]));
  walls.push(new Wall(138, 240, 137, 34, wallImgs1[1]));
  walls.push(new Wall(240, 98, 171, 34, wallImgs1[2]));
  walls.push(new Wall(377, 132, 34, 240, wallImgs1[3]));
  walls.push(new Wall(526, 0, 34, 240, wallImgs1[4]));
  walls.push(new Wall(171, 371, 514, 34, wallImgs1[5]));
  walls.push(new Wall(651, 234, 34, 137, wallImgs1[6]));
  walls.push(new Wall(0, 474, 171, 34,  wallImgs1[7]));
  walls.push(new Wall( 171, 405, 34, 102, wallImgs1[8]));
  walls.push(new Wall( 182, 645, 137, 34, wallImgs1[9]));
  walls.push(new Wall( 320, 577, 34, 102, wallImgs1[10]));
  walls.push(new Wall(320, 542, 479, 34, wallImgs1[11]));
  walls.push(new Wall(491, 662, 34, 137, wallImgs1[12]));
  
  
  
}

// MAP 2 SETUP
function setupMap2() {
  walls = [];

  // Example — different layout and different wall images
  walls.push(new Wall(120, 0, 40, 120, wallImgs2[0]));
  walls.push(new Wall(400, 0, 40, 80, wallImgs2[1]));
  walls.push(new Wall(640, 0, 40, 200, wallImgs2[2]));
  walls.push(new Wall(0, 200, 280, 40, wallImgs2[3]));
  walls.push(new Wall(280, 120, 40, 120, wallImgs2[4]));
  walls.push(new Wall(80, 280, 40, 200, wallImgs2[5]));
  walls.push(new Wall(200, 240, 40, 80, wallImgs2[6]));
  walls.push(new Wall(240, 280, 160, 40, wallImgs2[7]));
  walls.push(new Wall(400, 200, 40, 120, wallImgs2[8]));
  walls.push(new Wall(360, 320, 40, 80, wallImgs2[9]));
  walls.push(new Wall(560, 320, 120, 40, wallImgs2[10]));
  walls.push(new Wall(200, 440, 80, 40, wallImgs2[11]));
  walls.push(new Wall(640, 360, 40, 160, wallImgs2[12]));
  walls.push(new Wall(680, 400, 120, 40, wallImgs2[13]));
  walls.push(new Wall(240, 480, 400, 40, wallImgs2[14]));
  walls.push(new Wall(0, 560, 80, 40, wallImgs2[15]));
  walls.push(new Wall(240, 520, 40, 80, wallImgs2[16]));
  walls.push(new Wall(480, 520, 40, 120,  wallImgs2[17]));
  walls.push(new Wall(40, 600, 40, 80, wallImgs2[18]));
  walls.push(new Wall(640, 600, 160, 40, wallImgs2[19]));
  walls.push(new Wall(0, 760, 160, 40, wallImgs2[20]));
  walls.push(new Wall(160, 680, 40, 120, wallImgs2[21]));
  walls.push(new Wall(200, 720, 160, 40, wallImgs2[22]));
  walls.push(new Wall(360, 640, 40, 120, wallImgs2[23]));
  walls.push(new Wall(480, 760, 120, 40, wallImgs2[24]));
  
  
  
}
