class paddle {
    constructor(x, y,) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 60;  
        this.speed = 8;
    }
    show() {
        rect(this.x, this.y, this.width, this.height);
}
moveUp(){
    if(this.y>0)
    this.y -= this.speed;

}
moveDown(){
    if(this.y<height-this.height ){
    this.y += this.speed;
} 
}
}