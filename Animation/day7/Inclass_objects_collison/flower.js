class Flower {
    constructor(x, y, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.selected = false;
    }
    drawFlower() {
        //fill("yellow");

        ellipse(this.x, this.y, 40, 80);
        ellipse(this.x, this.y, 80, 40);

        //fill("red");

        ellipse(this.x, this.y, this.size);

    }
    move() {
        this.x = this.x + this.xSpeed
        this.y = this.y + this.ySpeed
        if (this.y > height || this.y < 0) {
            this.ySpeed = -this.ySpeed;
        }

        if (this.x > width || this.x < 0) {
            this.xSpeed = -this.xSpeed;
        }
    }
    //changeColour(mX,mY){
    //if mX,mY are closer to this.x,this.y make the flower red else make it white
    //let distance = dist(mX,mY,this.x,this.y);
    /// if(distance < this.size/2) {
    //  fill("red");
    //  } else {
    //  fill("white");


checkMousePosition(mX, mY){
    //if mX,mY are closer to this.x,this.y make the flower red else make it white
    let distance = dist(mX, mY, this.x, this.y);
    if (distance < this.size / 2) {
        this.selected = true;
    } else {
        this.selected = false;
    }
}

checkCollision(otherFlower){
    let distance = dist(this.x, this.y, otherFlower.x, otherFlower.y);
    if (distance < this.size / 2 + otherFlower.size / 2) {
        //collision happened
        this.xSpeed = -this.xSpeed;
        this.ySpeed = -this.ySpeed;
    }
}}