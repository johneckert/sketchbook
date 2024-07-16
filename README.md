# SKETCHBOOK

Daily sketches and experiments with p5.js.
View them here: [Sketch Book](https://johneckert.github.io/sketchbook/)

## Shaders
### Gaussian Blur Shader
```javascript
let shaderProgram;

function preload() {
  shaderProgram = loadShader('shaders/gaus.vert', 'shaders/gaus.frag');
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

### 07/06/2024
https://github.com/johneckert/sketchbook/assets/14866241/2a63a2ab-595f-4564-9c64-4f60352029bd

### 07/07/2024
https://github.com/johneckert/sketchbook/assets/14866241/9a1bef65-eba9-489f-99ac-7b340124334a

### 07/08/2024
https://github.com/johneckert/sketchbook/assets/14866241/10d2831d-f0e6-4ef5-8cce-e7ab9313816f

### 07/09/2024
https://github.com/johneckert/sketchbook/assets/14866241/1d5d1101-32ca-4aa5-b25c-ce066189417e

### 07/10/2024
https://github.com/johneckert/sketchbook/assets/14866241/65809bbf-7180-4a2a-8031-c358df6ad881

### 07/11/2024
https://github.com/user-attachments/assets/37d59dff-5c87-469a-874b-581e852a1461

### 07/12/2024
https://github.com/user-attachments/assets/aa29ce8c-2f32-4bc2-8f15-939a6c46f466

### 07/13/2024
https://github.com/user-attachments/assets/1829f360-1c76-45b7-bb5c-81963c472afb

### 07/15/2024
https://github.com/user-attachments/assets/24188e12-2c1f-494a-a028-51f872fb7f61







