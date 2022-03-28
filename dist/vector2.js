"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    subtr(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    mult(n) {
        return new Vector2(this.x * n, this.y * n);
    }
    normal() {
        return new Vector2(-this.y, this.x).unit();
    }
    unit() {
        if (this.mag() === 0) {
            return new Vector2(0, 0);
        }
        else {
            return new Vector2(this.x / this.mag(), this.y / this.mag());
        }
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    static cross(v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    }
}
exports.Vector2 = Vector2;
