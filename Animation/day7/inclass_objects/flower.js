
class Flower {
    constructor(x, y, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }
    drawFlower() {
        fill("yellow");

        ellipse(this.x, this.y, 40, 80);
        ellipse(this.x, this.y, 80, 40);

        fill("red");
        ellipse(this.x, this.y, 40);

    }
    move() {
        this.x = this.x + this.xSpeed
        this.y = this.y + this.ySpeed
        if(this.y> height || this.y<0){
            this.ySpeed = -this.ySpeed;
        }

        if(this.x> width || this.x<0){
            this.xSpeed = -this.xSpeed;
    }
}
}