let x,y,size,choice;
function setup() {
  createCanvas(600, 600);
  background(220);
  x=0
  y=0
  size=50
}
  

function draw() {
  strokeWeight(5);
  stroke(random(0,255),random(0,255),random(0,255));
  
  choice = random(0,1);

  if (choice<0.5){
    line(x+size,y,x,y+size);
  }else{
    line(x,y,x+size,y+size,);
  }
  x=x+size;

  
  if (x>width){
    x=0;
    y=y+size;
  }

}