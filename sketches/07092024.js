const strokeColors = [
  "#05878a",
  "#074e67",
  "#5a175d",
  "#67074e",
  "#dd9933",
  "#bfcf45",
  "#ec0faa",
  "#2bf618" 
];

let circlePositionX, circlePositionY, prevX, prevY;
let circleSpeedX = 8;
let circleSpeedY = 8;
let circleRadius = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#20002c');
  stroke(randomColor());
  strokeWeight(4);
  frameRate(400);
  ellipseMode(RADIUS);
  circlePositionX = prevX = windowWidth / 2.3;
  circlePositionY = prevY = windowHeight / 5.7;
}

function draw() {
  // background
  let x1, y, x2;
  x1 = Math.random() * windowWidth - Math.random() * 500;
  x2 = x1 + Math.random() * windowWidth;
  y = windowHeight * Math.random();

  line(x1, y, x2, y);

  // set line color for next loop
  stroke(randomColor());
  fill(randomColor());
  
  // comet
  push();
  stroke(color('#8e9eab'));
  fill(color('#8e9eab')); 
  
  // erase the prev circle or it is visible.
  circle(prevX, prevY, circleRadius);
  prevX = circlePositionX;
  prevY = circlePositionY;

  // draw the new circle
  fill(255);
  circle(circlePositionX, circlePositionY, circleRadius);
  circlePositionX = circlePositionX + circleSpeedX;
  circlePositionY = circlePositionY + circleSpeedY;
  if (circlePositionX < circleRadius || circlePositionX > windowWidth - circleRadius) {
    circleSpeedX = -circleSpeedX;
  }
  if (circlePositionY < circleRadius || circlePositionY > windowHeight - circleRadius) {
    circleSpeedY = -circleSpeedY;
  }
  pop();
}

function randomColor() {
  const randomIndex = Math.floor(Math.random() * strokeColors.length);
  return strokeColors[randomIndex];
}
