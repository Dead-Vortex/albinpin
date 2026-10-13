//preview: python -m http.server

let albinball;
let gravity = 4;

function setup() {
  createCanvas(windowWidth-100, windowHeight-100);
  background(30);
  albinball = new Albinson(width / 2, height / 2, 40);
}

function draw() {
  background(30);
  albinball.update();   // Calculate physics
  albinball.checkKeys(); // Check for keyboard input
  albinball.display();    // Draw the ball
}

class Albinson {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = r;
    this.topSpeed = 60;
    this.friction = 0.99; 
  }

  // Method to check keyboard input and apply forces
  checkKeys() {
    if (keyIsDown(LEFT_ARROW))  this.applyForce(createVector(-forceMagnitude, 0));
    if (keyIsDown(RIGHT_ARROW)) this.applyForce(createVector(forceMagnitude, 0));
  }

  // The "Force" pattern: Force adds to Acceleration
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    // 1. Acceleration changes Velocity
    this.vel.add(this.acc);

    this.vel.y += gravity;

    
    
    // 2. Limit the speed so it doesn't go infinite
    this.vel.limit(this.topSpeed);
    
    // 3. Velocity changes Position
    this.pos.add(this.vel);
    
    if(this.pos.y > height - this.r / 2) {
      this.pos.y = height - this.r / 2;
      this.vel.y *= -0.9;
    }

    // 4. Apply friction (velocity decay)
    this.vel.mult(this.friction);
    
    // 5. Reset acceleration for the next frame
    this.acc.mult(0);
  }

  display() {
    fill(255, 150, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}
