let wUnit, hUnit, i, currentColorIndex;
let colors = ['#11FFBD', '#78ffd6', '#B2FEFA', '#BDFFF3', '#93F9B9'];
let backgroundColors = ['#093637', '#44A08D', '#09367', '#2ebf91'];
let loopColor;
let randomColor = () => {
  let newColorIndex = Math.floor(Math.random() * colors.length);
  if (newColorIndex === currentColorIndex) {
    return randomColor();
  }
  currentColorIndex = newColorIndex;
  return colors[currentColorIndex];
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  rectMode(CENTER);
  noFill();
  wUnit = width / 10;
  hUnit = height / 10;
  backgroundGradientThreeColor(...backgroundColors);
  loopColor = color(randomColor());
}

function draw() {
  rotateY(frameCount);
  i = sin(frameCount) * 1000;
  // stroke(lerpColor(loopColor, white, map(i, -1000, 1000, 0, 1)));
  loopColor.setAlpha(map(i, -1000, 1000, 100, 255));
  stroke(loopColor);
  beginShape();
  vertex(-wUnit * 5, -hUnit * 6, 0);
  vertex(wUnit + i, hUnit, 0);
  vertex(-wUnit * 6, hUnit * 4, 0);
  vertex(-wUnit, hUnit, 0);
  endShape(CLOSE);

  if (i === 1000) {
    loopColor = color(randomColor());
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function backgroundGradientThreeColor(c1, c2, c3, c4) {
  for(let y= -height/2; y<height/2; y++){
    if (y > 0  && y < 2 * hUnit) {
      let newc = lerpColor(color(c2),color(c4),map(y, 0, 2 * hUnit, 0, 1));
      stroke(newc);
    }
    else if (y < 4 * hUnit && y > 2 * hUnit) {
      let newc = lerpColor(color(c4),color(c2),map(y, 2 * hUnit, 4 * hUnit, 0, 1));
      stroke(newc);
    }
    else if (y < height / 2) {
      n = map(y, -height / 2 ,0, 0, 1);
      let newc = lerpColor(color(c1),color(c2),n);
      stroke(newc);
    } else {
      n = map(y, 0, height / 2, 0, 1);
      let newc = lerpColor(color(c2),color(c3),n);
      stroke(newc);
    }
    line(-width / 2,y, width / 2, y);
  }
}