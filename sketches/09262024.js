let waves = [];
let centerWaves =[];
let center, centerVertices, radius, quarterH, quarterW, colors, corner1, corner2, corner3, corner4, vertices, currentColor;
let diagScreen;

function setup() {
  colors = [color('#F8CDDA'), color('#1D2B64')];
  createCanvas(windowWidth, windowHeight);
  noFill();
  radialGradient(...colors);
  quarterH = height / 4;
  quarterW = width / 4;
  radius = 100;
  vertices = 360;
  centerVertices = 4
  diagScreen = sqrt(sq(width) + sq(height));

  center = createVector(width / 2, height / 2);
  corner1 = createVector(0, 0);
  corner2 = createVector(width, 0);
  corner3 = createVector(0, height);
  corner4 = createVector(width, height);

  waves.push(new Wave(radius, vertices, corner1, colors[0]));
  waves.push(new Wave(radius, vertices, corner2, colors[0]));
  waves.push(new Wave(radius, vertices, corner3, colors[0]));
  waves.push(new Wave(radius, vertices, corner4, colors[0]));

  centerWaves.push(new Wave(radius, centerVertices, center, colors[1]));
}

function draw() {
  push();
  strokeWeight(0.5);
  waves.forEach(cornerWave => {
    cornerWave.draw();
    cornerWave.move();
  });
  if (frameCount % 100 == 0) {
    colorInc = map(sin(frameCount % 100), -1, 1, 0, 1);
  currentColor = lerpColor(colors[0], colors[1], colorInc);
    waves.push(new Wave(radius, vertices, corner1, currentColor));
    waves.push(new Wave(radius, vertices, corner2, currentColor));
    waves.push(new Wave(radius, vertices, corner3, currentColor));
    waves.push(new Wave(radius, vertices, corner4, currentColor));
  }
  pop();
  centerWaves.forEach(centerWave => {
    centerWave.draw();
    centerWave.move();
  });
  if (frameCount % 100 == 0) {
    centerWaves.push(new Wave(radius, centerVertices, center, colors[1]));
    centerVertices +=2
    if (centerVertices > 16) centerVertices = 4;
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
