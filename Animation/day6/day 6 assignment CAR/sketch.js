let cars = [];
let numCars = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // create multiple cars
  for (let i = 0; i < numCars; i++) {
    let x = random(width);                 // random horizontal position
    let y = random(50, height - 100);      // random lane (vertical)
    let size = random(30, 220);            // different car sizes
    let speed = random(2, 8);              // different speeds

    cars.push(new Car(x, y, size, speed));
  }
}

function draw() {
  background(200, 230, 255); // light blue background

  // show and move all cars
  for (let car of cars) {
    car.move();
    car.show('red');
  }
}
