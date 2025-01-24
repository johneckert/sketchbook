// #Genuary2025 #Genuary23
// https://genuary.art/
// Prompt: Inspired by brutalism

let boxSize;
let textureImage, backgroundImage;

function preload() {
  textureImage = loadImage('/textures/concrete.jpg');
  backgroundImage = loadImage('/textures/bgConcrete.jpg');
}

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight, WEBGL);
  noLoop();

  perspective(PI / 3.0, width / height, -10000, 10000);
  //Default Camera -  x: 0, y: 0, z: 800, centerX: 0, centerY: 0, centerZ: 0, upX: 0, upY: 0, upZ: 1.
  cam = createCamera();
  setCamera(cam);

  boxSize = width / 10;
}

function draw() {
  background(0);
  texture(textureImage);
  ambientLight(100);
  directionalLight(200, 200, 200, 1, -0.5, 0);
  directionalLight(200, 200, 200, -1, 0.5, 0);

  push();
  noStroke();
  texture(backgroundImage);
  translate(0, 0, -width * 3);
  plane(width * 10, height * 10);
  pop();

  let yi = 0;
  for (let y = -1 * height / 2; y < width; y+=boxSize) {
    let xi = 0;
    for (let x = -1 * width / 2; x < width; x+=boxSize) {
      push();
      translate(x, y, xi !== 2 && xi !== 8 ? (-boxSize / 6) * yi : 0);
      box(boxSize * random(0.2, 1), boxSize * random(0.2, 1), boxSize * random(2, 8));
      pop();
      xi++;
    }
    yi ++;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
