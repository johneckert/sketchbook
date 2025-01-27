// #Genuary2025 #Genuary27
// https://genuary.art/
// Make something interesting with no randomness or noise or trig.

let lat = 48.868333;
let long = -123.385;
let time = Date.now();
let h1, h2, h3, s1, s2, s3, l1, l2, l3;

function preload() {
  getLocation();
}

function setup() {
  colorMode(HSL, 360, 100, 100, 1);
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  translate(-width / 2, -height / 2);
  backgroundGradient(color(h1, s1, l1), color(h2, s2, l2));
  push();
  strokeWeight(2);
  stroke(255);
  fill(color(h3, s3, l3));
  beginShape();
  vertex(0, 0);
  for (let i = 0; i < width; i += 5) {
    let x = abs(map((time * lat) % i * 10, 0, (time * lat) % width * 10, 0, width));
    let y = abs(map((time * long) % i * 10, 0, (time * long) % width * 10, 0, height));
    curveVertex(x, y);
  }
  endShape();
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

getLocation = () => {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
}

const geoFail = (error) => {
  console.log('error: ', error);
}

const geoSuccess = async (position) => {
  lat = await position.coords.latitude;
  long = await position.coords.longitude;

  h1 = time % 360;
  h2 = 360 - h1;
  h3 = abs((time * lat) % 360);

  s1 = abs((time * lat) % 100);
  s2 = abs((time * long) % 100);
  s3 = abs((time * lat / long) % 100);

  l1 = abs(time * long % 100);
  l2 = abs(time * lat % 100);
  l3 = abs(time * long / lat % 100);
}

function backgroundGradient(c1, c2) {
  push();
  for(let y = 0; y < height / 2; y++){
    let n = map(y, 0, height, 0, 1);
    let newc = lerpColor(c1, c2, n);
    stroke(newc);
    line(0, y, width, y);
  }

  for(let y = height / 2; y < height; y++){
    let n = map(y, 0, height, 1, 0);
    let newc = lerpColor(c1, c2, n);
    stroke(newc);
    line(0, y, width, y);
  }
  pop();
}