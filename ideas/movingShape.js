// let now = Date.now();
// let seeds, unit, xSpacing, xPath;
let circleMod;
// let amplitude = 50;
// let frequency = 0.02;

function setup() {
  noFill();
  frameRate(10);
  // seeds = now.toString().split('').map((x) => parseInt(x));
  createCanvas(windowWidth, windowHeight);
  circleMod = 15;
  unit = width / 10;
  // xPath = createVector(0, height / 2);
  // xSpacing = 5;
}

function draw() {
  // flyingX(xPath.x, xPath.y, calcOrientation(xPath.x, amplitude, frequency));
  // xPath.x += xSpacing;
  // xPath.y = height / 2 + amplitude * sin(frequency * xPath.x);

  for (let i = -2 * unit; i < width + unit * 2; i += unit) {
    circle(width + 30 - i - circleMod, -30 + circleMod, 0 + circleMod);
    circle(-30 + i +  circleMod, -30 + circleMod, 0 + circleMod);
  }
  
  // if (xPath.x > width) {
  //   xPath.x = 0;
  // }

  if (circleMod >= width) {
    circleMod = 15;
  } else {
    circleMod += 10;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// function calcOrientation(x, amplitude, frequency) {
//   let dy_dx = amplitude * frequency * cos(frequency * x);
//   return atan(dy_dx);
// }

// function flyingX(x, y, orientation) {
//   push();
//   noFill();
//   translate(x, y);
//   rotate(orientation);
//   beginShape();
//   vertex(-unit, unit);
//   vertex(0, -unit);
//   vertex(0, 0);
//   vertex(-unit, -unit);
//   endShape(CLOSE);
//   pop();
// }