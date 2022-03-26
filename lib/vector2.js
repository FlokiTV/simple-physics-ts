"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.set = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    Vector2.prototype.add = function (v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    };
    Vector2.prototype.subtr = function (v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    };
    Vector2.prototype.mag = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    Vector2.prototype.mult = function (n) {
        return new Vector2(this.x * n, this.y * n);
    };
    Vector2.prototype.normal = function () {
        return new Vector2(-this.y, this.x).unit();
    };
    Vector2.prototype.unit = function () {
        if (this.mag() === 0) {
            return new Vector2(0, 0);
        }
        else {
            return new Vector2(this.x / this.mag(), this.y / this.mag());
        }
    };
    Vector2.dot = function (v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    };
    Vector2.cross = function (v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    };
    return Vector2;
}());
exports.Vector2 = Vector2;
