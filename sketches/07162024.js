let shaderProgram, i, pg, blurRes, circleColor;

function preload() {
  shaderProgram = loadShader('shaders/gaus.vert', 'shaders/gaus.frag',
    () => {
      console.log('Shader loaded successfully');
    },
    (error) => {
      console.error('Shader failed to load:', error);
    }
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  
  // Create a graphics buffer with the same size as the canvas
  pg = createGraphics(width, height);
  
  // Initialize the shader
  shader(shaderProgram);
  blurRes = [width, height]
  
  // Set shader uniforms
  shaderProgram.setUniform('uResolution', blurRes);
  shaderProgram.setUniform('uBlurSize', 30); // Adjust the blur size as needed
  
  i = 0;

  // Add error checking for the shader program
  checkShaderCompilation(shaderProgram);
}

function draw() {
  let center = color('#C6FFDD');
  let mid = color('#FBD786');
  let far = color('#f7797d');

  pg.push();
  pg.background(lerpColor(color('#99f2c8'), color('#1f4037'), 0.6));
  pg.noStroke();
  for(let j = width + 300; j > 0; j--) {
    if (j < width / 2) {
      circleColor = lerpColor(center, mid, map(j, 0, width / 2, 0, 1));
    } else {
      circleColor = lerpColor(mid, far, map(j, width / 2, width, 0, 1));
    }
    let n = noise(j * map(i, 0, width, 0.1, 0.2));
    pg.stroke(center);
    pg.fill(circleColor);
    pg.ellipse(width/2, height/2, j * n, j * n);
  }
  
  pg.pop();
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
  
  i += 1;
  if (i > width) {
    i = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // Resize the graphics buffer
  pg.resizeCanvas(width, height);
  
  // Update shader uniforms
  shaderProgram.setUniform('uResolution', blurRes);
}

function checkShaderCompilation(shader) {
  let gl = this._renderer.GL;
  let program = shaderProgram._glProgram;
  
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Shader program linking failed: ', gl.getProgramInfoLog(program));
  }
}
