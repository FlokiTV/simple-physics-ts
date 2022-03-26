import { Vector2 } from "../vector2";

export class Body {
  composition: any;
  position: Vector2;

  mass: number;
  invMass: number;
  inertia: number;
  invInertia: number;
  elasticity: number;
  friction: number;
  angFriction: number;

  maxSpeed: number;
  velocity: Vector2;
  acceleration: Vector2;
  angle: number;
  angVelocity: number;
  layer: number;
  color: string;
  keyForce: number;
  angKeyForce: number;

  up = false;
  down = false;
  left = false;
  right = false;
  action = false;

  constructor(x = 0, y = 0) {
    this.composition = [];
    this.position = new Vector2(x, y);
    this.mass = 0;
    this.invMass = 0;
    this.inertia = 0;
    this.invInertia = 0;
    this.elasticity = 1;

    this.friction = 0;
    this.angFriction = 0;
    this.maxSpeed = 0;
    this.layer = 0;
    this.color = "";
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.action = false;

    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);
    this.keyForce = 1;
    this.angKeyForce = 0.1;
    this.angle = 0;
    this.angVelocity = 0;
  }

  draw(ctx) {
    if (this.color) {
      this.setColor(this.color);
    }
    for (let i in this.composition) {
      this.composition[i].draw(ctx);
    }
  }
  update() {
    this.acceleration = this.acceleration.unit().mult(this.keyForce);
    this.velocity = this.velocity.add(this.acceleration);
    this.velocity = this.velocity.mult(1 - this.friction);
    if (this.velocity.mag() > this.maxSpeed && this.maxSpeed !== 0) {
      this.velocity = this.velocity.unit().mult(this.maxSpeed);
    }
    this.angVelocity *= 1 - this.angFriction;
  }
  keyControl() {}
  setColor(color) {
    this.composition.forEach((comp) => {
      comp.color = color;
    });
  }
  //   remove() {
  //     if (BODIES.indexOf(this) !== -1) {
  //       BODIES.splice(BODIES.indexOf(this), 1);
  //     }
  //   }
}
