// #Genuary2025 #Genuary2
// https://genuary.art/
// Prompt: Layers upon layers upon layers.
const drips = [];

function setup() {
  frameRate(40);
  createCanvas(windowWidth, windowHeight);
  drips.push(new Drip());
  drips.push(new Drip());
  drips.push(new Drip());
  drips.forEach(drip => {
    drip.display();
  });
}

function draw() {
  background(color('#FFFDE4'));
  drips.forEach(drip => {
    if (drip.stopped && !drip.isDead()) {
      drips.push(new Drip());
      drip.kill();
    } else {
      drip.animate();
    }
    drip.display();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Drip {
  constructor() {
    this.width = random(100, 500);
    this.midX = random(0, width);
    this.minX = this.midX - this.width / 2;
    this.maxX = this.midX + this.width / 2;
    this.maxHeight = height;
    this.stopped = false;
    this.dead = false;
    this.color = color(random(255), random(255), random(255), 150);

    this.controlPointsLeft = Array.from({ length: 6 }, (_,i) => ({
      x: this.minX + map(i, 0, 5, 0, this.width / 2),
      y: 0,
    }));

    this.controlPointsRight = Array.from({ length: 6 }, (_, i) => ({
      x: this.maxX - map(i, 5, 0, 0, this.width / 2),
      y: 0,
    }));

    this.bottomPoint = {
      x: this.midX,
      y: 0.5,
    };
  }

  display() {
    fill(this.color);
    noStroke();

    beginShape();
    curveVertex(this.minX, 0);

    this.controlPointsLeft.forEach((pt) => curveVertex(pt.x, pt.y));

    curveVertex(this.bottomPoint.x, this.bottomPoint.y); // center bottom point

    this.controlPointsRight.forEach((pt) => curveVertex(pt.x, pt.y));

    curveVertex(this.maxX, 0);
    endShape(CLOSE);
  }

  animate() {
    if (this.stopped) return;

    for (let i = 0; i < this.controlPointsLeft.length; i++) {
      const pt = this.controlPointsLeft[i];
      const prevY = i > 0 ? this.controlPointsLeft[i - 1].y : 0;
      const nextY = i < this.controlPointsLeft.length - 1 ? this.controlPointsLeft[i + 1].y : this.maxHeight;

      pt.y = pt.y + (i * random(1.0, 3.5));
      pt.x = constrain(pt.x + random(-1, 1), this.minX, this.midX);
    }

    for (let i = 0; i < this.controlPointsRight.length; i++) {
      const pt = this.controlPointsRight[i];
      const prevY = i > 0 ? this.controlPointsRight[i - 1].y : 0;

      pt.y = pt.y = pt.y + (i * random(1.0, 3.5))
      pt.x = constrain(pt.x + random(-1, 1), this.midX, this.maxX);
    }

    this.bottomPoint.y += random(0, 50);
    this.bottomPoint.x = constrain(
      this.bottomPoint.x + random(-5, 5),
      this.midX - this.width / 4,
      this.midX + this.width / 4
    );

    if (this.controlPointsLeft[this.controlPointsLeft.length - 2].y > this.maxHeight) {
      this.stopped = true;
    }
  }

  stop() {
    this.stopped = true;
  }

  kill() {
    this.dead = true;
  }

  isDead() {
    return this.dead;
  }
}
