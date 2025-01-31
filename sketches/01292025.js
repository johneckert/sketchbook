let img;
const gridA = [];

let baseCellCount = 15
let rowCount, colCount;

let cellWidth;
let cellHeight;

function preload() {
  img = loadImage(`https://picsum.photos/id/${Math.floor(random(1, 500))}/${width}/${height}`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
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
      image(cell, cellX, cellY);
    }
    cellX += cellWidth;

    if (cellX >= width) {
      cellX = 0;
      cellY += cellHeight;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}