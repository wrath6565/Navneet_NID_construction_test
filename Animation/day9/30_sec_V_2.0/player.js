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
        image(this.x, this.y, this.xSize, this.ySize,this.xDir,this.yDir)
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

    move(){
        
    }
}

