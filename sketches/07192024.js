let i, noiseRect,noiseRect2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  angleMode(DEGREES); 
  i = 0;
  fill(color('#642B73'));
  rect(0, 0, width, height);
  noiseRect = new NoiseGradient(0, 0, width, height + 1000, 0.01, 0.01, [color('#f80759'), color('#F0CB35')], [color('#bc4e9c'), color('#C02425')], 3, 'y');
  noiseRect2 = new NoiseGradient(0, 0, width, height + 1000, 0.01, 0.01, [color('#3c1053'), color('#ad5389')], [color('#3c1053'), color('#ad5389')], 0.5, 'y');
}

function draw() {
  // nackground(0);
  noLoop();
  noStroke();
  fill(color('#642B73'));
  rect(0, 0, width, height);
  noiseRect.draw();
  noiseRect2.draw();
}

function windowResized() {
  background(bgColor);
  resizeCanvas(windowWidth, windowHeight);
}

class NoiseGradient {
  constructor(xStart, yStart, widthVal, heightVal, noiseScaleX, noiseScaleY, [color1, color2], [color3, color4], dotSize, direction) {
    this.x = xStart;
    this.y = yStart;
    this.width = xStart + widthVal;
    this.height = yStart + heightVal;
    this.colorRange1 = [color1 || color(255,0,0), color2 || color(100,0,0)];
    this.colorRange2 = [color3 || color(0,0,255), color4 || color(0,0,100)];
    this.direction = direction === 'x' || direction === 'y' ? direction : 'x';
    this.dotSize = dotSize || 1;
    this.noiseScale = { x: noiseScaleX, y: noiseScaleY };
  }

  draw() {
    for (let y = this.y; y < this.height; y++) {
      for (let x = this.x; x < this.width; x++) {
        let n = noise(x * this.noiseScale.x, y * this.noiseScale.y);
        if (random(1) < n * 0.5) {
          let startColor = lerpColor(this.colorRange1[0], this.colorRange1[1], n);
        let endColor = lerpColor(this.colorRange2[0], this.colorRange2[1], n);
        let colorFade = this.direction === 'x' ? x / this.width : y / this.height;
        let c = lerpColor(startColor, endColor, colorFade);
          let weight = random(0.2 + y / 500  - n / 10 , 0.3 + y / 100  - n / 10 - random(5)) * this.dotSize;
          strokeWeight(weight);
          stroke(c);
          let xVal = x + random(2, -2)
          let yVal = y + random(3, - 3)
          point(xVal, yVal);
        }
      }
    }
  }

  static() {
    noLoop();
  }

  animate() {
    loop();
  }
}
