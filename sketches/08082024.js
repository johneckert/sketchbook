let unit;
let blobs = [];
let numberOfBlobs = 250;
let colors = [
  '#f4791f',
  '#24FE41',
  '#db36a4',
  '#f7ff00',
  '#f12711',
  '#2948ff'
];

function setup() {
  noFill();
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  unit = width / 2;
  ellipseMode(RADIUS);
  for (let i = 0; i < numberOfBlobs; i++) {
    blobs.push(new Blob(colors[i % colors.length]));
  }
}

function draw() {
  radialGradient(color('#3A6073'), color('#16222A'));
  for (let i = 0; i < blobs.length; i++) {
    let gravity = createVector(0, 0.5 * blobs[i].mass);
    blobs[i].applyForce(gravity);
    blobs[i].move();
    blobs[i].display();
    blobs[i].bounce();
    blobs[i].wibble();
  }

  
  filter(BLUR, 20);
}
class Blob {
  constructor(strokeColor) {
    this.diameterX = random(50, 200);
    this.diameterY = this.diameterX;
    this.diameter = (this.diameterX + this.diameterY) / 2;
    this.wobble = random(1);

    this.mass = this.diameter * 0.1;
    this.position = createVector(random(width), map(random(height * 3), 0, height * 3, -height, height * 2));
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.centerOfGravity = createVector(this.position.x, this.position.y * -1);
    this.color = color(strokeColor)
    this.fillColor = this.color;
    this.fillColor.setAlpha(80);
  }

  applyForce(force) {
    // Newton's 2nd law: F = M * A
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }
  bounce() {
    // Reverse direction of acceleration if blob hits the edge of the canvas
    if (this.position.y > height - this.mass * 8) {
      this.centerOfGravity = createVector(this.position.x, 0);
    }

    if (this.position.y < this.mass * 8) {
      this.centerOfGravity = createVector(this.position.x, height);
    }
  };

  wibble() {
    this.diameterX *= (1 + sin(this.wobble) * 0.005);
    this.diameterY *= (1 + sin(this.wobble + PI) * 0.005);
    this.wobble += abs(this.velocity.mag()) * 0.05 + 0.005;
    if (this.diameterX > 200) {
      this.diameterX = 200;
    }
    if (this.diameterY > 200) {
      this.diameterY = 200;
    }
  }

  move() {
    this.gravityForce = p5.Vector.sub(this.centerOfGravity, this.position);
    this.acceleration.add(this.gravityForce);
    this.velocity.add(this.acceleration); // Velocity changes according to acceleration
    this.velocity.limit(0.5);
    this.position.add(this.velocity);

    // clear acceleration each frame
    this.acceleration.mult(0);
  }

  display() {
    push();
    strokeWeight(10);
    stroke(this.color);
    fill(this.fillColor);
    drawingContext.fillStyle = this.gradient;
    ellipse(this.position.x, this.position.y, this.diameterX, this.diameterY);
    pop();
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

