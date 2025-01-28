// Title: Wave 95
// 1/28/2025

let i, baseHeight, frequency, lineColor, lineCount, colorDirection, topHeight, bottomHeight, lineCountReverse, frac;


function setup() {
  createCanvas(6500, 5525);
  frameRate(240);
  background(0);
  backgroundGradient(color('#000000'), color('#1A1A30'));
  lineCount = 0.1;
  lineCountReverse = 0.9
  baseHeight = height / 2;
  frac = 2.5;
  frequency = (2 * PI) / width * frac;
  i = 0;
  colorDirection = 1;
  topHeight = baseHeight + baseHeight / 4;
  bottomHeight = baseHeight - baseHeight / 4;
}

function draw() {
  blendMode(SCREEN);

  const rep = () => {
    lineColor = lerpColor(color('#123456'), color('#654321'), lineCount);
    stroke(lineColor);
    strokeWeight(20);
    drawWave(i, height / 10, frequency, topHeight);

    lineColor = lerpColor(color('#123456'), color('#654321'), lineCountReverse);
    stroke(lineColor);
    drawWave(i, -height / 10, frequency, bottomHeight);

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

  if (frameCount === 95) {
    for (let j = 0; j < 97; j++) {
      rep();
    }
    noLoop();
    save(`wave-${frameCount}.png`);
  }

  for (let j = 0; j < width / 10; j++) {
    rep();
  }
}

function drawWave(x, amplitude, horizStretch, VertShift = 0) {
  // f(x) = a * sin(b(x+c)) + d
  let y = amplitude * sin(horizStretch * x) + VertShift;
  point(x, y);
}

function backgroundGradient(c1, c2) {
  push();
  for(let y = 0; y < height / 2; y++){
    let n = map(y, 0, height /2, 0, 1);
    let newc = lerpColor(c1, c2, n);
    stroke(newc);
    line(0, y, width, y);
  }

  for(let y = height / 2; y <= height; y++){
    let n = map(y, height / 2, height, 1, 0);
    let newc = lerpColor(c1, c2, n);
    stroke(newc);
    line(0, y, width, y);
  }
  pop();
}