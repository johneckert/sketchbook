// #Genuary2025 #Genuary17
// https://genuary.art/
// Prompt: What if PI equals 4.

const sketch = (p5) => {
  let customPI;
  let minPI = 3.00;
  let maxPI = 4.00;
  let line;
  let colors;
  let lineColor;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    colors = [p5.color('#1CB5E0'), p5.color('#000046')];
    lineColor = p5.color("#B2FEFA");
    radialGradient(colors[0], colors[1]);
    line = new RadialLine(p5.width / 2, p5.height / 2, 0, 100, colors[1]);
    customPI = p5.PI;
  };

  p5.draw = () => {
    radialGradient(colors[0], colors[1]);
    customPI = p5.map(p5.sin(p5.frameCount * 0.001), -1, 1, minPI, maxPI);
    line.drawCircle(p5.width / 2, p5.height / 2, p5.height, 10, p5.color(lineColor));
    p5.push();
    p5.fill(colors[0]);
    p5.stroke(lineColor);
    p5.pop();
    circles(4);
    p5.fill(255);
    p5.textSize(14);
    p5.text(`𝛑 = ${customPI}`, p5.width - 200, p5.height - 25);
  };

  function circles(r) {
    for (let i = 0; i < 360 * r; i += customPI * 8.5) {
      p5.push();
      p5.noFill();
      p5.stroke(p5.lerpColor(lineColor, colors[0], p5.map(customPI, minPI, maxPI, 0, 1.0)));
      p5.translate(p5.width / 2, p5.height / 2);
      p5.rotate(p5.frameCount * 0.01 + (i / r));
      nuCircle(0, 0, 100);
      nuCircle(0, 0, 200);
      nuCircle(0, 0, 300);
      nuCircle(0, 0, 400);
      p5.pop();
    }
  }

  class RadialLine {
    constructor(x, y, angle, length, color) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.length = length;
      this.color = color;
    }
  
    draw() {
      p5.push();
      p5.strokeWeight(0.5);
      p5.stroke(this.color);
      p5.line(this.x, this.y, this.x + p5.cos(this.angle) * this.length, this.y + p5.sin(this.angle) * this.length);
      p5.pop();
    }
  
    drawCircle(centerX, centerY, radius, radialDensity) {
      for (let i = 0; i < 360 * radialDensity; i += customPI * 8.5) {
        let line = new RadialLine(centerX, centerY, i / radialDensity, radius, this.color);
        line.draw();
      }
    }
  }

  function nuCircle(x, y, radius) {
    p5.push();
    p5.translate(x, y);
    p5.beginShape();
    for (let i = 0; i < customPI * 2; i += customPI / 100) {
      p5.vertex(radius * p5.cos(i), radius * p5.sin(i));
    }
    p5.endShape(p5.CLOSE);
    p5.pop();
  }

  function radialGradient(c1, c2) {
    p5.push();
    p5.noFill();
    for (let x = 0; x < p5.width * 1.5; x++) {
      let inter = p5.map(x, 0, p5.width, 0, 1.0);
      let c = p5.lerpColor(c1, c2, inter);
      p5.strokeWeight(1);
      p5.stroke(c);
      nuCircle(p5.width / 2, p5.height / 2, x);
    }
    p5.pop();
  }
};

const myP5 = new p5(sketch);
