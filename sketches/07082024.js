function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noFill();
}

function draw() {
  for (let l = 0; l < windowWidth; l += 1000 * Math.random()) {
    let lineColor = color('#ffd452');
    push();
    strokeWeight(0.5);
    stroke(lineColor);
    translate(noise(), 0, 0);
    line(l, 0, l, windowWidth);
    pop();
  }

  for (let i = 0; i < windowWidth + 500; i+= 800 * Math.random()) {
    let circleColor = lerpColor(color(173, 83, 137), color(60, 16, 83), i / windowWidth);
    push();
    strokeWeight(1);
    stroke(circleColor);
    circle(windowWidth / 2, windowHeight / 2, i);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}