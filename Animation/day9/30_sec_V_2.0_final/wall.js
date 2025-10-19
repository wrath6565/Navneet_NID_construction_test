class Wall {
  constructor(x, y, width, height, wallImg) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.wallImg = wallImg; // texture image for the wall
  }

  show() {
    if (this.wallImg) {
      image(this.wallImg, this.x, this.y, this.width, this.height);
    } 
  }
}
