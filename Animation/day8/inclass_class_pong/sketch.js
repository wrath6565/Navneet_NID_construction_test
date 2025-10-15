let gBall;
let lPaddle;
let rPaddle;
function setup() {
  createCanvas(800, 400);
  gBall = new Ball(width / 2, height / 2, 5, 5);
  lPaddle = new paddle(0, height / 2 - 30);
  rPaddle = new paddle(width - 20, height / 2 - 30);


}

function draw() {
  background(20);
  gBall.show();
  lPaddle.show();
  rPaddle.show();

  // if key is up and down are pressed move the right paddle 
  if(keyIsDown(UP_ARROW)){
    rPaddle.moveUp()
  }else if(keyIsDown(DOWN_ARROW)){
    rPaddle.moveDown()
  }

  // if key is w and s are pressed move left paddle

if(keyIsDown(87)){  // W key on keyboard
    lPaddle.moveUp()  
  }else if(keyIsDown(83)){  // S key on keyboard
    lPaddle.moveDown()
  }

}
