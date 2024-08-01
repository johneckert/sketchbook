let circleMod, i, dir;



function setup() {
  noFill();
  frameRate(10);
  createCanvas(windowWidth, windowHeight);
  i = 0
  dir = 1;
  circleMod = 15;
  unit = width / 10;
  backgroundGradient(color('#d9a7c7'), color('#C5796D'));
}

function draw() {
  stroke(lerpColor(color('#fffcdc'), color('#f8b500'), i));
  for (let i = -2 * unit; i < width + unit * 2; i += unit) {
    circle(width + 30 - i - circleMod, -30 + circleMod, 0 + circleMod);
    circle(-30 + i +  circleMod, -30 + circleMod, 0 + circleMod);

    circle(width + 30 - i - circleMod, height + 30 - circleMod, 0 + circleMod);
    circle(-30 + i +  circleMod, height + 30 - circleMod, 0 + circleMod);
  }

  if (circleMod >= width) {
    circleMod = 15;
  } else {
    circleMod += 10;
  }

  if (i >= 1) {
    dir = -1;
  } else if (i <= 0) {
    dir = 1;
  }
  console.log(i, dir);
  i+= 0.1 * dir;
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
