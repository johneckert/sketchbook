let posModA, posModB, swayA, swayB;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  posModA = map(sin(frameCount * 0.05), -1, 1, -200, 400);
  posModB = map(cos(frameCount * 0.05), -1, 1, -200, 400);
  swayA = map(sin(frameCount * 0.05), -1, 1, -50, 50);
  swayB = map(cos(frameCount * 0.05), -1, 1, -50, 50);
}

function draw() {
  backgroundGradient(color('#3E5151'), color('#DECBA4'));
  translate(width/2, height/2);
  stroke(0);
  drawCat(-width / 3, posModA,   100, swayA);
  drawCat(0, posModB, 80);
  drawCat(width / 3, posModA,   120, swayB);

  posModA = map(sin(frameCount * 0.05), -1, 1, -200, 400);
  posModB = map(cos(frameCount * 0.05), -1, 1, -200, 400);
  swayA = map(sin(frameCount * 0.05), -1, 1, -50, 50);
  swayB = map(cos(frameCount * 0.05), -1, 1, -50, 50);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawCat(x,y, col, sway = 0) {
  // for bez: (control x1, control y1, control x2, control y2, x, y)
  push();
  fill(col);
  translate(x,y);
  beginShape();
  vertex(-width / 4, height / 2 - y);
  bezierVertex(-width / 8 + sway, 0, -width / 8  + sway, 0, -width / 6 + sway, -height / 4);
  bezierVertex(-width / 20  + sway, 0, -width / 20  + sway, 0, -width / 20 + sway, 0);
  bezierVertex(width / 20  + sway, 0, width / 20  + sway, 0, width / 20 + sway, 0);
  vertex(width / 8 + sway, -height / 4);
  bezierVertex(width / 4, height / 2, width / 6, height / 10, width / 4, height / 2 - y);
  endShape(CLOSE);

  //eyes
  fill(color('#a2ab58'));
  ellipse(-width / 20 + sway, height / 8, 100, 60);
  ellipse(width / 20 + sway, height / 8, 100, 60);

  //pupils
  fill(0);
  ellipse(-width / 20 + sway, height / 8, 40, 60);
  ellipse(width / 20 + sway, height / 8, 40, 60);

  //whiskers
  stroke(0);
  strokeWeight(2);
  line(-width / 20 + sway, height / 4, -width / 4, height / 4);
  line(-width / 20 + sway, height / 4 - 15, -width / 4, height / 5);
  line(-width / 20 + sway, height / 4 + 15, -width / 4, height / 3);

  line(width / 20 + sway, height / 4 - 15, width / 4, height / 5);
  line(width / 20 + sway, height / 4, width / 4, height / 4);
  line(width / 20 + sway, height / 4 + 15, width / 4, height / 3);

  //nose
  fill(color('#f7797d'));
  beginShape();
  quadraticVertex(-width / 30 + sway, height/ 4, width / 40 + sway, height / 4.5);
  vertex(width / 40 + sway, height / 4.5);
  quadraticVertex(width / 30 + sway, height/ 4, 0 + sway, height / 3.5);
  vertex(0 + sway, height / 3.5);
  quadraticVertex(-width / 30 + sway, height/4, -width / 40 + sway, height / 4.5);
  vertex(-width / 40 + sway, height / 4.5);
  endShape(CLOSE);
  line(0 + sway, height / 3.5, 0 + sway, height / 3);
  noFill();
  arc(width / 60 + sway, height / 3, width/30, height / 30, 0, PI);
  arc(-width / 60 + sway, height / 3, width/30, height / 30, 0, PI);
  pop();

}

function backgroundGradient(c1, c2) {
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
}