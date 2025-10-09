// 10PRINT with a rotating Y-axis color mask (no overlay)
// regenerates pattern every 5 frames
let spacing = 20;
let cols, rows;
let grid = [];
let radius;
let angle = 0;
const regenInterval = 0.5;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(60);

  radius = min(width, height) * 0.25;
  cols = Math.ceil(width / spacing);
  rows = Math.ceil(height / spacing);

  // create grid
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  regeneratePattern();
}

function regeneratePattern() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = random(1) < 0.5; // true -> "\" , false -> "/"
    }
  }
}

function draw() {
  background(0);

  // update rotation
  angle += 0.2;

  // regenerate pattern every few frames
  if (frameCount % regenInterval === 0) regeneratePattern();

  // compute base color and facing multiplier (simulate "face" brightness)
  let baseR = map(sin(angle), -1, 1, 100, 255);
  let baseG = map(cos(angle * 1.2), -1, 1, 100, 255);
  let baseB = map(sin(angle * 1.5), -1, 1, 100, 255);
  // z component of rotated normal; when near 0 the disc is edge-on
  let facing = cos(angle);
  let faceMul = map(facing, -1, 1, 0.35, 1.0);

  // draw the whole 10PRINT in screen space (no overlay)
  push();
    resetMatrix();               // switch to 2D drawing coordinates
    translate(-width / 2, -height / 2);

    strokeWeight(2);

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        let x = i * spacing;
        let y = j * spacing;
        let cx = x + spacing * 0.5;
        let cy = y + spacing * 0.5;

        // relative to canvas center
        let relX = cx - width / 2;
        let relY = cy - height / 2;

        // Y-axis rotate projection test:
        // (relX / cos(angle))^2 + relY^2 <= radius^2 => point is inside projected disc
        // avoid division by (near) zero with a small epsilon
        let cosA = cos(angle);
        let denom = max(abs(cosA), 0.0001);
        let testX = relX / denom;
        let inside = (testX * testX + relY * relY) <= radius * radius;

        if (inside) {
          stroke(baseR * faceMul, baseG * faceMul, baseB * faceMul);
        } else {
          stroke(100); // grey outside
        }

        // draw slash/backslash according to stored grid
        if (grid[i][j]) {
          line(x, y, x + spacing, y + spacing);   // "\"
        } else {
          line(x, y + spacing, x + spacing, y);   // "/"
        }
      }
    }
  pop();

  // (No ellipse / disc is drawn — the rotation only affects line color)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  radius = min(width, height) * 0.25;
  cols = Math.ceil(width / spacing);
  rows = Math.ceil(height / spacing);
  grid = new Array(cols);
  for (let i = 0; i < cols; i++) grid[i] = new Array(rows);
  regeneratePattern();
}
