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