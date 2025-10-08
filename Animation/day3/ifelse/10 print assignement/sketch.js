// Instant full-screen 10 PRINT pattern in p5.js
// A new maze pattern is generated every 5 frames

let spacing = 20; // size of each cell

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  strokeWeight(2);
  noFill();
  frameRate(60);
}

function draw() {
  // Generate a new full pattern every 5 frames
  if (frameCount % 5 === 0) {
    background(0);

    for (let y = 0; y < height; y += spacing) {
      for (let x = 0; x < width; x += spacing) {
        if (random(1) < 0.5) {
          line(x, y, x + spacing, y + spacing);   // "\"
        } else {
          line(x, y + spacing, x + spacing, y);   // "/"
        }
      }
    }
  }
}

// Adjust to window size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
