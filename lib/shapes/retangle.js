"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
var vector2_1 = require("../vector2");
var matrix_1 = require("../matrix");
var Rectangle = /** @class */ (function () {
    function Rectangle(x1, y1, x2, y2, width) {
        this.color = "";
        this.vertex = [];
        this.vertex[0] = new vector2_1.Vector2(x1, y1);
        this.vertex[1] = new vector2_1.Vector2(x2, y2);
        this.direction = this.vertex[1].subtr(this.vertex[0]).unit();
        this.refDirection = this.vertex[1].subtr(this.vertex[0]).unit();
        this.length = this.vertex[1].subtr(this.vertex[0]).mag();
        this.width = width;
        this.vertex[2] = this.vertex[1].add(this.direction.normal().mult(this.width));
        this.vertex[3] = this.vertex[2].add(this.direction.mult(-this.length));
        this.position = this.vertex[0]
            .add(this.direction.mult(this.length / 2))
            .add(this.direction.normal().mult(this.width / 2));
        this.angle = 0;
        this.rotMat = new matrix_1.Matrix(2, 2);
    }
    Rectangle.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.moveTo(this.vertex[0].x, this.vertex[0].y);
        ctx.lineTo(this.vertex[1].x, this.vertex[1].y);
        ctx.lineTo(this.vertex[2].x, this.vertex[2].y);
        ctx.lineTo(this.vertex[3].x, this.vertex[3].y);
        ctx.lineTo(this.vertex[0].x, this.vertex[0].y);
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
    Rectangle.prototype.getVertices = function (angle) {
        this.rotMat.rotMx22(angle);
        this.direction = this.rotMat.multiplyVec(this.refDirection);
        this.vertex[0] = this.position
            .add(this.direction.mult(-this.length / 2))
            .add(this.direction.normal().mult(this.width / 2));
        this.vertex[1] = this.position
            .add(this.direction.mult(-this.length / 2))
            .add(this.direction.normal().mult(-this.width / 2));
        this.vertex[2] = this.position
            .add(this.direction.mult(this.length / 2))
            .add(this.direction.normal().mult(-this.width / 2));
        this.vertex[3] = this.position
            .add(this.direction.mult(this.length / 2))
            .add(this.direction.normal().mult(this.width / 2));
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
