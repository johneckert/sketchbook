// #Genuary2025 #Genuary14
// https://genuary.art/
// Prompt: Pure black and white. No gray.

const rings = []


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
  push();
  strokeWeight(0.5);
  for (let i = 0; i < TWO_PI; i += .03) {
    stroke(255);
    line(0, 0, cos(i) * width, sin(i) * width);
  }
  pop();
  ambientLight(255);
  for (let i = 0; i < width / 4; i++) {
    rings.push(new Iris(i, i / 4, i === width / 4 - 1 ? -1 : 1, 20, createVector(0, 0, i), i === width / 4 - 1 ? true : false));
  }
}

function draw() { 
  rings.forEach(ring => {
    ring.draw();
    ring.animate();
  });
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Iris {
  constructor(radius, tubeRadius, rotationAngle, speed, pos, detail=false) {
    this.radius = radius;
    this.tubeRadius = tubeRadius;
    this.rotationAngle = rotationAngle;
    this.speed = speed;
    this.pos = pos;
    this.detail = detail;
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    fill(255);
    strokeWeight(0.5);
    rotate(this.rotationAngle * this.speed);
    if (this.detail) {
      beginGeometry();
      torus(this.radius, this.tubeRadius, 12, 8);
      let geo = endGeometry();
      geo.faces.forEach((face, i) => {
        beginShape();
        face.forEach(f => {
          fill(i % 2 == 0 ? 0 : 255);
          let v = geo.vertices[f];
          vertex(v.x, v.y, v.z);
        });
        endShape();
      });
    } else {
    torus(this.radius, this.tubeRadius, 10, 2);
    }
    pop();
  }

  animate() {
    this.speed += 0.01;
  }
}