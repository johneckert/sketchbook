let nu_pi;
let flower;

function setup() {
  createCanvas(windowWidth, windowHeight);
  nu_pi = PI;
  flower = new Flower(width / 2, height / 2, 1000, 4);
  noFill();
}

function draw() {
  text(`𝛑 = ${nu_pi}`, width - 150, height - 25);
  flower.display();
  flower.update();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Petal {
  constructor(x, y, rotation, size) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.size = size;
    this.growth1 = createVector(-5, -8);
    this.growth2 = createVector(5, -8);

    this.start = createVector(0, 0);
    this.control1 = createVector(-45, -45);
    this.control2 = createVector(45, -45);
    this.end = createVector(0, 0);
    this.i = 0;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    beginShape();
    bezier(this.start.x, this.start.y, this.control1.x, this.control1.y, this.control2.x, this.control2.y, this.end.x, this.end.y);
    endShape();
    pop();
  }

  update() {
    this.control1.add(this.growth1);
    this.control2.add(this.growth2);
    if (this.i >= this.size) {
      this.control1.mult(random(-0.5, 0.5), 0);
      this.control2.mult(random(-0.5, 0.5), 0);
      this.i = 0;
    }
    
    this.i++;
  }
}

class Flower {
  constructor(x, y, size, numPetals) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.numPetals = numPetals;
    this.petals = [];
    this.angle = (nu_pi * 2) / this.numPetals;
    for (let i = 0; i < this.numPetals; i++) {
      this.petals.push(new Petal(this.x, this.y, this.angle * i, this.size));
    }
  }

  display() {
    for (let i = 0; i < this.numPetals; i++) {
      this.petals[i].display();
    }
  }

  update() {
    for (let i = 0; i < this.numPetals; i++) {
      this.petals[i].update();
    }
  }
}
