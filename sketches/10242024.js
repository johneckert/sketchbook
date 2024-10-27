let ripples = [];
let colors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(color('rgb(0, 35, 58)'));

  ripples.push(new RippleDisc(width / 2, height / 2, 1000, { r: 50, g: random(200, 255), b: random(200, 255) }));

  // frameRate(50);
}

function draw() {
  background(color('rgb(0, 35, 58)'));

  ripples.forEach(ripple => {
    ripple.draw();
  });

  if (frameCount % 10 == 0) {
    col = { r: 50, g: random(200,255), b: random(200,255) };
    ripples.push(new RippleDisc(random(width), random(height), random(50, 500), col));
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
