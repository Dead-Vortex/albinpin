//preview: python -m http.server

let albinball;
let albinballSprite;
let bumpers = [];
let gravity = 2;

async function setup() {
  createCanvas(windowWidth-100, windowHeight-100);
  albinballSprite = await loadImage("/assets/albinball.png");
  angleMode(DEGREES);
  background(30);
  albinball = new Albinson(width / 2, height / 2, 50);
  bumpers.push(new Albumper(width / 2, height / 3, 100));
}

function draw() {
  background(30);
  albinball.update();   // Calculate physics
  albinball.checkKeys(); // Check for keyboard input
  albinball.display();    // Draw the ball

  bumpers[0].display();
}

class Albinson {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = r;
    this.angle = 0;
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
      this.vel.x *= -0.9;
      this.vel.y *= -0.9;
    }
    
    // 5. Reset acceleration for the next frame
    this.acc.mult(0);
  }

  display() {
    // fill(255, 150, 0);
    // noStroke();
    // ellipse(this.pos.x, this.pos.y, this.r);

    // i was going to rotate the image so that the ball spins but p5 sucks
    // and there's not a elegant way to do this so like maybe if i have
    // extra time i can get it to work??? probably wont tho it will make a lot of bugs probably

    imageMode(CENTER);
    // this.angle++
    // translate(this.pos.x, this.pos.y);
    // rotate(this.angle);
    image(albinballSprite, this.pos.x, this.pos.y, this.r * 1.5, this.r * 1.5);
    // rotate(-this.angle);
    // translate(-this.pos.x, -this.pos.y);
  }
}

class Albumper {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.radius = r;
  }

  display() {
    fill("#15b100");
    ellipse(this.pos.x, this.pos.y, this.radius);
  }
}