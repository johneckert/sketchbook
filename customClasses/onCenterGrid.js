class OnCenterGrid {
  constructor(spacing, rotationSpeed, startcolor, endcolor) {
    this.spacing = spacing;
    this.rotationSpeed = rotationSpeed;
    this.startcolor = startcolor;
    this.endcolor = endcolor;
  }

  draw() {
    translate(CENTER_X, CENTER_Y);
    rotate(sin(frameCount) * this.rotationSpeed);
    for (let i = 0; i < windowWidth * 2; i += this.spacing) {
      let colorInc = (windowWidth / 2 * (1 + sin(PI / this.spacing * i))) * 0.00001;
      stroke(lerpColor(this.startcolor, this.endcolor, colorInc));
      line(i - windowWidth, -windowHeight, i - windowWidth, windowHeight * 2);
      line(-windowWidth, i - windowWidth, windowWidth * 2, i - windowWidth);
    }
  }
}