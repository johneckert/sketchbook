// #Genuary2025 #Genuary28
// https://genuary.art/
// Prompt: Infinite Scroll.

let cam;
let zoomFactor = 1;
let scrollPosition = 0;
let maxScrollPositionReached = 0;
let sceneId = 0;
let sceneShift = 1000;
let nextScene = sceneShift;
let transition = false;
const BASE_SIZE = 1;
const scenes = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  setCamera(cam);
}

function draw() {
  zoomFactor = scrollPosition <= 0 ? 1 : pow(1.05, scrollPosition / 100);
  radialGradient(color(0), color(100));

  // Add shapes for next scene OR if no scene exists
  if (transition || (scrollPosition === 0 && scenes.length === 0)) {
    generateScene(sceneId);
    transition = false;
  }

  // Animation
  scenes.forEach((scene, i) => {
    push();
    let direction = i % 2 === 0 ? 1 : -1;
    rotateZ(frameCount * 0.025 * direction);
    scene.drawShapes();
    pop();
  });
}

function generateScene(id) {
  let currentScene = new Scene(id);
    let numberOfSides = 5;
    currentScene.addShape(new Shape(BASE_SIZE / zoomFactor, numberOfSides, color(255), 1));
    scenes.push(currentScene);
}

function mouseWheel(event) {
  scrollPosition += event.delta;
  if (scrollPosition >= maxScrollPositionReached) {
    // keep track of max position reached so we can't go backward
    maxScrollPositionReached = scrollPosition;
  }

  if (scrollPosition >= nextScene && scrollPosition >= maxScrollPositionReached) {
    // increment scene as scroll
    sceneId = nextScene;
    nextScene += sceneShift;
    transition = true;
  }
  return false;
}

class Shape {
  constructor(size, numberOfSides, strokeColor, strokeWeight) {
    this.baseSize = size;
    this.numberOfSides = numberOfSides;
    this.strokeColor = strokeColor;
    this.strokeWeight = strokeWeight;
  }

  draw() {
    push();
    scale(zoomFactor);
    noFill();
    stroke(this.strokeColor);
    strokeWeight(this.strokeWeight);
    torus(this.baseSize, this.baseSize / 2, this.numberOfSides, this.numberOfSides * 3);
    pop();
  }
}

class Scene {
  constructor(name) {
    this.shapes = [];
    this.name = name;
  }

  addShape(shape) {
    this.shapes.push(shape);
  }

  drawShapes() {
    this.shapes.forEach((shape, i) => {
        push();
        rotateZ(i);
        shape.draw();
        pop();
    });
  }
}

function radialGradient(c1, c2) {
  push();
  noFill();
  for(let x=0; x < width * 1.5; x++){
    let inter = map(x, 0, width * 1.5, 0, 1.0);
    let c = lerpColor(c1, c2, inter);
    strokeWeight(1);
    stroke(c);
    circle(0, 0, x);
  }
  pop();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
