let centerX, centerY, radius, modifier, x1, y1;
let angle1 = 2* Math.PI + 30;
let angle2 = Math.PI;
let colors;

function setup() {
  noFill();
  createCanvas(windowWidth, windowHeight);
  x1 = centerX = width / 2;
  y1 = centerY = height / 2;
  radius = width / 2;
  modifier = 1;
  colors = [color('#ffd89b'), color('#19547b')];

  radialGradient(...colors);
}

function draw() {
  let x1 = centerX + (radius / 2) * sin(angle1);
  let y1 = centerY + (radius / 2) * cos(angle1);

  let x2 = centerX + radius * cos(angle2);
  let y2 = centerY + radius * sin(angle2);

  stroke(colors[1]);
  strokeWeight(0.5);
  line(x1, y1, x2, y2);

  angle1 += 0.2 * modifier;
  angle2 -= 0.1 * modifier;

  if (frameCount % 100 === 0) {
    modifier += sin(frameCount);
  }
}

function radialGradient(c1, c2) {
  push();
  for(let x=0; x < width * 1.5; x++){
    let inter = map(x, 0, width, 0, 1.0);
    let c = lerpColor(c1, c2, inter);
    console.log(x, c);
    strokeWeight(1);
    stroke(c);
    circle(width/2, height/2, x);
  }
  pop();
}