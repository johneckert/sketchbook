let bgColors = ['#BA8B02', '#181818'];
let colors = ['#BA8B02', '#181818'];
let vertexes = [];
let wUnit, hUnit, step, dir;


function setup() {

  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  frameRate(10);
  noFill();
  vertexes.push(createVector(-width/2, -height/2));
  dir = random(1) > 0.5 ? true : false;
  inc = 1;
  step = 1;
}

function draw() {
  translate(width/2, height/2);
  rectGradient(...bgColors);
  stroke(color(colors[0]));
  strokeWeight(2);

  beginShape();
  vertexes.forEach((v, i) => {
    if ( i > vertexes.length - 100) {
      vertex(v.x, v.y);
      push();
      fill(color(colors[1]));
      rect(v.x, v.y, i / 3, i / 3);
      pop();
    }
  });
  endShape(OPEN);

  let lastV = vertexes[vertexes.length - 1];
  let newX = dir ? random(width/2, -width/2) : lastV.x;
  let newY = dir ? lastV.y : random(height/2, -height/2);

  vertexes.push(createVector(newX, newY));
  dir = !dir;
  if (frameCount % 10) {
    step += inc;
    if (step > 100 || step < 1) {
      inc = -1 * inc;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function rectGradient(c1, c2) {
  for (let i = 0; i < width; i++) {
    let inter = map(i, 0, width, 0, 1);
    let c = lerpColor(color(c1), color(c2), inter);
    stroke(c);
    rect(0, 0,i, i);
  }
}