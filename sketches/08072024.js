let unit, counter = 10;
let geometrics = [];
starts = [];
let colors = [
  ['#232526', '#414345'],
  ['#0F2027', '#203A43'],
  ['#eef2f3', '#8e9eab'],
  ['#333333', '#dd1818'],
];

function setup() {
  noFill();
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  frameRate(100);
  unit = width / 2;
  radialGradient(color('#434343'), color('#000000'));
  ellipseMode(RADIUS);
  starts.push(createVector(-width/8 * 1.5, -height/4));
  starts.push(createVector(-width/ 8 * 3, height/4));
  starts.push(createVector(width/8 * 3, -height/4));
  starts.push(createVector(width/8 * 1.5, height/4));
  geometrics.push(new Geometric(starts[0].x, starts[0].y, 20, colors, 200));
  geometrics.push(new Geometric(starts[1].x, starts[1].y, 20, colors, 200));
  geometrics.push(new Geometric(starts[2].x, starts[2].y, 20, colors, 200));
  geometrics.push(new Geometric(starts[3].x, starts[3].y, 20, colors, 200));
}

function draw() {
  translate(width / 2, height / 2);

  geometrics.map((g) => g.draw());

  if (geometrics[0].getStartRadius() > width * 1.5) {
      geometrics.map((geometric, i) => {
      
      geometric.setCenter(starts[i].rotate(counter).x, starts[i].rotate(counter).y);
      geometric.setStartRadius(20);
      geometric.setWeight(random(1, 10));
    });
  }
  counter+= 10;
}

function randomX() {
  return random(-width / 2, width / 2);
}

function randomY() {
  return random(-height / 2, height / 2);
}

class Geometric {
  constructor(posX, posY, startRadius, colors, alpha) {
    this.center = createVector(posX, posY);
    this.startRadius = startRadius;
    this.colors = colors;
    this.colorInc = 0;
    this.loopColors = this.colors[0];
    this.colorStep = 0;
    this.colorDirection = 1;
    this.strokeColor = this.loopColors[0];
    this.alpha = alpha;
    this.weight = 1;
    this.direction = 1;
  }

  setWeight(weight) {
    this.weight = weight;
  }

  setCenter(posX, posY) {
    this.center = createVector(posX, posY);
  }

  setStartRadius(startRadius) {
    this.startRadius = startRadius;
  }

  getStartRadius() {
    return this.startRadius;
  }

  stepColor() {
    if (this.colorStep >= 1) {
      this.colorDir = -1;
      this.colorInc = this.colorInc >= this.colors.length - 1 ? 0 : this.colorInc + 1;
    } else if (this.colorStep <= 0) {
      this.colorDir = 1;
    }

    this.colorStep += 0.1 * this.colorDir;
    this.loopColors = this.colors[this.colorInc];
  }

  draw() {
    this.strokeColor = lerpColor(color(this.loopColors[0]), color(this.loopColors[1]), this.colorStep);
    this.strokeColor.setAlpha(this.alpha);
    stroke(this.strokeColor);
    strokeWeight(this.weight);

    beginShape();
    vertex(this.center.x + cos(30) * this.startRadius, this.center.y + sin(30) * this.startRadius);
    vertex(this.center.x + cos(90) * this.startRadius, this.center.y + sin(90) * this.startRadius);
    vertex(this.center.x + cos(150) * this.startRadius, this.center.y + sin(150) * this.startRadius);
    vertex(this.center.x + cos(210) * this.startRadius, this.center.y + sin(210) * this.startRadius);
    vertex(this.center.x + cos(270) * this.startRadius, this.center.y + sin(270) * this.startRadius);
    vertex(this.center.x + cos(330) * this.startRadius, this.center.y + sin(330) * this.startRadius);
    endShape(CLOSE);

    this.stepColor();
    this.startRadius += 10;
    if (this.weight > 10) {
      this.direction = -1;
    }
    if (this.weight < 1) {
      this.direction = 1;
    }
    this.weight += this.direction;
  }
}

function radialGradient(c1, c2) {
  push();
  for(let x=0; x < width * 1.5; x++){
    let inter = map(x, 0, width, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    circle(width/2, height/2, x);
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
