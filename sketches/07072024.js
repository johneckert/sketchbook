let unit;
const RANGE_START = -50;
const RANGE_END = 50;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  unit = windowHeight / 30;
}

function spinningTorus(frameCount) {
  translate(unit * 6.5, 0, 0);
    rotateX(1.5);
    push();
    rotateY(frameCount * 0.01);
    torus(unit * 5, unit, 100, 100);
    pop();
}

function findPositionInPeriod(currentFrame) {
  const period = 310;
  const firstHit = 150;
  return (currentFrame - firstHit) % period;

}

function isVertical(positionInPeriod) {
  return positionInPeriod >= RANGE_START && positionInPeriod <= RANGE_END;
}

function draw() {
  ortho();
  background(50, 0, 100);
  noStroke();
  
  ambientLight(50, 0, 150);
  let c = color(255, 200, 255);
  let lightDir = createVector(0.75, 0.75, -0.5);
  directionalLight(c, lightDir);
  specularMaterial(50);
  
  translate(-unit * 42, 0, 0);
  push();
  for (let i = 0; i < 20; i++) {
    spinningTorus(frameCount);
  }
  pop();
  let positionInPeriod = findPositionInPeriod(frameCount);
  if (isVertical(positionInPeriod)) {
    push();
    let sphereX = map(positionInPeriod, RANGE_START, RANGE_END, -windowWidth, windowWidth + (unit * 20));
    translate(sphereX, 0, 0);
    ambientLight(255, 155, 0);
    ambientMaterial(255, 155, 0);
    sphere(unit);
    pop();
  }
}