"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
var vector2_1 = require("../vector2");
var Circle = /** @class */ (function () {
    function Circle(x, y, radius) {
        this.layer = -2;
        this.color = "";
        this.vertex = [];
        this.position = new vector2_1.Vector2(x, y);
        this.radius = radius;
    }
    Circle.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        if (!this.color) {
            ctx.strokeStyle = "black";
            ctx.stroke();
        }
        else {
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        ctx.fillStyle = "";
        ctx.closePath();
    };
    return Circle;
}());
exports.Circle = Circle;
