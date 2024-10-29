let ripples = [];
let rippleColor = { r:50, g: 200, b: 250 };
let bgColor = { r: 0, g: 35, b: 58 };
let waves = [];
let numberOfVertices;


function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  } else {
    createCanvas(windowHeight, windowHeight);
  }
  background(color(`rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`));
  numberOfVertices = 4;

  ripples.push(new RippleDisc(0, 0, width * 1.25, rippleColor));
  ripples.push(new RippleDisc(width, 0,width * 1.25, rippleColor));
  ripples.push(new RippleDisc(0, height, width * 1.25, rippleColor));
  ripples.push(new RippleDisc(width, height, width * 1.25, rippleColor));

  waves.push(new Wave(10, 12, createVector(width / 2, height / 2), color(`rgb(${rippleColor.r}, ${rippleColor.g}, ${rippleColor.b})`)));
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

  if (frameCount % 10 == 0) {
    waves.push(new Wave(10, 12, createVector(width / 2, height / 2), color(`rgb(${rippleColor.r}, ${rippleColor.g}, ${rippleColor.b})`))); // ('rgb(248, 205, 218)')
  }

  if (frameCount % 10 == 0) {
    waves.push(new Wave(1, numberOfVertices, createVector(0, height / 2), color('#093637')));
    waves.push(new Wave(1, numberOfVertices, createVector(width, height / 2), color('#093637')));
    waves.push(new Wave(1, numberOfVertices, createVector(width / 2, 0), color('#093637')));
    waves.push(new Wave(1, numberOfVertices, createVector(width / 2, height), color('#093637')));
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
