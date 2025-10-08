let xPos;
function setup() {
  xPos = 0;
  createCanvas(400, 400);

}

function draw() {
  background(220);
  drawCar(xPos, 100);
  drawCar(400-xPos, 150);
  drawCar(xPos, 200);
  drawCar(400-xPos, 250);
  xPos = xPos + 1;
}


//define function
function drawCar(x, y) {
  rect(x, y, 40, 30); // car body
  ellipse(x+5,y+35,10,10);
  ellipse(x+35,y+35,10,10); // wheels
}
//calling function 