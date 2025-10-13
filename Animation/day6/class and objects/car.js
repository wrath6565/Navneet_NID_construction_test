//this is only a blueprint
class Car{
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.colour=color(random(0,255),0,0);
        this.speed = speed;

    
}

show(redColour){
    fill(redColour);
    rect(this.x,this.y,this.size,this.size/2)
    fill(this.colour);
    ellipse(this.x+this.size/4,this.y+this.size/2,this.size/4);
    fill(this.colour);
    ellipse(this.x+3*this.size/4,this.y+this.size/2,this.size/4);
}

move(){
    this.x = this.x + this.speed;
    if(this.x>width){
        this.x=0;
    }
}

grow(){
    if(this.size<200){
        this.size = this.size + 1;
    }
}
}