function setup() {
  createCanvas(1000, 1000);
  background(220);
}

function mousePressed() {
  let randomNo
  randomNo = random(30,250);
  drawSnowman(mouseX,mouseY,randomNo);
}

function draw() {
  noStroke();
}

function drawSnowman(x,y,randomNo) {
  //star snowman
  fill(random(200,0,0),0,0);
  ellipse(x,y,randomNo);
  fill(200,0,0);
  ellipse(x,y-70,randomNo-60);

  
}
