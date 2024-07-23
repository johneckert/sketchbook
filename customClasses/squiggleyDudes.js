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

