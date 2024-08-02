let circleMod, i, dir, hUnit, unit;
function setup() {
  noFill();
  frameRate(10);
  createCanvas(windowWidth, windowHeight);
  i = 0
  dir = 1;
  circleMod = 15;
  unit = width / 10;
  hUnit = height / 10;
  backgroundGradientThreeColor(color('#fc00ff'), color('#00dbde'), color('#fc00ff'));
}

function draw() {
  for (let j = -unit; j < width + unit * 2; j += unit) {
    stroke(lerpColor(color('#89fffd'), color('#ef32d9'), i));
    quad(
      j, 0 - circleMod, 
      j - unit - circleMod, unit, 
      j, unit * 2 + circleMod,
      j + unit + circleMod, unit
    );  
    quad(
      j, height + circleMod, 
      j - unit - circleMod,  height - unit, 
      j, height - unit * 2 - circleMod,
      j + unit + circleMod, height - unit
    );
    push();
    strokeWeight(2);
    stroke(lerpColor(color('#FF0099'), color('#493240'), i));
    quad(
      j, height / 2 - hUnit / 2 - circleMod, 
      j - unit / 2 - circleMod, height / 2, 
      j, height / 2 + hUnit / 2 + circleMod,
      j + unit / 2 + circleMod, height / 2
    );
    pop();
  }

  if (circleMod >= width + 2 * unit) { // actual width of pattern is loop
    circleMod = 15;
  } else {
    circleMod += 10;
  }

  if (i >= 1) {
    dir = -1;
  } else if (i <= 0) {
    dir = 1;
  }
  i+= 0.1 * dir;
}

function backgroundGradientThreeColor(c1, c2, c3) {
  push();
  for(let y=0; y<height; y++){
    if (y < height / 2) {
      n = map(y, 0 ,height / 2, 0, 1);
      let newc = lerpColor(c1,c2,n);
      stroke(newc);
    } else {
      n = map(y, height / 2, height, 0, 1);
      let newc = lerpColor(c2,c3,n);
      stroke(newc);
    }
    line(0,y,width, y);
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
