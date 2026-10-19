//preview: python -m http.server

let albinball;
let albinballSprite;
let bumpers;
let score = 0;

function setup() {
  new Canvas(600, 750);
  world.gravity.y = 10
  background(30);

  new Sprite(width / 2, height / 2, [300, 0, 200, -90, 100, 90, 400, -90, 141.421356, -45, 300, -45, 141.421356, -45, 375, -45, 141.421356, -45, 125, 45], KIN);

  albinball = new Sprite();
  albinball.pos.x = 500;
  albinball.pos.y = 500;
  albinball.diameter = 40;
  albinball.img = "/assets/albinball.png";
  albinball.img.scale = 0.25;
  albinball.physics = DYN;
  albinball.bounciness = 0.75;

  bumpers = new Group();
  bumpers.diameter = 75;
  bumpers.physics = STATIC;

  new bumpers.Sprite(300, 375);
  bumpers[0].img = "/assets/karel.png";
  bumpers[0].img.scale = 0.2

  new bumpers.Sprite(200, 200)
  bumpers[1].img = "/assets/codehs.png";
  bumpers[1].img.scale = 0.25

  new bumpers.Sprite(400, 200)
  bumpers[2].img = "/assets/snack.png";
  bumpers[2].img.scale = 0.15

  flipper = new Sprite(
    480,
    555,
    [
      [0, -25],
      [-100, 12.5],
      [0, 25],
      [100, 12.5],
      [0, -25],
    ],
    "k"
  );

  flipper.addCollider(-60, 0, 25);
  flipper.addCollider(40, 0, 50);

  flipper.offset.x = -40;
  flipper.rotation = -30;

  flipper.img = "/assets/albinFingerRight.png";
  flipper.img.scale.x = 0.25;
  flipper.img.scale.y = 0.25;
  flipper.img.offset.x = -120;
  flipper.debug = true;

  flipper2 = new Sprite(
    120,
    555,
    [
      [0, -25],
      [100, 12.5],
      [0, 25],
      [-100, 12.5],
      [0, -25],
    ],
    "k"
  );

  flipper2.addCollider(60, 0, 25);
  flipper2.addCollider(-40, 0, 50);

  flipper2.offset.x = 40;
  flipper2.rotation = 30;

  flipper2.img = "/assets/albinFinger.png";
  flipper2.img.scale.x = 0.25;
  flipper2.img.scale.y = 0.25;
  flipper2.img.offset.x = 120;
  flipper2.debug = true;

  albinball.applyForce(0, 3000);
}


function draw() {
  background(30);
  if (kb.pressing("arrow-right")) {
    flipper.rotateTo(20, 8);
  }
  if (kb.released("arrow-right")) {
    flipper.rotateTo(-30, -8);
  }
  if (kb.pressing("arrow-left")) {
    flipper2.rotateTo(-20, -8);
  }
  if (kb.released("arrow-left")) {
    flipper2.rotateTo(30, 8);
  }

  if(bumpers.collides(albinball)) {
    score += 100;
  }

  if(albinball.pos.y > 685) {
    albinball.pos.x = 500;
    albinball.pos.y = 500;
    albinball.vel.x = 0;
    albinball.vel.y = 1000;
  }
  
  fill("white");
  textSize(50)
  text(score, 20, 50)
}












// old p5 code
//
// class Albinson {
//   constructor(x, y, r) {
//     this.pos = createVector(x, y);
//     this.vel = createVector(0, 0);
//     this.acc = createVector(0, 0);
//     this.r = r;
//     this.angle = 0;
//     this.topSpeed = 60;
//     this.friction = 0.99; 
//   }

//   // Method to check keyboard input and apply forces
//   checkKeys() {
//     if (keyIsDown(LEFT_ARROW))  this.applyForce(createVector(-forceMagnitude, 0));
//     if (keyIsDown(RIGHT_ARROW)) this.applyForce(createVector(forceMagnitude, 0));
//   }

//   // The "Force" pattern: Force adds to Acceleration
//   applyForce(force) {
//     this.acc.add(force);
//   }

//   update() {
//     // 1. Acceleration changes Velocity
//     this.vel.add(this.acc);

//     this.vel.y += gravity;

    
    
//     // 2. Limit the speed so it doesn't go infinite
//     this.vel.limit(this.topSpeed);
    
//     // 3. Velocity changes Position
//     this.pos.add(this.vel);
    
//     if(this.pos.y > height - this.r / 2) {
//       this.pos.y = height - this.r / 2;
//       this.vel.x *= -0.9;
//       this.vel.y *= -0.9;
//     }
    
//     // 5. Reset acceleration for the next frame
//     this.acc.mult(0);
//   }

//   display() {
//     // fill(255, 150, 0);
//     // noStroke();
//     // ellipse(this.pos.x, this.pos.y, this.r);

//     // i was going to rotate the image so that the ball spins but p5 sucks
//     // and there's not a elegant way to do this so like maybe if i have
//     // extra time i can get it to work??? probably wont tho it will make a lot of bugs probably

//     imageMode(CENTER);
//     // this.angle++
//     // translate(this.pos.x, this.pos.y);
//     // rotate(this.angle);
//     image(albinballSprite, this.pos.x, this.pos.y, this.r * 1.5, this.r * 1.5);
//     // rotate(-this.angle);
//     // translate(-this.pos.x, -this.pos.y);
//   }
// }

// class Albumper {
//   constructor(x, y, r) {
//     this.pos = createVector(x, y);
//     this.radius = r;
//   }

//   display() {
//     fill("#15b100");
//     ellipse(this.pos.x, this.pos.y, this.radius);
//   }
// }