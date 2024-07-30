let arcX, arcY, arcW, arcH, arcStart, arcStop, density, iterations, loops, pg;
let colors = ['#A5FECB','#20BDFF', '#ef32d9', '#89fffd', '#0072ff', '#00c6ff', '#ffa751', '#ffe259', '#EF629F', '#EECDA3', '#EF629F', '#EECDA3', '#F46AA7', '#E9B0DF'];
// let backgroundColors = ['#734b6d', '#42275a'];
let backgroundColors = ['#0F2027', '#2C5364'];
let shaderProgram;

function preload() {
  shaderProgram = loadShader('shaders/gaus.vert', 'shaders/gaus.frag');
}

function setup() {
  frameRate(1);
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  pg = createGraphics(width, height);
  pgBackgroundGradient(color(backgroundColors[0]), color(backgroundColors[1]), pg);
  shader(shaderProgram);
  blurRes = [width, height]
  
  // Set shader uniforms
  shaderProgram.setUniform('uResolution', blurRes);
  shaderProgram.setUniform('uBlurSize', 30); // Adjust the blur size as needed

  loops = 1;
  iterations = 5;
  arcX = 0;
  arcY = 0;
  arcW = 500;
  arcH = 500;
  arcStart = 180;
  arcStop = 360;
  density = 0.01;

  
}

function draw() {
  if (frameCount >= loops) {
    noLoop();
  } else {
    pgBackgroundGradient(color(backgroundColors[0]), color(backgroundColors[1]), pg);
  }
  push();
  let streakX = random(-width / 2, width);
  let streakY = random(-height / 2, 0);

  let oppositeStreakX = random(width, width * 1.5);
  let oppositeSstreakY = random(-height / 2, 0);

  // dot streaks
  for (let i = 0; i < iterations * 100; i++) {
    pg.strokeWeight(random(10, 50));
    pg.stroke(randomColor());

    streakX += i * density;
    streakY += i * density;
    pg.point(streakX, streakY);

    oppositeStreakX -= i * density;
    oppositeSstreakY += i * density;
    pg.point(oppositeStreakX, oppositeSstreakY);
  }
  pop();

  //dots
  push();
  for (let i = 0; i < iterations * 10; i++) {
    let pointX = random(0, width);
    let pointY = random(0, height);
    pg.strokeWeight(random(10, 50));
    pg.stroke(randomColor());
    pg.point(pointX, pointY);
  }
  pop();

  // arcs
  push();
  pg.noFill();
  for (let i = 0; i < iterations; i++) {
    pg.strokeWeight(random(5, 20));
    arcX = random(width / 4, 3 * (width / 4));
    arcY = random(height / 4, 3 * (height / 4));
    arcW =  random(0, width);
    arcH = random(0, height);
    arcStart = random(90, 180);
    arcStop = random(270, 360);
    pg.stroke(randomColor());
    pg.arc(arcX, arcY, arcW, arcH, arcStart, arcStop);
  }
  pop();

  shader(shaderProgram);
  shaderProgram.setUniform('uSampler', pg);
  texture(pg);

  // Ensure the matrices are defined before attempting to use them
  if (this._renderer.uPMatrix && this._renderer.uMVMatrix) {
    // Access the projection and model-view matrices
    let projectionMatrix = this._renderer.uPMatrix.mat4 || this._renderer.uPMatrix;
    let modelViewMatrix = this._renderer.uMVMatrix.mat4 || this._renderer.uMVMatrix;

    // Convert matrices to Float32Array
    let projectionMatArray = new Float32Array(projectionMatrix);
    let modelViewMatArray = new Float32Array(modelViewMatrix);

    // Set matrix uniforms
    shaderProgram.setUniform('uProjectionMatrix', projectionMatArray);
    shaderProgram.setUniform('uModelViewMatrix', modelViewMatArray);
  } else {
    console.warn('Projection matrix or model-view matrix is undefined.');
  }

  perspective();
  translate(0, 0, 0);
  plane(width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // Resize the graphics buffer
  pg.resizeCanvas(width, height);
  
  // Update shader uniforms
  shaderProgram.setUniform('uResolution', blurRes);
}

function pgBackgroundGradient(c1, c2, pg) {
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    pg.stroke(c);
    pg.line(0, i, width, i);
  }
}

let randomColor = () => {
  return color(random(colors));
};
