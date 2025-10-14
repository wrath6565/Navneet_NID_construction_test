let flower = [];
function setup() {
  createCanvas(innerWidth, innerHeight);

}


function mousePressed() {
  let tempFlower = new Flower(mouseX, mouseY, random(-5, 5), random(-5, 5));
  flower.push(tempFlower);
}

function draw() {
  background(220);
  for (let i = 0; i < flower.length; i++) {
    flower[i].move();
    flower[i].drawFlower();
  }
}
