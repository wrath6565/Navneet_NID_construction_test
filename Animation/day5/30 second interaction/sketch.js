let spriteImage, sprites = [];
let bg; // background image
let wallImgs = []; // 13 wall images
let spriteX = 5, spriteY = 4;
let count = 0;
let row = 0;
let playerX = 0, playerY = 0; // player start position
let xdir = 0, ydir = 0;

let walls = []; // array to store wall objects
let castl;

let showMessage = false; // flag to show message
let messageText = "Sometimes the devil also need a break";
let gamePaused = false; // flag to stop player input when message shows

function preload() {
  // Load the sprite sheet
  spriteImage = loadImage("image/02.png");

  // Load the background image
  bg = loadImage("image/bg.png");

  // Load 13 wall images
  for (let i = 0; i < 13; i++) {
    wallImgs[i] = loadImage(`image/wall${i+1}.png`);
  }

  // Load castle image
  castl = loadImage("image/c01.png");
}

function setup() {
  createCanvas(700, 700);

  // Break the sprite sheet into frames
  let w = spriteImage.width / spriteX;
  let h = spriteImage.height / spriteY;

  for (let i = 0; i < spriteY; i++) {
    sprites[i] = [];
    for (let j = 0; j < spriteX; j++) {
      sprites[i][j] = spriteImage.get(j * w, i * h, w, h);
    }
  }

  // Place 13 wall images at specific coordinates
  walls.push(new Wall(92, 0, 30, 240, wallImgs[0]));
  walls.push(new Wall(121, 210, 120, 30, wallImgs[1]));
  walls.push(new Wall(210, 85, 150, 30, wallImgs[2]));
  walls.push(new Wall(330, 115, 30, 210, wallImgs[3]));
  walls.push(new Wall(461, 0, 30, 210, wallImgs[4]));
  walls.push(new Wall(570, 205, 30, 120, wallImgs[5]));
  walls.push(new Wall(150, 325, 450, 30, wallImgs[6]));
  walls.push(new Wall(150, 355, 30, 90, wallImgs[7]));
  walls.push(new Wall(0, 415, 150, 30, wallImgs[8]));
  walls.push(new Wall(280, 475, 420, 30, wallImgs[9]));
  walls.push(new Wall(280, 505, 30, 90, wallImgs[10]));
  walls.push(new Wall(160, 565, 120, 30, wallImgs[11]));
  walls.push(new Wall(430, 580, 30, 120, wallImgs[12]));
}

function draw() {
  // Draw background
  image(bg, 0, 0, width, height);

  // Draw castle
  let castleX = 553, castleY = 600, castleW = 147, castleH = 100;
  image(castl, castleX, castleY, castleW, castleH);

  // Draw walls
  for (let wall of walls) wall.show();

  // Draw player sprite
  image(sprites[row][count], playerX, playerY);

  // Animate and move player only if game not paused
  if (!gamePaused) {
    if (frameCount % 5 === 0 && (xdir !== 0 || ydir !== 0)) {
      count = (count + 1) % spriteX;
      playerX += xdir;
      playerY += ydir;
    }

    // Collision with walls
    for (let wall of walls) {
      if (playerX < wall.x + wall.w &&
          playerX + spriteImage.width / spriteX > wall.x &&
          playerY < wall.y + wall.h &&
          playerY + spriteImage.height / spriteY > wall.y) {
        playerX -= xdir;
        playerY -= ydir;
      }
    }

    // Collision with castle to show message
    if (!showMessage &&
        playerX + spriteImage.width / spriteX > castleX &&
        playerX < castleX + castleW &&
        playerY + spriteImage.height / spriteY > castleY &&
        playerY < castleY + castleH) {
      showMessage = true;
      gamePaused = true; // pause the game
    }
  }

  // Draw message box if triggered
  if (showMessage) {
    fill(0, 0, 0, 200); // semi-transparent background
    stroke(255);
    strokeWeight(2);
    rect(100, 50, 500, 80, 10); // message box
    fill(255);
    noStroke();
    textSize(20);
    textAlign(CENTER, CENTER);
    text(messageText, 100 + 500 / 2, 50 + 80 / 2);
  }
}

function keyPressed() {
  if (gamePaused) return; // ignore input if game is paused

  if (keyCode == UP_ARROW) {
    row = 3; xdir = 0; ydir = -7;
  } else if (keyCode == DOWN_ARROW) {
    row = 0; xdir = 0; ydir = 7;
  } else if (keyCode == LEFT_ARROW) {
    row = 1; xdir = -7; ydir = 0;
  } else if (keyCode == RIGHT_ARROW) {
    row = 2; xdir = 7; ydir = 0;
  }
}

function keyReleased() {
  if (gamePaused) return; // ignore input if game is paused
  xdir = 0; ydir = 0; count = 0;
}

// -------------------
// WALL CLASS
// -------------------
class Wall {
  constructor(x, y, w, h, img = null) {
    this.x = x; this.y = y; this.w = w; this.h = h; this.img = img;
  }

  show() {
    if (this.img) {
      image(this.img, this.x, this.y, this.w, this.h);
    } else {
      fill(100);
      rect(this.x, this.y, this.w, this.h);
    }
  }
}
