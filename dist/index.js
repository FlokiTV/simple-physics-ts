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
const collider_1 = require("./collider");
const collision_1 = require("./collision");
class World {
    constructor() {
        this.objects = [];
        this.collisions = [];
        this.collider = new collider_1.Collider();
    }
    update(ctx = false, canvas = false) {
        /*
          Update
        */
        this.collisions = []; //reset collisions
        this.objects.forEach((obj) => {
            if (obj.body.keyControl)
                obj.body.keyControl();
            if (obj.body.update)
                obj.body.update();
        });
        this.objects.forEach((obj, index) => {
            for (let bodyPair = index + 1; bodyPair < this.objects.length; bodyPair++) {
                let check = this.collider.collisionLayer(this.getByIndex(index).body, this.getByIndex(bodyPair).body);
                if (check) {
                    let bestSat = this.collider.collide(this.getByIndex(index).body, this.getByIndex(bodyPair).body);
                    if (bestSat) {
                        this.collisions.push(new collision_1.Collision(this.getByIndex(index).body, this.getByIndex(bodyPair).body, bestSat.axis, bestSat.pen, bestSat.vertex));
                    }
                }
            }
        });
        this.collisions.forEach((c) => {
            c.penRes();
            c.collRes();
        });
        /*
          Draw
        */
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
            this.objects.forEach((obj) => {
                obj.body.draw(ctx);
            });
        }
    }
    add(id, body) {
        let check = this.get(id);
        if (check)
            return false;
        let obj = {
            id,
            body,
            set(key, value) {
                this.body[key] = value;
                return this;
            },
        };
        this.objects.push(obj);
        return obj;
    }
    get(id) {
        return this.objects.filter((obj) => obj.id === id)[0] || false;
    }
    getByIndex(id) {
        return this.objects[id];
    }
}
exports.World = World;
if (typeof window != "undefined")
    window.Physics = this;
