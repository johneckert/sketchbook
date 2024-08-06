let unit;
let doodads = [];
let colors = [
  ['#59C173', '#5D26C1'],
  ['#52c234', '#093637'],
  ['#004FF9', '#FFF94C'],
  ['#ffffff', '#0f9b0f'],
];

function setup() {
  noFill();
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  unit = width / 2;
  radialGradient(color('#44a08d'), color('#093637'));
  ellipseMode(RADIUS);
  doodads.push(new Doodad(0, 0, 8, 8, unit, 1, 1, colors, 200));
  doodads.push(new Doodad(0, 0, 8, 8, unit, -1, 1, colors, 200));
  doodads.push(new Doodad(0, 0, 8, 8, unit, -1, -1, colors, 200));
  doodads.push(new Doodad(0, 0, 8, 8, unit, 1, -1, colors, 200));
}

function draw() {
  translate(width / 2, height / 2);
  doodads.forEach((doodad) => doodad.draw());
}

class Doodad {
  constructor(posX, posY, speedX, speedY, radius, directionX = 1, directionY = 1, colors, alpha) {
    this.posX = posX;
    this.posY = posY;
    this.speedX = speedX;
    this.speedY = speedY;
    this.directionX = directionX;
    this.directionY = directionY;
    this.radius = radius;
    this.colors = colors;
    this.colorInc = 0;
    this.minFlutter = this.radiius * 0.1;
    this.flutterS = this.minFlutter;
    this.flutterC = this.minFlutter;
    this.loopColors = this.colors[0];
    this.colorStep = 0;
    this.colorDirection = 1;
    this.strokeColor = this.loopColors[0];
    this.alpha = alpha;
  }

  stepColor() {
    if (this.colorStep >= 1) {
      this.colorDir = -1;
      this.colorInc = this.colorInc >= this.colors.length - 1 ? 0 : this.colorInc + 1;
    } else if (this.colorStep <= 0) {
      this.colorDir = 1;
    }

    this.colorStep += 0.1 * this.colorDir;
    this.loopColors = this.colors[this.colorInc];
  }

  updatePosition() {
    this.posX = this.posX + this.speedX * this.directionX;
    this.posY = this.posY + this.speedY * this.directionY;
    if (this.posX < -width / 2 + this.radius || this.posX > width / 2 - this.radius) {
      this.speedX = -this.speedX;
    }
    if (this.posY < -height / 2 + this.radius || this.posY > height / 2 - this.radius) {
      this.speedY = -this.speedY;
    }
    this.flutterS = sin(frameCount) * this.radius;
    this.flutterC = cos(frameCount) * this.radius;
    if (this.flutterS < this.minFlutter) {
      this.flutterS = this.minFlutter;
    }
    if (this.flutterC < this.minFlutter) {
      this.flutterC = this.minFlutter;
    }
  }

  draw() {
    this.strokeColor = lerpColor(color(this.loopColors[0]), color(this.loopColors[1]), this.colorStep);
    this.strokeColor.setAlpha(this.alpha);
    stroke(this.strokeColor);

    beginShape();
    vertex(this.posX - this.flutterS, this.posY - this.flutterS);
    vertex(this.posX, this.posY - this.flutterC);
    vertex(this.posX + this.flutterS, this.posY - this.flutterS);
    vertex(this.posX + this.flutterC, this.posY);
    vertex(this.posX + this.flutterS, this.posY + this.flutterS);
    vertex(this.posX, this.posY + this.flutterC);
    vertex(this.posX - this.flutterS, this.posY + this.flutterS);
    vertex(this.posX - this.flutterC, this.posY);
    endShape(CLOSE);

    this.updatePosition();
    this.stepColor();
  }
}

function radialGradient(c1, c2) {
  push();
  for(let x=0; x < width * 1.5; x++){
    let inter = map(x, 0, width, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    circle(width/2, height/2, x);
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
