// #Genuary2025 #Genuary7
// https://genuary.art/
// Prompt: Use software that is not intended to create art or images.

function preload() {
  img = loadImage('/assets/01072025-full.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  radialGradient(color('#203A43'), color('#0F2027'));

  let marginX = width/10;
  let marginY = height/10;
  image(img, marginX, marginY, width - (marginX * 2), height - (marginY * 2), 0, 0, img.width, img.height, CONTAIN);
}

function draw() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function radialGradient(c1, c2) {
  push();
  noFill();
  for(let x=0; x < width * 1.5; x++){
    let inter = map(x, 0, width * 1.5, 0, 1.0);
    let c = lerpColor(c1, c2, inter);
    strokeWeight(1);
    stroke(c);
    circle(width/2, height/2, x);
  }
  pop();
}
