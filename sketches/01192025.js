// #Genuary2025 #Genuary19
// https://genuary.art/
// Prompt: OP Art.

let checkerBoard;

function setup() {
  createCanvas(windowWidth, windowHeight);
  checkerBoard = new CheckerBoard(createVector(width * 0.6, 0), createVector(width * 0.6, height), 50);
}

function draw() {
  background(255);
  // checkerBoard.moveLine();
  checkerBoard.createBoxes();
  checkerBoard.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class CheckerBoard {
  constructor(lineStart, lineEnd, baseBoxSize) {
    this.quads = [];
    this.lineStart = lineStart;
    this.lineEnd = lineEnd;
    this.baseBoxSize = baseBoxSize;
    this.colors = [color(0), color(255)];
    this.direction = 1;
  }

  moveLine() {
    let easingRange = width * 0.1;
  
    let proximityToMax = (width * 0.66 - this.lineStart.x) / easingRange;
    let proximityToMin = (this.lineStart.x - width * 0.33) / easingRange;
  
    // Adjust speed based on proximity
    if (this.direction > 0 && this.lineStart.x >= width * 0.66 - easingRange) {
      let easedSpeed = constrain(proximityToMax, 0.1, 1);
      this.lineStart.x += this.direction * easedSpeed;
      this.lineEnd.x += this.direction * easedSpeed;
    } else if (this.direction < 0 && this.lineStart.x <= width * 0.33 + easingRange) {
      let easedSpeed = constrain(proximityToMin, 0.1, 1);
      this.lineStart.x += this.direction * easedSpeed;
      this.lineEnd.x += this.direction * easedSpeed;
    } else {
      this.lineStart.x += 1 * this.direction;
      this.lineEnd.x += 1 * this.direction;
    }
  
    if (this.lineStart.x >= width * 0.66 || this.lineStart.x <= width * 0.33) {
      this.direction *= -1;
    }
  }
  

  setColor(colIndex, rowIndex) {
    let colorIndex;
    let shouldAlternate = rowIndex % 2 === 1;
    if (colIndex % 2 === 0) {
      colorIndex = shouldAlternate ? 0 : 1;
    } else {
      colorIndex = shouldAlternate ? 1 : 0;
    }
    return this.colors[colorIndex];
  }

  createBoxes() {
    this.quads = []; 
    let col = 0;
    for (let y = 0; y < height; y += this.baseBoxSize) {
      let row = 0;
      for (let x = 0; x < width; ) {
        let distanceFromLine = this.pointLineDistance(createVector(x, y));
        let boxWidth = this.dynamicBoxWidth(distanceFromLine);

        const topLeft = createVector(x, y);
        const topRight = createVector(x + boxWidth, y);
        const bottomRight = createVector(x + boxWidth, y + this.baseBoxSize);
        const bottomLeft = createVector(x, y + this.baseBoxSize);

        this.quads.push(
          new Quad(
            [topLeft, topRight, bottomRight, bottomLeft],
            this.setColor(col, row)
          )
        );

        x += boxWidth;
        row++;
      }
      col++;
    }
  }

  dynamicBoxWidth(distance) {
    // Apply a non-linear transformation to distance
    let minWidth = this.baseBoxSize * 0.02;
    let maxWidth = this.baseBoxSize * 1;

    let t = distance / (width / 2);
    let easedT = t * t * (3 - 2 * t); // Smoothstep function
    let scaledWidth = lerp(minWidth, maxWidth, easedT);

    return constrain(scaledWidth, minWidth, maxWidth);
  }

  pointLineDistance(point) {
    // Calculate the perpendicular distance from a point to the line
    let a = this.lineEnd.y - this.lineStart.y;
    let b = this.lineStart.x - this.lineEnd.x;
    let c = this.lineEnd.x * this.lineStart.y - this.lineStart.x * this.lineEnd.y;
    return abs(a * point.x + b * point.y + c) / sqrt(a * a + b * b);
  }

  display() {
    for (let quad of this.quads) {
      quad.display();
    }
  }
}


class Quad {
  constructor(points, color) {
    this.points = [...points];
    this.color = color;
  }

  display() {
    fill(this.color);
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      vertex(this.points[i].x, this.points[i].y);
    }
    endShape(CLOSE);
  }
}