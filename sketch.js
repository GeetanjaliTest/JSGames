const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;
let ball;
let paddle;
let ground;

function setup() {
  createCanvas(400, 400);

  // World connected to engine
  engine = Engine.create();
  world = engine.world;

  // Ball
  const ball_options = {
    restitution: 0.8, // Bounciness
    friction: 0.01,  // Minimal rolling friction
    density: 0.5     // Mass of the ball
  };
  ball = Bodies.circle(200, 200, 15, ball_options);
  World.add(world, ball);

  // Paddle
  const paddle_options = {
    isStatic: true
  };
  paddle = Bodies.rectangle(200, 350, 100, 20, paddle_options);
  World.add(world, paddle);

  // Ground (for safety, keeps ball from escaping)
  const ground_options = {
    isStatic: true
  };
  ground = Bodies.rectangle(200, 400, 400, 20, ground_options);
  World.add(world, ground);
}

function draw() {
  background(51);

  // Update physics engine
  Engine.update(engine);

  // Ball
  fill("red");
  ellipseMode(RADIUS);
  ellipse(ball.position.x, ball.position.y, 15);

  // Paddle
  fill("blue");
  rectMode(CENTER);
  rect(paddle.position.x, paddle.position.y, 100, 20);

  // Ground (hidden)
  fill("brown");
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, 400, 20);

  // Reset ball if it falls below the canvas
  if (ball.position.y > height) {
    Body.setPosition(ball, { x: 200, y: 200 });
    Body.setVelocity(ball, { x: 0, y: 0 });
  }
}

function keyPressed() {
  // Move paddle left and right
  if (keyCode === LEFT_ARROW) {
    Body.setPosition(paddle, { x: paddle.position.x - 20, y: paddle.position.y });
  } else if (keyCode === RIGHT_ARROW) {
    Body.setPosition(paddle, { x: paddle.position.x + 20, y: paddle.position.y });
  }
}

function keyReleased() {
  // Stop paddle movement if key is released (optional, not needed here)
}
