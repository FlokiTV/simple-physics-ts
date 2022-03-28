"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ball = void 0;
const body_1 = require("./body");
const __1 = require("..");
const vector2_1 = require("../vector2");
class Ball extends body_1.Body {
    constructor(x, y, radius, mass) {
        super();
        this.position = new vector2_1.Vector2(x, y);
        this.composition = [new __1.Circle(x, y, radius)];
        this.mass = mass;
        if (this.mass === 0) {
            this.invMass = 0;
        }
        else {
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
exports.Ball = Ball;
