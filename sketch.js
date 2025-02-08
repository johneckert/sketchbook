// #Genuary2025 #Genuary29
// https://genuary.art/
// Prompt: Grid-based graphic desing.

let img;
const gridA = [];
let w = 4752;
let h = 3168;

let baseCellCount = 15
let rowCount, colCount;

let cellWidth;
let cellHeight;

function preload() {
  img = loadImage('../assets/YORK STREET 8x10.jpg');
}

function setup() {
  noStroke();
  createCanvas(w, h);
  if (width < height) { 
    let scaler = width / height;
    rowCount = baseCellCount;
    colCount = baseCellCount * scaler;
  } else {
    let scaler = height / width;
    rowCount = baseCellCount * scaler;
    colCount = baseCellCount;
  }
  cellWidth = width / colCount;
  cellHeight = height / rowCount;

  img.resize(width, height);
  img.loadPixels();

  for (let y = 0; y < height; y+=cellHeight) {
    for (let x = 0; x < width; x+=cellWidth) {
      gridA.push(img.get(x, y, cellWidth, cellHeight));
    }
  }
  noLoop();
}

function draw() {
  noStroke();
  background(0);
  image(img, 0, 0, width, height);
  drawGrid(gridA, 0.5);
}

function sampleColor(img, x,y) {
  return color(img.get(x + cellWidth / 2, y + cellHeight / 2));
}

function drawGrid(imgGrid, threshold) {
  let cellX = 0;
  let cellY = 0;
  for (const cell of imgGrid) {
    if (random() > threshold) {
      push();
      let c = sampleColor(img, cellX, cellY);
      fill(c);
      rect(cellX, cellY, cellWidth, cellHeight);
      pop();
    } else {
      // image(cell, cellX, cellY);
    }
    cellX += cellWidth;

    if (cellX >= width) {
      cellX = 0;
      cellY += cellHeight;
    }
  }
}


function mouseClicked() {
  saveCanvas('color-squares', 'png');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}