// #Genuary2025 #Genuary6
// https://genuary.art/
// Prompt: Make a landscape using only primitive shapes

let cam;
let horizonLine;

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight, WEBGL);
  //Default Camera -  x: 0, y: 0, z: 800, centerX: 0, centerY: 0, centerZ: 0, upX: 0, upY: 0, upZ: 1.
  cam = createCamera();
  setCamera(cam);
  horizonLine = -height / 3;
}

function draw() {
  background(200);
  sky();
  ground();
  box();
}

function ground() {
  push();
  fill(color("#3b8d99"));
  rotateX(-70);
  translate(0, -horizonLine, horizonLine);
  plane(width * 3, height * 3);
  pop();
}

function sky() {
  push();
  fill(color("#0F2027"));
  rotateX(70);
  translate(0, horizonLine, horizonLine);
  plane(width * 3, height * 3);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
