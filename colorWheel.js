let red, yellow, blue, white, black;

function setup() {
  strokeWeight(10);
  let ultramarine = color(4, 55, 242);
  let indianYellow = color(227,168,87);
  let crimson = color(220, 20, 60);
  createCanvas(windowWidth, windowHeight);
  translate(width/2, height/2);
  red = color(255,0,0);
  yellow = color(0, 255, 0);
  blue =  color(0, 0, 255);
  white = color(255);
  black = color(0);
}

function draw() {
  background(255);
  noLoop();
  textSize(width / 20);
  textAlign(CENTER, CENTER);
  text('Color Tool', width / 2, height / 10);

  // fillGradient('linear', { from: [width / 2, height / 2], to: [width / 2 + width / 5, height / 2 + height / 5], steps: [red, white]});
  colorCircle(width / 2, height / 2, width / 3, width / 3);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function colorCircle(x,y, w, h) {
  // 12 segmants 3 between primaries
  let start = 0;
  let end = PI / 6;
  for (let i = 0; i < 12; i++) {
    push();
    setArcColor(i, x, y, w, h);
    arc(x, y, w, h, start, end, PIE);
    pop();
    start = end;
    end += PI / 6;
  }
}

function setArcColor(i, x, y, w, h) {
  switch(i) {
    case 0:
      fill(red);
      // fillGradient('linear', { from: [x, y], to: [w, h], steps: [white, red]});
      break;
    case 1:
      fill(lerpColor(red, yellow, 0.25));
      // fillGradient('linear', { from: [x, y], to: [x + w, y + h], steps: [white, lerpColor(red, yellow, 0.25)] });
      break;
    case 2:
      fill(lerpColor(red, yellow, 0.5));
      // fillGradient('linear', { from: [x, y], to: [x + w, y + h], steps: [white, lerpColor(red, yellow, 0.5)] });
      break;
    case 3:
      fill(lerpColor(red, yellow, 0.75));
      // fillGradient('linear', { from: [x, y], to: [x + w, y + h], steps: [white, lerpColor(red, yellow, 0.75)] });
      break;
    case 4:
      fill(yellow);
      // fillGradient('linear', { from: [x, y], to: [x + w, y + h], steps: [white, yellow]});
      break;
    case 5:
      fill(lerpColor(yellow, blue, 0.25));
      // fillGradient('linear', { from: [x, y], to: [x + w, y + h], steps: [white, lerpColor(yellow, blue, 0.25)] });
      break;
    case 6:
      fill(lerpColor(yellow, blue, 0.5));
      // fillGradient('linear', { from: [x, y], to: [x + w, y + h], steps: [white, lerpColor(yellow, blue, 0.25)] });
      break;
    case 7:
      fill(lerpColor(yellow, blue, 0.75));
      // fillGradient('linear', { from: [x, y], to: [x + w, y + h], steps: [white, lerpColor(yellow, blue, 0.25)] });
      break;
    case 8:
      fill(blue);
      // fillGradient('linear', { from: [x, y], to: [x + w, y + h], steps: [white, blue]});
      break;
    case 9:
      fill(lerpColor(blue, red, 0.25));
      // fillGradient('linear', { from: [x, y], to: [x + w, y + h], steps: [white, lerpColor(blue, red, 0.25)] });
      break;
    case 10:
      fill(lerpColor(blue, red, 0.5));
      // fillGradient('linear', { from: [x, y], to: [x + w, y + h], steps: [white, lerpColor(blue, red, 0.25)] });
      break;
    case 11:
      fill(lerpColor(blue, red, 0.75));
      // fillGradient('linear', { from: [x, y], to: [x + w, y + h], steps: [white, lerpColor(blue, red, 0.25)] });
      break;
  }
}