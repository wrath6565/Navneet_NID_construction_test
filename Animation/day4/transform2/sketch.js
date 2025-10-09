let x,xy,size;
function setup() {
  frameRate(60);
  createCanvas(innerWidth, innerHeight);
  
  size = 40;
  rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(20);
  // create grid squares
  for(let i = 0; i <width; i = i+size){
    for(let j = 0; j <height; j = j+size){
      fill(255,60,150);
      
      push();
        translate(i,j);
        rotate(frameCount);
        rect(0,0,size/2*sin(frameCount),size/2*(frameCount));
      pop(
      )
    }
}
}
