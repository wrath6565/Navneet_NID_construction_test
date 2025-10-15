class paddle {
    constructor(x, y,) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 60;  
        this.speed = 30;
    }
    show() {
        rect(this.x, this.y, this.width, this.height);
}
}