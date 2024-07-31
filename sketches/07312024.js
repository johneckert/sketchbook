let alternate, density, dotSize, alphaStep;
let spacer = 6.5;
let colors = [];
let initAlpha = 100;
let outerLimit = (dS) => dS * spacer;
let bgColors = ["#77A1D3", "#E684AE", "#79CBCA"];

function setup() {
  frameRate(spacer);
  blendMode(SOFT_LIGHT);
  createCanvas(windowWidth, windowHeight);
  dotSize = width / 3 / spacer;
  density = 100;
  alphaStep = 1;
  alternate = true;
  colors.push(color(0, 180, 219, initAlpha)); //#00B4DB
  colors.push(color(255, 131, 176, initAlpha));  //#0083B0 
  colors.push(color(187, 55, 125, initAlpha));  //#BB377D
  colors.push(color(251, 211, 233, initAlpha));  //#FBD3E9
  colors.push(color(255, 126, 95, initAlpha));  //#ff7e5f
  colors.push(color(254, 180, 123, initAlpha));  //#feb47b
}

function draw() {
  backgroundGradientThreeColor(...bgColors);
  dotSize = 50;
  let colorStep = map(sin(frameCount * 0.01), -1, 1, 0.0, 1.0);
  let cI = 0;
  for (let i = 0; i < density; i += 1) {
    drawLattice(random(0.2, 0.6), random(0.2, 0.6), lerpColor(colors[floor(random(colors.length - 1))], colors[floor(random(colors.length - 1))], colorStep), lerpColor(colors[floor(random(colors.length - 1))], colors[floor(random(colors.length - 1))], colorStep), alphaStep);
    if (cI < colors.length - 2) {
      cI++;
    } else {
      cI = 0;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function trippyDot(x, y, size, c, alphaStep) {
  push();
    let a = initAlpha;
    stroke(c);
    strokeWeight(size);
    point(x, y);
    a -= alphaStep; 
    c.setAlpha(a);
    stroke(c);
    //left
    point(x - size, y-size);
    point(x - size, y);
    point(x - size, y + size);
    //right
    point(x + size, y - size);
    point(x + size, y);
    point(x + size, y + size);
    //top
    // point(x - size, y - size);
    point(x, y - size);
    // point(x + size, y - size);
    //bottom
    // point(x - size, y + size);
    point(x, y + size);
    // point(x + size, y + size);


    let leftPoints = [
      createVector(x - size, y - size),
      createVector(x - size, y),
      createVector(x - size, y + size),
    ]
    let rightPoints = [
      createVector(x + size, y - size),
      createVector(x + size, y),
      createVector(x + size, y + size),
    ]
    let topPoints = [
      createVector(x - size, y - size),
      createVector(x, y - size),
      createVector(x + size, y - size),
    ]
    let bottomPoints = [
      createVector(x - size, y + size),
      createVector(x, y + size),
      createVector(x + size, y + size),
    ]
    while (a > 0) {
      a -= alphaStep + size;
      c.setAlpha(a);
      stroke(c);
      stroke(c);
      leftPoints.forEach(p => {
        p.sub(size);
        point(p.x, p.y);
      });
      rightPoints.forEach(p => {
        p.add(size);
        point(p.x, p.y);
      });
      topPoints.forEach(p => {
        p.sub(0, size);
        point(p.x, p.y);
      });
      bottomPoints.forEach(p => {
        p.add(0, size);
        point(p.x, p.y);
      });
    }
  pop();
}

function drawLattice(offsetX, offsetY, color1, color2, alphaStep) {
  for (let i = outerLimit(dotSize) * -offsetY; i < height * 2; i += outerLimit(dotSize)) {
    alternate = !alternate
    for (let j = outerLimit(dotSize) * -offsetX; j < width * 2; j += outerLimit(dotSize)) {
      if (alternate) {
        trippyDot(j, i, dotSize, color1, alphaStep);
      } else {
        trippyDot(j, i, dotSize, color2, alphaStep);
      }
    }
  }
}

function backgroundGradientThreeColor(c1, c2, c3) {
  for(let y=0; y<height; y++){
    if (y < height / 2) {
      n = map(y, 0 ,height / 2, 0, 1);
      let newc = lerpColor(color(c1),color(c2),n);
      stroke(newc);
    } else {
      n = map(y, height / 2, height, 0, 1);
      let newc = lerpColor(color(c2),color(c3),n);
      stroke(newc);
    }
    line(0,y,width, y);
  }
}
