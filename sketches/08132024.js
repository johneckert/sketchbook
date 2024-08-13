let waves = [];
let waves2 = [];
let centerWave = [];
let centerColor, midColor, outerColor;

function setup() {
  createCanvas(windowWidth, windowHeight);

  centerColor = color('#19547b');
  centerWave.push(new Wave(0, height / 25, width / 2, 0, -1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 2, width, 1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 3, 0, -1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 3, width, 1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 4, 0, -1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 4, width, 1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 2.5, 0, -1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 2.5, width, 1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 3.5, 0, -1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 3.5, width, 1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 4.5, 0, -1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 4.5, width, 1, centerColor));
  
  centerWave.push(new Wave(0, height / 25, width / 2, 0, 1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 2, width, -1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 3, 0, 1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 3, width, -1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 4, 0, 1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 4, width, -1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 2.5, 0, 1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 2.5, width, -1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 3.5, 0, 1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 3.5, width, -1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 4.5, 0, 1, centerColor));
  centerWave.push(new Wave(0, height / 25, width / 4.5, width, -1, centerColor));


  midColor = color('#EB5757');
  waves.push(new Wave(0, height / 10, width / 2, width / 4, -1, midColor));
  waves.push(new Wave(0, height / 10, width / 2, width / 6, -1, midColor));
  waves.push(new Wave(0, height / 10, width / 2, width / 8, -1, midColor));
  waves.push(new Wave(0, height / 10, width / 2, width / 10, -1, midColor));


  outerColor = color('#ffd89b');
  outerColor.setAlpha(50);
  waves2.push(new Wave(0, height, width / 5, 0, 1, outerColor));
  waves2.push(new Wave(0, height, width / 5, width * 0.8, 1, outerColor)); 
}

function draw() {
  // noLoop();
  strokeWeight(1);
  backgroundGradientThreeColor(color('#19547b'), color('#ffd89b'), color('#19547b'));
  translate(width/2, height/2);

  push();
  strokeWeight(2);
  waves2.forEach(wave => {
    wave.display();
    wave.updatePeriod();
  });
  pop();

  centerWave.forEach(wave => {
    wave.display()
    wave.updatePhase();
  });

  waves.forEach(wave => {
    wave.display();
    wave.updatePhase();
  });
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Wave {
  constructor(y, amplitude, period, phase, direction, col) {
    this.y = y;
    this.amplitude = amplitude;
    this.period = period;
    this.phase = phase;
    this.direction = direction;
    this.col = col;
  }
  updateAmplitude() {
    this.amplitude = map(sin(frameCount / 50), -1, 1, 0.5 * height, 1.5 * height);
  }

  updatePhase() {
    this.phase += 0.07 * this.direction;
  }

  updatePeriod() {
    this.period = map(cos(frameCount / 10), -1, 1, 0, 3);
    console.log(this.period);
  }

  display() {
    noFill();
    push();
  
    beginShape();
    for (let x = -width/2; x < width/2; x+=10) {
      let y = this.y + this.amplitude * sin(TWO_PI * x / this.period + this.phase);
      stroke(this.col);
      vertex(x, y);
    }
    endShape();
    pop();
  }
}

function backgroundGradientThreeColor(c1, c2, c3) {
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