"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = void 0;
var vector2_1 = require("../vector2");
var Body = /** @class */ (function () {
    function Body(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.action = false;
        this.composition = [];
        this.position = new vector2_1.Vector2(x, y);
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
        this.velocity = new vector2_1.Vector2(0, 0);
        this.acceleration = new vector2_1.Vector2(0, 0);
        this.keyForce = 1;
        this.angKeyForce = 0.1;
        this.angle = 0;
        this.angVelocity = 0;
    }
    Body.prototype.draw = function (ctx) {
        if (this.color) {
            this.setColor(this.color);
        }
        for (var i in this.composition) {
            this.composition[i].draw(ctx);
        }
    };
    Body.prototype.update = function () {
        this.acceleration = this.acceleration.unit().mult(this.keyForce);
        this.velocity = this.velocity.add(this.acceleration);
        this.velocity = this.velocity.mult(1 - this.friction);
        if (this.velocity.mag() > this.maxSpeed && this.maxSpeed !== 0) {
            this.velocity = this.velocity.unit().mult(this.maxSpeed);
        }
        this.angVelocity *= 1 - this.angFriction;
    };
    Body.prototype.keyControl = function () { };
    Body.prototype.setColor = function (color) {
        this.composition.forEach(function (comp) {
            comp.color = color;
        });
    };
    return Body;
}());
exports.Body = Body;
