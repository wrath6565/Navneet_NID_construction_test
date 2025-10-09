let petalCount = 10
function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  
}

function draw() {
  background(220);

  push();
  //move origin to centre of canvas
  translate(width / 2, height / 2);
  //rotate(30)
  //petals
   
  for(let i=0; i<petalCount; i++){
   
    rotate(360/petalCount)
    ellipse(70, 0, 100, 50);

    }
    ellipse(0, 0, 100, 100);
  pop();
function drawFlower(petalCount,x,y){
  push();
  translate(x, y);
  for(let i=0; i<petalCount; i++){
   
    rotate(360/petalCount)
    ellipse(70, 0, 100, 50);

    }
    ellipse(0, 0, 100, 100);
  pop();
}


  /*ellipse(0, 0, 100, 100);
  ellipse(100, 0, 100, 50);
  rotate(60)
  ellipse(100, 0, 100, 50);
  rotate(60)
  ellipse(100, 0, 100, 50); 
  rotate(60)
  ellipse(100, 0, 100, 50);
  rotate(60)
  ellipse(100, 0, 100, 50);
  rotate(60)
  ellipse(100, 0, 100, 50);
  */

  pop();
}
