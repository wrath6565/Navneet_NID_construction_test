class Player {
  constructor(x, y, spriteSheet, cols, rows) {
    this.x = x;
    this.y = y;
    this.spriteSheet = spriteSheet;
    this.cols = cols;
    this.rows = rows;
    this.frame = 0;
    this.direction = 0; // 0: down, 1: left, 2: right, 3: up
    this.speed = 2;

    // calculate frame size automatically from the sprite sheet
    this.frameW = spriteSheet.width / cols;
    this.frameH = spriteSheet.height / rows;
  }

  move(walls) {
    let oldX = this.x;
    let oldY = this.y;
    let moving = false;

    // movement logic
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
      this.direction = 1;
      moving = true;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
      this.direction = 2;
      moving = true;
    } else if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
      this.direction = 3;
      moving = true;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
      this.direction = 0;
      moving = true;
    }

    // check collision with all walls
    for (let wall of walls) {
      if (this.collidesWith(wall)) {
        // revert to old position if collided
        this.x = oldX;
        this.y = oldY;
        break;
      }
    }

    // animate only when moving
    if (moving && frameCount % 6 === 0) {
      this.frame = (this.frame + 1) % this.cols;
    } else if (!moving) {
      this.frame = 0;
    }
  }

  collidesWith(wall) {
    return (
      this.x < wall.x + wall.width &&
      this.x + this.frameW > wall.x &&
      this.y < wall.y + wall.height &&
      this.y + this.frameH > wall.y
    );
  }

  show() {
    let sx = this.frame * this.frameW;
    let sy = this.direction * this.frameH;

    image(
      this.spriteSheet,
      this.x,
      this.y,
      this.frameW,
      this.frameH,
      sx,
      sy,
      this.frameW,
      this.frameH
    );
  }
}
