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
exports.Ball = void 0;
var body_1 = require("./body");
var __1 = require("..");
var vector2_1 = require("../vector2");
var Ball = /** @class */ (function (_super) {
    __extends(Ball, _super);
    function Ball(x, y, radius, mass) {
        var _this = _super.call(this) || this;
        _this.position = new vector2_1.Vector2(x, y);
        _this.composition = [new __1.Circle(x, y, radius)];
        _this.mass = mass;
        if (_this.mass === 0) {
            _this.invMass = 0;
        }
        else {
            _this.invMass = 1 / _this.mass;
        }
        return _this;
    }
    Ball.prototype.setPosition = function (x, y, a) {
        if (a === void 0) { a = this.angle; }
        this.position.set(x, y);
        this.composition[0].position = this.position;
    };
    Ball.prototype.update = function () {
        _super.prototype.update.call(this);
        this.setPosition(this.position.add(this.velocity).x, this.position.add(this.velocity).y);
    };
    Ball.prototype.keyControl = function () {
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
    };
    return Ball;
}(body_1.Body));
exports.Ball = Ball;
