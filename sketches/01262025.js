// #Genuary2025 #Genuary26
// https://genuary.art/
// Prompt: Symmetry.

let aDir, bDir, a, b, maxA, maxB, centerX, centerY;
let vertices = [];



function setup() {
  noFill();
  createCanvas(windowWidth, windowHeight);

  aDir = 1;
  bDir = 1;
  centerX = 0; 
  centerY = 0;
  a = 3;
  b = 3;
  maxA = width / 2;
  maxB = height / 2;
  backgroundGradient(color('#3F5EFB'), color('#FC466B'));
}

function draw() {
  // backgroundGradient(color('#3F5EFB'), color('#FC466B'));
  translate(width / 2, height / 2);
  strokeWeight(0.5);
  stroke(lerpColor(color('#bfe9ff'), color('#ff6e7f'), map(sin(frameCount * 0.01), -1, 1, 0, 1)));
  
  push();
  rotate(0);
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

  a += 1.5 * aDir;
  b += 0.5 * bDir;
  if (a >= maxA || a <= 3) {
    if (a <= 3) {
      maxA += 5
    }
    aDir *= -1;
  }
  if (b >= maxB || b <= 3) {
    if (b <= 3) {
      maxB += 5
    }
    bDir *= -1;
  }
}

function backgroundGradient(c1, c2) {
  push();
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
