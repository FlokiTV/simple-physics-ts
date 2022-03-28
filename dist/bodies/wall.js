"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wall = void 0;
const body_1 = require("./body");
const __1 = require("..");
class Wall extends body_1.Body {
    constructor(x1, y1, x2, y2) {
        super();
        this.start = new __1.Vector2(x1, y1);
        this.end = new __1.Vector2(x2, y2);
        this.composition = [new __1.Line(x1, y1, x2, y2)];
        this.direction = this.end.subtr(this.start).unit();
        this.position = new __1.Vector2((x1 + x2) / 2, (y1 + y2) / 2);
    }
}
exports.Wall = Wall;
