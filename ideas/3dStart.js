// #Genuary2025 #Genuary8
// https://genuary.art/
// Prompt: Draw one million of something.

const ONE_MILLION = 1000000;
let ball, ring, cam;
let balls = [];

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight, WEBGL);
  //Default Camera -  x: 0, y: 0, z: 800, centerX: 0, centerY: 0, centerZ: 0, upX: 0, upY: 0, upZ: 1.
  cam = createCamera();
  setCamera(cam);

  // ball = new Ball(800);
  ring = new Ring(500, 20);
  balls.push(new Ball(50));
}

function draw() {
  background(255);
  pointLight(255, 0, 255, 0, 0, 0);

  noFill();
  // ball.display();
  balls.forEach(ball => {
    ball.display();
  });

  push();
  ring.display();
  pop();
}

class Ring {
  constructor(size, thickness) {
    this.size = size;
    this.thickness = thickness;
    beginGeometry();
    torus(size, thickness, 24, 16);
    this.geometry = endGeometry();

    this.faces = this.geometry.faces;
  }

  display() {
    for (let face of this.faces) {
      strokeWeight(0.1);
      stroke(0);

      // Draw the face.
      beginShape();
      // Iterate over the vertices that form the face.
      for (let f of face) {
        // Get the vertex's p5.Vector object.
        let v = this.geometry.vertices[f];
        // vertex(v.x, v.y, v.z);
        vertex(v.x, v.y, v.z * tan(frameCount) * 10);
      }
      endShape();
    }
  }
}

class Ball {
  constructor(size) {
    this.size = size;
    beginGeometry();
    sphere(100, 24, 24);
    this.geometry = endGeometry();

    this.faces = this.geometry.faces;
  }

  display() {
    for (let face of this.faces) {
      strokeWeight(0.1);
      stroke(0);

      // Draw the face.
      beginShape();
      // Iterate over the vertices that form the face.
      for (let f of face) {
        // Get the vertex's p5.Vector object.
        let v = this.geometry.vertices[f];
        vertex(v.x, v.y, v.z);
        vertex(v.x, v.y, v.z * sin(frameCount) * 7);
      }
      endShape();
    }
  }
}