let leftRing, rightRing, centerRing, topRing, bottomRing;
let speed;
let direction = 1;
let leftEdge, rightEdge;
let ringRadius, density, maxMovement;

function setup() {
  createCanvas(windowWidth, windowHeight);
  leftEdge = -width / 2;
  rightEdge = width / 2;
  ringRadius = height * 5;
  density = 10
  maxMovement = 20;
  speed = 5;
  leftRing = new ConcentricRings(leftEdge, 0, ringRadius, density, color('#181818'));
  rightRing =new ConcentricRings(rightEdge, 0, ringRadius, density, color('#181818'));
  topRing = new ConcentricRings(0, -height / 2, ringRadius, density, color('#BA8B02'));
  bottomRing = new ConcentricRings(0, height / 2, ringRadius, density, color('#BA8B02'));
  centerRing = new ConcentricRings(0, 0, ringRadius, density, color(0));
}

function draw() {
  background(255);
  translate(width/2, height/2);
  push();
  strokeWeight(5);
  centerRing.draw();
  pop();
  let n = map(sin(frameCount * 0.01) * 2, -1, 1, 0, 1);
  let newColor = lerpColor(color('#6E48AA'), color('#BA8B02'), n);
  topRing.color = newColor;
  bottomRing.color = newColor;
  leftRing.move(speed * direction, 0);
  rightRing.move(-speed * direction, 0);
  topRing.move(0, speed * direction);
  bottomRing.move(0, -speed * direction);

  if (bottomRing.centerY < -height) {
    direction = -1;
  }

  if (bottomRing.centerY > 0) {
    direction = 1;
  }
};
    

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class ConcentricRings {
  constructor(centerX, centerY, radius, ringDensity, color) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.ringDensity = ringDensity;
    this.color = color;
  }

  move(x, y) {
    this.centerX += x;
    this.centerY += y;
    this.draw();
  }

  draw() {
    for (let i = 0; i < this.radius; i += this.ringDensity) {
      stroke(this.color);
      noFill();
      ellipse(this.centerX, this.centerY, i, i);
    }
  }
}