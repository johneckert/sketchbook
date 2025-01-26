// #Genuary2025 #Genuary26
// https://genuary.art/
// Prompt: Symmetry.

let a, b;

function setup() {
  noFill();
  createCanvas(windowWidth, windowHeight);

  a = width / 10 * 4;
  b = height / 10;
  backgroundGradient(color('#3F5EFB'), color('#FC466B'));
}

function draw() {
  translate(width / 2, height / 2);
  strokeWeight(0.1);
  stroke(lerpColor(color('#3F5EFB'), color('#FC466B'), map(sin(frameCount * 0.01), -1, 1, 0, 1)));
  
  push();
  rotate(random(-0.1, 0.1));
  beginShape();
  for (let t = 0; t < TWO_PI; t += 0.01) {
    let x = a * sin(t);
    let y = b * sin(2 * t);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();

  push();
  beginShape();
  for (let t = 0; t < TWO_PI; t += 0.01) {
    let x = a * sin(t);
    let y = b * sin(2 * t);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function backgroundGradient(c1, c2) {
  push();
  for(let y = 0; y < height / 2; y++){
    n = map(y, 0, height, 0, 1);
    let newc = lerpColor(c1, c2, n);
    stroke(newc);
    line(0, y, width, y);
  }

  for(let y = height / 2; y < height; y++){
    n = map(y, 0, height, 1, 0);
    let newc = lerpColor(c1, c2, n);
    stroke(newc);
    line(0, y, width, y);
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
