let shaderProgram,blurRes, i;

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
  blurRes = [width * 0.1, height * 0.1]
  
  // Set shader uniforms
  shaderProgram.setUniform('uResolution', blurRes);
  shaderProgram.setUniform('uBlurSize', 10.0); // Adjust the blur size as needed
  
  i = 0;
  // Add error checking for the shader program
  checkShaderCompilation(shaderProgram);
}

function draw() {
  // Render 2D shapes to the graphics buffer
  pg.push();
  pg.background(100);
  pg.strokeWeight(4);
  
  for (let j = width; j >= 0; j -= 50) {
    console.log(j);
    for(let k = i; k < width; k += 50) {
      pg.push();
      pg.fill(lerpColor(color('#c0392b'), color('#8e44ad'), j / width));
      pg.stroke(lerpColor(color('#8e44ad'), color('#c0392b'), j / width));
      pg.circle(k, height/2, j);
      pg.pop();
    }

    for (let l = i - width; l < width / 4; l += 500) {
      pg.push();
      pg.fill(lerpColor(color('#00C9FF'), color('#92FE9D'), j / width));
      pg.stroke(lerpColor(color('#92FE9D'), color('#00C9FF'), j / width));
      pg.circle(j + l , height/2, j);
      pg.circle(width - (j + l) , height/2, j);
      pg.pop();
    }

    for (let l = 0; l < width * 2; l += 500) {
      pg.push();
      pg.fill(lerpColor(color('#89253e'), color('#3a6186'), j / width));
      pg.stroke(lerpColor(color('#3a6186'), color('#89253e'), j / width));
      pg.circle(l, height/2, j);
      pg.pop();
    }
  }

  pg.fill(color('#fd746c'));
  pg.stroke(color('#ff9068'));
  pg.triangle(width / 10, 0 + i, 0 + i, height / 10, width /2, height /2);
  pg.triangle(width - width / 10, 0 + i, width - i, height / 10, width /2, height /2);
  pg.triangle(width / 10, height - i, 0 + i, height - height / 10, width /2, height /2);
  pg.triangle(width - width / 10, height - i, width - i, height - height / 10, width /2, height /2);
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
  
  i += 2;
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
