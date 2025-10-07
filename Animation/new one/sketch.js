let topcolor,bottomcolor

function setup() {
  createCanvas(600, 800);
  topcolor = color("#89E9FF");
  bottomcolor = ("#AE00FF");
  for(let y=0; y<height; y++){
    
    n = map(y,0,height,0,1)
    let newcolor = lerpColor(topcolor, bottomcolor , n)
    stroke(newcolor);
    line(0,y,width,y);
  }
}

function draw() {
  
 
  noStroke()
  fill("#FF9D00")
  ellipse(300,400,300,300,)
  fill("#FF9D00")
  ellipse(460,625,150,150)
  fill("#FFEA00")
  ellipse(150,605,200,200)
  fill("#FF9D00")
  ellipse(135,615,150,150)
  fill("#FFEA00")
  ellipse(120,625,100,100)
  fill("#FFEA00")
  ellipse(350,350,105,105)
  fill("#FFEA00")
  ellipse(400,480,125,125)
  fill("#FF9D00")
  ellipse(470,470,75,75)
  fill("#FFEA00")
  ellipse(150,250,250,250)
  fill("#FF9D00")
  ellipse(115,220,125,125)
  fill("#FF9D00")
  ellipse(400,150,150,150)
  fill("#FFEA00")
  ellipse(450,70,70,70)
}
  //radialGradient(
  //width/2,height/2,0,
  //width/2, height/2, 350,
  //color(190,100,100,100),
  //color(250,100,100,100)
  //ellipse(300,400,200,200)


//function radialGradient(sX, sY , sR , eX , eY ,  eR , colorS , colorE ){
  //let gradient = drawingContext.createRadialGradient(
  //sX , sY , sR , eX , eY , eR
  //);
  //gradient.addColorStop(0,colorS)
  //gradient.addColorStop(1,colorE)
//}