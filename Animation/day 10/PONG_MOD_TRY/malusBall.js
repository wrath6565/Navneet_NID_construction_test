class MalusBall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.xSpeed = random([-2, -1.5, 1.5, 2]);
    this.ySpeed = random([-2, -1.5, 1.5, 2]);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // bounce off top/bottom
    if (this.y < this.size / 2 || this.y > height - this.size / 2) {
      this.ySpeed *= -1;
    }

    // bounce off left/right
    if (this.x < this.size / 2 || this.x > width - this.size / 2) {
      this.xSpeed *= -1;
    }
  }

  show() {
    fill(255);
    noStroke();
    circle(this.x, this.y, this.size);
  }

  checkCollision(paddle) {
    return (
      this.x - this.size / 2 < paddle.x + paddle.width &&
      this.x + this.size / 2 > paddle.x &&
      this.y + this.size / 2 > paddle.y &&
      this.y - this.size / 2 < paddle.y + paddle.height
    );
  }
}
