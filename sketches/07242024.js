let gamesOfLife = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frameRate(10);
  gamesOfLife.push(new TriangleMatrix(width / 30, height / 30, color('#FF8C00')));
  gamesOfLife.push(new TriangleMatrix(width / 30, height / 30, color('#FF0080')));
  gamesOfLife.push(new TriangleMatrix(width / 30, height / 30, color('#38ef7d')));
  gamesOfLife.push(new TriangleMatrix(width / 30, height / 30, color('#0575E6')));
  gamesOfLife.forEach(gameOfLife => {
    gameOfLife.createBoard();
  });
}

function draw() {
  console.log(gamesOfLife.length);
  backgroundGradient(color('#232526'), color('#414345'), color('#232526'));
  push();
  gamesOfLife.forEach(gameOfLife => {
    gameOfLife.generation();
    gameOfLife.draw();
  });
  pop();
}

class Cell {
  constructor(point1, point2, point3, aliveColor, alive) {
    // point = [x, y]
    this.point1 = { x: point1[0], y: point1[1] };
    this.point2 = { x: point2[0], y: point2[1] };
    this.point3 = { x: point3[0], y: point3[1] };
    this.aliveColor = aliveColor;
    this.alive = alive;
  }

  updateAlive(alive) {
    this.alive = alive;
  }
  
  draw() {
    push();
    fill(this.aliveColor);
    if (!this.alive) {
      noFill();
    }
    triangle(this.point1.x, this.point1.y, this.point2.x, this.point2.y, this.point3.x, this.point3.y);
    pop();
  }
}

class TriangleMatrix {
  constructor(xSize, ySize, aliveColor) {
    this.xSize = xSize;
    this.ySize = ySize;
    this.aliveColor = aliveColor;
    this.cells = [];
    this.columnIndex = 0;
    this.rowIndex = 0;
  }

  createBoard() {
    let col = 0;
    let row = 0;

    for (let y = 0; y < height; y += this.ySize) {
      this.cells[col] = [];
      for (let x = 0; x < width * 2; x += this.xSize / 2) {
        if (row % 2 == 0) {
          if (col % 2 == 0) {
            this.cells[col].push(new Cell([x, y], [x + this.xSize, y], [x + this.xSize / 2, y + this.ySize], this.aliveColor, random([true, false])));
          } else {
            this.cells[col].push(new Cell([x + this.xSize / 2, y], [x, y + this.ySize], [x + this.xSize, y + this.ySize], this.aliveColor, random([true, false])));
          }
        } else {
          if (col % 2 == 0) {
            this.cells[col].push(new Cell([x + this.xSize / 2, y], [x, y + this.ySize], [x + this.xSize, y + this.ySize], this.aliveColor, random([true, false])));
          } else {
            this.cells[col].push(new Cell([x, y], [x + this.xSize, y], [x + this.xSize / 2, y + this.ySize], this.aliveColor, random([true, false])));
          }
        }
        row += 1;
      }
      col += 1;
      row = 0;
    }
    this.columnIndex = col;
    this.rowIndex = row;
  }

  // Rules of Life
  // 1. Any live cell with fewer than two live neighbours dies
  // 2. Any live cell with more than three live neighbours dies
  // 3. Any live cell with two or three live neighbours lives on to the next generation
  // 4. Any dead cell with exactly three live neighbours becomes a live cell

  generation() {
    let nextCells = this.cells.map(col => col.map(cell => new Cell(
      [cell.point1.x, cell.point1.y], 
      [cell.point2.x, cell.point2.y], 
      [cell.point3.x, cell.point3.y], 
      cell.aliveColor, 
      cell.deadColor, 
      cell.alive
    )));

    for (let col = 0; col < this.cells.length; col++) {
      for (let row = 0; row < this.cells[col].length; row++) {
        let neighbors = this.countNeighbors(col, row);
        let currentCell = this.cells[col][row];

        if (currentCell.alive) {
          if (neighbors < 2 || neighbors > 3) {
            nextCells[col][row].updateAlive(false);
          } else {
            nextCells[col][row].updateAlive(true);
          }
        } else {
          if (neighbors === 3) {
            nextCells[col][row].updateAlive(true);
          }
        }
      }
    }
    this.cells = nextCells;
  }

  countNeighbors(col, row) {
    let neighbors = 0;
    let directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    for (let [dx, dy] of directions) {
      let x = (col + dx + this.cells.length) % this.cells.length;
      let y = (row + dy + this.cells[col].length) % this.cells[col].length;
      if (this.cells[x][y].alive) {
        neighbors++;
      }
    }

    return neighbors;
  }

  draw() {
    push();
    translate(-this.xSize, -this.ySize);
    noStroke();
    strokeWeight(1);
    stroke(color('#414345'));
    this.cells.forEach(col => {
      col.forEach(cell => {
        cell.draw();
    })
    });
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

