let spriteImage, sprites = [];
let bg; // background image
let spriteX = 5, spriteY = 4;
let count = 0;
let row = 0;
let x = 0, y = 0;
let xdir = 0, ydir = 0;

function preload() {
  // Load the sprite sheet
  spriteImage = loadImage("image/02.png");

  // Load the background image
  bg = loadImage("image/bg.png"); // replace with your background image path
}

function setup() {
  createCanvas(400, 400);

  // Break the sprite sheet into individual frames
  let w = spriteImage.width / spriteX;
  let h = spriteImage.height / spriteY;

  for (let i = 0; i < spriteY; i++) {
    sprites[i] = [];
    for (let j = 0; j < spriteX; j++) {
      sprites[i][j] = spriteImage.get(j * w, i * h, w, h);
    }
  }
}

function draw() {
  // Draw background
  image(bg, 0, 0, width, height);

  // Draw the appropriate sprite frame
  image(sprites[row][count], x, y);

  // Animate and move sprite when a key is pressed
  if (frameCount % 5 == 0 && (xdir !== 0 || ydir !== 0)) {
    count = (count + 1) % spriteX;
    x += xdir;
    y += ydir;
  }
}

function keyPressed() {
  // Set movement direction and animation row based on key
  if (keyCode == UP_ARROW) {
    row = 3;   // up row
    xdir = 0;
    ydir = -7;
  } else if (keyCode == DOWN_ARROW) {
    row = 0;   // down row
    xdir = 0;
    ydir = 7;
  } else if (keyCode == LEFT_ARROW) {
    row = 1;   // left row
    xdir = -7;
    ydir = 0;
  } else if (keyCode == RIGHT_ARROW) {
    row = 2;   // right row
    xdir = 7;
    ydir = 0;
  }
}

function keyReleased() {
  // Stop moving when the key is released
  xdir = 0;
  ydir = 0;
  count = 0; // optional: reset to first frame when idle
}
