let waves = [];
let centerWaves =[];
let center, centerVertices, radius, quarterH, quarterW, colors, corner1, corner2, corner3, corner4, vertices, currentColor;
let diagScreen;

function setup() {
  colors = [color('#4CA1AF'), color('#2C3E50')];
  createCanvas(windowWidth, windowHeight);
  noFill();
  radialGradient(...colors);
  quarterH = height / 4;
  quarterW = width / 4;
  vertices = 10;
  centerVertices = 10;

  strokeWeight(1)
  center = createVector(width / 2, height / 2);

  waves.push(new VertWave(quarterW, 100, height  - 100, vertices, colors[0]));
  waves.push(new VertWave(quarterW * 3, 100, height - 100, vertices, colors[0]));

  centerWaves.push(new Wave(10, 4, center, colors[1]));
}

function draw() {
  push();
  strokeWeight(0.5);
  waves.forEach(cornerWave => {
    cornerWave.draw();
    cornerWave.move();
  });
  if (frameCount % 10 == 0) {
    colorInc = map(sin(frameCount % 100), -1, 1, 0, 1);
    currentColor = lerpColor(colors[0], colors[1], colorInc);
    waves.push(new VertWave(quarterW, 1, height, vertices, currentColor));
    waves.push(new VertWave(quarterW * 3, 1, height, vertices, currentColor));
  }
  pop();
  centerWaves.forEach(centerWave => {
    centerWave.draw();
    centerWave.move();
  });
  if (frameCount % 250 == 0) {
    centerWaves.push(new Wave(10, 4, center, colors[1]));
  }
}


class VertWave {
  constructor(x, waveWidth, waveHeight, numVertices, c) {
    this.vertices = [];
    this.rightVertices = [];
    this.numVertices = numVertices % 2 === 0 ? numVertices : numVertices + 1;
    this.height = waveHeight;
    this.width = waveWidth;
    this.x = x;
    this.color = c;
    this.startingVertex = createVector(x, center.y - waveHeight / 2)
    this.endingVertex = createVector(x, center.y + waveHeight / 2)

    let vx, vy;
    for (let i = 0; i < this.numVertices; i++) {
      let vUnit = this.height / ((this.numVertices / 2) + 1);
        vy = i < this.numVertices / 2 ? this.startingVertex.y + (vUnit * (i + 1)) : this.endingVertex.y - (vUnit * ((i + 1) - this.numVertices / 2));
        vx = i < this.numVertices / 2 ? this.x - this.width / 2 : this.x + this.width / 2;
        console.log(vx, vy);
        let vertex = createVector(vx, vy);
        this.vertices.push(vertex);
    }

  }

  draw() {
    push();
    noFill();
    stroke(this.color);
    beginShape();
    this.vertices.forEach((v,i) => {
      if (i === 0) {
        vertex(this.startingVertex.x, this.startingVertex.y);
      };
      vertex(v.x, v.y);
     if (i === (this.numVertices / 2) - 1) {
       vertex(this.endingVertex.x, this.endingVertex.y);
     }
    });
    endShape(CLOSE);
    pop();
  }

  move() {
    this.vertices.forEach((v, i) => {
      let isLeft = i <= (this.vertices.length - 1) / 2;
      let vel = isLeft ? createVector(-1, 0): createVector(1, 0);

      v.add(vel);

      if (v.x > width) {
        v.x = width;
        vel.x *= -1;
      }

      if (v.x < 0) {
        v.x = 0;
        vel.x *= -1;
      }
    });
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
