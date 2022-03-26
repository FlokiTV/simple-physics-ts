"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
var vector2_1 = require("./vector2");
var Matrix = /** @class */ (function () {
    function Matrix(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        for (var i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (var j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }
    Matrix.prototype.multiplyVec = function (vec) {
        var result = new vector2_1.Vector2(0, 0);
        result.x = this.data[0][0] * vec.x + this.data[0][1] * vec.y;
        result.y = this.data[1][0] * vec.x + this.data[1][1] * vec.y;
        return result;
    };
    Matrix.prototype.rotMx22 = function (angle) {
        this.data[0][0] = Math.cos(angle);
        this.data[0][1] = -Math.sin(angle);
        this.data[1][0] = Math.sin(angle);
        this.data[1][1] = Math.cos(angle);
    };
    return Matrix;
}());
exports.Matrix = Matrix;
