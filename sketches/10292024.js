let ripples = [];
let rippleColor = hexToRgb('#4286f4');
let bgColor = hexToRgb('#373B44');
const lineValues = hexToRgb('#91EAE4')
let lineColor = `rgba(${lineValues.r}, ${lineValues.g}, ${lineValues.b}, 1)`
let darkLineColor = `rgba(${lineValues.r}, ${lineValues.g}, ${lineValues.b}, 1)`
let counter = 0;
let waves = [];
let centerVertices;
let numberOfVertices;
let rippleDensity;

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  } else {
    createCanvas(windowHeight, windowHeight);
  }
  background(color(`rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`));

  rippleDensity = 4;
  numberOfVertices = 4;
  centerVertices = 4;

  ripples.push(new RippleDisc(0, height / 2, width * 2, rippleColor));
  ripples.push(new RippleDisc(width, height / 2, width * 2, rippleColor));
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

  if (frameCount % 20 == 0) {
    waves.push(new Wave(10, centerVertices, createVector(width / 2, 0), color(darkLineColor)));
    waves.push(new Wave(10, centerVertices, createVector(width / 2, height), color(darkLineColor)));
  }

  // if (frameCount % 20 == 0) {
  //   waves.push(new Wave(10, numberOfVertices, createVector(0, height * 0.25), color(lineColor)));
  //   waves.push(new Wave(10, numberOfVertices, createVector(0, height * 0.75), color(lineColor)));
  //   waves.push(new Wave(10, numberOfVertices, createVector(width, height * 0.25), color(lineColor)));
  //   waves.push(new Wave(10, numberOfVertices, createVector(width, height * 0.75), color(lineColor)));
    
  // }
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
  constructor(radius, numVertices, center, c) {
    this.vertices = [];
    this.velocities = [];
    this.center = center;
    this.color = c;

    for (let i = 0; i < numVertices; i++) {
      let angle = TWO_PI * (i / numVertices);
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

  moveCenter(velocity) {
    if (this.center.x <= -width / 2 || this.center.x >= width + width / 2) {
      velocity.x *= -1;
    }
    if (this.center.y <= -height / 2 || this.center.y >= height + height / 2) {
      velocity.y *= -1;
    }
    this.center.add(velocity);
  }

  move() {
    for (let i = 0; i < this.vertices.length; i++) {
      let v = this.vertices[i];
      let vel = this.velocities[i];

      v.add(vel);
      if (this.center.x + v.x < 0 || this.center.x + v.x > width) {
        vel.x *= -1;
      }
      if (this.center.y + v.y < 0 || this.center.y + v.y > height) {
        vel.y *= -1;
      }
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
