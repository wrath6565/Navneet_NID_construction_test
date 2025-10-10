let spriteImg;
let sRows = 4, sCols=8;
let aniCount = 0;60.
let sprite = []

  // Load assets 
  function preload() {
  spriteImg = loadImage("images/explosionFull.png");
}
function setup() {
  createCanvas(2048, 1024);
  let sWidth = spriteImg.width / sCols;
  let sHeight = spriteImg.height / sRows;
  //loop through the sprite image and store it in a 1D array sprite[]
  for(let i = 0 ; i < sRows; i++){
    for(let j = 0 ; j < sCols; j++){
    // get the slice of the sprite
    //store it in the array sprite[]
      sprite[sprite.length] = spriteImg.get(j*sWidth, i*sHeight, sWidth, sHeight)
    // image.get needs (x,y,width,height ) of the part that we want to extract
    
    }
    console.log(sprite)
}
}

function draw() {
  background(0);
  if(isKeyPressed){
    aniCount++;
  }
  image(sprite[aniCount % sprite.length], 400, 400);
  //let frame = sRows * sCols;
  
   // image(sprite[frameCount % frame], mouseX, mouseY, 400, 400);
//}
//function keyPressed(){

}  
 


  // display the sprite array on the canvas

