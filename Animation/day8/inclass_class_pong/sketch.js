let gBall;
let lPaddle;
let rPaddle;
let player1 = 0;
let player2 = 0;

let pingSound;

function preload(){
  pingSound = loadSound("assets/2.mp3")
}

function setup() {
  createCanvas(800, 400);
  gBall = new Ball(width / 2, height / 2, 3, 3);
  lPaddle = new paddle(0, height / 2 - 30);
  rPaddle = new paddle(width - 20, height / 2 - 30);


}

function draw() {
  background(20);
  
  lPaddle.show();
  rPaddle.show();
 //BALL BEHAVIOUR

  gBall.move();
  gBall.checkCollisionPaddle(lPaddle);
  gBall.checkCollisionPaddle(rPaddle);
  gBall.checkCollisionWall();
  gBall.show();

  let point = gBall.checkWinner();
  if(point == 1) {
    player1++;
    gBall.reset();
    console.log("p1 vs p2 :" + player1 + " " + player2)
  } else if(point ==2 ) {
    player2++;
    gBall.reset();
    console.log("p1 vs p2 :" + player1 + " " + player2)
  }



// paddle behaviour
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
