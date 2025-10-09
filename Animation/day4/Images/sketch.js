let size = 100,g0,g1,g2;

function preload() {
  g0 = loadImage("6images/001.png");
  g1 = loadImage("6images/002.png");
  g2 = loadImage("6images/003.png");
  
}
function setup() {
  angleMode
  createCanvas(windowWidth, windowHeight);
  frameRate(5)
  
}

function draw() {
  background(220);
  noStroke();
  // nested for loop

  for (let i = 0; i < width; i=i+size) {
    for (let j = 0; j < height; j=j+size) { 
      //select 1 of 4 choices
     // push();
     // translate(i+50,j+50);
     // rotate(90*floor(random(0,3)));
      //translate(-i-50,-j-50);
      
      let choice = floor(random(0,3));
      if (choice ==0) {
        image(g0,i,j)
      }else if (choice ==1) {
        image(g1,i,j)
      } else {
        image(g2,i,j)
      }
     // pop();
    }
  }
        


      }
