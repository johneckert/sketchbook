squiggles = [];
function setup() {
  frameRate(40);
  createCanvas(windowWidth, windowHeight);
  squiggles.push(new squigglyDude(color('#93F9B9'), 5));
  squiggles.push(new squigglyDude(color('#FF0080'), 5));
}

function draw() {
  backgroundGradient(color('#00467F'), color('#A5CC82'));
  squiggles.forEach(squiggle => {
    squiggle.draw();
  });
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function backgroundGradient(c1, c2) {
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
}

class squigglyDude {
  constructor(sColor, sWeight) {
    this.sColor = sColor;
    this.sWeight = sWeight;
    this.vertices = [];
  }

  draw() {
    push();
    noFill();
    strokeWeight(this.sWeight);
    let x = random(0, width);
    let y = random(0, height);
    this.vertices.push({x , y });
    if (this.vertices.length > 7) {
      this.vertices.shift();
    }
    beginShape();
    this.vertices.forEach(vertex => {
      stroke(this.sColor);
      curveVertex(vertex.x, vertex.y);
    });
    endShape();
    pop();
  }
}

