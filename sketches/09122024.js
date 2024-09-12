let waves = [];
let centerL, centerR, center, numVertices, radius;
let colors;

function setup() {
  colors = [color('#5D4157'), color('#A8CABA')];
  createCanvas(windowWidth, windowHeight);
  noFill();
  radialGradient(...colors.reverse());
  centerL = createVector(0, height / 2);
  centerR = createVector(width, height / 2);
  center = createVector(width / 2, height / 2);

  radius = 100;
  numVertices = 30;
  waves.push(new Wave(radius, numVertices, centerL, colors[0]));
  waves.push(new Wave(radius, numVertices, centerR, colors[0]));
  waves.push(new Wave(radius, numVertices, center, colors[1]));
}

function draw() {
  for (let wave of waves) {
    wave.draw();
    wave.move();
  }

  if (frameCount % 100 == 0) {
    waves.push(new Wave(radius, numVertices, center, colors[1]));
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
