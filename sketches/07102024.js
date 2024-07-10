let CENTER_X, CENTER_Y, radialDensity, radialColor1, radialColor2, lineColor1, lineColor2;;

function setup() {
  frameRate(60);
  CENTER_X = windowWidth / 2;
  CENTER_Y = windowHeight / 2;
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  radialDensity = 22.4;
  radialColor1 = color('#85D8CE');
  radialColor2 = color('#85D8CE');
  lineColor1 = color('#1D2B64');
  lineColor2 = color('#F8CDDA');


}

function draw() {
  background(color('#2c3e50'));
  for (let i = 0; i < 360 * radialDensity; i += PI * 8.5) {
    let colorInc = 0.5 * (1 + sin(TWO_PI * i));
    let radialColor = lerpColor(radialColor1, radialColor2, colorInc)
    let line = new RadialLine(CENTER_X, CENTER_Y, i / radialDensity, windowWidth, radialColor);
    line.draw();
  }
  push();
  let grid = new OnCenterGrid(2.6, frameCount, lineColor1, lineColor2);
  grid.draw();
  pop();
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
