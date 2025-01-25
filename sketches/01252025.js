// #Genuary2025 #Genuary25
// https://genuary.art/
// Prompt: One line that may or may not intersect itself

const vertices = [];
let txImage, tx;
let x, y, z;

function preload() {
  txImage = loadImage('/textures/gradientSky.jpg');
};

function setup() {
  frameRate(160);
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  setCamera(cam);
}

function draw() {
  background(0);
  x = sin(frameCount * 0.01) * width / 10;
  y = cos(frameCount * 0.01) * height / 10;
  z = 100 - frameCount;
  let c = lerpColor(color('#E2E2E2'), color('#C9D6FF'), map(sin(z) * .00001, -1, 1, 0, 1));

  push();
  noStroke();
  texture(txImage);
  translate(0, 0, z - 100);
  plane(width, height);
  pop();

  vertices.push({ v: createVector(x, y, z), c: c });
  noFill();

  let camZ = -frameCount + 500;
  cam.setPosition(0, 0, camZ);

  beginShape();
  for (let i = 0; i < vertices.length; i++) {
    let v = vertices[i].v;
    stroke(vertices[i].c);
    strokeWeight(10);
    vertex(v.x, v.y, v.z);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
