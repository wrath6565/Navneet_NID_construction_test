function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0,0,0,50);
  //let noiseValue = noise(0.1*frameCount+1000); // +1000 to offset noise it will let you see the number from that position
  //let noiseMapped = map(noiseValue, 0, 1, 10, 200);
  //ellipse(mouseX, mouseY, noiseMapped);

  // perlin noise in 2D

  for(let i=0; i<width; i+=5){
    for(let j=0; j<height; j+=5){
      
      let outputNoise = noise(0.005*(i+frameCount), 0.005*j);
      //print(outputNoise);
      fill(outputNoise*255);
      noStroke();
      rect(i, j, 5, 5);
    }
  }

}

