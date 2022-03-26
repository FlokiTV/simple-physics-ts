"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
var vector2_1 = require("../vector2");
var matrix_1 = require("../matrix");
var Triangle = /** @class */ (function () {
    function Triangle(x1, y1, x2, y2, x3, y3) {
        this.color = "";
        this.vertex = [];
        this.vertex[0] = new vector2_1.Vector2(x1, y1);
        this.vertex[1] = new vector2_1.Vector2(x2, y2);
        this.vertex[2] = new vector2_1.Vector2(x3, y3);
        this.position = new vector2_1.Vector2((this.vertex[0].x + this.vertex[1].x + this.vertex[2].x) / 3, (this.vertex[0].y + this.vertex[1].y + this.vertex[2].y) / 3);
        this.direction = this.vertex[0].subtr(this.position).unit();
        this.refDir = this.direction;
        this.refDiam = [];
        this.refDiam[0] = this.vertex[0].subtr(this.position);
        this.refDiam[1] = this.vertex[1].subtr(this.position);
        this.refDiam[2] = this.vertex[2].subtr(this.position);
        this.angle = 0;
        this.rotMat = new matrix_1.Matrix(2, 2);
    }
    Triangle.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.moveTo(this.vertex[0].x, this.vertex[0].y);
        ctx.lineTo(this.vertex[1].x, this.vertex[1].y);
        ctx.lineTo(this.vertex[2].x, this.vertex[2].y);
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
    Triangle.prototype.getVertices = function (angle) {
        this.rotMat.rotMx22(angle);
        this.direction = this.rotMat.multiplyVec(this.refDir);
        this.vertex[0] = this.position.add(this.rotMat.multiplyVec(this.refDiam[0]));
        this.vertex[1] = this.position.add(this.rotMat.multiplyVec(this.refDiam[1]));
        this.vertex[2] = this.position.add(this.rotMat.multiplyVec(this.refDiam[2]));
    };
    return Triangle;
}());
exports.Triangle = Triangle;
