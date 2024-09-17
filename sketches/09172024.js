let waves = [];
let centerL, centerR, center, uL, uR, dL, dR, numVertices, cVertices, radius, quarterH, quarterW, baseColor, colors;
let colorInc = 0;
let colorDir = 1;
let colorStep = 0.3;

function setup() {
  colors = [color('#AA076B'), color('#61045F')];
  baseColor = color('#1F1C2C');
  createCanvas(windowWidth, windowHeight);
  noFill();
  radialGradient(colors[0], baseColor);
  quarterH = height / 4;
  quarterW = width / 4;

  uL = createVector(quarterW, quarterH);
  uR = createVector(quarterW * 3, quarterH);
  dL = createVector(quarterW, quarterH * 3);
  dR = createVector(quarterW * 3, quarterH * 3);
  centerL = createVector(width / 2 + width / 8, height / 2);
  centerR = createVector(width / 2 - width / 8, height / 2);
  centerU = createVector(width / 2, height / 2 + height / 8);
  centerD = createVector(width / 2, height / 2 - height / 8);

  radius = 100;
  numVertices = 4;
  cVertices = 8;
  waves.push(new Wave(radius, numVertices, dL, colors[0]));
  waves.push(new Wave(radius, numVertices, dR, colors[0]));
  waves.push(new Wave(radius, numVertices, uL, colors[0]));
  waves.push(new Wave(radius, numVertices, uR, colors[0]));
  waves.push(new Wave(radius, cVertices, centerL, baseColor));
  waves.push(new Wave(radius, cVertices, centerR, baseColor));
  waves.push(new Wave(radius, cVertices, centerU, baseColor));
  waves.push(new Wave(radius, cVertices, centerD, baseColor));
}

function draw() {
  for (let wave of waves) {
    wave.draw();
    wave.move();
  }

  if (frameCount % 500 == 0) {
    colorInc += colorStep * colorDir;
    if (colorInc >= 1 || colorInc <= 0) {
      colorDir *= -1;
    }
    let currentColor = lerpColor(colors[0], colors[1], colorInc);
    waves.push(new Wave(radius, numVertices, uL, currentColor));
    waves.push(new Wave(radius, numVertices, uR, currentColor));
    waves.push(new Wave(radius, numVertices, dL, currentColor));
    waves.push(new Wave(radius, numVertices, dR, currentColor));
  } else if (frameCount % 100 == 0) {
    waves.push(new Wave(radius, cVertices, centerL, baseColor));
    waves.push(new Wave(radius, cVertices, centerR, baseColor));
    waves.push(new Wave(radius, cVertices, centerU, baseColor));
    waves.push(new Wave(radius, cVertices, centerD, baseColor));
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
