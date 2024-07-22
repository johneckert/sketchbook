class Spiral {
  // x,y = center of spiral
 // iR = initial radius
 // expansion = distance between turns
 // rotations = number of rotations
 // phase = angle of rotation
 constructor(x, y, iR, frame, expansion, rotations, phase, color1, color2, fade, strokeWeight) {
   this.x = x;
   this.y = y;
   this.iR = iR;
   this.frame = frame * 2;
   this.expansion = expansion;
   this.rotations = rotations;
   this.phase = phase;
   this.color1 = color1;
   this.color2 = color2;
   this.fade = fade;
   this.strokeWeight = strokeWeight;
 }

 update() {
   this.frame += 2;
   this.fade = map(this.frame - 2, 0, width, 0.0, 1.0);
 }

 drawSpiral(phase = this.phase) {
   if (this.frame < this.rotations * 360) {
     let r = this.iR + this.expansion * this.frame;
     let x1 = this.x + r * cos(this.frame + phase);
     let y1 = this.y + r * sin(this.frame + phase);
     point(x1, y1);
   }
 }

 drawHelix() {
   lineColor = lerpColor(this.color1, this.color2, this.fade);
   stroke(lineColor);
   strokeWeight(this.strokeWeight);
   this.drawSpiral();
   this.drawSpiral(this.phase + 180);
 }
}

function windowResized() {
 resizeCanvas(windowWidth, windowHeight);
}