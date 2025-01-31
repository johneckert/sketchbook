let txImage;

function preload() {
  txImage = loadImage('/textures/mball.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  backgroundGradient(color('#8360c3'), color('#2ebf91'));
  for (let z = -500; z < 500; z += 50) {
    for (let y = -height / 2; y < height / 2; y += 50) {
      for (let x = -width / 2; x < width / 2; x += 50) {
        push();
        translate(x, y, z);
        noStroke();
        if (noise(x, y, z) > 0.7) {
          rotateY(frameCount * 0.03);
          texture(txImage);
          sphere(map(noise(x), 0, 1, 10, 20));
        }
        pop();
      }
    }
  }
}


function backgroundGradient(c1, c2) {
  push();
  translate(-width / 2, -height / 2);
  for(let y = 0; y < height / 2; y++){
    let n = map(y, 0, height, 0, 1);
    let newc = lerpColor(c1, c2, n);
    stroke(newc);
    line(0, y, width, y);
  }

  for(let y = height / 2; y < height; y++){
    let n = map(y, 0, height, 1, 0);
    let newc = lerpColor(c1, c2, n);
    stroke(newc);
    line(0, y, width, y);
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
