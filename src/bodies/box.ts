import { Body } from "../bodies/body";
import { Rectangle } from "..";

export class Box extends Body {
  constructor(x1, y1, x2, y2, width, mass) {
    super();
    this.composition = [new Rectangle(x1, y1, x2, y2, -width)];
    this.position = this.composition[0].position;
    this.mass = mass;
    if (this.mass === 0) {
      this.invMass = 0;
    } else {
      this.invMass = 1 / this.mass;
    }
    this.inertia = (this.mass * (this.composition[0].width ** 2 + this.composition[0].length ** 2)) / 12;
    if (this.mass === 0) {
      this.invInertia = 0;
    } else {
      this.invInertia = 1 / this.inertia;
    }
  }

  keyControl() {
    if (this.up) {
      this.acceleration = this.composition[0].dir.mult(-this.keyForce);
    }
    if (this.down) {
      this.acceleration = this.composition[0].dir.mult(this.keyForce);
    }
    if (this.left) {
      this.angVelocity = -this.angKeyForce;
    }
    if (this.right) {
      this.angVelocity = this.angKeyForce;
    }
    if (!this.up && !this.down) {
      this.acceleration.set(0, 0);
    }
  }

  setPosition(x, y, a = this.angle) {
    this.position.set(x, y);
    this.angle = a;
    this.composition[0].position = this.position;
    this.composition[0].getVertices(this.angle + this.angVelocity);
    this.angle += this.angVelocity;
  }

  update() {
    super.update();
    this.setPosition(this.position.add(this.velocity).x, this.position.add(this.velocity).y);
  }
}
