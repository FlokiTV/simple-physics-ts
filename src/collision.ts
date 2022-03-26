import { Vector2 } from "./vector2";

export class Collision {
  o1: any;
  o2: any;
  axis: any;
  penetration: any;
  vertex: any;
  constructor(o1, o2, axis, pen, vertex) {
    this.o1 = o1;
    this.o2 = o2;
    this.axis = axis;
    this.penetration = pen;
    this.vertex = vertex;
  }

  /*
    Resolve collision penetration
  */
  penRes() {
    let penResolution = this.axis.mult(this.penetration / (this.o1.invMass + this.o2.invMass));
    this.o1.position = this.o1.position.add(penResolution.mult(this.o1.invMass));
    this.o2.position = this.o2.position.add(penResolution.mult(-this.o2.invMass));
  }

  /*
    Process collision
  */
  collRes() {
    //1. Closing velocity
    let collArm1 = this.vertex.subtr(this.o1.composition[0].position);
    let rotVel1 = new Vector2(-this.o1.angVelocity * collArm1.y, this.o1.angVelocity * collArm1.x);
    let closVel1 = this.o1.velocity.add(rotVel1);
    let collArm2 = this.vertex.subtr(this.o2.composition[0].position);
    let rotVel2 = new Vector2(-this.o2.angVelocity * collArm2.y, this.o2.angVelocity * collArm2.x);
    let closVel2 = this.o2.velocity.add(rotVel2);

    //2. Impulse augmentation
    let impAug1 = Vector2.cross(collArm1, this.axis);
    impAug1 = impAug1 * this.o1.invInertia * impAug1;
    let impAug2 = Vector2.cross(collArm2, this.axis);
    impAug2 = impAug2 * this.o2.invInertia * impAug2;

    let relVel = closVel1.subtr(closVel2);
    let sepVel = Vector2.dot(relVel, this.axis);
    let new_sepVel = -sepVel * Math.min(this.o1.elasticity, this.o2.elasticity);
    let vsep_diff = new_sepVel - sepVel;

    let impulse = vsep_diff / (this.o1.invMass + this.o2.invMass + impAug1 + impAug2);
    let impulseVec = this.axis.mult(impulse);

    //3. Changing the velocities
    this.o1.velocity = this.o1.velocity.add(impulseVec.mult(this.o1.invMass));
    this.o2.velocity = this.o2.velocity.add(impulseVec.mult(-this.o2.invMass));

    this.o1.angVelocity += this.o1.invInertia * Vector2.cross(collArm1, impulseVec);
    this.o2.angVelocity -= this.o2.invInertia * Vector2.cross(collArm2, impulseVec);
  }
}
