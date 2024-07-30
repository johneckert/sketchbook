# SKETCHBOOK

I'm using this repository to document my daily sketches and experiments with p5.js. I'm also using this repository to document my learning process with shaders and other web technologies.
View them here: [Sketch Book](https://johneckert.github.io/sketchbook/)

## Shaders
### Gaussian Blur Shader
```javascript
let shaderProgram;

function preload() {
  shaderProgram = loadShader('shaders/gaus.vert', 'shaders/gaus.frag');
}

function setup() {}
shader(shaderProgram) {
  blurRes = [width, height]
  
  // Set shader uniforms
  shaderProgram.setUniform('uResolution', blurRes);
  shaderProgram.setUniform('uBlurSize', 30); // Adjust the blur size as needed
}

function draw() {
  shader(shaderProgram);
  shaderProgram.setUniform('uSampler', pg);

  // ... other draw code

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

```
#### Moir Shader Usage
```javascript
let shaderProgram;

function preload() {
  shaderProgram = loadShader('path/to/vert.glsl', 'path/to/frag.glsl');
  shader(shaderProgram);
  shaderProgram.setUniform('uResolution', [width, height]); // Adjust the resolution of pixel sampling, baseline is [width, height]
  shaderProgram.setUniform('uBlurSize', 1.0); // Adjust the amount of blur
}

function setup() {
  shader(shaderProgram);
  shaderProgram.setUniform('stripeWidth', 0.1); // sets the stripe size
  shaderProgram.setUniform('offset', [0.0, 0.0]); // sets the offset to manipulate moire effect
}

function draw() {
pg.push();
  pg.background(100);
  pg.noStroke();
  
  pg.fill(255, 0, 0);
  pg.ellipse(pg.width / 2 + i, pg.height / 2, 200, 200);
  
  pg.pop();
  
  // Apply the shader
  shader(shaderProgram);
  
  // Set the texture
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

  // Setup perspective projection
  perspective();
  
  // Draw the plane with the same dimensions as the canvas
  translate(0, 0, 0); // Adjust translation to fit the canvas
  plane(width, height);
  
}
```