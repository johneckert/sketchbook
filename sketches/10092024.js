let waves = [];
let waves2 = [];
let waves3 = [];
let centerL, centerR, center, uL, uR, dL, dR, numVertices, cVertices, radius;
let colors, color2, color3;
let activeColor1, activeColor2;

function setup() {
  frameRate(30);
  colors = [color('#03001e'), color('#7303c0')];
  activeColor1 = colors[0];
  color2 = color('#fdeff9');
  activeColor2 = color3 = color('#ec38bc');
  createCanvas(windowWidth, windowHeight);
  noFill();
  radialGradient(...colors.reverse());

  uL = createVector(0, 0);
  uR = createVector(width, 0);
  dL = createVector(0, height);
  dR = createVector(width, height);
  centerL = createVector(width / 2 + width / 8, height / 2);
  centerR = createVector(width / 2 - width / 8, height / 2);
  center = createVector(width / 2, height / 2);

  radius = 100;
  numVertices = 12;
  ccVertices = 4;
  waves.push(new Wave(radius, numVertices, dL, activeColor1));
  waves.push(new Wave(radius, numVertices, dR, activeColor1));
  waves.push(new Wave(radius, numVertices, uL, activeColor1));
  waves.push(new Wave(radius, numVertices, uR, activeColor1));

  waves3.push(new Wave(radius, ccVertices, center, activeColor2));
}

function draw() {
  strokeWeight(3);
  for (let wave of waves) {
    wave.draw();
    wave.move();
  }
  strokeWeight(0.5);
  for (let wave of waves3) {
    wave.draw();
    wave.move();
  }

  if (frameCount % 60 == 0) {
    activeColor1 = activeColor1 == colors[1] ? colors[0] : colors[1];
    waves.push(new Wave(radius, numVertices, dL, activeColor1));
    waves.push(new Wave(radius, numVertices, dR, activeColor1));
    waves.push(new Wave(radius, numVertices, uL, activeColor1));
    waves.push(new Wave(radius, numVertices, uR, activeColor1));
  }

  if (frameCount % 20 == 0) {
    // activeColor2 = activeColor2 == color2 ? color3 : color2;
    waves3.push(new Wave(radius, ccVertices, center, activeColor2));

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
