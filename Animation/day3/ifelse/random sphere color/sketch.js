function setup() {
  createCanvas(400, 400);
  background(220);
}


function draw() {

}
function mouseClicked() {
  //get the positionof mouseX
  //if on left half -> mouseX < width/2 -> draw yellow ellipse
  //else draw red ellipse
  if(mouseX<width/2) {
    fill('yellow');
    ellipse(mouseX, mouseY, 30);
  } else {
    fill('red');
    ellipse(mouseX, mouseY, 30);
  } 
  
}