import { Body } from "./body";
import { Circle } from "..";
import { Vector2 } from "../vector2";

export class Ball extends Body {
  constructor(x, y, radius, mass) {
    super();
    this.position = new Vector2(x, y);
    this.composition = [new Circle(x, y, radius)];
    this.mass = mass;
    if (this.mass === 0) {
      this.invMass = 0;
    } else {
      this.invMass = 1 / this.mass;
    }
  }

  setPosition(x, y, a = this.angle) {
    this.position.set(x, y);
    this.composition[0].position = this.position;
  }

  update() {
    super.update();
    this.setPosition(this.position.add(this.velocity).x, this.position.add(this.velocity).y);
  }

  keyControl() {
    this.acceleration.x = 0;
    this.acceleration.y = 0;
    if (this.left) {
      this.acceleration.x -= this.keyForce;
    }
    if (this.up) {
      this.acceleration.y -= this.keyForce;
    }
    if (this.right) {
      this.acceleration.x += this.keyForce;
    }
    if (this.down) {
      this.acceleration.y += this.keyForce;
    }
  }
}
