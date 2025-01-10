// #Genuary2025 #Genuary9
// https://genuary.art/
// Prompt: The textile design patterns of public transport seating.

let cam;
let lightBlue, darkBlue, green, yellow, orange, red, pink, purple;
const sizeMultiplier = 3;
const numSShapes = 10;
const numCShapes = 4;
const numOrbs = 5;
const sShapes = [];
const cShapes = [];
const orbs = [];

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight, WEBGL);
  lightBlue = color(8, 66, 204);
  darkBlue = color(0, 0, 45);
  green = color(36, 254, 65);
  yellow = color(217, 245, 59);
  orange = color(233,78,21);
  red = color(225, 0, 0);
  pink = color(255,0, 150);
  purple = color(142, 45, 226);

  // perspective(PI / 3.0, width / height, -10000, 10000);
  //Default Camera -  x: 0, y: 0, z: 800, centerX: 0, centerY: 0, centerZ: 0, upX: 0, upY: 0, upZ: 1.
  cam = createCamera();
  setCamera(cam);

  // Generate S-shapes
  for (let i = 0; i <= numSShapes; i++) {
    for (let j = 0; j <= numSShapes; j++) {
      for (let k = 0; k <= numSShapes; k++) {
        // Base positions for even distribution in 3D space
        let x = map(i, 0, numSShapes, -width * 5, width * 5);
        let y = map(j, 0, numSShapes, -height * 5, height * 5);
        let z = map(k, 0, numSShapes, -10000, 10000);
        // Add randomness to positions
        x += random(-width / 3, width / 3);
        y += random(-height / 3, height / 3);

        let w = random(1, 100) * sizeMultiplier; // Width
        let h = random(1, 100) * sizeMultiplier; // Height

        // Create an S-shape
        sShapes.push(new SCurve(x, y, z, w, h, lightBlue));
      }
    }
  }

  let cColors = [orange, yellow];
  // Generate C-shapes
  for (let i = 0; i <= numCShapes; i++) {
    for (let j = 0; j <= numCShapes; j++) {
      for (let k = 0; k <= numCShapes; k++) {

        let x = map(i, 0, numCShapes, -width * 5, width * 5);
        let y = map(j, 0, numCShapes, -height * 5, height * 5);
        let z = map(k, 0, numCShapes, -6000, 8000);

        x += random(-width, width);
        y += random(-height, height);

        let w = random(1, 100) * sizeMultiplier + 1; // Width
        let h = random(1, 100) * sizeMultiplier + 1; // Height

        cShapes.push(new CCurve(x, y, z, w, h, cColors[floor(random(0, cColors.length))]));
      }
    }
  }

  let oColors = [pink, green, purple, yellow];
  // Generate orbs
  for (let i = 0; i <= numOrbs; i++) {
    for (let j = 0; j <= numOrbs; j++) {
      for (let k = 0; k <= numOrbs; k++) {

        let x = map(i, 0, numOrbs, -width * 5, width * 5);
        let y = map(j, 0, numOrbs, -height * 5, height * 5);
        let z = map(k, 0, numOrbs, -10000, 6000);

        x += random(-width, width);
        y += random(-height, height);

        let w = random(1, 100) * sizeMultiplier + 5; // Width

        orbs.push(new Orb(x, y, z, w, oColors[floor(random(0, oColors.length))]));
      }
    }
  }
}

function draw() { 
  background(darkBlue);
  ambientLight(100);
  directionalLight(255, 255, 255, 1, 0.5, 0);
  directionalLight(100, 100, 100, -1, 0.5, 0);

  let t = millis() / 2000;

  let x = sin(t) * 6000;
  let z = sin(t * 2) * 6000;

  cam.setPosition(x, 0, z);
  // cam.lookAt(0, 0, 0);


  for (let shape of sShapes) {
    shape.display();
  }

  for (let shape of cShapes) {
    shape.display();
  }

  for (let orb of orbs) {
    orb.display();
  }
}

class SCurve {
  constructor(x, y, z, w, h, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  display() {
    let halfHeight = this.h / 2;
    push();
    noFill();
    strokeWeight(30);
    stroke(this.color);
    beginShape();
    vertex(this.x - this.w, this.y, this.z);
    curveVertex(this.x, this.y, this.z);
    curveVertex(this.x + this.w, this.y + halfHeight * 0.5, this.z);
    vertex(this.x, this.y + halfHeight, this.z);
    vertex(this.x - this.w, this.y + halfHeight * 1.5, this.z);
    curveVertex(this.x - this.w, this.y + this.h, this.z);
    vertex(this.x, this.y + this.h, this.z);
    endShape();
    pop();
  }
}

class CCurve {
  constructor(x, y, z, w, h, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.color = color;
    this.variant = random() > 0.6 ? 1 : -1;
  }

  display() {
    push();
    noFill();
    strokeWeight(30);
    stroke(this.color);
    beginShape();
    vertex(this.x - this.w, this.y, this.z);
    curveVertex(this.x - this.w * 3 * this.variant, this.y - height * 0.5, this.z);
    curveVertex(this.x + this.w * 3 * this.variant, this.y + height * 0.5, this.z);
    curveVertex(this.x + this.w * 3 * this.variant, this.y - height * 0.5, this.z);
    curveVertex(this.x - this.w * 3 * this.variant, this.y - height * 0.5, this.z);
    vertex(this.x, this.y + height, this.z);
    endShape();
    pop();
  }
}

class Orb {
  constructor(x, y, z, w, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.color = color;
  }

  display() {
    push();
    fill(this.color);
    noStroke();
    translate(this.x, this.y, this.z);
    sphere(this.w);
    pop();
  }
}
