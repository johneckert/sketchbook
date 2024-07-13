let HALF_WIDTH, HALF_HEIGHT;
let shaderProgram;
let x, vertIncrement;
let numCircles = 0;

function preload() {
  shaderProgram = loadShader('shaders/moir.vert', 'shaders/moir.frag');
}

function setup() {
  HALF_WIDTH = windowWidth / 2;
  HALF_HEIGHT = windowHeight / 2;
  x = -HALF_WIDTH;
  vertIncrement = windowHeight / 9;
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  shader(shaderProgram);
  shaderProgram.setUniform('stripeWidth', 0.1);
  shaderProgram.setUniform('offset', [0.0, 0.0]);
  // Enable blending for transparency
  let gl = this._renderer.GL;
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
}

function draw() {
  background(color('#D39D38'));
  // UPPER
  shaderProgram.setUniform('offset', [0.0, 0.0]);
  shaderProgram.setUniform('stripeWidth', 5);
  rect(-HALF_WIDTH, -HALF_HEIGHT, windowWidth, vertIncrement * 5);

  // LOWER
  shaderProgram.setUniform('offset', [0.0, 0.0]);
  shaderProgram.setUniform('stripeWidth', 5);
  rect(-HALF_WIDTH, vertIncrement * 1.5, windowWidth, HALF_HEIGHT);

  // SHAPE
  shaderProgram.setUniform('stripeWidth', 10);
  shaderProgram.setUniform('offset', [0.0, 0.0]);
  push();
  beginShape();
  vertex(-HALF_WIDTH, -HALF_HEIGHT);
  bezierVertex(windowWidth, 30, 80, 50, 50, HALF_HEIGHT);
  vertex(HALF_WIDTH, HALF_HEIGHT);
  endShape(CLOSE);
  pop();

  let r = vertIncrement / 2;
  shaderProgram.setUniform('stripeWidth', 3);
  shaderProgram.setUniform('offset', [2.6, 0.0]);
  fill(255,255,0)
  shaderProgram.setUniform('stripeWidth', 3);
  circle(x, r * 2, r * 2);
  shaderProgram.setUniform('stripeWidth', 11);
  circle(x - r * 4, r * 2, r * 2);
  shaderProgram.setUniform('stripeWidth', 18);
  circle(x - r * 8, r * 2, r * 2);
  shaderProgram.setUniform('stripeWidth', 11);
  circle(x - r * 12, r * 2, r * 2);
  shaderProgram.setUniform('stripeWidth', 3);
  circle(x - r * 16, r * 2, r * 2);

  x += 10;
  if (x > windowWidth + (r * 16)) {
    x = -1 * (r + HALF_WIDTH);
  }

}
