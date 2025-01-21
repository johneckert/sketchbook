// #Genuary2025 #Genuary24
// https://genuary.art/
// Prompt: Geometric art - pick either a circle, rectangle, or triangle and use only that geometric shape.

let rx = ry = -250;
let gx = gy = -250;
let bx = by = -250;
let size = 500;

let colorShift = 'red';
let previousSin = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  rectMode(CENTER);
  blendMode(SUBTRACT);
}

function draw() {
  background(255);
  // Calculate drift based on sine wave
  let sinValue = sin(frameCount / 50);
  let drift = map(sinValue, -1, 1, -50, 50); // Oscillates between -50 and 50


  // Draw grids based on the current colorShift
  if (colorShift === 'red') {
    drawGrid(rx + drift, ry + drift, size, color(255, 0, 0));
    drawGrid(gx, gy, size, color(0, 255, 0));
    drawGrid(bx - drift, by - drift, size, color(0, 0, 255));
  } else if (colorShift === 'green') {
    drawGrid(rx, ry, size, color(255, 0, 0));
    drawGrid(gx + drift, gy, size, color(0, 255, 0));
    drawGrid(bx - drift, by, size, color(0, 0, 255));
  } else if (colorShift === 'blue') {
    drawGrid(rx, ry - drift, size, color(255, 0, 0));
    drawGrid(gx, gy, size, color(0, 255, 0));
    drawGrid(bx, by + drift, size, color(0, 0, 255));
  }

  // Check for zero-crossing to switch color shift
  if (previousSin > 0 && sinValue <= 0) {
    switchColorShift();
  }

  // Update previousSin for the next frame
  previousSin = sinValue;
}

function drawGrid(startX, startY, size, color) {
  for (let x = startX; x < startX + size; x += 50) {
    for (let y = startY; y < startY + size; y += 50) {
      push();
      noStroke();
      fill(color);
      circle(x, y, 30);
      pop();
    }
  }
}

function switchColorShift() {
  if (colorShift === 'red') {
    colorShift = 'green';
  } else if (colorShift === 'green') {
    colorShift = 'blue';
  } else if (colorShift === 'blue') {
    colorShift = 'red';
  }
}
