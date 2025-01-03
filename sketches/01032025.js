// #Genuary2025 #Genuary3
// https://genuary.art/
// Prompt: Exactly 42 lines of code.
let centerX, centerY, angleStep, radiusStep;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(color("#3E5151"));
  strokeWeight(1);

  centerX = width / 2;
  centerY = height / 2;
  angleStep = 0.1;
}

function draw() {
  radialGradient(color("#3E5151"), color("#DECBA4"));
  for (let theta = 0; theta < windowWidth; theta += angleStep) {
    let x = centerX + theta * cos(theta);
    let y = centerY + theta * sin(theta);
    let rX = map(sin(theta * frameCount), -1, 1, -5, 5);
    let rY = map(cos(theta * frameCount), -1, 1, -5, 5);

    fill(lerpColor(color("#DECBA4"), color("#3E5151"), theta / (TWO_PI * 250)));
    ellipse(x, y, rX, rY);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function radialGradient(c1, c2) {
  push();
  noFill();
  for(let x=0; x < width * 1.5; x++) {
    strokeWeight(1);
    stroke(lerpColor(c1, c2, map(x, 0, width * 1.5, 0, 1.0)));
    circle(width/2, height/2, x);
  }
  pop();
}