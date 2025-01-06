// #Genuary2025 #Genuary5
// https://genuary.art/
// Prompt: Isometric Art.

let doodads = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = random(width / 100, width / 50); i > 0; i--) {
    doodads.push(new Tower(random(0, width), random(100, height), random(width / 7, width / 3)));
  }

  doodads.sort((a, b) => a.y - b.y);
}

function draw() {
  background(color('#544a7d'));
  for (let i = 0; i < doodads.length; i++) {
    doodads[i].display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Tower {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = width / 2;

    this.ptTop = createVector(this.x, this.y + this.height / 2);
    this.ptRight = createVector(this.x + this.width / 2, this.y);
    this.ptBottom = createVector(this.x, this.y - this.height / 2);
    this.ptLeft = createVector(this.x - this.width / 2, this.y);
  }

  display() {
    stroke(0);
    strokeWeight(1);

    // left
    push();
    // fill('#659999');
    fill(color(101, 153, 153));
    beginShape();
    vertex(this.ptLeft.x, this.ptLeft.y);
    vertex(this.ptBottom.x, this.ptBottom.y);
    vertex(this.ptBottom.x, height);
    vertex(this.ptLeft.x, height);
    endShape(CLOSE);
    pop();

    // right
    // fill('#f4791f');
    fill(color(244, 120, 31));
    push();
    beginShape();
    vertex(this.ptRight.x, this.ptRight.y);
    vertex(this.ptBottom.x, this.ptBottom.y);
    vertex(this.ptBottom.x, height);
    vertex(this.ptRight.x, height);
    endShape(CLOSE);
    pop();

    // top
    push();
    // fill('#ffd452');
    fill(color(255, 212, 82));
    beginShape();
    vertex(this.ptTop.x, this.ptTop.y);
    vertex(this.ptRight.x, this.ptRight.y);
    vertex(this.ptBottom.x, this.ptBottom.y);
    vertex(this.ptLeft.x, this.ptLeft.y);
    endShape(CLOSE);
    pop();
    
  }
}