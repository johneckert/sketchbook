class RadialLine {
  constructor(x, y, angle, length, color) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = length;
    this.color = color;
  }

  draw() {
    push();
    rotate(sin(frameCount) * this.rotationSpeed / 8);
    stroke(this.color);
    line(this.x, this.y, this.x + cos(this.angle) * this.length, this.y + sin(this.angle) * this.length);
    pop();
  }

  drawCircle(centerX, centerY, radius, radialDensity, color) {
    for (let i = 0; i < 360 * radialDensity; i += PI * 8.5) {
      let line = new RadialLine(centerX, centerY, i / radialDensity, radius, color);
      line.draw();
    }
  }
}