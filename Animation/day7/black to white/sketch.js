
function setup() {
  createCanvas(innerWidth,innerHeight);
  
}

function draw() {
  let c = map(mouseX, 0,innerWidth, 0, 255);
  background(c);
  
}
