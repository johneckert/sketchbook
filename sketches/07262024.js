let blobs = [];
let colors = ['#AAF400', '#0f9b0f', '#00DDF2', '#CC22F2'];
let qurterWidth, halfWidth, quarterHeight, halfHeight;

function setup() {
  describe('random multicolored blobs that move around the screen.');
  createCanvas(windowWidth, windowHeight);
  frameRate(15);
  quarterWidth = width / 4;
  halfWidth = width / 2;
  quarterHeight = height / 4;
  halfHeight = height / 2;
  angleMode(DEGREES);
  colors.forEach(hexCode => {
    let i = random(-200, 200);
    blobs.push(
      new Bloob (
        random(width / 8, width / 4) + i, 
        random(0, height / 6) + i , 
        random(width / 8 * 6, width /4 * 3) + i, 
        random(halfHeight, height / 6 * 5) + i, 
        color(hexCode)
      )
    )
  });
 
  blobs.forEach(blob => {
    blob.generate();
  });
}

function draw() {
  backgroundGradient(color('#434343'), color('#000000'), color('#434343'));
  push();
    strokeWeight(1);
    blobs.forEach(blob => {
      blob.update();
    });
  pop();
}

class Bloob {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    
    this.anchorPoints = [];
    this.points = [];
    this.numPoints = 100;
    this.motion = 100;
  }

  generate() {
    this.anchorPoints.push(createVector(this.x, this.y));
    this.anchorPoints.push(createVector(this.w, this.y));
    this.anchorPoints.push(createVector(this.w, this.h));
    this.anchorPoints.push(createVector(this.x, this.h));
    for (let i = 0; i < this.numPoints; i++) {
      let quarter = this.numPoints / 4;
      if (i < quarter) {
        let x = random(0, width / 2);
        let y = random(0, height / 2);
        this.points.push(createVector(x, y));
      } else if (i < quarter * 2) {
        let x = random(width / 2, width);
        let y = random(0, height / 2);
        this.points.push(createVector(x, y));
      }
      else if (i < quarter * 3) {
        let x = random(0, width / 2);
        let y = random(height / 2, height);
        this.points.push(createVector(x, y));
      }
      else {
        let x = random(width / 2, width);
        let y = random(height / 2, height);
        this.points.push(createVector(x, y));
      }
    }
    this.draw();
  }

  update() {
    stroke(this.color);
    strokeWeight(1);
    this.points.forEach(point => {
      if (random() > 0.3) {
        point.x += random(-this.motion, this.motion);
        point.y += random(-this.motion, this.motion);
      }
    });

    this.anchorPoints.forEach(point => {
      if (random() > 0.3) {
        point.x += random(-this.motion, this.motion);
        point.y += random(-this.motion, this.motion);
      }
    });
    this.draw();
  }

  draw() {
    push();
    this.color.setAlpha(255);
    curveTightness(0.1);
    stroke(this.color);
    strokeWeight(1);
    noFill();
    beginShape();
    this.anchorPoints.concat(this.points).forEach(point => {
      curveVertex(point.x, point.y);
    });
    endShape(CLOSE);
    pop();
  }
}

function backgroundGradient(c1, c2, c3) {
  for(let y=0; y<height; y++){
    if (y < height / 2) {
      n = map(y, 0 ,height / 2, 0, 1);
      let newc = lerpColor(c1,c2,n);
      stroke(newc);
    } else {
      n = map(y, height / 2, height, 0, 1);
      let newc = lerpColor(c2,c3,n);
      stroke(newc);
    }
    line(0,y,width, y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

