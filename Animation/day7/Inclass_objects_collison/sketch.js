let flower = [];
function setup() {
  createCanvas(innerWidth, innerHeight);

}


function mousePressed() {
  let tempFlower = new Flower(mouseX, mouseY, random(-2, 2), random(-2, 2));
  flower.push(tempFlower);
}

function draw() {
  background(20);
  for (let i = 0; i < flower.length; i++) {
    flower[i].checkMousePosition(mouseX, mouseY);
    for (let j = 0; j < flower.length; j++) {
      if (i != j) {
        flower[i].checkCollision(flower[j]);
      }
   // flower[i].changeColour(mouseX, mouseY);
    flower[i].move();
    flower[i].drawFlower();
  }
}
}
