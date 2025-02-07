// pixel sort based on ASDF pixel sorting algorithm by Kim Asendorf

// Sorting modes
//  0 = white
//  1 = black
//  2 = bright
//  3 = dark

let mode = 1;
let img;
let loops = 1;
let row = 0;
let col = 0;

let whiteThreshold = 120;
let blackThreshold = 50;
let brightThreshold = 127;
let darkThreshold = 50;

function preload() {
  img = loadImage('../assets/YORK.jpg');
}

function setup() {
  createCanvas(800, 600);
  img.resize(800, 600);
  noSmooth();
  image(img, 0, 0, width, height);
  img.loadPixels();
}

function draw() {
  if (frameCount <= loops) {
    while (col < img.width - 1) {
      sortColumn();
      col++;
    }

    while (row < img.height - 1) {
      sortRow();
      row++;
    }
  } else {
    console.log('done');
    noLoop();
  }

  img.updatePixels();
  image(img, 0, 0, width, height);
}

function getPixelIndex(x, y) {
  return (y * img.width + x) * 4;
}

function getBrightness(x, y) {
  let index = getPixelIndex(x, y);
  return (img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2]) / 3;
}

function getPixelColor(x, y) {
  let index = getPixelIndex(x, y);
  return img.pixels.slice(index, index + 4);
}

function setPixelColor(x, y, color) {
  let index = getPixelIndex(x, y);
  for (let i = 0; i < 4; i++) {
    img.pixels[index + i] = color[i];
  }
}

function sortColumn() {
  let x = col;
  let y = 0;
  let yEnd = 0;

  while (yEnd < img.height - 1) {
    y = findStart(y, x, mode, true);
    yEnd = findEnd(y, x, mode, true);
    if (y < 0) break;

    let sortLength = yEnd - y;
    let chunk = [];

    for (let i = 0; i < sortLength; i++) {
      chunk.push(getPixelColor(x, y + i));
    }

    chunk.sort((a, b) => a.reduce((sum, val) => sum + val) - b.reduce((sum, val) => sum + val));

    for (let i = 0; i < sortLength; i++) {
      setPixelColor(x, y + i, chunk[i]);
    }
    y = yEnd + 1;
  }
}

function sortRow() {
  let y = row;
  let x = 0;
  let xEnd = 0;

  while (xEnd < img.width - 1) {
    x = findStart(x, y, mode, false);
    xEnd = findEnd(x, y, mode, false);
    if (x < 0) break;

    let sortLength = xEnd - x;
    let chunk = [];

    for (let i = 0; i < sortLength; i++) {
      chunk.push(getPixelColor(x + i, y));
    }

    chunk.sort((a, b) => a.reduce((sum, val) => sum + val) - b.reduce((sum, val) => sum + val));

    for (let i = 0; i < sortLength; i++) {
      setPixelColor(x + i, y, chunk[i]);
    }
    x = xEnd + 1;
  }
}

function findStart(coord, fixed, mode, vertical) {
  while (coord < (vertical ? img.height : img.width) - 1 && !isThresholdMet(coord, fixed, mode, vertical)) {
    coord++;
  }
  return coord;
}

function findEnd(coord, fixed, mode, vertical) {
  coord++;
  while (coord < (vertical ? img.height : img.width) - 1 && isThresholdMet(coord, fixed, mode, vertical)) {
    coord++;
  }
  return coord - 1;
}

function isThresholdMet(coord, fixed, mode, vertical) {
  let brightnessVal = vertical ? getBrightness(fixed, coord) : getBrightness(coord, fixed);
  switch (mode) {
    case 0: return brightnessVal < whiteThreshold;
    case 1: return brightnessVal > blackThreshold;
    case 2: return brightnessVal < brightThreshold;
    case 3: return brightnessVal > darkThreshold;
    default: return false;
  }
}

