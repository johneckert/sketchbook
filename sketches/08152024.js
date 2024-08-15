let wUnit, hUnit, i;
let colors = ['#FF0099', '#000000'];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  rectMode(CENTER);
  noFill();
  wUnit = width / 10;
  hUnit = height / 10;
  backgroundGradient(...colors);
  i = 0;
}

function draw() {
  rotateY(i);
  rotateY(frameCount * 100);
  drawShape();
  i++;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let lerpVertex = (x, y, colors, prevInterval, isAccent) => {
  strokeWeight(0.5);
  stroke(lerpColor(color(colors[0]), color(colors[1]), map(prevInterval + cos(prevInterval) * 10, 0, height, 0, 1)));
  if (frameCount % 11 === 0 && isAccent) {
    stroke(255);
    strokeWeight(1);
  }
  vertex(x,y);
  return prevInterval + abs(y);
};

let drawShape = () => {
  let ci = 0;
  beginShape();
    ci = lerpVertex(0,0, colors, ci, true);
    ci = lerpVertex(0, hUnit * 2, colors, ci);
    ci = lerpVertex(-width * 4, -hUnit * 4, colors, ci);
    ci = lerpVertex(0, hUnit * 4, colors, ci, true);
    ci = lerpVertex(wUnit * 4, -hUnit * 3, colors, ci);
    ci = lerpVertex(-wUnit * 9, hUnit * 4, colors, ci);
    ci = lerpVertex(wUnit * 4, hUnit * 4, colors, ci, true);
  endShape(CLOSE);

  ci = 0;

  beginShape();
    ci = lerpVertex( -hUnit * 5, -wUnit * 4, colors, ci);
    ci = lerpVertex(wUnit * 3, -hUnit * 4, colors, ci);
    ci = lerpVertex(-wUnit * 5, -hUnit * 2, colors, ci);
  endShape(CLOSE);

  ci = 0;
  

  beginShape();
    ci = lerpVertex(-wUnit * 1, -hUnit * 1.5, colors, ci, true);
    ci = lerpVertex(-wUnit * 2, -hUnit * 2.5, colors, ci,true);
    ci = lerpVertex(-wUnit * 3, -hUnit * 1.5, colors, ci, true);
  endShape(CLOSE);
}

function backgroundGradient(c1, c2) {
  for(let x= -width; x < width; x++){
    n = map(x, 0, width, 0, 1);
    let newc = lerpColor(color(c2), color(c1), n);
    stroke(newc);
    line(x, -height/2, x, height/2);
  }
}

