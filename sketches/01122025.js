// #Genuary2025 #Genuary12
// https://genuary.art/
// Prompt: Subdivision.

let fib = [1, 1]; // Initialize Fibonacci sequence
let i = 2; // Start Fibonacci index
let angle = 0; // Initial rotation angle
let maxSquares = 20; // Number of squares in each sequence
const fibos = []
let prevCompletedFibos = 0
let rotationAngle = 10;

function setup() {
  frameRate(200)
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1);
  fibos.push(new Fibo(i, angle, maxSquares, rotationAngle));
  linearGradient(color('#3A1C71'), color('#D76D77'), color('#FFAF7B'));
}

function draw() {
  stroke(lerpColor(color('#3c1053'), color('#ad5389'), map(sin(prevCompletedFibos * 100), -1, 1, 0, 1)));
  translate(width / 2, height);
  rotate(45);
  let completedFibos = 0;
  fibos.forEach(f => {
    if (!f.isFinished()) {
      f.draw();
    } else {
      completedFibos++;
    }
  });
  console.log(prevCompletedFibos, completedFibos, angle);
  if (prevCompletedFibos < completedFibos) {
    angle += 11;
    fibos.push(new Fibo(i, angle, maxSquares, rotationAngle));
    prevCompletedFibos = completedFibos;
  }
  
}

class Fibo {
  constructor(i, angle, maxSquares, rotationAngle) {
    this.i = i;
    this.angle = angle;
    this.maxSquares = maxSquares;
    this.rotationAngle = rotationAngle;
    this.fib = [1,1];
    this.finished = false;
  }

  draw() {
    translate(0,0);
  
    if (this.i < this.maxSquares) {
      fib[this.i] = fib[this.i - 1] + fib[this.i - 2];
      
      let sideLength = fib[this.i - 1];
      
      beginShape();
      for (let j = 0; j < 4; j++) {
        let x = sideLength * cos(this.angle + j * 90);
        let y = sideLength * sin(this.angle + j * 90);
        vertex(x - sideLength * 0.5, y - sideLength * 0.5);
      }
      endShape(CLOSE);
      
      this.angle += this.rotationAngle;
      this.i++;
    }

    if (this.i === this.maxSquares) {
      this.finished = true;
    }
  }

  isFinished() {
    return this.finished;
  }
}

function linearGradient(color1, color2, color3) {
  push();
  strokeWeight(1);
  for (let i = 0; i < windowHeight / 2; i++) {
    let colorIndex = map(i, 0, windowHeight / 2, 0, 1.0);
    stroke(lerpColor(color1, color2, colorIndex));
    line(0, i, width, i);
  }
  for (let i = windowHeight / 2; i < windowHeight; i++) {
    let colorIndex = map(i, windowHeight / 2, windowHeight, 0, 1.0);
    stroke(lerpColor(color2, color3, colorIndex));
    line(0, i, width, i);
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  linearGradient(color('#3A1C71'), color('#D76D77'), color('#FFAF7B'));
}
