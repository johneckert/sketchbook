let start, end, controlX1, controlX2, controlY1, controlY2, density, iterations, loops;
let colors = [
  { start: '#A5FECB', end: '#20BDFF' },
  { start: '#ef32d9', end: '#89fffd' },
  { start: '#0072ff', end: '#00c6ff' },
  { start: '#ffa751', end: '#ffe259' },
  { start: '#EF629F', end: '#EECDA3' },
];
let backgroundColors = ['#734b6d', '#42275a'];


function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  backgroundGradient(color(backgroundColors[0]), color(backgroundColors[1]));

  loops = 5;
  iterations = 1000
  start = createVector(-1 * random(width), -1 * random(height));
  end = createVector(random(width) * 2, random(height));
  controlX1 = createVector(random(width), random(height));
  controlX2 = createVector(random(width), random(height));
  controlY1 = createVector(random(width), random(height));
  controlY2 = createVector(random(width), random(height));
}

function draw() {
  if (frameCount >= loops) {
    noLoop();
  }
  density = random(0.1, 0.01);
  start = createVector(random(width), random(height));
  end = createVector(random(width), random(height));
  controlX1 = createVector(random(width), random(height));
  controlX2 = createVector(random(width), random(height));
  controlY1 = createVector(random(width), random(height));
  controlY2 = createVector(random(width), random(height));

  noFill();

  let loopColor1 = color(colors[frameCount % colors.length].start);
  let loopColor2 = color(colors[frameCount % colors.length].end);
  stroke(loopColor1);
  bezier(start.x, start.y, controlX1.x, controlX1.y, controlX2.x, controlX2.y,  end.x, end.y, controlY1.x, controlY1.y, controlY2.x, controlY2.y);
  for (let i = 0; i < iterations; i++) {
    stroke(lerpColor(loopColor1, loopColor2, i / iterations));
    translate(i * density, i * density);
    bezier(start.x, start.y, controlX1.x, controlX1.y, controlX2.x, controlX2.y,  end.x, end.y, controlY1.x, controlY1.y, controlY2.x, controlY2.y);
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function backgroundGradient(c1, c2) {
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, i, width, i);
  }
}