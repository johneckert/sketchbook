function drawWave(x, amplitude, horizStretch, VertShift = 0) {
  // f(x) = a * sin(b(x+c)) + d
  let y = amplitude * sin(horizStretch * x) + VertShift;
  point(x, y);
}

function drawSpiral(x, y, iR, i, expansion, rotations, phase = 0) {
  // x,y = center of spiral
  // r = initial radius
  // expansion = distance between turns
  // rotations = number of rotations
  // phase = angle of rotation
  if (i < rotations * 360) {
    let r = iR + expansion * i;
    let x1 = x + r * cos(i + phase);
    let y1 = y + r * sin(i + phase);
    point(x1, y1);
  }
}

function backgroundGradient(c1, c2) {
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
}

function backgroundDisco(xSize, ySize, c1, c2) {
  push();
  for(let y=0; y<height; y += ySize){
    for(let x=0; x<width; x += xSize){
      n = randomGaussian(0.5, 0.5);
      let strokeColor = lerpColor(c1,c2,0.8);
      let fillColor = lerpColor(c1,c2,n);
      stroke(strokeColor);
      strokeWeight(1);
      // noStroke();
      fill(fillColor);
      square(x,y,xSize);
    }
  }
  pop();
}