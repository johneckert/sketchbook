function radialGradient(c1, c2) {
  push();
  noFill();
  for(let x=0; x < width * 1.5; x++){
    let inter = map(x, 0, width * 1.5, 0, 1.0);
    let c = lerpColor(c1, c2, inter);
    strokeWeight(1);
    stroke(c);
    circle(width/2, height/2, x);
  }
  pop();
}
