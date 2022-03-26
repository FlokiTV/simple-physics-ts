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
exports.Wall = void 0;
var body_1 = require("./body");
var __1 = require("..");
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall(x1, y1, x2, y2) {
        var _this = _super.call(this) || this;
        _this.start = new __1.Vector2(x1, y1);
        _this.end = new __1.Vector2(x2, y2);
        _this.composition = [new __1.Line(x1, y1, x2, y2)];
        _this.direction = _this.end.subtr(_this.start).unit();
        _this.position = new __1.Vector2((x1 + x2) / 2, (y1 + y2) / 2);
        return _this;
    }
    return Wall;
}(body_1.Body));
exports.Wall = Wall;
