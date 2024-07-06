// 07/06/2024

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function shimmerRect(x, y, w, h, color1, color2, density = 1, pixelSize = 1, tick = 0.01) {
  for (let i = x; i < x + w; i += pixelSize + density * tick) {
    for (let j = y; j < y + h; j += pixelSize + density * tick) {
      let c = lerpColor(color1, color2, map(noise(i + j, tick), 0, 1, 0, 1));
      fill(c);
      circle(i, j, pixelSize, pixelSize);
    }
  }
}

function draw() {
  background('#383B4B');
  let oscillator = sin(frameCount * 0.1) * 0.01;
  shimmerRect(windowWidth/4, 100, windowWidth / 2, windowHeight - 200, color(138, 51, 36), color(25, 0, 102), 5, 2, oscillator);
  shimmerRect(windowWidth/4 + 50, 150, windowWidth / 2 - 100, windowHeight/2 - 150, color(227, 168, 87), color(255, 87, 51), 20, 2, oscillator);
  shimmerRect(windowWidth/4 + 50, windowHeight/2 + 50, windowWidth / 2 - 100, windowHeight/2 - 200, color(255, 36, 0), color(195, 36, 116), 20, 2, oscillator);

}
