let CENTER_X, CENTER_Y, cycle, reverseCycle, angle, speed;
let paper, totemTexture;
let totems = [];

function setup() {
  CENTER_X = windowWidth / 2;
  CENTER_Y = windowHeight / 2;
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight, WEBGL);
  paper = loadImage('textures/paper.jpg');
  totemTexture = loadImage('textures/wavy.jpeg');

  i = 0;
  angle = 0;
  speed = 0.5;

  let objHeight = 9 * (height / 10);
  let orientation = 0;
  for (let i = 0; i < 3; i++) {
    orientation += 45;
    totems.push(new Totem(objHeight, totemTexture, orientation));
  }
}

function draw() {
  background(0);
  noStroke();
  let cycCool = color('#61045F');
  let cycWarm = color('#AA076B');
  //cyc bottom light
  spotLight(cycWarm, -width, height / 2, 200, 0, 0, -1, 180, 1);
  spotLight(cycWarm, width / 3, height / 2, 200, 0, 0, -1, 180, 1);
  spotLight(cycWarm, -width / 3, height / 2, 200, 0, 0, -1, 180, 1);
  spotLight(cycWarm, width, height / 2, 200, 0, 0, -1, 180, 1);
  //cyc top light
  spotLight(cycCool, -width, 3 * (height / 2), 200, 0, 0, -1, 180, 1);
  spotLight(cycCool, width / 3, 3 * (height / 2), 200, 0, 0, -1, 180, 1);
  spotLight(cycCool, -width / 3, 3 * (height / 2), 200, 0, 0, -1, 180, 1);
  spotLight(cycCool, width, 3 * (height / 2), 200, 0, 0, -1, 180, 1);

    //obj light
  let objDarkLight = color('#4CA1AF');
  let objBrightLight = color('#C4E0E5');
  // pointLight(20,50,150, 0, 0, 1000);
  directionalLight(objDarkLight, createVector(width, height, 50));
  directionalLight(objBrightLight, createVector(width, 0, 50));
  directionalLight(objBrightLight, createVector(0, height, 50));
  directionalLight(objBrightLight, createVector(0, height, 50));

  push();
  translate(0,0,-1000);
  texture(paper);
  plane(windowWidth * 3, windowHeight * 3);
  pop();

  translate(0,0,-200);
  totems.forEach((totem, i) => {
    totem.animate(-frameCount, i);
  });


  angle += speed;
}

class Totem {
  constructor(height, texture, orientation) {
    this.height = height;
    this.texture = texture;
    this.orientation = orientation;
  }

  draw() {
  texture(this.texture);
  rotateX(45);
  push();
  rotateX(this.orientation);
  push();
  cylinder(10, this.height);
  pop();
  push();
  rotateZ(90);
  cylinder(10, this.height);
  pop();
  push();
  torus(100, 10);
  torus(50, 10);
  pop();

  push();
  torus(this.height / 2, 10);
  torus(this.height  / 2 - 50, 10);
  pop();
  pop();
  }

  animate(speed, index) {
    if (index === 0) {
    push();
    rotateX(speed);
    this.draw();
    pop();
    } else if (index === 1) {
      push();
      rotateY(speed);
      this.draw();
    } else if (index === 2) {
      push();
      rotateZ(speed);
      this.draw();
    }
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}