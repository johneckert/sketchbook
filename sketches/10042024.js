let shapes = [];
let centers = [];
let velocities = [];
let radius, colors, cInc, colorIncCenter, vertices, centerCount;

function setup() {
  colors = [color('#0b8793'), color('#360033')];
  createCanvas(windowWidth, windowHeight);
  noFill();
  frameRate(25);
  radialGradient(...colors);

  radius = 50;
  vertices = 12;
  for (let i = 0; i <= width; i+= width / 4) {
    for (let j = 0; j <= height; j+= height / 4) {
      centers.push(createVector(i, j));
    }
  }
}

function draw() {
  push();
  strokeWeight(5);
  shapes.forEach(shape => {
    shape.draw();
    shape.move();
  });

  if (frameCount % 10 == 0) {
    let col = colors[Math.floor(Math.random() * colors.length)];
    centers.forEach(center => {
      shapes.push(new Wave(radius, vertices, center, col, false));
      shapes[shapes.length - 1].randomFlip();
    });
  }

  pop();
}


class Wave {
  constructor(radius, numVertices, center, col, reflect = true) {
    this.vertices = [];
    this.velocities = [];
    this.center = center;
    this.color = col;
    this.reflect = reflect;

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
    this.counter++;
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
