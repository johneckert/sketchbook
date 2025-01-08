// #Genuary2025 #Genuary7
// https://genuary.art/
// Prompt: Draw one million of something.

const ONE_MILLION = 1000000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  const catColors = [color(144,70,23), color(205,144,87), color(99,35,7), color(243,221,198), color(255,255,255), random(150, 255)]
  for (let i = 0; i < ONE_MILLION; i++) {
    fill(random(catColors));
    noStroke();
    let x = random(-width, width);
    let y = random(-height, height);
    if ( i % 100 == 0) {
      fill(0);
    }
    stroke(0.1);
    cat(x, y, 1.5);
  }

}


function draw() {
}

function cat(x,y, size) {
  beginShape();
  vertex(x, y);
  curveVertex(x, y + 7*size);
  curveVertex(x + 5*size, y + 10*size);
  curveVertex(x + 10*size, y + 7*size);
  vertex(x + 10*size, y);
  vertex(x + 5*size, y + 3*size);
  endShape(CLOSE);
  push();
  //eyes
  strokeWeight(0.4)
  stroke(0);
  fill(color(200,255,23));
  ellipse(x + 2.5*size, y + 4*size, 4*size, 2*size);
  ellipse(x + 7.5*size, y + 4*size, 4*size, 2*size);
  // pupils
  fill(0);
  noStroke();
  ellipse(x + 2.5*size, y + 4*size, 1*size, 2*size);
  ellipse(x + 7.5*size, y + 4*size, 1*size, 2*size);
  //nose
  triangle(x + 4*size, y + 6*size, x + 6*size, y + 6*size, x + 5*size, y + 8*size);
  //mouth
  stroke(0);
  strokeWeight(0.5);
  noFill();
  line(x+5*size, y+8*size, x+4.5*size, y+9*size);
  line(x+5*size, y+8*size, x+5.5*size, y+9*size);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
