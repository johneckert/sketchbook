// #Genuary2025 #Genuary13
// https://genuary.art/
// Prompt: Triangles and nothing else.

let numVertices = 3;
let flip = false;
let topCenter, bottomCenter;
let highlight = '#FFEFBA'
const bgColors = ['#DECBA4', '#3E5151'];
let topWaves = [];
let bottomWaves = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  topCenter = createVector(width / 2, 0);
  bottomCenter = createVector(width / 2, height);

  topWaves.push(new Wave(1, topCenter, color(highlight), "bottom"));
  bottomWaves.push(new Wave(1, bottomCenter, color(highlight), "top"));
}

function draw() {
  radialGradient(color(bgColors[0]), color(bgColors[1]));
  if (flip) {
    bottomWaves.forEach(wave => {
      wave.draw();
      wave.move();
    });

    topWaves.forEach(wave => {
      wave.draw();
      wave.move();
    });
  } else {
    topWaves.forEach(wave => {
      wave.draw();
      wave.move();
    });
  
    bottomWaves.forEach(wave => {
      wave.draw();
      wave.move();
    });
  }

  if (frameCount % 5 === 0) {
    let isBounce = frameCount % height / 2 === 0
    let bounceColor = color(highlight);
    let normalColor = lerpColor(color(bgColors[1]), color(bgColors[0]), map(sin(frameCount * 0.1), -1, 1, 0, 1.0));
    let lineColor = isBounce ? bounceColor : normalColor; 
    topWaves.push(new Wave(1, topCenter, lineColor, "bottom"));
    bottomWaves.push(new Wave(1, bottomCenter, lineColor, "top"));
  }

  flip = !flip;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Wave {
  constructor(radius, center, col, direction) {
    this.vertices = [];
    this.velocities = [];
    this.center = center;
    this.direction = direction;
    this.col = col;


    for (let i = 0; i < 3; i++) {
      let angle = TWO_PI * (i / 3);
      
      if (this.direction === "top") {
        angle -= HALF_PI; // Point upwards
      } else if (this.direction === "bottom") {
        angle += HALF_PI; // Point downwards
      } else if (this.direction === "left") {
        angle += PI; // Point to the left
      } else if (this.direction === "right") {
        // Default: right, no adjustment needed
      }


      let vx = cos(angle) * radius;
      let vy = sin(angle) * radius;
      let vertex = createVector(vx, vy);
      this.vertices.push(vertex);

      let velocity = vertex.copy().normalize().mult(2);
      this.velocities.push(velocity);
    }
  }

  getHeight() {
    let sideLength = sqrt(sq(this.vertices[1].x - this.vertices[0].x) + sq(this.vertices[1].y - this.vertices[0].y));
    console.log('h: ', (sideLength * sqrt(3)) / 2)
    return (sideLength * sqrt(3)) / 2 //height
  }

  reposition(movementVector) {
    this.vertices.map((v, i) => {
      console.log('before: ', this.vertices[i]);
      v.add(movementVector);
      console.log('after: ', this.vertices[i]);
    })
  }

  draw() {
    push();
    noFill();
    stroke(this.col); 
    strokeWeight(1);
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
  translate(width * 0.5, height * 0.5);
  for(let r = 0; r < width * 1.5; r++){
    let inter = map(r, 0, width, 0, 1.0);
    let c = lerpColor(c1, c2, inter);
    strokeWeight(1);
    stroke(c);
    //triangle
    beginShape();
    vertex(cos(TWO_PI * (1 / 3) - HALF_PI) * r, sin(TWO_PI * (1 / 3) - HALF_PI) * r);
    vertex(cos(TWO_PI * (2 / 3) - HALF_PI) * r, sin(TWO_PI * (2 / 3) - HALF_PI) * r);
    vertex(cos(TWO_PI * 3 - HALF_PI) * r, sin(TWO_PI * 3 - HALF_PI) * r);
    endShape(CLOSE);
  }
  pop();
}