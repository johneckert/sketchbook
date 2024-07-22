let i, weight, lineColor, fade, colorDirection, phase;
let spirals = [];


function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  let c1 = color('#F1F2B5');
  let c2 = color('#135058');
  backgroundGradient(c1, c2);

  i = 0;
  phase = 0;
  weight = 60;
  colorDirection = 1;
  blendMode(DIFFERENCE);
  spirals.push(new Spiral(0, 0, 3, i, 0.3, 50, phase, color('#FF0099'), color('#493240'), 0.0, weight));
}

function draw() {
  translate(width/2, height/2);
  oneFrame();
  oneFrame();
  oneFrame();
  oneFrame();
  oneFrame();
  oneFrame();
  oneFrame();
}

function oneFrame() {
  for (let spiral of spirals) {
    spiral.update();
    spiral.drawHelix();
  }
  i += 1;
  if ( i === width * 0.5) {
    spirals.push(new Spiral(0, 0, 3, i - width * 0.5, 0.3, 50, phase -= 90, color('#EECDA3'), color('#EF629F'), -0.0, weight));
  }

  if ( i === width) {
    spirals.push(new Spiral(0, 0, 3, i - width, 0.3, 50, phase -= 90, color('#26D0CE'), color('#1A2980'), -0.0, weight));
  }

  if (i === width * 1.5) {
    spirals.push(new Spiral(0, 0, 3, i - width * 1.5, 0.3, 50, phase -= 90, color('#F1F2B5'), color('#135058'), -0.0, weight));
  }
  if (i > width * 2) {
    i = 0;
    phase = 0;
    spirals.push(new Spiral(0, 0, 3, i, 0.3, 50, phase, color('#FF0099'), color('#493240'), 0.0, weight));
    spirals.shift();
  }
}

class Spiral {
   // x,y = center of spiral
  // iR = initial radius
  // expansion = distance between turns
  // rotations = number of rotations
  // phase = angle of rotation
  constructor(x, y, iR, frame, expansion, rotations, phase, color1, color2, fade, strokeWeight) {
    this.x = x;
    this.y = y;
    this.iR = iR;
    this.frame = frame * 2;
    this.expansion = expansion;
    this.rotations = rotations;
    this.phase = phase;
    this.color1 = color1;
    this.color2 = color2;
    this.fade = fade;
    this.strokeWeight = strokeWeight;
  }

  update() {
    this.frame += 2;
    this.fade = map(this.frame - 2, 0, width, 0.0, 1.0);
  }

  drawSpiral(phase = this.phase) {
    if (this.frame < this.rotations * 360) {
      let r = this.iR + this.expansion * this.frame;
      let x1 = this.x + r * cos(this.frame + phase);
      let y1 = this.y + r * sin(this.frame + phase);
      point(x1, y1);
    }
  }

  drawHelix() {
    lineColor = lerpColor(this.color1, this.color2, this.fade);
    stroke(lineColor);
    strokeWeight(this.strokeWeight);
    this.drawSpiral();
    this.drawSpiral(this.phase + 180);
  }
}

function backgroundGradient(c1, c2) {
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}