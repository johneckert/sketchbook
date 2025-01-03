// #Genuary2025 #Genuary1
// https://genuary.art/
// Prompt: Vertical or horizontal lines only.

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(1);
}

function draw() {
  background(0);
  linearGradient(color("#0F2027"), color("#2C5364"));

  push();
  strokeWeight(1);
  for (let i = 0; i < windowWidth; i+=4) {
    let hMod = map(cos(i * 0.01), -1, 1, 0, windowHeight / 3);
    let colorIndex = map(abs(i - windowWidth), 0, windowWidth, 0, 1.0);
    stroke(lerpColor(color("#159957"), color("#155799"), colorIndex));
    line(width/2 + i, 0 + hMod, width/2 + i, height - hMod);
    line(width/2 - i, 0 + hMod, width/2 - i, height - hMod);
  }
  pop();

  push();
  strokeWeight(2);
  for (let i = 0; i < windowWidth; i+=5) {
    let hMod = map(sin(i * 0.01), -1, 1, 0, windowHeight / 3);
    let colorIndex = map(abs(i - windowWidth), 0, windowWidth, 0, 1.0);
    stroke(lerpColor(color("#3b8d99"), color("#aa4b6b"), colorIndex));
    line(width/2 + i, 0 + hMod, width/2 + i, height - hMod);
    line(width/2 - i, 0 + hMod, width/2 - i, height - hMod);
  }
  pop();
}

function linearGradient(color1, color2) {
  for (let i = 0; i < windowWidth / 2; i++) {
    let colorIndex = map(i, 0, windowWidth / 2, 0, 1.0);
    stroke(lerpColor(color1, color2, colorIndex));
    line(i, 0, i, windowHeight);
  }
  for (let i = windowWidth / 2; i < windowWidth; i++) {
    let colorIndex = map(i, windowWidth / 2, windowWidth, 0, 1.0);
    stroke(lerpColor(color2, color1, colorIndex));
    line(i, 0, i, windowHeight);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
