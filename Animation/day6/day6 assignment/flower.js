class Flower {
  constructor(x, y, numPetals = 6) {
    this.x = x;
    this.y = y;

    this.numPetals = numPetals;
    this.currentScale = 0.2;
    this.maxScale = 1.2;
    this.startx = x;
    this.endx = 100;

    this.speed = random(1, 3);

    // random colors
    this.centerColor = color(random(200, 255), random(200, 255), 0);  // yellowish
    this.petalColor = color(random(10, 255), random(10, 255), random(10, 255),50); // vibrant
  }

  show() {
    push();
    translate(this.x, this.y);
    scale(this.currentScale);

    // draw center
    fill(this.centerColor);
    noStroke();
    ellipse(0, 0, 20);

    // draw petals
    fill(this.petalColor);
    for (let i = 0; i < this.numPetals; i++) {
      ellipse(0, -30, 20, 40);
      rotate(360 / this.numPetals);
    }
    pop();
  }

 move() {
  this.x += this.speed;  // move right (use -= to move left)

  let progress = map(this.x, this.startX, this.endX, 0.2, this.maxScale);
  this.currentScale = constrain(progress, 0.2, this.maxScale);
}

offscreen() {
  return this.x > width + 50 || this.x < -50; // check both sides
}

}
