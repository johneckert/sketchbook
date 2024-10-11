let numVertices, centerVerices, cornerVertices, rotationAngle, radius, diameter, colors, warmColors, coolColors, lineWeight, initialLineWeight;
let uL, dL, uR, dR;
let cornerUL, cornerUR, cornerDL, cornerDR;
let randomColor, randomColorPair;
const ripplesLeft = [];
const ripplesRight = [];
const waves = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  warmColors = [color('rgb(254, 172, 94)'), color('rgb(199, 121, 208)'), color('rgb(255, 0, 128)'), color('rgb(255, 210, 0)')];
  coolColors = [color('rgb(5, 117, 230)'), color('rgb(0, 255, 127)'), color('rgb(78, 205, 196)'), color('rgb(160, 68, 255)')];
  colors = warmColors.concat(coolColors); 

  randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  randomColorPair = () => {
    return [randomColor(), randomColor()];
  }

  background(color('rgb(219, 219, 219)'));
  numVertices = 4;
  centerVertices = 4;
  cornerVertices = 8;


  rotationAngle = 160;
  radius = 100;
  diameter = 2 * radius;
  lineWeight = initialLineWeight = 1;
  uL = createVector(width/4, height/4);
  dL = createVector(width/4, 3 * (height/4));
  uR = createVector(3 * (width/4), height/4);
  dR = createVector(3 * (width/4), 3 * (height/4));

  cornerDL = createVector(0, height);
  cornerUL = createVector(0, 0);
  cornerUR = createVector(width, 0);
  cornerDR = createVector(width, height);

  
  // waves.push(new Wave(radius, centerVertices, createVector(width/2, height/2), randomColor(), 0));
  let col = randomColor();
  waves.push(new Wave(radius, numVertices, uL, col, 50, 0, false));
  waves.push(new Wave(radius, numVertices, uR, col, 50, 0, false));
  waves.push(new Wave(radius, numVertices, dL, col, 50, 0, false));
  waves.push(new Wave(radius, numVertices, dR, col, 50, 0, false));
}

function draw() {
  waves.forEach(wave => {
    console.log(wave.center);
    wave.draw();
    wave.move();
  });

  let colPair = randomColorPair();
  let col = randomColor();

  if (frameCount % 40 == 0) {
    waves.push(new Wave(radius, numVertices, uL, colPair[0], 50, lineWeight, false));
    waves.push(new Wave(radius, numVertices, uR, colPair[0], 50, lineWeight, false));
    waves.push(new Wave(radius, numVertices, dL, colPair[0], 50, lineWeight, false));
    waves.push(new Wave(radius, numVertices, dR, colPair[0], 50, lineWeight, false));
    console.log(waves.length);
  }

  if (frameCount % 20 == 0) {
    lineWeight = lineWeight === 0 ? initialLineWeight : lineWeight - 1;
    waves.push(new Wave(1, cornerVertices, cornerDL, col, 50, 0));
    waves.push(new Wave(1, cornerVertices, cornerUL, col, 50, 0));
    waves.push(new Wave(1, cornerVertices, cornerUR, col, 50, 0));
    waves.push(new Wave(1, cornerVertices, cornerDR, col, 50, 0));
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

class Wave {
  constructor(radius, numVertices, center, col, op, strokeWeight, reflect = true) {
    this.vertices = [];
    this.velocities = [];
    this.center = center;
    this.color = col;
    this.reflect = reflect;
    this.opacity = op;
    this.strokeWeight = strokeWeight;
    const startAngle = -PI / 2;

    for (let i = 0; i < numVertices; i++) {
      let angle = startAngle + TWO_PI * (i / numVertices);
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
    strokeWeight(this.strokeWeight);
    this.color.setAlpha(this.opacity);
    fill(this.color);
    beginShape();
    for (let i = 0; i < this.vertices.length; i++) {
      let v = this.vertices[i];
      vertex(this.center.x + v.x, this.center.y + v.y);
    }
    endShape(CLOSE);
    pop();
    this.counter++;
  }

  move() {
    for (let i = 0; i < this.vertices.length; i++) {
      let v = this.vertices[i];
      let vel = this.velocities[i];

      v.add(vel);
      if (this.reflect) {
        if (v.x + this.center.x < 0 || v.x + this.center.x > width) {
          vel.x *= -1;
        }
        if (v.y + this.center.y < 0 || v.y + this.center.y > height) {
          vel.y *= -1;
        }
      }
    }
  }

}
