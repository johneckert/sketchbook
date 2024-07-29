let start = {x: 0, y: 0}; // starting point
let iterations = 50; //how many loops
let scale = 3; // width modifier

// let angle = 30; // general angle of shape
let density = 5; // tightness of pattern
// let pizzaz = 100; // random seed -1 to 1?
let colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]; //Array of colors of any length
let backgroundColors = ["#EEDDEE", "#FFFFFF"]; //Array of colors of any length
let backgroundColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(10);
  stroke(0);
  backgroundColor = color(random(backgroundColors));
}

function draw() {
  background(backgroundColor); 
  if (frameCount > iterations) {
    noLoop();
  } else {
    showCenter();
  }

  flower();

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let showCenter = () => {
  stroke(0);
  strokeWeight(1);
  circle(width / 2, height / 2, 10);
  strokeWeight(0.5);
  line(-width, height / 2, width, height / 2);
  line(width / 2, -height, width / 2, height);
  noStroke();
};

let tube = () => {
  push(); //cental tube.
    let t1 = map(sin(frameCount / pizzaz), -1, 1, 0.0, 1.0)
    stroke(lerpColor(color(backgroundColor), color(random(colors))), t1);
    strokeWeight(0.5);
    let v = createVector(cos(frameCount) * 100, sin(angle) * 100);
    line(start.x, start.y, v.x, v.y);
  pop();
}

let flower = () => {
  push(); // spirals
  strokeWeight(1);
  translate(width / 2, height / 2);
  translate(start.x, start.y);
  let t2 = map(cos(frameCount), -1, 1, 0.0, 1.0)
  // stroke(lerpColor(color(backgroundColor), color(random(colors))), t2);
  // fill(lerpColor(color(random(colors)), color(random(colors))), t2);
  stroke(colors[0]);
  fill(colors[1]);
  beginShape();
  for (let i = 0; i < iterations; i++) {
    let x = (cos(i * density) * i) * scale;
    let y = (sin(i * density) * i) * scale;
    vertex(x, y);
    console.log(x, y, t2);
  }
  endShape(CLOSE);
pop();
}