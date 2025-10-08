function setup() {
  createCanvas(600, 600);
  background(220);
}

function draw() {
  
}
 function mouseClicked() {
  //
  if (height/2 > mouseY) {
    if (width/2 > mouseX) {
      fill("red");
    }else {
        fill("blue");
    }
  rect(mouseX,mouseY,50,50);
  } else {
      if (width/2 > mouseX) {
        fill("red");
      }else {
         fill("blue");
      }
    
    ellipse(mouseX,mouseY,50,50);
  }
 }