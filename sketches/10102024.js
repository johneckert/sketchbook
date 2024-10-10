let numVertices, rotationAngle, radius, diameter, colors;
const ripplesLeft = [];
const ripplesRight = [];

Array.prototype.random = function() {
  return this[Math.floor((Math.random()*this.length))];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  // colors = [color('rgb(64, 224, 208)'), color('rgb(255, 140, 0)'), color('rgb(255, 0, 128)')];
  colors = [color('rgb(254, 172, 94)'), color('rgb(199, 121, 208)'), color('rgb(75, 192, 200)')];

  background(color('rgb(219, 219, 219)'));
  numVertices = 20;
  rotationAngle = 160;
  radius = 100;
  diameter = 2 * radius;
  

  for (let i = -diameter; i < width + diameter; i+= random(radius - 20, radius + 20)) {
    ripplesLeft.push(new Ripple(i, height / 2, random(radius - 20, radius + 20), height * 3, numVertices, rotationAngle, colors.random(), random(1, 5)));
    ripplesRight.push(new Ripple(width - i, height / 2, random(radius - 20, radius + 20), height * 3, numVertices, rotationAngle, colors.random(), random(1, 5)));
  }
}

function draw() {
  ripplesLeft.forEach(ripple => {
    ripple.draw()
    ripple.move(2,1)
  });

  ripplesRight.forEach(ripple => {
    ripple.draw()
    ripple.move(-2,-1)
  });

  if (frameCount % (0.66 * radius) === 0) {
    ripplesLeft.push(new Ripple(-2 * random(radius - 20, radius + 20), height / 2, random(radius - 20, radius + 20), height * 2, numVertices, rotationAngle, colors.random(), random(1, 5)));
    ripplesRight.push(new Ripple(width + (2 * random(radius - 20, radius + 20)), height / 2, random(radius - 20, radius + 20), height * 2, numVertices, rotationAngle, colors.random(), random(1, 5)));
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Ripple {
  constructor(cx, cy, rx, ry, numVertices, rotationAngle, color, opacity) {
    this.cx = cx;
    this.cy = cy;
    this.rx = rx;
    this.ry = ry;
    this.numVertices = numVertices;
    this.rotationAngle = rotationAngle;
    this.color = color;
    this.opacity = opacity;
  }

  draw() {
    push();
    noStroke();
    this.color.setAlpha(this.opacity);
    fill(this.color);
    beginShape();
    for (let i = 0; i <= this.numVertices; i++) {
      let t = map(i, 0, this.numVertices, 0, 360);
 
      // Parametric equations of an ellipse
      let x = this.cx + this.rx * cos(t);
      let y = this.cy + this.ry * sin(t);

      // Rotate the point by rotationAngle around the center (cx, cy)
      let xRotated = this.cx + (x - this.cx) * cos(this.rotationAngle) - (y - this.cy) * sin(this.rotationAngle);
      let yRotated = this.cy + (x - this.cx) * sin(this.rotationAngle) + (y - this.cy) * cos(this.rotationAngle);

      curveVertex(xRotated, yRotated);
    }
    endShape(CLOSE);
    pop();
  }

  move(cx, cy) {
    this.cx += cx;
    this.cy += cy;
  }
}
