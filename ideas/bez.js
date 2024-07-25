let f = 5;
let direction = 1;
let leftEdge, rightEdge;
let ringRadius, density, maxMovement;
let leftVertLinePos, rightVertLinePos;

function setup() {
  createCanvas(windowWidth, windowHeight);
  leftEdge = -width / 2;
  rightEdge = width / 2;
  ringRadius = height * 5;
  density = 10
  maxMovement = 40;
  leftVertLinePos = leftEdge;
  rightVertLinePos = rightEdge;
}

function draw() {
  // backgroundGradientThreeColor(color('#aa4b6b'), color('#6b6b83'), color('#3b8d99'));
  background(255);
  translate(width/2, height/2);
  if (leftRing.centerX > rightEdge) {
    direction = -1;
  }

  if (leftRing.centerX < leftEdge) {
    direction = 1;
  }
  push();
  strokeWeight(5);
  stroke(color('#CAC531'));
  bezier(leftEdge, -2.5, leftVertLinePos,-height / 2, rightVertLinePos, height / 10, rightEdge, height / 2);
  bezier(leftEdge, -2.5, leftVertLinePos, height / 2, rightVertLinePos, height / 10, rightEdge, -height / 2);
  bezier(rightEdge, -2.5, rightVertLinePos, height / 2, leftVertLinePos, height / 10, leftEdge, -height / 2);
  bezier(rightEdge, -2.5, rightVertLinePos, -height / 2, leftVertLinePos, height / 10, leftEdge, height / 2);


  leftVertLinePos += f * direction;
  rightVertLinePos -= f * direction;
  pop();
};
    

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function backgroundGradientThreeColor(c1, c2, c3) {
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
}