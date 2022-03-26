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
exports.Pyramid = void 0;
var body_1 = require("./body");
var __1 = require("..");
var Pyramid = /** @class */ (function (_super) {
    __extends(Pyramid, _super);
    function Pyramid(x1, y1, r, m) {
        var _this = _super.call(this) || this;
        _this.composition = [];
        _this.radius = r;
        var center = new __1.Vector2(x1, y1);
        var upDir = new __1.Vector2(0, -1);
        var p1 = center.add(upDir.mult(r));
        var p2 = center.add(upDir.mult(-r / 2)).add(upDir.normal().mult((-r * Math.sqrt(3)) / 2));
        var p3 = center.add(upDir.mult(-r / 2)).add(upDir.normal().mult((r * Math.sqrt(3)) / 2));
        _this.composition.push(new __1.Triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));
        // p1 = center.add(upDir.mult(-r));
        // p2 = center.add(upDir.mult(r / 2)).add(upDir.normal().mult((-r * Math.sqrt(3)) / 2));
        // p3 = center.add(upDir.mult(r / 2)).add(upDir.normal().mult((r * Math.sqrt(3)) / 2));
        // this.comp.push(new Triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));
        _this.position = _this.composition[0].position;
        _this.mass = m;
        if (_this.mass === 0) {
            _this.invMass = 0;
        }
        else {
            _this.invMass = 1 / _this.mass;
        }
        _this.inertia = (_this.mass * Math.pow((2 * _this.radius), 2)) / 12;
        if (_this.mass === 0) {
            _this.invInertia = 0;
        }
        else {
            _this.invInertia = 1 / _this.inertia;
        }
        return _this;
    }
    Pyramid.prototype.keyControl = function () {
        if (this.up) {
            this.acceleration = this.composition[0].direction.mult(-this.keyForce);
        }
        if (this.down) {
            this.acceleration = this.composition[0].direction.mult(this.keyForce);
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
    Pyramid.prototype.setPosition = function (x, y, a) {
        if (a === void 0) { a = this.angle; }
        this.position.set(x, y);
        this.angle = a;
        this.composition[0].position = this.position;
        // this.composition[1].position = this.position;
        this.composition[0].getVertices(this.angle + this.angVelocity);
        // this.composition[1].getVertices(this.angle + this.angVelocity);
        this.angle += this.angVelocity;
    };
    Pyramid.prototype.update = function () {
        _super.prototype.update.call(this);
        this.setPosition(this.position.add(this.velocity).x, this.position.add(this.velocity).y);
    };
    return Pyramid;
}(body_1.Body));
exports.Pyramid = Pyramid;
