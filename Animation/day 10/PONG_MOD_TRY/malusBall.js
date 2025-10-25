class MalusBall {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.xSpeed = random([-1, 1]) * speed;
    this.ySpeed = random([-1, 1]) * speed;
    this.active = true;
  }

  show() {
    fill(255); // identical to main ball
    circle(this.x, this.y, this.size);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  checkCollisionWall() {
    if (this.y < this.size / 2 || this.y > height - this.size / 2) {
      this.ySpeed *= -1;
      this.y = constrain(this.y, this.size / 2, height - this.size / 2);
    }
    if (this.x < this.size / 2 || this.x > width - this.size / 2) {
      this.xSpeed *= -1;
      this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    }
  }

  checkCollisionPaddle(paddle, isLeftPaddle) {
    if (
      this.x - this.size / 2 < paddle.x + paddle.width &&
      this.x + this.size / 2 > paddle.x &&
      this.y + this.size / 2 > paddle.y &&
      this.y - this.size / 2 < paddle.y + paddle.height
    ) {
      // Bounce off paddle
      this.xSpeed *= -1;
      this.x = paddle.x + (isLeftPaddle ? paddle.width + this.size / 2 : -this.size / 2);

      // Reduce score, but DO NOT despawn
      if (isLeftPaddle) {
        if (player1 > 0) player1--;
      } else {
        if (player2 > 0) player2--;
      }
    }
  }
}
