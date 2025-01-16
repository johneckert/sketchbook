class Block {
  constructor(x, y, orientation) {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.stitches = [];
  }

  create() {
    for (let i = 0; i < 250; i+= 50) {
      for (let j = 0; j < 250; j+= 25) {
        let x = j % 2 === 0 ? this.x + i : this.x + i - 12.5;
        push();
        translate(x, this.y + j);
        if (this.orientation === "vertical") {
          rotate(90);
        }
        this.stitches.push(new Stitch(x, this.y + j));
        pop();
      }
    }
  }

  display() {
    push();
    this.stitches.forEach(stitch => {
      stitch.display();
    });
    pop()
  }
}

class Stitch {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    push();
    noFill()
    translate(this.x, this.y);

    for (let i = 0; i < 50; i+= 1) {
      let c = lerpColor(color(0,0,0,0), color(0,0,0, 50), i / 50);
      stroke(c);
      strokeWeight(0.5);
      line(i, 0, i, 25);
    }
    pop();
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