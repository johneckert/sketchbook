let ripples = [];
let rippleColor = hexToRgb('#2C5364');
let bgColor = hexToRgb('#203A43');
let lineColor;
let darkLineColor;
let counter = 0;
let waves = [];
let centerVertices;
let numberOfVertices;
let rippleDensity;
let bounceAngle;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  background(color(`rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`));
  bounceAngle = PI / 4;
  rippleDensity = 4;
  numberOfVertices = 8;
  centerVertices = 4;
  lineColor = setLineColor();
  darkLineColor = color('#0F2027');

  ripples.push(new RippleDisc(width / 2, height / 2, width * 2, rippleColor));
  waves.push(new Wave(50, numberOfVertices, createVector(width - 1, height / 2), PI / 4, lineColor));
  waves.push(new Wave(50, numberOfVertices, createVector(width / 2, 1), PI / 4, lineColor));
  waves.push(new Wave(50, numberOfVertices, createVector(width / 2, height - 1), PI / 4, lineColor));
  waves.push(new Wave(50, numberOfVertices, createVector(1, height / 2), PI / 4, lineColor));
}

function draw() {
  background(color(`rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`));

  ripples.forEach(ripple => {
    ripple.draw();
  });

  waves.forEach(wave => {
    wave.draw();
    wave.move();
  });

  if (frameCount % 32 == 0) {
    lineColor = setLineColor();
  }

  if (frameCount % 8 == 0) {
    waves.push(new Wave(50, numberOfVertices, createVector(width - 1, height / 2), PI / 4, lineColor));
    waves.push(new Wave(50, numberOfVertices, createVector(width / 2, 1), PI / 4, lineColor));
    waves.push(new Wave(50, numberOfVertices, createVector(width / 2, height - 1), PI / 4, lineColor));
    waves.push(new Wave(50, numberOfVertices, createVector(1, height / 2), PI / 4, lineColor));
  }

  if (frameCount % 2 == 0) {
    waves.push(new Wave(50, centerVertices, createVector(width / 2, height / 2), PI / 4, darkLineColor));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class RippleDisc {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.pulseCenter = 0;
    this.pulseSpeed = 5;
    this.pulseSpread = this.r / 3;
  }

  draw() {
    push();
    noFill();
    strokeWeight(1);

    this.pulseCenter += this.pulseSpeed;

    if (this.pulseCenter >= this.r + this.pulseSpread || this.pulseCenter <= 0 - this.pulseSpread) {
      this.pulseCenter = 0 - this.pulseSpread;
    }

    for (let i = 0; i < this.r; i++) {
      let alpha = 50;
      if (i >= this.pulseCenter - this.pulseSpread && i <= this.pulseCenter + this.pulseSpread) {

        if (i <= this.pulseCenter) {
          alpha = map(i, this.pulseCenter - this.pulseSpread, this.pulseCenter, 50, 200);
        } else {
          alpha = map(i, this.pulseCenter, this.pulseCenter + this.pulseSpread, 200, 50);
        }
      }
      if (i > this.r - this.pulseSpread) {
        alpha = alpha * map(i, this.r - this.pulseSpread, this.r, 1, 0);
      }
      stroke(color(this.color.r, this.color.g, this.color.b, alpha));
      circle(this.x, this.y, i);
    }

    pop();
  }
}

class Wave {
  constructor(radius, numVertices, center, bounceAngle, c) {
    this.vertices = [];
    this.velocities = [];
    this.center = center;
    this.bounceAngle = bounceAngle;
    this.color = c;

    for (let i = 0; i < numVertices; i++) {
      // let angle = TWO_PI * (i / numVertices);
      let angle = (3 * PI / 2) + TWO_PI * (i / numVertices);
      let vx = cos(angle) * radius;
      let vy = sin(angle) * radius;
      let vertex = createVector(vx, vy);
      this.vertices.push(vertex);

      let velocity = vertex.copy().normalize().mult(2);
      this.velocities.push(velocity);
    }

  }

  draw() {
    push();
    noFill();
    stroke(this.color);
    beginShape();
    for (let i = 0; i < this.vertices.length; i++) {
      let v = this.vertices[i];
      vertex(this.center.x + v.x, this.center.y + v.y);
    }
    endShape(CLOSE);
    pop();
  }

  move() {
    for (let i = 0; i < this.vertices.length; i++) {
      let v = this.vertices[i];
      let vel = this.velocities[i];

      if (this.center.x + v.x < 0 || this.center.x + v.x > width) {
        let newAngle = vel.heading() + this.bounceAngle;
        vel.x *= -1;
        vel.y = sin(newAngle)
      }
      if (this.center.y + v.y <= 0 || this.center.y + v.y >= height) {
        let newAngle = vel.heading() + this.bounceAngle;
        vel.y *= -1;
        vel.x = cos(newAngle)
      }
      v.add(vel);
    }
  }

}

function radialGradient(c1, c2) {
  push();
  for(let x=0; x < width * 1.5; x++){
    let inter = map(x, 0, width, 0, 1.0);
    let c = lerpColor(c1, c2, inter);
    strokeWeight(1);
    stroke(c);
    circle(width/2, height/2, x);
  }
  pop();
}

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}

function rgbToHex(r, g, b) {
  return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}

function setLineColor() {
  let cVar = map(sin(frameCount), -1, 1, 0, 1);
  let c = lerpColor(color('#aa4b6b'), color('#3b8d99'), cVar);
  return c;
}
