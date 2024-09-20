let waves = [];
let cWaves = [];
let centers = [];
let velocities = [];
let center, uL, uR, dL, dR, uLVel, uRVel, dLVel, dRVel, numVertices, cVertices, radius, quarterH, quarterW, colors, cWave;

function setup() {
  colors = [color('#FFA17F'), color('#00223E')];
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

  uLVel = createVector(1, 1);
  uRVel = createVector(-1, 1);
  dLVel = createVector(1, -1);
  dRVel = createVector(-1, -1);

  velocities.push(uLVel);
  velocities.push(uRVel);
  velocities.push(dLVel);
  velocities.push(dRVel);

  radius = 100;
  numVertices = 4;
  cVertices = 8;
  cWaves.push(new Wave(radius, cVertices, center, colors[1]));
  centers.forEach(center => {
    waves.push(new Wave(radius, numVertices, center, colors[0]));
  });
}

function draw() {
  waves.forEach((wave, i) => {
    wave.draw();
    wave.move();
    if (frameCount % 10 == 0) {
      wave.moveCenter(velocities[i]);
      centers[i] = wave.center;
    }
  });
  colorInc = map(sin(frameCount), -1, 1, 0, 1);

  let currentColor = lerpColor(colors[0], colors[1], colorInc);
  if (frameCount % 10 == 0) {
    waves.push(new Wave(radius, numVertices, uL, currentColor));
    waves.push(new Wave(radius, numVertices, uR, currentColor));
    waves.push(new Wave(radius, numVertices, dL, currentColor));
    waves.push(new Wave(radius, numVertices, dR, currentColor));
    velocities.push(uLVel);
    velocities.push(uRVel);
    velocities.push(dLVel);
    velocities.push(dRVel);
  }
  push();
  strokeWeight(5);
  cWaves.forEach(cWave => {
    cWave.draw();
    cWave.move();
  });
  if (frameCount % 100 == 0) {
    cWaves.push(new Wave(radius, cVertices, center, colors[1]));
  }
  pop();
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
