// #Genuary2025 #Genuary4
// https://genuary.art/
// Prompt: Black on black.

let color1, color2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  color1 = color(15);
  color2 = color(25);
  maze = new createMaze(15, color('#030506'), color('#040305'), color('#030506'), color('#050304'), 1.5);
  maze.generateMaze();
}

function draw() {
  let phase = frameCount * 0.02;
  background(color1);
  push();
  noFill();
  for (let i = width * -0.5; i < width * 1.5; i += 3) {
    let colorIndex = abs(map(i, width * -0.5, width * 1.5, -1, 1));
    stroke(lerpColor(color1, color2, colorIndex));
    strokeWeight(3);
    drawSineWaveWithBezier(i, 0, height, phase);
  }
  pop();
  maze.drawMaze();
}

function drawSineWaveWithBezier(xCenter, yStart, waveHeight, phase) {
  let amplitude = waveHeight * 0.5;
  let segments = 50;
  let frequency = 0.05;

  beginShape();
  for (let i = 0; i <= segments; i++) {
    let t = i / segments;
    let y = lerp(yStart, waveHeight, t);
    let x = xCenter + amplitude * sin(TWO_PI * frequency * i + phase);
    vertex(x, y);
  }
  endShape();
}

function drawSphere(x, y, radius) {
  push();
  noFill();
  for (let i = 0; i < radius; i++) {
    let colorIndex = map(i, 0, radius, 0, 1.0);
    stroke(lerpColor(color(20), color(0), colorIndex));
    ellipse(x, y, i, i);
  } 
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class createMaze {
  constructor(resolution, colorX1, colorX2, colorY1, colorY2, strokeWeight=0.5) {
    this.res = resolution;
    this.colorX1 = colorX1;
    this.colorX2 = colorX2;
    this.colorY1 = colorY1;
    this.colorY2 = colorY2;
    this.strokeWeight = strokeWeight;
    this.marks = [];
  }

  setPenLine(x, y) {
    let colorX = lerpColor(this.colorX1, this.colorX2, map(x, 0, width, 0, 1));
    let colorY = lerpColor(this.colorY1, this.colorY2, map(y, 0, height, 0, 1));
    stroke(lerpColor(colorX, colorY, 0.5));
    strokeWeight(this.strokeWeight);
    noFill();
  }

  setPenDot(x, y) {
    let colorX = lerpColor(this.colorX1, this.colorX2, map(x, 0, width, 0, 1));
    let colorY = lerpColor(this.colorY1, this.colorY2, map(y, 0, height, 0, 1));
    fill(lerpColor(colorX, colorY, 0.5));
    noStroke();
  }

  mark1 = (x, y) => {
    this.setPenLine(x, y);
    line(x, y, x + this.res, y);
  }

  mark2 = (x, y) => {
    this.setPenLine(x, y);
    line(x, y + this.res, x + this.res, y + this.res);
  }

  mark3 = (x, y) => {
    this.setPenLine(x, y);
    line(x, y, x, y  + this.res);
  }

  mark4 = (x, y) => {
    this.setPenLine(x, y);
    line(x  + this.res, y, x + this.res, y + this.res);
  }

  mark5 = (x, y) => {
    this.setPenLine(x, y);
    line(x, y + this.res / 2, x + this.res, y + this.res / 2);
  }

  mark6 = (x, y) => {
    this.setPenLine(x, y);
    line(x + this.res / 2, y, x + this.res / 2, y + this.res);
  }

  mark7 = (x, y) => {
    this.setPenDot(x, y)
    circle(x + this.res / 2, y + this.res / 2, this.res / 4);
  }

  randomMark() {
    const r = floor(random(7));
    switch(r) {
      case 0:
        return this.mark1;
        break;
      case 1:
        return this.mark2;
        break;
      case 2:
        return this.mark3;
        break;
      case 3:
        return this.mark4;
        break;
      case 4:
        return this.mark5;
        break;
      case 5:
        return this.mark6;
        break;
      case 6:
        return this.mark7;
        break;
    }
  }

  generateMaze() {
    for(let x=0; x < width; x+=this.res){
      for(let y=0; y < height; y+=this.res){
        this.marks.push({ mark: this.randomMark(), x, y });
      }
    }
  }

  drawMaze() {
    this.marks.forEach(({ mark, x, y }) => {
      mark(x, y);
    });
  }
}