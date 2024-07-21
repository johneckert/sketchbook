let i, baseHeight, frequency, lineColor, lineCount, colorDirection, topHeight, bottomHeight, lineCountReverse, frac;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(240);
  background(0);
  lineCount = 0.1;
  lineCountReverse = 0.9
  baseHeight = height / 2;
  frac = 2;
  frequency = (2 * PI) / width * frac;
  i = 0;
  colorDirection = 1;
  topHeight = baseHeight + baseHeight / 2;
  bottomHeight = baseHeight - baseHeight / 2;
}

function draw() {
  blendMode(SCREEN);
  lineColor = lerpColor(color('#123456'), color('#654321'), lineCount);
  stroke(lineColor);
  strokeWeight(20);
  drawWave(i, 100, frequency,topHeight)

  lineColor = lerpColor(color('#123456'), color('#654321'), lineCountReverse);
  stroke(lineColor);
  drawWave(i, -100, frequency, bottomHeight)

  i += 10;
  if (i > width) {
    if (lineCount >= 1) {
      colorDirection = -1;
    }

    if (lineCount <= 0.0) {
      colorDirection = 1;
    }
    lineCount += 0.1 * colorDirection;
    lineCountReverse += -0.1 * colorDirection;
    topHeight -= 15;
    bottomHeight += 15;
    i = 0;
  }

  if (topHeight <= 0) {
    topHeight = height;
    bottomHeight = 0;
  }
}

function drawWave(x, amplitude, horizStretch, VertShift = 0) {
  // f(x) = a * sin(b(x+c)) + d
  let y = amplitude * sin(horizStretch * x) + VertShift;
  point(x, y);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}