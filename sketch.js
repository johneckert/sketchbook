function setup() {
  createCanvas(windowWidth, windowHeight);
  translate(width/2, height/2);
}

function draw() {
  text('hello world.', 100, 100);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}