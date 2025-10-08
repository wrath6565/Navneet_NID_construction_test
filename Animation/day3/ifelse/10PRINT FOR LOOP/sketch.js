let size
function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(10)

  size = 10
}

function draw() {
  background(220);
 for(let i=0; i<width;i=i+size){
    for(let j=0; j<height;j=j+size){
      //ellipse(i,j,30)
      let choice = random(0,1);

    if (choice<0.5){
      line(i+size,j,i,j+size);
       }else{
       line(i,j,i+size,j+size,);
    }
    
    }
}
/*for(let i=0; i<x;i=i+30){
      ellipse(i,y/2,30)
    }
for(let j=0; j<y;j=j+30){
      ellipse(x/2,j,30)
    }*/
}

