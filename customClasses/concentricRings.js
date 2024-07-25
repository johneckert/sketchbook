
class ConcentricRings {
  constructor(centerX, centerY, radius, ringDensity, color) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.ringDensity = ringDensity;
    this.color = color;
  }

  move(x, y) {
    this.centerX += x;
    this.centerY += y;
    this.draw();
  }

  draw() {
    for (let i = 0; i < this.radius; i += this.ringDensity) {
      stroke(this.color);
      noFill();
      ellipse(this.centerX, this.centerY, i, i);
    }
  }
}