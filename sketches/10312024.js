let particleTexture;
let face;
let eyeColor = '#FFF01F';
let bgColor = '#000000';
let pumpkinColor = '#FF8C00';
let darkPumpkin = '#CC5500';

function preload() {
  particleTexture = loadImage('/textures/particle.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(color(bgColor));

  face = new ParticleSystem(0, createVector(width / 2, height), width / 1.8, color(pumpkinColor), color(darkPumpkin));
}

function draw() {
  translate(-width / 2, -height / 2);
  background(color(bgColor));


  let wind = createVector(0, -0.2);
  face.applyForce(wind);
  face.run();
  for (let i = 0; i < 30; i += 1) {
    face.addParticle();
  }
  drawJackOLantern(width / 2, height / 3 + height * 0.2, color(bgColor));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawJackOLantern(x, y, faceColor) {
  w = width / 3;
  h = width / 3;
  // Draw the face
  fill(faceColor);

  // Left eye
  beginShape();
    vertex(x - w * 0.4, y - h * 0.4);
    quadraticVertex(x - w * 0.2, y - h * 0.1, x - w * 0.1, y - h * 0.3);
    vertex(x - w * 0.1, y - h * 0.3);
  endShape(CLOSE);

  // Right eye
  beginShape();
    vertex(x + w * 0.4, y - h * 0.4);
    quadraticVertex(x + w * 0.2, y - h * 0.1, x + w * 0.1, y - h * 0.3);
    vertex(x + w * 0.1, y - h * 0.3);
  endShape(CLOSE);

  // Nose
  beginShape();
    vertex(x, y);
    vertex(x + w * 0.05, y - h * 0.1);
    vertex(x - w * 0.05, y - h * 0.1);
  endShape(CLOSE);

  // Mouth
  beginShape();
    vertex(x - w * 0.3, y + h * 0.2);
    vertex(x - w * 0.2, y + h * 0.25);
    vertex(x - w * 0.1, y + h * 0.2);
    vertex(x, y + h * 0.25);
    vertex(x + w * 0.1, y + h * 0.2);
    vertex(x + w * 0.2, y + h * 0.25);
    vertex(x + w * 0.3, y + h * 0.2);

    vertex(x + w * 0.25, y + h * 0.5);
    vertex(x + w * 0.15, y + h * 0.55);
    vertex(x + w * 0.05, y + h * 0.5);
    vertex(x, y + h * 0.55);
    vertex(x - w * 0.05, y + h * 0.5);
    vertex(x - w * 0.15, y + h * 0.55);
    vertex(x - w * 0.25, y + h * 0.5);
  endShape(CLOSE);

  drawEye(x - w * 0.2, y - h * 0.25, w * 0.1, color(eyeColor));
  drawEye(x + w * 0.2, y - h * 0.25, w * 0.1, color(eyeColor));
}

function drawSkull(x, y, w, h, skullColor1, skullColor2) {
  beginShape(TESS);
    // Top of the skull
    fill(skullColor1);
    stroke(skullColor1);
    vertex(x, y - h * 0.5);
    fill(skullColor2); 
    stroke(skullColor2);
    bezierVertex(
      x + w * 0.4, y - h * 0.5,  // Control point for top-right curve
      x + w * 0.5, y,            // Control point for side-right curve
      x + w * 0.4, y + h * 0.3   // Right cheekbone start
    );
    fill(skullColor1);
    stroke(skullColor1);
    // Right cheekbone
    bezierVertex(
      x + w * 0.1, y + h * 0.5,  // Control point for right cheekbone
      x + w * 0.2, y + h * 0.8,  // Control point for jaw curve
      x, y + h                   // Center of the jaw
    );
    fill(skullColor2); 
    stroke(skullColor2);
    // Left cheekbone (reflected)
    bezierVertex(
      x - w * 0.2, y + h * 0.8,  // Control point for jaw curve (left)
      x - w * 0.1, y + h * 0.5,  // Control point for left cheekbone
      x - w * 0.4, y + h * 0.3   // Left cheekbone start
    );
    fill(skullColor1);
    stroke(skullColor1);
    // Left side of the skull (reflected)
    bezierVertex(
      x - w * 0.5, y,            // Control point for side-left curve
      x - w * 0.4, y - h * 0.5,  // Control point for top-left curve
      x, y - h * 0.5             // Back to the top
    );
  endShape(CLOSE);

  // Eye sockets
  fill(0);
  ellipse(x - w * 0.2, y, w * 0.2, h * 0.2);
  ellipse(x + w * 0.2, y, w * 0.2, h * 0.2);

  // Nose hole
  beginShape();
    vertex(x, y + h * 0.2);
    vertex(x + w * 0.05, y + h * 0.5);
    vertex(x, y + h * 0.55);
    vertex(x - w * 0.05, y + h * 0.5);
  endShape(CLOSE);

  drawEye(x - w * 0.2, y, w * 0.2, color(eyeColor));
  drawEye(x + w * 0.2, y, w * 0.2, color(eyeColor));
}

function drawEye(x, y, w, pupilColor) {
  push();
  noStroke();
  tint(pupilColor);
  scale(2, 2);
  texture(particleTexture);
  circle(x / 2, y / 2, w);
  pop();
}

class ParticleSystem {
  constructor(particleCount, origin, originWidth, color1, color2, outlineColor = color('rgba(0, 0, 0, 0)')) {
    this.particles = [];
    this.width = originWidth;
    this.height = originWidth;
    this.color1 = color1;
    this.color2 = color2;
    this.outlineColor = outlineColor;

    this.origin = origin.copy();
    for (let i = 0; i < particleCount; ++i) {
      this.particles.push(new Particle(this.origin, this.width, this.color1, this.color2, this.outlineColor));
    }
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i -= 1) {
      let particle = this.particles[i];
      particle.run();

      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
    push();
  }

  applyForce(dir) {
    for (let particle of this.particles) {
      particle.applyForce(dir);
    }
  }

  addParticle() {
    this.particles.push(new Particle(this.origin, this.width / 5, this.color1, this.color2, this.outlineColor));
  }
}

class Particle {
  constructor(pos, spread, color1, color2, outlineColor = color('rgba(0, 0, 0, 0)')) {
    this.loc = pos.copy();
    this.loc.x += randomGaussian() * spread;
    this.weight = spread

    let xSpeed = randomGaussian() * 0.3;
    let ySpeed = randomGaussian() * 0.3 - 1.0;

    this.velocity = createVector(xSpeed, ySpeed);
    this.acceleration = createVector();
    this.lifespan = 100.0;
    this.color = color1;
    this.bgColor = color2;
    this.outlineColor = outlineColor
  }

  run() {
    this.update();
    this.render();
  }

  render() {
    const interpretadColor = lerpColor(this.color, this.bgColor, map(this.lifespan, 0.0, 100.0, 1, 0));
    stroke(this.outlineColor);
    texture(particleTexture);
    tint(interpretadColor);
    circle(this.loc.x, this.loc.y, this.weight);
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  isDead() {
    return this.lifespan <= 0.0;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.loc.add(this.velocity);
    this.lifespan -= 1;
    this.acceleration.mult(0);
  }
}