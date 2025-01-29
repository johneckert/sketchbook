// Title: Luminous Pulse
// 1/28/2025

function setup() {
  createCanvas(30833 / 2, 20833 / 2);
  background(0);
  frameRate(1);
  noLoop();
}

function draw() {
  background(0);
  linearGradient(color("#0F2027"), color("#2C5364"));

  push();
  strokeWeight(1);
  for (let i = 0; i < width; i+=4) {
    let hMod = map(cos(i * 0.0005), -1, 1, 0, height / 3);
    let colorIndex = map(abs(i - width), 0, width, 0, 1.0);
    stroke(lerpColor(color("#159957"), color("#155799"), colorIndex));
    line(width/2 + i, 0 + hMod, width/2 + i, height - hMod);
    line(width/2 - i, 0 + hMod, width/2 - i, height - hMod);
  }
  pop();

  push();
  strokeWeight(2);
  for (let i = 0; i < width; i+=6) {
    let hMod = map(sin(i * 0.0005), -1, 1, 0, height / 3);
    let colorIndex = map(abs(i - width), 0, width, 0, 1.0);
    stroke(lerpColor(color("#3b8d99"), color("#1565C0"), colorIndex));
    line(width/2 + i, 0 + hMod, width/2 + i, height - hMod);
    line(width/2 - i, 0 + hMod, width/2 - i, height - hMod);
  }
  pop();

  push();
  strokeWeight(2);
  for (let i = 0; i < width; i+=3) {
    let hMod = map(cos(i * 0.0005), -1, 1, height / 3, 2 * height / 3);
    let colorIndex = map(abs(i - width), 0, width, 0, 1.0);
    stroke(lerpColor(color("#12c2e9"), color("#FF0099"), colorIndex));
    line(width/2 + i, 0 + hMod, width/2 + i, height - hMod);
    line(width/2 - i, 0 + hMod, width/2 - i, height - hMod);
  }
  pop();
  save("wave-33.png");
}

function linearGradient(color1, color2) {
  for (let i = 0; i < width / 2; i++) {
    let colorIndex = map(i, 0, width / 2, 0, 1.0);
    stroke(lerpColor(color1, color2, colorIndex));
    line(i, 0, i, height);
  }
  for (let i = width / 2; i < width; i++) {
    let colorIndex = map(i, width / 2, width, 0, 1.0);
    stroke(lerpColor(color2, color1, colorIndex));
    line(i, 0, i, height);
  }
}