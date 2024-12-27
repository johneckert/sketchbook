let cx;
let cy;
let color1, color2;
let startRadius;
let totalPoints;
const circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  totalPoints =9;
  cx = width / 2;
  cy = height / 2;
  startRadius = min(width, height)
  color1 = color("#aa4b6b");
  color2 = color("#3b8d99");
  noLoop();
  radialGradient(color1, color2);
}

function draw() {
  push();
  noStroke();
  fill(color(color1.levels[0], color1.levels[1], color1.levels[2], 200));
  ellipse(cx, cy, startRadius, startRadius);
  fill(color(color2));
  ellipse(cx, cy, startRadius / 5, startRadius / 5);
  pop();
  push();
  noStroke();
  drawCircle(cx, cy, startRadius, startRadius);  
  circles.reverse();
  circles.forEach((circle, i) => {
    fill(circle.col.levels[0], circle.col.levels[1], circle.col.levels[2], map(sin(circle.r), -1, 1, 10, 140));
    ellipse(circle.x, circle.y, circle.r, circle.r);
  });
  pop();
  stroke(255);
  circles.forEach(circle => {
    strokeWeight(1);
    noFill();
    ellipse(circle.x, circle.y, circle.r, circle.r);
  });
  strokeWeight(3);
  stroke(150);
  noFill();
  ellipse(cx, cy, startRadius, startRadius);
  drawOuterRings(cx, cy, startRadius);
  fill(color(color1.levels[0], color1.levels[1], color1.levels[2], 100));
  drawEyes(cx, cy, startRadius);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawCircle(x, y, r, startR) {
  if (r < startR / 6) {
    return;
  }
  let c1 = color("#aa4b6b");
  let c2 = color("#3b8d99");
  let inter = map(sin(r), -1, 1, 0, 1.0);
  let col = lerpColor(c1, c2, inter);
  circles.push({ x, y , r, col });

  for (let i = 0; i < totalPoints; i++) {
    let t = i * (PI / (totalPoints / 2));
    let newX = r / 4 * cos(t) + x;
    let newY = r / 4 * sin(t) + y;
    drawCircle(newX, newY, r * 0.5, startR);
  }
}

function drawOuterRings(x, y, r) {
  for (let i = 0; i < totalPoints * 4; i++) {
    let t = i * (PI / (totalPoints * 2));
    ellipse(x + r * cos(t), y + r * sin(t), r, r);
  }
}

function drawEyes(x, y, r) {
  for (let i = 0; i < totalPoints * 4; i++) {
    let t = i * (PI / (totalPoints * 2));
    ellipse(x + r / 1.15 * cos(t - PI / 4), y + r / 1.15 * sin(t- PI / 4), r / totalPoints, r / totalPoints);
  }
}

function radialGradient(c1, c2) {
  push();
  noFill();
  for(let x=0; x < width * 1.5; x++){
    let inter = map(x, 0, width * 1.5, 0, 1.0);
    let c = lerpColor(c1, c2, inter);
    strokeWeight(1);
    stroke(c);
    circle(width/2, height/2, x);
  }
  pop();
}