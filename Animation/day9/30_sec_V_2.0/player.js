class Player {
    constructor(x, y, xDir, yDir) {
        this.x = x;
        this.y = y;
        this.xSize =//to be filled
            this.ySize =//to be filled
            this.xDir = xDir;
        this.yDir = yDir;

    }

    show() {
        image(this.x, this.y, this.xSize, this.ySize, this.xDir, this.yDir)
    }

    // Collision with walls
    checkCollisionWall(wall) {
        if (this.x < wall.x + wall.width &&
            this.x > wall.x &&
            this.y < wall.y + wall.height &&
            this.y > wall.y) {
            {
                this.x -= xDir;
                this.y -= yDir;
            }

        }
    }

    move() {
        if (gamePaused) return; // ignore input if game is paused

        if (keyCode == UP_ARROW) {
            row = 3; xDir = 0; yDir = -7;
        } else if (keyCode == DOWN_ARROW) {
            row = 0; xDir = 0; yDir = 7;
        } else if (keyCode == LEFT_ARROW) {
            row = 1; xDir = -7; yDir = 0;
        } else if (keyCode == RIGHT_ARROW) {
            row = 2; xDir = 7; yDir = 0;
        }
    }

}


