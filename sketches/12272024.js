const mazes = [];
const maxDepth = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 1; i < maxDepth; i+=3){
    mazes.push(new createMaze(i, color(map(i, 1, maxDepth, 150, 0)), map(i, 1, maxDepth, 5, 0.25)));
  }
}

function draw() {
  radialGradient(color('#659999'), color('#f4791f'));
  noLoop();
  for (let i = 0; i < mazes.length; i++){
    mazes[i].drawMaze();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class createMaze {
  constructor(resolution, strokeColor=color(0), strokeWeight=0.5) {
    this.res = resolution;
    this.strokeColor = strokeColor;
    this.strokeWeight = strokeWeight;
  }

  setPenLine() {
    strokeWeight(this.strokeWeight);
    stroke(this.strokeColor);
    noFill();
  }

  setPenDot() {
    noStroke();
    fill(this.strokeColor);
  }

  mark1(x, y) {
    this.setPenLine();
    line(x, y, x + this.res, y);
  }

  mark2(x, y) {
    this.setPenLine();
    line(x, y + this.res, x + this.res, y + this.res);
  }

  mark3(x, y) {
    this.setPenLine();
    line(x, y, x, y  + this.res);
  }

  mark4(x, y) {
    this.setPenLine();
    line(x  + this.res, y, x + this.res, y + this.res);
  }

  mark5(x, y) {
    this.setPenLine();
    line(x, y + this.res / 2, x + this.res, y + this.res / 2);
  }

  mark6(x, y) {
    this.setPenLine();
    line(x + this.res / 2, y, x + this.res / 2, y + this.res);
  }

  randomMark(x, y) {
    const r = floor(random(6));
    switch(r) {
      case 0:
        this.mark1(x, y);
        break;
      case 1:
        this.mark2(x, y);
        break;
      case 2:
        this.mark3(x, y);
        break;
      case 3:
        this.mark4(x, y);
        break;
      case 4:
        this.mark5(x, y);
        break;
      case 5:
        this.mark6(x, y);
        break;
    }
  }

  drawMaze() {
    for(let x=0; x < width; x+=this.res){
      for(let y=0; y < height; y+=this.res){
        this.randomMark(x, y);
      }
    }
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
    circle(width/2, height/2, x);
  }
  pop();
}
