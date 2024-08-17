let wUnit, hUnit, i;
let colors = ['#3C3B3F', '#605C3C', '#3C3B3F'];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  wUnit = width / 4;
  posHunit = -height / 2 + height / 5;
  negHunit = -height / 2 + height / 5;
  i = 0;
  backgroundGradientThreeColor(...colors);
}

function draw() {
  push();
  for (let j = -width / 2; j < width + wUnit * 2; j+= wUnit){
    for (let k = -height / 2; k < height; k+= hUnit){
      stroke(255);
      strokeWeight(0.5);
      drawDiamond(j, k, j * wUnit, k * hUnit, i);
    }
  }
  pop();
  if (frameCount % 500 > 0) {
    push();
    for (let j = -width / 2; j < width + wUnit * 2; j+= wUnit){
      for (let k = -height / 2; k < height; k+= hUnit){
        stroke(colors[1]);
        strokeWeight(1);
        drawDiamond(j, k, j * wUnit, k * hUnit, i);
      }
    }
    pop();
  }
  i++;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let drawDiamond = (x, y, i) => {
  push();
  rotateX(frameCount * random());
  rotateX(i);
  beginShape();
    vertex(x, y + posHunit);
    vertex(x - wUnit /4, y);
    vertex(x, y + posHunit);
    vertex(x + wUnit /4, y);  
  endShape(CLOSE);
  pop();
}

function backgroundGradientThreeColor(c1, c2, c3) {
  for(let x= -width; x < width; x++){
    if (x < 0) {
      n = map(x, -width / 2, 0, 0, 1);
      let newc = lerpColor(color(c1),color(c2),n);
      stroke(newc);
    } else {
      n = map(x, 0, width / 2, 0, 1);
      let newc = lerpColor(color(c2),color(c3),n);
      stroke(newc);
    }
    line(x,-height / 2, x, height / 2);
  }
}
