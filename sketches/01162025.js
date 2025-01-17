// #Genuary2025 #Genuary16
// https://genuary.art/
// Prompt: Generative palette.

let myShader;
let cx;
let cy;
let startRadius;
let totalPoints;
const circles = [];


//shader inspo: https://iquilezles.org/articles/palettes/
function preload() {
  vertShader = `
    precision highp float;
    uniform mat4 uModelViewMatrix; // Camera and transformation matrix
    uniform mat4 uProjectionMatrix; // Projection matrix
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;
    varying vec2 vTexCoord;
    void main() {
      vTexCoord = aTexCoord;
      gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
    }
  `;

  fragShader = `
    precision mediump float;
    uniform float uTime;
    uniform float uFadeRange;
    uniform vec2 uResolution;
    uniform vec3 uA;
    uniform vec3 uB;
    uniform vec3 uC;
    uniform vec3 uD;
    varying vec2 vTexCoord;

    // Function for a cosine-based palette
    vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
        return a + b * cos(6.283185 * (c * t + d));
    }

    void main() {
      // Normalize fragment coordinates (0 to 1 range)
      vec2 uv = gl_FragCoord.xy / uResolution;
      uv.y = 1.0 - uv.y; // Flip Y for correct orientation

      // Use time and location to create color variation
      float t = uTime * 0.1 + length(uv - 0.5) * 10.0;

      vec3 color = palette(t, uA, uB, uC, uD);
      gl_FragColor = vec4(color, 1.0);
    }`;
  myShader = createShader(vertShader, fragShader);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  totalPoints = 5;
  cx = 0;
  cy = 0;
  startRadius = min(width / 2, height / 2)
  noStroke();
  shader(myShader);

  myShader.setUniform('uA', [0.5, 0.5, 0.5]); // Base color
  myShader.setUniform('uB', [0.5, 0.5, 0.5]); // Amplitude
  myShader.setUniform('uC', [2.0, 1.0, 0.0]); // Frequency
  myShader.setUniform('uD', [0.50, 0.20, 0.25]); // Phase
  myShader.setUniform('uFadeRange', 10.0); // Fade range
}

function draw() {
  let r = lerp(180, 200, sin(millis() / 10000));
  let g = lerp(30, 87, sin(millis() / 1000));
  let b = lerp(76, 200, sin(millis() / 1000));
  background(0);
  myShader.setUniform('uTime', millis() / 500.0 );
  myShader.setUniform('uResolution', [width * 2.0, height * 2.0]); // Resolution
  setShaderUniforms([0.5, 0.0, 0.5], [0.0, 0.6, 0.0], [0.2, 0.2, 0.0], [0.0, 0.5, 0.5], 10)
  shader(myShader);
  ellipse(cx, cy, width * 2, height * 2);

  push();
  rotateZ(frameCount * 0.01);
  drawEyes(
    cx * 0.5, 
    cy * 0.5, 
    startRadius * 0.04, 
    [ 
      [n(r), n(g), n(b)],
      [0.3, 0.3, 0.3],
      [0.8, 0.8, 0.8],
      [1.0, 1.5, 0.5],
      10.0
    ]
  );
  pop();


  push();
  rotateZ(frameCount * -0.01);
  drawEyes(
    cx * 0.5, 
    cy * 0.5, 
    startRadius * 0.09, 
    [ 
      [n(r), n(g), n(b)],
      [0.3, 0.3, 0.3],
      [0.8, 0.8, 0.8],
      [1.0, 1.5, 0.5],
      10.0
    ]
  );
  pop();

push();
  rotateZ(frameCount * 0.01);
  drawEyes(
    cx * 0.5, 
    cy * 0.5, 
    startRadius * 0.2, 
    [ 
      [n(r), n(g), n(b)],
      [0.3, 0.3, 0.3],
      [0.8, 0.8, 0.8],
      [1.0, 1.5, 0.5],
      10.0
    ]
  );
  pop();

  push();
  rotateZ(frameCount * -0.005);
  drawEyes(
    cx * 0.5, 
    cy * 0.5, 
    startRadius * 0.5, 
    [ 
      [n(r), n(g), n(b)],
      [0.3, 0.3, 0.3],
      [0.8, 0.8, 0.8],
      [1.0, 1.5, 0.5],
      10.0
    ]
  );
  pop();

  push();
  rotateZ(frameCount * 0.003);
  drawEyes(
    cx, 
    cy, 
    startRadius * 0.9, 
    [ 
      [n(r), n(g), n(b)],
      [0.3, 0.3, 0.3],
      [0.8, 0.8, 0.8],
      [0.0, 0.5, 0.5],
      10.0
    ]
  );
  pop();

  push();
  rotateZ(frameCount * -0.001);
  drawEyes(
    cx * 1.5, 
    cy * 1.5, 
    startRadius * 1.4, 
    [ 
      [n(r), n(g), n(b)],
      [0.3, 0.3, 0.3],
      [0.8, 0.8, 0.8],
      [0.0, 0.5, 0.5],
      10.0
    ]
  );
  pop();

  push();
  rotateZ(frameCount * 0.0005);
  drawEyes(
    cx * 2, 
    cy * 2, 
    startRadius * 2, 
    [ 
      [n(r), n(g), n(b)],
      [0.3, 0.3, 0.3],
      [0.8, 0.8, 0.8],
      [1.0, 1.5, 0.5],
      10.0
    ]
  );
  pop();
}

function drawCircle(x, y, r, startR) {
  if (r < startR / 6) {
    return;
  }

  circles.push({ x, y , r });

  for (let i = 0; i < totalPoints; i++) {
    let t = i * (PI / (totalPoints / 2));
    let newX = r / 4 * cos(t) + x;
    let newY = r / 4 * sin(t) + y;
    drawCircle(newX, newY, r * 0.5, startR);
  }
}

function drawOuterRings(x, y, r) {
  for (let i = 0; i < totalPoints * 4; i++) {
    let t = i * (PI / (totalPoints * 2));
    ellipse(x + r * cos(t), y + r * sin(t), r, r);
  }
}

function drawEyes(x, y, r, uniforms) {
  for (let i = 0; i < totalPoints * 4; i++) {
    let t = i * (PI / (totalPoints * 2));
    setShaderUniforms(...uniforms);
    ellipse(x + r / 1.15 * cos(t - PI / 4), y + r / 1.15 * sin(t- PI / 4), r / totalPoints, r / totalPoints);
  }
}

function setShaderUniforms(a, b, c, d, fadeRange) {
  myShader.setUniform('uA', a); // Base color [0.5, 0.6, 0.5]
  myShader.setUniform('uB', b); // Amplitude [0.1, 0.8, 0.15]
  myShader.setUniform('uC', c); // Frequency [2.0, 3.0, 1.5]
  myShader.setUniform('uD', d); // Phase [0.50, 0.20, 1.25]
  myShader.setUniform('uFadeRange', fadeRange * 1.0); // Fade range
}

function n(num) {
  return map(num, 0, 255, 0.0, 1.0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
