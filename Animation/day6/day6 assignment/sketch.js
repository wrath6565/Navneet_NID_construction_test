let flowers = [];
let numFlower = 20;

function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(125,125,125);

  // spawn flowers randomly across X-axis
 if (flowers.length < numFlower) {
  let x = 50; // start near the left edge (or width - 50 if moving left)
  let y = random(50, height - 50); // random vertical position

  let petals = 15;
  flowers.push(new Flower(x, y, petals));
}

  // move and show
  for (let i = flowers.length - 1; i >= 0; i--) {
    let f = flowers[i];
    f.move();
    f.show();

    if (f.offscreen()) flowers.splice(i, 1);
  }
}
