let CENTER_X, CENTER_Y;
let pattern;

function setup() {
  CENTER_X = windowWidth / 2;
  CENTER_Y = windowHeight / 2;
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight, WEBGL);
  pattern = loadImage('textures/bumpy.png');
}

function draw() {
  background(0);
  noStroke();
  //backlight
  pointLight(255,50,150, -windowWidth/2, 0, -300);
  pointLight(255,50,150, 0, 0, -300);
  pointLight(255,50,150, windowWidth / 2, 0, -300);

  //obj light
  pointLight(20,50,150, 0, 0, 1000);
  directionalLight(0, 255, 255, -windowWidth / 2, windowHeight, 500);
  directionalLight(0, 255, 255, windowWidth / 2, windowHeight, 500);
  directionalLight(0, 255, 255, -windowWidth / 2, -windowHeight, 500);
  directionalLight(0, 255, 255, windowWidth / 2, -windowHeight, 500);

  push();
  translate(0,0,-500);
  texture(pattern);
  plane(windowWidth * 2, windowHeight * 2);
  pop();
  rotateX(frameCount / 2);
  push();
  rotateZ(-90);
  texture(pattern);
  cone(windowHeight / 3, windowWidth, 360, 1);
  pop();
  push();
  rotateZ(90);
  texture(pattern);
  cone(windowHeight / 3, windowWidth, 360, 1);
  pop();
  push();
  translate(0,0,300);
  specularMaterial(30);
  sphere(windowHeight / 20);
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

class OnCenterGrid {
  constructor(spacing, rotationSpeed, startcolor, endcolor) {
    this.spacing = spacing;
    this.rotationSpeed = rotationSpeed;
    this.startcolor = startcolor;
    this.endcolor = endcolor;
  }

  draw() {
    translate(CENTER_X, CENTER_Y);
    rotate(sin(frameCount) * this.rotationSpeed);
    for (let i = 0; i < windowWidth * 2; i += this.spacing) {
      let colorInc = (windowWidth / 2 * (1 + sin(PI / this.spacing * i))) * 0.00001;
      stroke(lerpColor(this.startcolor, this.endcolor, colorInc));
      line(i - windowWidth, -windowHeight, i - windowWidth, windowHeight * 2);
      line(-windowWidth, i - windowWidth, windowWidth * 2, i - windowWidth);
    }
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