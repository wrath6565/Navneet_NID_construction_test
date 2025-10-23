class Ball {
  constructor(x, y, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.size = 20;
  }

  show() {
    fill(255);
    noStroke();
    circle(this.x, this.y, this.size);
  }

  move() {
    this.y += this.ySpeed;
    this.x += this.xSpeed;
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed *= -1;
  }

  checkCollisionWall() {
    if (this.y < this.size / 2 || this.y > height - this.size / 2) {
      this.ySpeed *= -1;
    }
  }

  checkCollisionPaddle(paddle) {
    if (
      this.x - this.size / 2 < paddle.x + paddle.width &&
      this.x + this.size / 2 > paddle.x &&
      this.y + this.size / 2 > paddle.y &&
      this.y - this.size / 2 < paddle.y + paddle.height
    ) {
      this.xSpeed *= -1;
      if (this.x < width / 2) this.x = paddle.x + paddle.width + this.size / 2;
      else this.x = paddle.x - this.size / 2;
      this.xSpeed *= 1.05;
      this.ySpeed *= 1.05;
    }
  }

  checkWinner() {
    if (this.x < -this.size / 2) return 2;
    else if (this.x > width + this.size / 2) return 1;
    else return 0;
  }
}
