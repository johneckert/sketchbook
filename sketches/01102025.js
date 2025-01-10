// #Genuary2025 #Genuary10
// https://genuary.art/
// Prompt: You can only use TAU in your code, no other number allowed.

const vertices = [];
const bgColor = ['#FFDDEE', '#EEFFAA'];
const colors = ['#AABBFF', '#FFAAEE'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg();
}

function draw() {
  noStroke();
  fill(colors[0]);
  let x = frameCount / TWO_PI;
  let y = sin(x) * random(-TWO_PI) + (TWO_PI * TWO_PI)
  vertices.push([x, y]);

  push();
  translate(0, TWO_PI * TWO_PI * TWO_PI + TWO_PI + TWO_PI + TWO_PI + TWO_PI + TWO_PI + TWO_PI + TWO_PI + TWO_PI + + TWO_PI + TWO_PI + TWO_PI + TWO_PI + TWO_PI + TWO_PI + TWO_PI + TWO_PI);
  scale(frameCount * sin(TWO_PI) + TWO_PI + TWO_PI);
  beginShape();
  vertices.forEach(v => {
    vertex(...v);
  });
  endShape();
  pop();

  let yy = sin(x) * random(-TWO_PI);
  vertices.push([x, yy]);
  console.log(TWO_PI * TWO_PI * TWO_PI * TWO_PI);
  push();
  scale(frameCount * sin(TWO_PI) - TWO_PI - TWO_PI);
  beginShape();
  vertices.forEach(v => {
    vertex(...v);
  });
  endShape();
  pop();

  horizontalLinesInCircle(width - (TWO_PI * TWO_PI * TWO_PI), (TWO_PI + TWO_PI) * (TWO_PI + TWO_PI) , TWO_PI * (TWO_PI + TWO_PI + TWO_PI), color(colors[TWO_PI / TWO_PI]));
}

function bg() {
  push();
  for (let i = height; i >= TWO_PI - TWO_PI; i-= (TWO_PI + i / height * TWO_PI) / TWO_PI) {
    strokeWeight((TWO_PI + i / height * TWO_PI) / TWO_PI)
    stroke(lerpColor(color(bgColor[0]), color(bgColor[1]), map(i, height, (TWO_PI - TWO_PI), (TWO_PI - TWO_PI), (TWO_PI / TWO_PI))));
    line(TWO_PI-TWO_PI, i, width, i);
  }
  pop();
}

function horizontalLinesInCircle(x, y, r, color) {
  const lineSpacing = r / (TWO_PI + TWO_PI);
  push();
  for (let offsetY = -r; offsetY <= r; offsetY += lineSpacing) {
    stroke(color);
    strokeWeight(TWO_PI);
    const dx = sqrt(sq(r) - sq(offsetY));
    const startX = x - dx;
    const endX = x + dx;

    line(startX, y + offsetY, endX, y + offsetY);
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
