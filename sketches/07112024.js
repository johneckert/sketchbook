let CENTER_X, CENTER_Y, radialDensity, radialColor1, radialColor2, lineColor1, lineColor2, moireRect1, moireRect2, speed;


function setup() {
  CENTER_X = windowWidth / 2;
  CENTER_Y = windowHeight / 2;
  createCanvas(windowWidth, windowHeight);
  radialDensity = 22.4;
  radialColor1 = color('#85D8CE');
  radialColor2 = color('#F8CDDA');
  lineColor1 = color('#3a6186');
  lineColor2 = color('#89253e');
  moireRect1 = new MoireRectangle(0, 0, windowWidth , windowHeight, lineColor1, 1.8, 10, noise(5,10))
  moireRect2 = new MoireRectangle(0, 0, windowWidth , windowHeight, lineColor1, 1.8, 10, noise(5,10))
  moireRect1.loop()
  moireRect2.loop()
}


function draw() {
  background(color('#2c3e50'));
  for (let i = 0; i < 360 * radialDensity; i += PI * 8.5) {
    let colorInc = 0.5 * (1 + sin(TWO_PI * i));
    let radialColor = lerpColor(radialColor1, radialColor2, colorInc)
    let line = new RadialLine(CENTER_X, CENTER_Y, i / radialDensity, windowWidth, radialColor);
    line.draw();
  }
  moireRect1.animate();
  moireRect2.animate();
  push();
  noStroke();
  fill(color('#2c3e50'));
  circle(CENTER_X, CENTER_Y, windowWidth/ 15);
  pop();
}


class RadialLine {
  constructor(x, y, angle, length, color) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = length;
    this.color = color;
  }

  draw() {
    push();
    rotate(sin(frameCount) * this.rotationSpeed / 8);
    stroke(this.color);
    line(this.x, this.y, this.x + cos(this.angle) * this.length, this.y + sin(this.angle) * this.length);
    pop();
  }
}

class MoireRectangle {
  constructor(x, y, w, h, color, lineWeight, lineSpacing, speed = 0, direction = 'x', lineAngle = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.lineWeight = lineWeight;
    this.lineSpacing = lineSpacing;
    this.lineAngle = lineAngle;
    this.speed = speed;
    this.direction = direction;
    this.looped = false;
  }
  animate() {
    if (this.direction === 'x') {
      this.x += this.speed;
      this.wrapX();
      if (this.x > windowWidth && this.looped) {
        this.x = this.lineSpacing;
      }

      if (this.x + this.h < 0 && this.looped) {
        this.x = windowWidth - this.w - this.lineSpacing;
      }
      this.draw();
    } else if (this.direction === 'y') {
      this.y += this.speed;
      if (this.y > windowHeight && this.looped) {
        this.y = 0;
      }
      this.draw();
    } else {
      console.error('Invalid direction. Must be "x" or "y"');
    }
  }

  loop() {
    this.looped = true;
  }

  private

  wrapX() {
    push();
    translate(0, this.y);
    rotate(this.lineAngle);
    stroke(this.color);
    strokeWeight(this.lineWeight);
    if (this.speed > 0) {
      if (this.x + this.w > windowWidth) {
        let overflow = this.x + this.w - windowWidth;
        for (let i = 0; i < overflow; i += this.lineSpacing) {
          line(i, 0, i + this.lineAngle, this.h);
        }

      }
    }
    if (this.speed < 0) {
      if (this.x < 0) {
        let overflow = abs(this.x);
        for (let i = windowWidth - overflow; i < windowWidth; i += this.lineSpacing) {
          line(i, 0, i + this.lineAngle, this.h);
        }
      }
    }

    pop();
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.lineAngle);
    stroke(this.color);
    strokeWeight(this.lineWeight);
    for (let i = 0; i < this.w; i += this.lineSpacing) {
      line(i, 0, i + this.lineAngle, this.h);
    }
    pop();
  }
}