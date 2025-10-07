function setup() {
  createCanvas(1000, 1000);
  background(150);
  noStroke(0);
}

function draw() {
  fill(mouseX/2, mouseY/2);
  ellipse(mouseX, mouseY, 50);
  ellipse(width - mouseX, mouseY, 50);
  ellipse(mouseX, height - mouseY, 50);
  ellipse(width - mouseX, height - mouseY, 50);
  
}
  
//function mousePressed() {
  