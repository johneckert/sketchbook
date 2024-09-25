let waves = [];
let cWaves = [];
let cornerWaves = [];
let centers = [];
let velocities = [];
let center, pulseCount, uL, uR, dL, dR, uLVel, uRVel, dLVel, dRVel, numVertices, cVertices, radius, quarterH, quarterW, colors, cWave, cInc, cU, cD, cC, corner1, corner2, corner3, corner4, cornerVertices;

function setup() {
  colors = [color('#71B280'), color('#134E5E')];
  createCanvas(windowWidth, windowHeight);
  noFill();
  radialGradient(...colors);
  quarterH = height / 4;
  quarterW = width / 4;

  center = createVector(width / 2, height / 2);

  uL = createVector(quarterW, quarterH);
  uR = createVector(quarterW * 3, quarterH);
  dL = createVector(quarterW, quarterH * 3);
  dR = createVector(quarterW * 3, quarterH * 3);

  centers.push(uL);
  centers.push(uR);
  centers.push(dL);
  centers.push(dR);

  pulseCount = 0;
  radius = 100;
  numVertices = 4;
  cVertices = 4;
  cornerVertices = 20;
  cU = createVector(width / 2, height / 4);
  cD = createVector(width / 2, 3 * (height / 4));
  cC = createVector(width / 2, height / 2);

  corner1 = createVector(0, 0);
  corner2 = createVector(width, 0);
  corner3 = createVector(0, height);
  corner4 = createVector(width, height);

  cWaves.push(new Wave(radius, cVertices, cU, colors[1]));
  cWaves.push(new Wave(radius, cVertices, cC, colors[1]));
  cWaves.push(new Wave(radius, cVertices, cD, colors[1]));
}

function draw() {
  waves.forEach((wave, i) => {
    wave.draw();
    wave.move();
  });
  colorInc = map(sin(frameCount), -1, 1, 0, 1);
  let currentColor = lerpColor(colors[0], colors[1], colorInc);
  push();
  strokeWeight(5);
  cWaves.forEach(cWave => {
    cWave.draw();
    cWave.move();
  });
  if (frameCount % 200 == 0) {
    cInc = map(sin(frameCount), -1, 1, 0, 1);
    let cCurrentColor = lerpColor(colors[1], colors[0], cInc);
    cWaves.push(new Wave(radius, cVertices, cU, cCurrentColor));
    cWaves.push(new Wave(radius, cVertices, cC, cCurrentColor));
    cWaves.push(new Wave(radius, cVertices, cD, cCurrentColor));
  }
  pop();

  if (frameCount > 800) {
    push();
    strokeWeight(2);
    cornerWaves.forEach(cornerWave => {
      cornerWave.draw();
      cornerWave.move();
    });
    if (frameCount % 50 == 0 && pulseCount < 3) {
      cornerWaves.push(new Wave(radius, cornerVertices, corner1, currentColor));
      cornerWaves.push(new Wave(radius, cornerVertices, corner2, currentColor));
      cornerWaves.push(new Wave(radius, cornerVertices, corner3, currentColor));
      cornerWaves.push(new Wave(radius, cornerVertices, corner4, currentColor));
      pulseCount++;
    }

    if (frameCount % 800 == 0 && pulseCount == 3) {
      pulseCount = 0;
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
