let maze;

function setup() {
  noLoop();
  createCanvas(windowWidth, windowHeight);
  maze = new createMaze(15, color('#FF0080'), color('#12c2e9'), color('#ffff1c'), color('#6be585'), 1.5);
}

function draw() {
  radialGradient(color(75), color(125));
  maze.drawMaze();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class createMaze {
  constructor(resolution, colorX1, colorX2, colorY1, colorY2, strokeWeight=0.5) {
    this.res = resolution;
    this.colorX1 = colorX1;
    this.colorX2 = colorX2;
    this.colorY1 = colorY1;
    this.colorY2 = colorY2;
    this.strokeWeight = strokeWeight;
  }

  setPenLine(x, y) {
    let colorX = lerpColor(this.colorX1, this.colorX2, map(x, 0, width, 0, 1));
    let colorY = lerpColor(this.colorY1, this.colorY2, map(y, 0, height, 0, 1));
    stroke(lerpColor(colorX, colorY, 0.5));
    strokeWeight(this.strokeWeight);
    noFill();
  }

  setPenDot(x, y) {
    let colorX = lerpColor(this.colorX1, this.colorX2, map(x, 0, width, 0, 1));
    let colorY = lerpColor(this.colorY1, this.colorY2, map(y, 0, height, 0, 1));
    fill(lerpColor(colorX, colorY, 0.5));
    noStroke();
  }

  mark1(x, y) {
    line(x, y, x + this.res, y);
  }

  mark2(x, y) {
    line(x, y + this.res, x + this.res, y + this.res);
  }

  mark3(x, y) {
    line(x, y, x, y  + this.res);
  }

  mark4(x, y) {
    line(x  + this.res, y, x + this.res, y + this.res);
  }

  mark5(x, y) {
    line(x, y + this.res / 2, x + this.res, y + this.res / 2);
  }

  mark6(x, y) {
    line(x + this.res / 2, y, x + this.res / 2, y + this.res);
  }

  mark7(x, y) {
    circle(x + this.res / 2, y + this.res / 2, this.res / 4);
  }

  randomMark(x, y) {
    const r = floor(random(7));
    if (r < 6) {
      this.setPenLine(x, y);
    } else {
      this.setPenDot(x, y);
    }
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
      case 6:
        this.mark7(x, y);
        break;
      case 7:
        this.mark8(x, y);
        break;
      case 8:
        this.mark9(x, y);
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
