"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pyramid = void 0;
const body_1 = require("./body");
const __1 = require("..");
class Pyramid extends body_1.Body {
    constructor(x1, y1, r, m) {
        super();
        this.composition = [];
        this.radius = r;
        let center = new __1.Vector2(x1, y1);
        let upDir = new __1.Vector2(0, -1);
        let p1 = center.add(upDir.mult(r));
        let p2 = center.add(upDir.mult(-r / 2)).add(upDir.normal().mult((-r * Math.sqrt(3)) / 2));
        let p3 = center.add(upDir.mult(-r / 2)).add(upDir.normal().mult((r * Math.sqrt(3)) / 2));
        this.composition.push(new __1.Triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));
        // p1 = center.add(upDir.mult(-r));
        // p2 = center.add(upDir.mult(r / 2)).add(upDir.normal().mult((-r * Math.sqrt(3)) / 2));
        // p3 = center.add(upDir.mult(r / 2)).add(upDir.normal().mult((r * Math.sqrt(3)) / 2));
        // this.comp.push(new Triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));
        this.position = this.composition[0].position;
        this.mass = m;
        if (this.mass === 0) {
            this.invMass = 0;
        }
        else {
            this.invMass = 1 / this.mass;
        }
        this.inertia = (this.mass * (2 * this.radius) ** 2) / 12;
        if (this.mass === 0) {
            this.invInertia = 0;
        }
        else {
            this.invInertia = 1 / this.inertia;
        }
    }
    keyControl() {
        if (this.up) {
            this.acceleration = this.composition[0].direction.mult(-this.keyForce);
        }
        if (this.down) {
            this.acceleration = this.composition[0].direction.mult(this.keyForce);
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
        // this.composition[1].position = this.position;
        this.composition[0].getVertices(this.angle + this.angVelocity);
        // this.composition[1].getVertices(this.angle + this.angVelocity);
        this.angle += this.angVelocity;
    }
    update() {
        super.update();
        this.setPosition(this.position.add(this.velocity).x, this.position.add(this.velocity).y);
    }
}
exports.Pyramid = Pyramid;
