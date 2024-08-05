let sizeInc, i, dir, hUnit, unit, iterationcolorInc;
let colors = [
  ['#23074d', '#e74c3c'],
  ['#ad5389', '#3c1053'],
  ['#2C3E50', '#FD746C'],
  ['#4B1248', '#F0C27B'],
];

function setup() {
  noFill();
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  frameRate(150);
  i = 0
  iteration = 0;
  dir = 1;
  sizeInc = 0;
  colorInc = 0;
  unit = width / 10;
  hUnit = height / 10;
  radialGradient(color('#F0C27B'), color('#4B1248'));
}

function draw() {
  translate(width / 2, height / 2);
  let loopColors = colors[colorInc];
  let strokeColor = lerpColor(color(loopColors[0]), color(loopColors[1]), i);
  strokeColor.setAlpha(200);
  stroke(strokeColor);

  push();
  rotate(frameCount + iteration);
  translate(-width / 2, -height / 2);
  line(-sizeInc, -sizeInc, -sizeInc, sizeInc);
  line(sizeInc, -sizeInc, sizeInc, sizeInc);
  pop();

  push();
  rotate(-frameCount - iteration);
  translate(-width / 2, -height / 2);
  line(-sizeInc, -sizeInc, -sizeInc, sizeInc);
  line(sizeInc, -sizeInc, sizeInc, sizeInc);
  pop();

  if (sizeInc + unit >= width) {
    sizeInc = 0;
    iteration += 1;
    colorInc = colorInc >= colors.length - 1 ? 0 : colorInc + 1;
  } else {
    sizeInc += 1;
  }

  if (i >= 1) {
    dir = -1;
  } else if (i <= 0) {
    dir = 1;
  }
  i += 0.1 * dir;
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

function drawPinWheel(unit, sizeInc) {
  line(0, 0 - sizeInc, 0, -unit - sizeInc);
  line(0 + sizeInc, 0, unit + sizeInc, 0);
  line(0, 0 + sizeInc, 0, unit + sizeInc);
  line(0 - sizeInc, 0, -unit - sizeInc, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
