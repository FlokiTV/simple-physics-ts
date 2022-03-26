"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = exports.Pyramid = exports.Box = exports.Wall = exports.Ball = exports.Body = exports.Triangle = exports.Rectangle = exports.Line = exports.Circle = exports.userInput = exports.Vector2 = void 0;
var vector2_1 = require("./vector2");
Object.defineProperty(exports, "Vector2", { enumerable: true, get: function () { return vector2_1.Vector2; } });
var input_1 = require("./input");
Object.defineProperty(exports, "userInput", { enumerable: true, get: function () { return input_1.userInput; } });
/*
    Shapes
*/
var circle_1 = require("./shapes/circle");
Object.defineProperty(exports, "Circle", { enumerable: true, get: function () { return circle_1.Circle; } });
var line_1 = require("./shapes/line");
Object.defineProperty(exports, "Line", { enumerable: true, get: function () { return line_1.Line; } });
var retangle_1 = require("./shapes/retangle");
Object.defineProperty(exports, "Rectangle", { enumerable: true, get: function () { return retangle_1.Rectangle; } });
var triangle_1 = require("./shapes/triangle");
Object.defineProperty(exports, "Triangle", { enumerable: true, get: function () { return triangle_1.Triangle; } });
/*
    Bodies
*/
var body_1 = require("./bodies/body");
Object.defineProperty(exports, "Body", { enumerable: true, get: function () { return body_1.Body; } });
var ball_1 = require("./bodies/ball");
Object.defineProperty(exports, "Ball", { enumerable: true, get: function () { return ball_1.Ball; } });
var wall_1 = require("./bodies/wall");
Object.defineProperty(exports, "Wall", { enumerable: true, get: function () { return wall_1.Wall; } });
var box_1 = require("./bodies/box");
Object.defineProperty(exports, "Box", { enumerable: true, get: function () { return box_1.Box; } });
var pyramid_1 = require("./bodies/pyramid");
Object.defineProperty(exports, "Pyramid", { enumerable: true, get: function () { return pyramid_1.Pyramid; } });
/*
    Collider
*/
var collider_1 = require("./collider");
var collision_1 = require("./collision");
var World = /** @class */ (function () {
    function World() {
        this.objects = [];
        this.collisions = [];
        this.collider = new collider_1.Collider();
    }
    World.prototype.update = function (ctx, canvas) {
        var _this = this;
        if (ctx === void 0) { ctx = false; }
        if (canvas === void 0) { canvas = false; }
        /*
          Update
        */
        this.collisions = []; //reset collisions
        this.objects.forEach(function (obj) {
            if (obj.body.keyControl)
                obj.body.keyControl();
            if (obj.body.update)
                obj.body.update();
        });
        this.objects.forEach(function (obj, index) {
            for (var bodyPair = index + 1; bodyPair < _this.objects.length; bodyPair++) {
                var check = _this.collider.collisionLayer(_this.getByIndex(index).body, _this.getByIndex(bodyPair).body);
                if (check) {
                    var bestSat = _this.collider.collide(_this.getByIndex(index).body, _this.getByIndex(bodyPair).body);
                    if (bestSat) {
                        _this.collisions.push(new collision_1.Collision(_this.getByIndex(index).body, _this.getByIndex(bodyPair).body, bestSat.axis, bestSat.pen, bestSat.vertex));
                    }
                }
            }
        });
        this.collisions.forEach(function (c) {
            c.penRes();
            c.collRes();
        });
        /*
          Draw
        */
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
            this.objects.forEach(function (obj) {
                obj.body.draw(ctx);
            });
        }
    };
    World.prototype.add = function (id, body) {
        var check = this.get(id);
        if (check)
            return false;
        var obj = {
            id: id,
            body: body,
            set: function (key, value) {
                this.body[key] = value;
                return this;
            },
        };
        this.objects.push(obj);
        return obj;
    };
    World.prototype.get = function (id) {
        return this.objects.filter(function (obj) { return obj.id === id; })[0] || false;
    };
    World.prototype.getByIndex = function (id) {
        return this.objects[id];
    };
    return World;
}());
exports.World = World;
