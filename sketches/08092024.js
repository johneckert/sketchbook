let t, cUnit, cGap, fr, cIncBez, cIncCirc, mod, wUnit, hUnit;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  wUnit = width / 10;
  hUnit = height / 10;
  t = 0;
  cUnit = 0;
  cGap = 10;
  fr = 30;
  mod = 2;
  cIncBez = 0;
  cIncCirc = 0;
  frameRate(fr);
  backgroundGradient(color('#0F2027'), color('#2C5364'));
  noFill();
  stroke(255);
  strokeWeight(1);
}

function draw() {
  // upper sphere
  push();
  for (let i = 0; i < 200; i++) {
    stroke(lerpColor(color('#3c1053'), color('#ad5389'), map(i, 0, 200, 0, 1)));
    circle(wUnit / 2.5, 0, i);
  }
  pop();

  // lower sphere
  push();
  for (let i = 0; i < 300; i++) {
    stroke(lerpColor(color('#649173'), color('#DBD5A4'), map(i, 0, 300, 0, 1)));
    circle(width - wUnit * 2.5, height, i);
  }
  pop();

  // bezier lower
  push();
  noFill();
  cIncBez = map(sin(t), -1, 1, 0, 1);
  stroke(lerpColor(color('#544a7d'), color('#ffd452'), cIncBez));
  bezier(0, height, wUnit * 3, height + t, width / 2, hUnit + t, width, height / 2 + t);
  t += 1, t %= height, t *= mod;
  pop();

  // bezier upper
  push();
  stroke(lerpColor(color('#e96443'), color('#904e95'), cIncBez));
  bezier(-wUnit, hUnit * 3, wUnit, hUnit + (t / 2), wUnit * 2, hUnit + t, wUnit * 2, -hUnit);
  pop();

  cUnit += cGap;
  if (cUnit >  wUnit * 1.5) {
    cUnit = 0;
    cGap = random(1, 10);
  }
  cIncCirc += 0.01;
  if (cIncCirc > 1) {
    cIncCirc = 0;
  }

  if (t > 300) {
    t = 0
    cIncBez = 0;
    mod = random (1, 5);
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}