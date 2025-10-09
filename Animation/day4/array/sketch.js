//create array - initialising with 3 fruits

let fruits =["apple", "banana", "coconut"];
function setup() {
  createCanvas(400, 400);
  console.log(fruits);
  console.log("the length is " + fruits.length);
  for(let i =0; i<fruits.length; i++){
    console.log(fruits[i]);

  }
  //addingto the array

  fruits[fruits.length]="grapes"
}

function draw() {
  background(220);
}
