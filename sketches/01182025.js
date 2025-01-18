// #Genuary2025 #Genuary18
// https://genuary.art/
// Prompt: What does wind look like?

let count = 0;
const particles = [];
let flatWave;
const colors = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colors.push(color("#F0F2F0"));
  colors.push(color("#000C40"));
  background(0);
  for (let i = 0; i < 10 * height; i++) {
    particles.push(new Particle(0, height / 2 - (i / 10 + random(-10, 10))));
  }
  flatWave = new FlatWave();
}

function draw() {
  background(colors[1]);
  push();
  let particleColor = flatWave.color();
  stroke(particleColor);
  particles.forEach(p => {
    if (particleColor.levels[0] === 0 && particleColor.levels[1] === 12 && particleColor.levels[2] === 64) {
      p.reset();
    }
    p.display();
    p.blow()
  });
  flatWave.display();
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class FlatWave {
  constructor() {
    this.lines = [];
    this.totalLines = width / 2;
    this.waveFrequency = (TWO_PI * 4) / width;

    for (let i = -this.totalLines; i <= 0; i++) {
      const t = map(sin(i * this.waveFrequency), -1, 1, 0, 1);
      const col = lerpColor(colors[1], colors[0], t);
      let startx = -1 * height / 2;
      let endx = height / 2;
      this.lines.push({
        p1: createVector(i, startx), 
        p2: createVector(i, endx),
        col
      });
    }
    this.col = this.lines[this.lines.length - 1].col;
  }

  color() {
    return this.col;
  }

  display() {
    push();

    this.lines.forEach(l => {
      stroke(l.col);
      strokeWeight(1);
      line(l.p1.x, l.p1.y, l.p2.x, l.p2.y);
      l.p1.x += 1; 
      l.p2.x += 1;

      if (l.p1.x > 0) {
        l.p1.x = -this.totalLines;
        l.p2.x = -this.totalLines;
        this.col = l.col;
      }
    });
    pop();
  }
}


class Particle {
  constructor(x, y) {
    this.startX = x;
    this.startY = y;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 5;
  }

  reset() {
    this.pos = createVector(this.startX, this.startY);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }

  display() {
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }

  blow() {
    const centerX = 0;
    const directionX = this.pos.x < centerX ? -1 : 1;
    this.acc = createVector(directionX * random(-10, 10), 0);
    this.updatePosition();
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.pos = createVector(0, this.pos.y);
    }
  }

  updatePosition() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
  }
}
