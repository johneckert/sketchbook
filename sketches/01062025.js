// #Genuary2025 #Genuary6
// https://genuary.art/
// Prompt: Make a landscape using only primitive shapes

let waves = [];
let fishes = [];
let boatHeight;
let canvasWidth = 1512;
let canvasHeight = 823;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  let direction = 1;
  let offset = map(sin(frameCount), -1, 1, 0, 2.4);
  let count = 0;
  for (let i = height / 2; i < height; i +=  height  / 6) { 
    waves.push(new Wave(i, offset, direction));
    if (i === height / 2) {
      fishes.push(new Fish(width * 0.2, i * 2, width * 0.03, direction));
      fishes.push(new Fish(width * 0.3, i * 2, width * 0.03, -direction));
    }
    if (count === 2) {
      boatHeight = i - height / 30;
    }
    direction *= -1;
    offset += 1;
    count++;
  }
  fishes.push(new Fish(width / 2, height / 2, -direction));

}

function draw() {
  linearGradient(color('#1a2a6c'), color('#fdbb2d'));
  sun(width / 2, height / 2, 500);
  waves.forEach((wave, i) => {
    if (i < (waves.length - 1) / 2) {
      wave.draw();
      wave.animate();
      if (fishes[i]) {
        fishes[i].draw();
        fishes[i].animate();
      }
    }
  });
  drawBoat(width * 0.7, boatHeight);
  waves.forEach((wave, i) => {
    if (i >= (waves.length - 1) / 2) {
      wave.draw();
      wave.animate();
      if (fishes[i]) {
        fishes[i].draw();
        fishes[i].animate();
      }
    }
  });
}

function drawBoat(x,y) {
  push();
  translate(x, y);
  // fishing line
  push();
  strokeWeight(1);
  stroke(color(255,255,0));
  line(-width/7, -1.5 * height/10, -width/7, height);
  pop();
  // fishing rod
  push();
  strokeWeight(5);
  stroke(color('#603813'));
  line(0, -0.8 * height/10, -width/7, -1.5 * height/10);
  pop();
  // dude body
  push();
  fill(color('#1D4350'));
  triangle(0,0, -width/50, -height/10, width/50, -height/10)
  pop();
  // dude head
  push();
  fill(color('#DECBA4'));
  let r = height / 20
  circle(0, -height / 10 - r * 0.5, r);
  pop();
  // dude hat
  push();
  fill(color('#A43931'));
  triangle(r * -1.5, -height / 10 - r * 0.5, r * 1.5, -height / 10 - r * 0.5, 0, -height / 10  - r * 1.3);
  pop();
  // boat body
  push()
  fill(color('#603813'));
  quad(-width/10, -height/30, width/10, -height/30, width / 30, height/30, -width / 30, height/30);
  pop();
  pop();
}

function sun(x,y,r) {
  push();
  noStroke();
  fill(color("#b21f1f"));
  ellipse(x, y, r);
  pop();
}

class Fish {
  constructor(x, y, size, direction) {
    this.x = x;
    this.y = y;
    this.initialY = y;
    this.size = size;
    this.direction = direction;
    this.previousX = x;
    this.previousY = y;
  }

  draw() {
    push();
    translate(this.x, this.y);
    let angle = atan2(this.y - this.previousY, this.x - this.previousX) + PI;
    rotate(angle);

    if (this.direction === -1) {
      angle += PI;
    }

    // fish tail
    push();
    fill(color('#FF6B6B'));
    triangle(this.size / 2 - 5, 0, this.size - 10, this.size / 3, this.size - 10, -this.size / 3);
    pop();
    // fish body
    push();
    fill(color('#556270'));
    ellipse(0, 0, this.size, this.size/2);
    pop();
    // fish dot
    push();
    fill(color('#FF6B6B'));
    circle(-5, 0, 10);
    pop();
    pop();
  }

  animate() {
    this.previousX = this.x;
    this.previousY = this.y;

    this.x = map(sin(frameCount * 0.05) * this.direction, -1, 1, this.x - 2 * this.direction, this.x + 2 * this.direction);
    this.y = map(sin(frameCount * 0.05) * this.direction, -1, 1, this.initialY, height / 3);
  }
}

class Wave {
  constructor(y, offset, direction=1) {
    this.y = y;
    this.direction = direction;
    this.waveLength = height / 10;
    this.offset = this.waveLength / 3 * offset;
    this.color1 = color(55, 59, 68);
    this.color2 = color(66, 134, 244);
    this.crests = [];
    this.generateCrests();
    console.log(this.offset);
  }

  generateCrests() {
    if (this.direction === -1) {
      for (let i = -this.offset; i < width; i += this.waveLength) {
        this.crests.push([i, this.y, i + this.waveLength, this.y, i + this.waveLength, this.y - this.waveLength / 3]);
      }
    } else {
      for (let i = this.offset; i < width; i += this.waveLength) {
        this.crests.push([i, this.y, i + this.waveLength, this.y, i, this.y - this.waveLength / 3]);
      }
    }
  }

  draw() {
    push();
    noStroke();
    let i = map(this.y, height / 2, height, 0, 1.0);
    fill(lerpColor(this.color1, this.color2, i));
    rect(0, this.y, width, height / 6);
    this.crests.forEach(crest => {
      triangle(...crest);
    });
    pop();
  };

  animate() {
    this.offset -= 0.1;
    this.crests = [];
    this.generateCrests();
    for (let i = 0; i < this.crests.length; i++) {
      this.crests[i] = [this.crests[i][0] + 1, this.crests[i][1], this.crests[i][2] + 1, this.crests[i][3], this.crests[i][4] + 1, this.crests[i][5]];
    }
  }
}

function linearGradient(color1, color2) {
  for (let i = 0; i < height / 2; i++) {
    let colorIndex = map(i, 0, height / 2, 0, 1.0);
    stroke(lerpColor(color1, color2, colorIndex));
    line(0, i, canvasWidth, i);
  }
  for (let i = height / 2; i < height; i++) {
    let colorIndex = map(i, height / 2, height, 0, 1.0);
    stroke(lerpColor(color2, color1, colorIndex));
    line(0, i, canvasWidth, i);
  }
}