"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collision = void 0;
var vector2_1 = require("./vector2");
var Collision = /** @class */ (function () {
    function Collision(o1, o2, axis, pen, vertex) {
        this.o1 = o1;
        this.o2 = o2;
        this.axis = axis;
        this.penetration = pen;
        this.vertex = vertex;
    }
    /*
      Resolve collision penetration
    */
    Collision.prototype.penRes = function () {
        var penResolution = this.axis.mult(this.penetration / (this.o1.invMass + this.o2.invMass));
        this.o1.position = this.o1.position.add(penResolution.mult(this.o1.invMass));
        this.o2.position = this.o2.position.add(penResolution.mult(-this.o2.invMass));
    };
    /*
      Process collision
    */
    Collision.prototype.collRes = function () {
        //1. Closing velocity
        var collArm1 = this.vertex.subtr(this.o1.composition[0].position);
        var rotVel1 = new vector2_1.Vector2(-this.o1.angVelocity * collArm1.y, this.o1.angVelocity * collArm1.x);
        var closVel1 = this.o1.velocity.add(rotVel1);
        var collArm2 = this.vertex.subtr(this.o2.composition[0].position);
        var rotVel2 = new vector2_1.Vector2(-this.o2.angVelocity * collArm2.y, this.o2.angVelocity * collArm2.x);
        var closVel2 = this.o2.velocity.add(rotVel2);
        //2. Impulse augmentation
        var impAug1 = vector2_1.Vector2.cross(collArm1, this.axis);
        impAug1 = impAug1 * this.o1.invInertia * impAug1;
        var impAug2 = vector2_1.Vector2.cross(collArm2, this.axis);
        impAug2 = impAug2 * this.o2.invInertia * impAug2;
        var relVel = closVel1.subtr(closVel2);
        var sepVel = vector2_1.Vector2.dot(relVel, this.axis);
        var new_sepVel = -sepVel * Math.min(this.o1.elasticity, this.o2.elasticity);
        var vsep_diff = new_sepVel - sepVel;
        var impulse = vsep_diff / (this.o1.invMass + this.o2.invMass + impAug1 + impAug2);
        var impulseVec = this.axis.mult(impulse);
        //3. Changing the velocities
        this.o1.velocity = this.o1.velocity.add(impulseVec.mult(this.o1.invMass));
        this.o2.velocity = this.o2.velocity.add(impulseVec.mult(-this.o2.invMass));
        this.o1.angVelocity += this.o1.invInertia * vector2_1.Vector2.cross(collArm1, impulseVec);
        this.o2.angVelocity -= this.o2.invInertia * vector2_1.Vector2.cross(collArm2, impulseVec);
    };
    return Collision;
}());
exports.Collision = Collision;
