let color1, color2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  color1 = color('#232526'); // Very dark gray
  color2 = color('#414345'); // Slightly lighter gray
}

function draw() {
  let phase = frameCount * 0.02;
  background(color1);
  push();
  noFill();
  for (let i = 0; i < width * 1.5; i += 3) {
    let colorIndex = map(i, 0, width, 0, 1.0);
    stroke(lerpColor(color1, color2, colorIndex));
    drawSineWaveWithBezier(i, 0, height, phase);
  }
  pop();
  
}

function drawSineWaveWithBezier(xCenter, yStart, waveHeight, phase) {
  let amplitude = waveHeight * 0.1;
  let segments = 50;
  let segmentHeight = waveHeight / segments;
  let frequency = 0.02;

  beginShape();
  for (let i = 0; i <= segments; i++) {
    let t = i / segments;
    let y = lerp(yStart, waveHeight, t);
    let x = xCenter + amplitude * sin(TWO_PI * frequency * i + phase);
    vertex(x, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
