let shapes = [];
let velocities = [];
let center, radius, colors, cInc, vertices;

function setup() {
  colors = [color('#F3904F'), color('#3B4371')];
  createCanvas(windowWidth, windowHeight);
  noFill();
  frameRate(25);
  radialGradient(...colors);

  center = createVector(width / 2, height / 2);

  radius = 50;
  vertices = 16;

  cU = createVector(width / 2, height / 4);
  cD = createVector(width / 2, 3 * (height / 4));
  cC = createVector(width / 2, height / 2);

  shapes.push(new Wave(radius, vertices, cC, colors[1]));
}

function draw() {
  push();
  strokeWeight(5);
  shapes.forEach(shape => {
    shape.draw();
    shape.move();
  });

  if (frameCount % 50 == 0) {
    colorInc = map(sin(frameCount * 2), -1, 1, 0, 1);
    let currentColor = lerpColor(colors[1], colors[0], colorInc);
    shapes.push(new Wave(radius, vertices, cC, currentColor));

  }

  if (frameCount % 20 == 0) {
    shapes[shapes.length - 1].randomFlip();
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

  shuffleVertices() {
    let currentIndex = this.vertices.length;
  
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.vertices[currentIndex], this.vertices[randomIndex]] = [
        this.vertices[randomIndex], this.vertices[currentIndex]];
    }
  }

  randomFlip() {
    this.velocities.forEach((vel, i) => {
      if (i % 2 == 0 || i === 0) {
        vel.x *= -1;
        vel.y *= -1;
      }
    });
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

  updateColor(newColor) {
    this.color = newColor;
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
