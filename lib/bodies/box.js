"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
var body_1 = require("../bodies/body");
var __1 = require("..");
var Box = /** @class */ (function (_super) {
    __extends(Box, _super);
    function Box(x1, y1, x2, y2, width, mass) {
        var _this = _super.call(this) || this;
        _this.composition = [new __1.Rectangle(x1, y1, x2, y2, -width)];
        _this.position = _this.composition[0].position;
        _this.mass = mass;
        if (_this.mass === 0) {
            _this.invMass = 0;
        }
        else {
            _this.invMass = 1 / _this.mass;
        }
        _this.inertia = (_this.mass * (Math.pow(_this.composition[0].width, 2) + Math.pow(_this.composition[0].length, 2))) / 12;
        if (_this.mass === 0) {
            _this.invInertia = 0;
        }
        else {
            _this.invInertia = 1 / _this.inertia;
        }
        return _this;
    }
    Box.prototype.keyControl = function () {
        if (this.up) {
            this.acceleration = this.composition[0].dir.mult(-this.keyForce);
        }
        if (this.down) {
            this.acceleration = this.composition[0].dir.mult(this.keyForce);
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
    };
    Box.prototype.setPosition = function (x, y, a) {
        if (a === void 0) { a = this.angle; }
        this.position.set(x, y);
        this.angle = a;
        this.composition[0].position = this.position;
        this.composition[0].getVertices(this.angle + this.angVelocity);
        this.angle += this.angVelocity;
    };
    Box.prototype.update = function () {
        _super.prototype.update.call(this);
        this.setPosition(this.position.add(this.velocity).x, this.position.add(this.velocity).y);
    };
    return Box;
}(body_1.Body));
exports.Box = Box;
