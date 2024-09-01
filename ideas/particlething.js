let particleTexture;
let particleSystemRing;

function preload() {
  particleTexture = loadImage('/textures/particle.png');
}

function setup() {
  // Set the canvas size
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);

  // Initialize the particle system
  particleSystemRing = new ParticleSystemRing(width / 2, height / 2, height / 8, 6)

  describe(
    'White circle gives off smoke in the middle of the canvas, with wind force determined by the cursor position.'
  );
}

function draw() {
  background(20);

  particleSystemRing.applyForce();
  particleSystemRing.run();
  // for (let i = 0; i < 2; i += 1) {
    particleSystemRing.addParticle();
  // }
}

class ParticleSystemRing {
  constructor(centerX, centerY, r, dotCount) {
    this.centerX = centerX
    this.centerY = centerY
    this.radius = r
    this.dotCount = dotCount;
    this.particleSystems = []

    for (let i = 0; i < this.dotCount; i++) {
      // Calculate angle for each dot
      let angle = TWO_PI * i / this.dotCount;

      // Calculate x and y positions of each dot
      let x = this.centerX + this.radius * cos(angle);
      let y = this.centerY + this.radius * sin(angle);


      this.particleSystems.push(new ParticleSystem(0, createVector(x,y), particleTexture))

    }
  }

  applyForce() {
    let ctr = createVector(this.centerX, this.centerY)
    this.particleSystems.forEach((ps) => ps.applyForce(ctr));
  }

  run() {
    this.particleSystems.forEach((ps) => ps.run());
  }

  addParticle() {
    this.particleSystems.forEach((ps) => ps.addParticle());
  }
}

class ParticleSystem {
  constructor(particleCount, origin, textureImage) {
    this.particles = [];

    // Make a copy of the input vector
    this.origin = origin.copy();
    this.img = textureImage;
    for (let i = 0; i < particleCount; ++i) {
      this.particles.push(new Particle(this.origin, this.img));
    }
  }

  run() {
    // Loop through and run each particle
    for (let i = this.particles.length - 1; i >= 0; i -= 1) {
      let particle = this.particles[i];
      particle.run();

      // Remove dead particles
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  // Apply force to each particle
  applyForce(ctr) {
    for (let particle of this.particles) {
      particle.applyForce(ctr);
    }
  }

  addParticle() {
    this.particles.push(new Particle(this.origin, this.img));
  }
} // class ParticleSystem

class Particle {
  constructor(pos, imageTexture) {
    this.loc = pos.copy();

    // Calculate the direction from the center to the particle's position
    let direction = p5.Vector.sub(this.loc, createVector(width / 2, height / 2));
    direction.normalize(); // Normalize to get a unit vector

    // Set the velocity to radiate outwards
    this.velocity = direction.mult(random(0.5, 2)); // Adjust magnitude as needed

    this.acceleration = createVector();
    this.lifespan = 100.0;
    this.texture = imageTexture;
    this.color = color(frameCount % 256, 255, 255);
  }

  // Update and draw the particle
  run() {
    this.update();
    this.render();
  }

  // Draw the particle
  render() {
    imageMode(CENTER);
    tint(this.color, this.lifespan);
    image(this.texture, this.loc.x, this.loc.y);
  }

  applyForce(ctr) {
    // Forces can be adjusted here if needed; for outward motion, we might not apply any additional force
  }

  isDead() {
    return this.lifespan <= 0.0;
  }

  // Update the particle's position, velocity, lifespan
  update() {
    this.velocity.add(this.acceleration);
    this.loc.add(this.velocity);
    this.lifespan -= 2.5;

    // Reset acceleration to zero
    this.acceleration.mult(0);
  }
} // class Particle
