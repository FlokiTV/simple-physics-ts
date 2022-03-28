/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bodies/ball.ts":
/*!****************************!*\
  !*** ./src/bodies/ball.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Ball = void 0;
const body_1 = __webpack_require__(/*! ./body */ "./src/bodies/body.ts");
const __1 = __webpack_require__(/*! .. */ "./src/index.ts");
const vector2_1 = __webpack_require__(/*! ../vector2 */ "./src/vector2.ts");
class Ball extends body_1.Body {
    constructor(x, y, radius, mass) {
        super();
        this.position = new vector2_1.Vector2(x, y);
        this.composition = [new __1.Circle(x, y, radius)];
        this.mass = mass;
        if (this.mass === 0) {
            this.invMass = 0;
        }
        else {
            this.invMass = 1 / this.mass;
        }
    }
    setPosition(x, y, a = this.angle) {
        this.position.set(x, y);
        this.composition[0].position = this.position;
    }
    update() {
        super.update();
        this.setPosition(this.position.add(this.velocity).x, this.position.add(this.velocity).y);
    }
    keyControl() {
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
    }
}
exports.Ball = Ball;


/***/ }),

/***/ "./src/bodies/body.ts":
/*!****************************!*\
  !*** ./src/bodies/body.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Body = void 0;
const vector2_1 = __webpack_require__(/*! ../vector2 */ "./src/vector2.ts");
class Body {
    constructor(x = 0, y = 0) {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.action = false;
        this.composition = [];
        this.position = new vector2_1.Vector2(x, y);
        this.mass = 0;
        this.invMass = 0;
        this.inertia = 0;
        this.invInertia = 0;
        this.elasticity = 1;
        this.friction = 0;
        this.angFriction = 0;
        this.maxSpeed = 0;
        this.layer = 0;
        this.color = "";
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.action = false;
        this.velocity = new vector2_1.Vector2(0, 0);
        this.acceleration = new vector2_1.Vector2(0, 0);
        this.keyForce = 1;
        this.angKeyForce = 0.1;
        this.angle = 0;
        this.angVelocity = 0;
    }
    draw(ctx) {
        if (this.color) {
            this.setColor(this.color);
        }
        for (let i in this.composition) {
            this.composition[i].draw(ctx);
        }
    }
    update() {
        this.acceleration = this.acceleration.unit().mult(this.keyForce);
        this.velocity = this.velocity.add(this.acceleration);
        this.velocity = this.velocity.mult(1 - this.friction);
        if (this.velocity.mag() > this.maxSpeed && this.maxSpeed !== 0) {
            this.velocity = this.velocity.unit().mult(this.maxSpeed);
        }
        this.angVelocity *= 1 - this.angFriction;
    }
    keyControl() { }
    setColor(color) {
        this.composition.forEach((comp) => {
            comp.color = color;
        });
    }
}
exports.Body = Body;


/***/ }),

/***/ "./src/bodies/box.ts":
/*!***************************!*\
  !*** ./src/bodies/box.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Box = void 0;
const body_1 = __webpack_require__(/*! ../bodies/body */ "./src/bodies/body.ts");
const __1 = __webpack_require__(/*! .. */ "./src/index.ts");
class Box extends body_1.Body {
    constructor(x1, y1, x2, y2, width, mass) {
        super();
        this.composition = [new __1.Rectangle(x1, y1, x2, y2, -width)];
        this.position = this.composition[0].position;
        this.mass = mass;
        if (this.mass === 0) {
            this.invMass = 0;
        }
        else {
            this.invMass = 1 / this.mass;
        }
        this.inertia = (this.mass * (this.composition[0].width ** 2 + this.composition[0].length ** 2)) / 12;
        if (this.mass === 0) {
            this.invInertia = 0;
        }
        else {
            this.invInertia = 1 / this.inertia;
        }
    }
    keyControl() {
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
    }
    setPosition(x, y, a = this.angle) {
        this.position.set(x, y);
        this.angle = a;
        this.composition[0].position = this.position;
        this.composition[0].getVertices(this.angle + this.angVelocity);
        this.angle += this.angVelocity;
    }
    update() {
        super.update();
        this.setPosition(this.position.add(this.velocity).x, this.position.add(this.velocity).y);
    }
}
exports.Box = Box;


/***/ }),

/***/ "./src/bodies/pyramid.ts":
/*!*******************************!*\
  !*** ./src/bodies/pyramid.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Pyramid = void 0;
const body_1 = __webpack_require__(/*! ./body */ "./src/bodies/body.ts");
const __1 = __webpack_require__(/*! .. */ "./src/index.ts");
class Pyramid extends body_1.Body {
    constructor(x1, y1, r, m) {
        super();
        this.composition = [];
        this.radius = r;
        let center = new __1.Vector2(x1, y1);
        let upDir = new __1.Vector2(0, -1);
        let p1 = center.add(upDir.mult(r));
        let p2 = center.add(upDir.mult(-r / 2)).add(upDir.normal().mult((-r * Math.sqrt(3)) / 2));
        let p3 = center.add(upDir.mult(-r / 2)).add(upDir.normal().mult((r * Math.sqrt(3)) / 2));
        this.composition.push(new __1.Triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));
        // p1 = center.add(upDir.mult(-r));
        // p2 = center.add(upDir.mult(r / 2)).add(upDir.normal().mult((-r * Math.sqrt(3)) / 2));
        // p3 = center.add(upDir.mult(r / 2)).add(upDir.normal().mult((r * Math.sqrt(3)) / 2));
        // this.comp.push(new Triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));
        this.position = this.composition[0].position;
        this.mass = m;
        if (this.mass === 0) {
            this.invMass = 0;
        }
        else {
            this.invMass = 1 / this.mass;
        }
        this.inertia = (this.mass * (2 * this.radius) ** 2) / 12;
        if (this.mass === 0) {
            this.invInertia = 0;
        }
        else {
            this.invInertia = 1 / this.inertia;
        }
    }
    keyControl() {
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
    }
    setPosition(x, y, a = this.angle) {
        this.position.set(x, y);
        this.angle = a;
        this.composition[0].position = this.position;
        // this.composition[1].position = this.position;
        this.composition[0].getVertices(this.angle + this.angVelocity);
        // this.composition[1].getVertices(this.angle + this.angVelocity);
        this.angle += this.angVelocity;
    }
    update() {
        super.update();
        this.setPosition(this.position.add(this.velocity).x, this.position.add(this.velocity).y);
    }
}
exports.Pyramid = Pyramid;


/***/ }),

/***/ "./src/bodies/wall.ts":
/*!****************************!*\
  !*** ./src/bodies/wall.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Wall = void 0;
const body_1 = __webpack_require__(/*! ./body */ "./src/bodies/body.ts");
const __1 = __webpack_require__(/*! .. */ "./src/index.ts");
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


/***/ }),

/***/ "./src/collider.ts":
/*!*************************!*\
  !*** ./src/collider.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Collider = void 0;
const vector2_1 = __webpack_require__(/*! ./vector2 */ "./src/vector2.ts");
// import { Body } from "./bodies/body";
const _1 = __webpack_require__(/*! . */ "./src/index.ts");
class Collider {
    sat(o1, o2) {
        let minOverlap = null;
        let smallestAxis;
        let vertexObj;
        let axes = this.findAxes(o1, o2);
        let proj1, proj2;
        let firstShapeAxes = this.getShapeAxes(o1);
        for (let i = 0; i < axes.length; i++) {
            proj1 = this.projShapeOntoAxis(axes[i], o1);
            proj2 = this.projShapeOntoAxis(axes[i], o2);
            let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
            if (overlap < 0) {
                return {
                    error: true,
                };
            }
            if ((proj1.max > proj2.max && proj1.min < proj2.min) || (proj1.max < proj2.max && proj1.min > proj2.min)) {
                let mins = Math.abs(proj1.min - proj2.min);
                let maxs = Math.abs(proj1.max - proj2.max);
                if (mins < maxs) {
                    overlap += mins;
                }
                else {
                    overlap += maxs;
                    axes[i] = axes[i].mult(-1);
                }
            }
            if (overlap < minOverlap || minOverlap === null) {
                minOverlap = overlap;
                smallestAxis = axes[i];
                if (i < firstShapeAxes) {
                    vertexObj = o2;
                    if (proj1.max > proj2.max) {
                        smallestAxis = axes[i].mult(-1);
                    }
                }
                else {
                    vertexObj = o1;
                    if (proj1.max < proj2.max) {
                        smallestAxis = axes[i].mult(-1);
                    }
                }
            }
        }
        let contactVertex = this.projShapeOntoAxis(smallestAxis, vertexObj).collVertex;
        if (vertexObj === o2) {
            smallestAxis = smallestAxis.mult(-1);
        }
        return {
            pen: minOverlap,
            axis: smallestAxis,
            vertex: contactVertex,
        };
    }
    collide(o1, o2) {
        let bestSat = {
            pen: null,
            axis: null,
            vertex: null,
        };
        // if (obj instanceof Circle)
        for (let o1comp = 0; o1comp < o1.composition.length; o1comp++) {
            for (let o2comp = 0; o2comp < o2.composition.length; o2comp++) {
                let sat = this.sat(o1.composition[o1comp], o2.composition[o2comp]);
                if (!sat.error && sat.pen > bestSat.pen) {
                    bestSat = this.sat(o1.composition[o1comp], o2.composition[o2comp]);
                }
            }
        }
        if (bestSat.pen !== null) {
            return bestSat;
        }
        else {
            return false;
        }
    }
    getShapeAxes(obj) {
        if (obj instanceof _1.Circle || obj instanceof _1.Line) {
            return 1;
        }
        // if (obj instanceof Rectangle) {
        //   return 2;
        // }
        // if (obj instanceof Triangle) {
        //   return 3;
        // }
    }
    findAxes(o1, o2) {
        let axes = [];
        /*
          Circle to Circle collision
        */
        if (o1 instanceof _1.Circle && o2 instanceof _1.Circle) {
            if (o2.position.subtr(o1.position).mag() > 0) {
                axes.push(o2.position.subtr(o1.position).unit());
            }
            else {
                axes.push(new vector2_1.Vector2(Math.random(), Math.random()).unit());
            }
            return axes;
        }
        /*
          Handle Circles collision
        */
        if (o1 instanceof _1.Circle) {
            axes.push(this.closestVertexToPoint(o2, o1.position).subtr(o1.position).unit());
        }
        if (o2 instanceof _1.Circle) {
            axes.push(this.closestVertexToPoint(o1, o2.position).subtr(o2.position).unit());
        }
        /*
          Handle Lines collision
        */
        if (o1 instanceof _1.Line) {
            axes.push(o1.direction.normal());
        }
        if (o2 instanceof _1.Line) {
            axes.push(o2.direction.normal());
        }
        /*
          Handle Retangles collision
        */
        if (o1 instanceof _1.Rectangle) {
            axes.push(o1.direction.normal());
            axes.push(o1.direction);
        }
        if (o2 instanceof _1.Rectangle) {
            axes.push(o2.direction.normal());
            axes.push(o2.direction);
        }
        // if (o1 instanceof Triangle) {
        //   axes.push(o1.vertex[1].subtr(o1.vertex[0]).normal());
        //   axes.push(o1.vertex[2].subtr(o1.vertex[1]).normal());
        //   axes.push(o1.vertex[0].subtr(o1.vertex[2]).normal());
        // }
        // if (o2 instanceof Triangle) {
        //   axes.push(o2.vertex[1].subtr(o2.vertex[0]).normal());
        //   axes.push(o2.vertex[2].subtr(o2.vertex[1]).normal());
        //   axes.push(o2.vertex[0].subtr(o2.vertex[2]).normal());
        // }
        return axes;
    }
    projShapeOntoAxis(axis, obj) {
        this.setBallVerticesAlongAxis(obj, axis);
        let min = vector2_1.Vector2.dot(axis, obj.vertex[0]);
        let max = min;
        let collVertex = obj.vertex[0];
        for (let i = 0; i < obj.vertex.length; i++) {
            let p = vector2_1.Vector2.dot(axis, obj.vertex[i]);
            if (p < min) {
                min = p;
                collVertex = obj.vertex[i];
            }
            if (p > max) {
                max = p;
            }
        }
        return {
            min: min,
            max: max,
            collVertex: collVertex,
        };
    }
    closestVertexToPoint(obj, position) {
        let closestVertex;
        let minDist = null;
        for (let i = 0; i < obj.vertex.length; i++) {
            if (position.subtr(obj.vertex[i]).mag() < minDist || minDist === null) {
                closestVertex = obj.vertex[i];
                minDist = position.subtr(obj.vertex[i]).mag();
            }
        }
        return closestVertex;
    }
    setBallVerticesAlongAxis(obj, axis) {
        if (obj instanceof _1.Circle) {
            obj.vertex[0] = obj.position.add(axis.unit().mult(-obj.radius));
            obj.vertex[1] = obj.position.add(axis.unit().mult(obj.radius));
        }
    }
    //Collision is handled based on the body layer
    //Layer -1: collision handling with layer 0 bodies ONLY
    //Layer -2: no collision handling with any other body
    collisionLayer(body1, body2) {
        return ((body1.layer === body2.layer && !(body1.layer === -1 || body1.layer === -2)) ||
            (body1.layer === 0 && body2.layer !== -2) ||
            (body2.layer === 0 && body1.layer !== -2));
    }
}
exports.Collider = Collider;


/***/ }),

/***/ "./src/collision.ts":
/*!**************************!*\
  !*** ./src/collision.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Collision = void 0;
const vector2_1 = __webpack_require__(/*! ./vector2 */ "./src/vector2.ts");
class Collision {
    constructor(o1, o2, axis, pen, vertex) {
        this.o1 = o1;
        this.o2 = o2;
        this.axis = axis;
        this.penetration = pen;
        this.vertex = vertex;
    }
    /*
      Resolve collision penetration
    */
    penRes() {
        let penResolution = this.axis.mult(this.penetration / (this.o1.invMass + this.o2.invMass));
        this.o1.position = this.o1.position.add(penResolution.mult(this.o1.invMass));
        this.o2.position = this.o2.position.add(penResolution.mult(-this.o2.invMass));
    }
    /*
      Process collision
    */
    collRes() {
        //1. Closing velocity
        let collArm1 = this.vertex.subtr(this.o1.composition[0].position);
        let rotVel1 = new vector2_1.Vector2(-this.o1.angVelocity * collArm1.y, this.o1.angVelocity * collArm1.x);
        let closVel1 = this.o1.velocity.add(rotVel1);
        let collArm2 = this.vertex.subtr(this.o2.composition[0].position);
        let rotVel2 = new vector2_1.Vector2(-this.o2.angVelocity * collArm2.y, this.o2.angVelocity * collArm2.x);
        let closVel2 = this.o2.velocity.add(rotVel2);
        //2. Impulse augmentation
        let impAug1 = vector2_1.Vector2.cross(collArm1, this.axis);
        impAug1 = impAug1 * this.o1.invInertia * impAug1;
        let impAug2 = vector2_1.Vector2.cross(collArm2, this.axis);
        impAug2 = impAug2 * this.o2.invInertia * impAug2;
        let relVel = closVel1.subtr(closVel2);
        let sepVel = vector2_1.Vector2.dot(relVel, this.axis);
        let new_sepVel = -sepVel * Math.min(this.o1.elasticity, this.o2.elasticity);
        let vsep_diff = new_sepVel - sepVel;
        let impulse = vsep_diff / (this.o1.invMass + this.o2.invMass + impAug1 + impAug2);
        let impulseVec = this.axis.mult(impulse);
        //3. Changing the velocities
        this.o1.velocity = this.o1.velocity.add(impulseVec.mult(this.o1.invMass));
        this.o2.velocity = this.o2.velocity.add(impulseVec.mult(-this.o2.invMass));
        this.o1.angVelocity += this.o1.invInertia * vector2_1.Vector2.cross(collArm1, impulseVec);
        this.o2.angVelocity -= this.o2.invInertia * vector2_1.Vector2.cross(collArm2, impulseVec);
    }
}
exports.Collision = Collision;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.World = exports.Pyramid = exports.Box = exports.Wall = exports.Ball = exports.Body = exports.Triangle = exports.Rectangle = exports.Line = exports.Circle = exports.userInput = exports.Vector2 = void 0;
var vector2_1 = __webpack_require__(/*! ./vector2 */ "./src/vector2.ts");
Object.defineProperty(exports, "Vector2", ({ enumerable: true, get: function () { return vector2_1.Vector2; } }));
var input_1 = __webpack_require__(/*! ./input */ "./src/input.ts");
Object.defineProperty(exports, "userInput", ({ enumerable: true, get: function () { return input_1.userInput; } }));
/*
    Shapes
*/
var circle_1 = __webpack_require__(/*! ./shapes/circle */ "./src/shapes/circle.ts");
Object.defineProperty(exports, "Circle", ({ enumerable: true, get: function () { return circle_1.Circle; } }));
var line_1 = __webpack_require__(/*! ./shapes/line */ "./src/shapes/line.ts");
Object.defineProperty(exports, "Line", ({ enumerable: true, get: function () { return line_1.Line; } }));
var retangle_1 = __webpack_require__(/*! ./shapes/retangle */ "./src/shapes/retangle.ts");
Object.defineProperty(exports, "Rectangle", ({ enumerable: true, get: function () { return retangle_1.Rectangle; } }));
var triangle_1 = __webpack_require__(/*! ./shapes/triangle */ "./src/shapes/triangle.ts");
Object.defineProperty(exports, "Triangle", ({ enumerable: true, get: function () { return triangle_1.Triangle; } }));
/*
    Bodies
*/
var body_1 = __webpack_require__(/*! ./bodies/body */ "./src/bodies/body.ts");
Object.defineProperty(exports, "Body", ({ enumerable: true, get: function () { return body_1.Body; } }));
var ball_1 = __webpack_require__(/*! ./bodies/ball */ "./src/bodies/ball.ts");
Object.defineProperty(exports, "Ball", ({ enumerable: true, get: function () { return ball_1.Ball; } }));
var wall_1 = __webpack_require__(/*! ./bodies/wall */ "./src/bodies/wall.ts");
Object.defineProperty(exports, "Wall", ({ enumerable: true, get: function () { return wall_1.Wall; } }));
var box_1 = __webpack_require__(/*! ./bodies/box */ "./src/bodies/box.ts");
Object.defineProperty(exports, "Box", ({ enumerable: true, get: function () { return box_1.Box; } }));
var pyramid_1 = __webpack_require__(/*! ./bodies/pyramid */ "./src/bodies/pyramid.ts");
Object.defineProperty(exports, "Pyramid", ({ enumerable: true, get: function () { return pyramid_1.Pyramid; } }));
/*
    Collider
*/
const collider_1 = __webpack_require__(/*! ./collider */ "./src/collider.ts");
const collision_1 = __webpack_require__(/*! ./collision */ "./src/collision.ts");
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


/***/ }),

/***/ "./src/input.ts":
/*!**********************!*\
  !*** ./src/input.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userInput = void 0;
const userInput = (body, el, keys = { left: "ArrowLeft", up: "ArrowUp", right: "ArrowRight", down: "ArrowDown", action: "Space" }) => {
    el.addEventListener("keydown", function (e) {
        if (e.code === keys.left) {
            body.left = true;
        }
        if (e.code === keys.up) {
            body.up = true;
        }
        if (e.code === keys.right) {
            body.right = true;
        }
        if (e.code === keys.down) {
            body.down = true;
        }
        if (e.code === keys.action) {
            body.action = true;
        }
    });
    el.addEventListener("keyup", function (e) {
        if (e.code === keys.left) {
            body.left = false;
        }
        if (e.code === keys.up) {
            body.up = false;
        }
        if (e.code === keys.right) {
            body.right = false;
        }
        if (e.code === keys.down) {
            body.down = false;
        }
        if (e.code === keys.action) {
            body.action = false;
        }
    });
};
exports.userInput = userInput;


/***/ }),

/***/ "./src/matrix.ts":
/*!***********************!*\
  !*** ./src/matrix.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Matrix = void 0;
const vector2_1 = __webpack_require__(/*! ./vector2 */ "./src/vector2.ts");
class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }
    multiplyVec(vec) {
        let result = new vector2_1.Vector2(0, 0);
        result.x = this.data[0][0] * vec.x + this.data[0][1] * vec.y;
        result.y = this.data[1][0] * vec.x + this.data[1][1] * vec.y;
        return result;
    }
    rotMx22(angle) {
        this.data[0][0] = Math.cos(angle);
        this.data[0][1] = -Math.sin(angle);
        this.data[1][0] = Math.sin(angle);
        this.data[1][1] = Math.cos(angle);
    }
}
exports.Matrix = Matrix;


/***/ }),

/***/ "./src/shapes/circle.ts":
/*!******************************!*\
  !*** ./src/shapes/circle.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Circle = void 0;
const vector2_1 = __webpack_require__(/*! ../vector2 */ "./src/vector2.ts");
class Circle {
    constructor(x, y, radius) {
        this.layer = -2;
        this.color = "";
        this.vertex = [];
        this.position = new vector2_1.Vector2(x, y);
        this.radius = radius;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        if (!this.color) {
            ctx.strokeStyle = "black";
            ctx.stroke();
        }
        else {
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        ctx.fillStyle = "";
        ctx.closePath();
    }
}
exports.Circle = Circle;


/***/ }),

/***/ "./src/shapes/line.ts":
/*!****************************!*\
  !*** ./src/shapes/line.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Line = void 0;
const vector2_1 = __webpack_require__(/*! ../vector2 */ "./src/vector2.ts");
class Line {
    constructor(x0, y0, x1, y1) {
        this.color = "";
        this.vertex = [];
        this.vertex[0] = new vector2_1.Vector2(x0, y0);
        this.vertex[1] = new vector2_1.Vector2(x1, y1);
        this.direction = this.vertex[1].subtr(this.vertex[0]).unit();
        this.magnitude = this.vertex[1].subtr(this.vertex[0]).mag();
        this.position = new vector2_1.Vector2((this.vertex[0].x + this.vertex[1].x) / 2, (this.vertex[0].y + this.vertex[1].y) / 2);
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.vertex[0].x, this.vertex[0].y);
        ctx.lineTo(this.vertex[1].x, this.vertex[1].y);
        if (!this.color) {
            ctx.strokeStyle = "black";
            ctx.stroke();
        }
        else {
            ctx.strokeStyle = this.color;
            ctx.stroke();
        }
        ctx.strokeStyle = "";
        ctx.closePath();
    }
}
exports.Line = Line;


/***/ }),

/***/ "./src/shapes/retangle.ts":
/*!********************************!*\
  !*** ./src/shapes/retangle.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rectangle = void 0;
const vector2_1 = __webpack_require__(/*! ../vector2 */ "./src/vector2.ts");
const matrix_1 = __webpack_require__(/*! ../matrix */ "./src/matrix.ts");
class Rectangle {
    constructor(x1, y1, x2, y2, width) {
        this.color = "";
        this.vertex = [];
        this.vertex[0] = new vector2_1.Vector2(x1, y1);
        this.vertex[1] = new vector2_1.Vector2(x2, y2);
        this.direction = this.vertex[1].subtr(this.vertex[0]).unit();
        this.refDirection = this.vertex[1].subtr(this.vertex[0]).unit();
        this.length = this.vertex[1].subtr(this.vertex[0]).mag();
        this.width = width;
        this.vertex[2] = this.vertex[1].add(this.direction.normal().mult(this.width));
        this.vertex[3] = this.vertex[2].add(this.direction.mult(-this.length));
        this.position = this.vertex[0]
            .add(this.direction.mult(this.length / 2))
            .add(this.direction.normal().mult(this.width / 2));
        this.angle = 0;
        this.rotMat = new matrix_1.Matrix(2, 2);
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.vertex[0].x, this.vertex[0].y);
        ctx.lineTo(this.vertex[1].x, this.vertex[1].y);
        ctx.lineTo(this.vertex[2].x, this.vertex[2].y);
        ctx.lineTo(this.vertex[3].x, this.vertex[3].y);
        ctx.lineTo(this.vertex[0].x, this.vertex[0].y);
        if (!this.color) {
            ctx.strokeStyle = "black";
            ctx.stroke();
        }
        else {
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        ctx.fillStyle = "";
        ctx.closePath();
    }
    getVertices(angle) {
        this.rotMat.rotMx22(angle);
        this.direction = this.rotMat.multiplyVec(this.refDirection);
        this.vertex[0] = this.position
            .add(this.direction.mult(-this.length / 2))
            .add(this.direction.normal().mult(this.width / 2));
        this.vertex[1] = this.position
            .add(this.direction.mult(-this.length / 2))
            .add(this.direction.normal().mult(-this.width / 2));
        this.vertex[2] = this.position
            .add(this.direction.mult(this.length / 2))
            .add(this.direction.normal().mult(-this.width / 2));
        this.vertex[3] = this.position
            .add(this.direction.mult(this.length / 2))
            .add(this.direction.normal().mult(this.width / 2));
    }
}
exports.Rectangle = Rectangle;


/***/ }),

/***/ "./src/shapes/triangle.ts":
/*!********************************!*\
  !*** ./src/shapes/triangle.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Triangle = void 0;
const vector2_1 = __webpack_require__(/*! ../vector2 */ "./src/vector2.ts");
const matrix_1 = __webpack_require__(/*! ../matrix */ "./src/matrix.ts");
class Triangle {
    constructor(x1, y1, x2, y2, x3, y3) {
        this.color = "";
        this.vertex = [];
        this.vertex[0] = new vector2_1.Vector2(x1, y1);
        this.vertex[1] = new vector2_1.Vector2(x2, y2);
        this.vertex[2] = new vector2_1.Vector2(x3, y3);
        this.position = new vector2_1.Vector2((this.vertex[0].x + this.vertex[1].x + this.vertex[2].x) / 3, (this.vertex[0].y + this.vertex[1].y + this.vertex[2].y) / 3);
        this.direction = this.vertex[0].subtr(this.position).unit();
        this.refDir = this.direction;
        this.refDiam = [];
        this.refDiam[0] = this.vertex[0].subtr(this.position);
        this.refDiam[1] = this.vertex[1].subtr(this.position);
        this.refDiam[2] = this.vertex[2].subtr(this.position);
        this.angle = 0;
        this.rotMat = new matrix_1.Matrix(2, 2);
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.vertex[0].x, this.vertex[0].y);
        ctx.lineTo(this.vertex[1].x, this.vertex[1].y);
        ctx.lineTo(this.vertex[2].x, this.vertex[2].y);
        ctx.lineTo(this.vertex[0].x, this.vertex[0].y);
        if (!this.color) {
            ctx.strokeStyle = "black";
            ctx.stroke();
        }
        else {
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        ctx.fillStyle = "";
        ctx.closePath();
    }
    getVertices(angle) {
        this.rotMat.rotMx22(angle);
        this.direction = this.rotMat.multiplyVec(this.refDir);
        this.vertex[0] = this.position.add(this.rotMat.multiplyVec(this.refDiam[0]));
        this.vertex[1] = this.position.add(this.rotMat.multiplyVec(this.refDiam[1]));
        this.vertex[2] = this.position.add(this.rotMat.multiplyVec(this.refDiam[2]));
    }
}
exports.Triangle = Triangle;


/***/ }),

/***/ "./src/vector2.ts":
/*!************************!*\
  !*** ./src/vector2.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qy9DSDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7Ozs7OztVQzdDZjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2ltcGxlLXBoeXNpY3MtdHMvLi9zcmMvYm9kaWVzL2JhbGwudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlLXBoeXNpY3MtdHMvLi9zcmMvYm9kaWVzL2JvZHkudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlLXBoeXNpY3MtdHMvLi9zcmMvYm9kaWVzL2JveC50cyIsIndlYnBhY2s6Ly9zaW1wbGUtcGh5c2ljcy10cy8uL3NyYy9ib2RpZXMvcHlyYW1pZC50cyIsIndlYnBhY2s6Ly9zaW1wbGUtcGh5c2ljcy10cy8uL3NyYy9ib2RpZXMvd2FsbC50cyIsIndlYnBhY2s6Ly9zaW1wbGUtcGh5c2ljcy10cy8uL3NyYy9jb2xsaWRlci50cyIsIndlYnBhY2s6Ly9zaW1wbGUtcGh5c2ljcy10cy8uL3NyYy9jb2xsaXNpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlLXBoeXNpY3MtdHMvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlLXBoeXNpY3MtdHMvLi9zcmMvaW5wdXQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlLXBoeXNpY3MtdHMvLi9zcmMvbWF0cml4LnRzIiwid2VicGFjazovL3NpbXBsZS1waHlzaWNzLXRzLy4vc3JjL3NoYXBlcy9jaXJjbGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlLXBoeXNpY3MtdHMvLi9zcmMvc2hhcGVzL2xpbmUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlLXBoeXNpY3MtdHMvLi9zcmMvc2hhcGVzL3JldGFuZ2xlLnRzIiwid2VicGFjazovL3NpbXBsZS1waHlzaWNzLXRzLy4vc3JjL3NoYXBlcy90cmlhbmdsZS50cyIsIndlYnBhY2s6Ly9zaW1wbGUtcGh5c2ljcy10cy8uL3NyYy92ZWN0b3IyLnRzIiwid2VicGFjazovL3NpbXBsZS1waHlzaWNzLXRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NpbXBsZS1waHlzaWNzLXRzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc2ltcGxlLXBoeXNpY3MtdHMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3NpbXBsZS1waHlzaWNzLXRzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkJhbGwgPSB2b2lkIDA7XHJcbmNvbnN0IGJvZHlfMSA9IHJlcXVpcmUoXCIuL2JvZHlcIik7XHJcbmNvbnN0IF9fMSA9IHJlcXVpcmUoXCIuLlwiKTtcclxuY29uc3QgdmVjdG9yMl8xID0gcmVxdWlyZShcIi4uL3ZlY3RvcjJcIik7XHJcbmNsYXNzIEJhbGwgZXh0ZW5kcyBib2R5XzEuQm9keSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCByYWRpdXMsIG1hc3MpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBuZXcgdmVjdG9yMl8xLlZlY3RvcjIoeCwgeSk7XHJcbiAgICAgICAgdGhpcy5jb21wb3NpdGlvbiA9IFtuZXcgX18xLkNpcmNsZSh4LCB5LCByYWRpdXMpXTtcclxuICAgICAgICB0aGlzLm1hc3MgPSBtYXNzO1xyXG4gICAgICAgIGlmICh0aGlzLm1hc3MgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pbnZNYXNzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW52TWFzcyA9IDEgLyB0aGlzLm1hc3M7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0UG9zaXRpb24oeCwgeSwgYSA9IHRoaXMuYW5nbGUpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnNldCh4LCB5KTtcclxuICAgICAgICB0aGlzLmNvbXBvc2l0aW9uWzBdLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBzdXBlci51cGRhdGUoKTtcclxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMucG9zaXRpb24uYWRkKHRoaXMudmVsb2NpdHkpLngsIHRoaXMucG9zaXRpb24uYWRkKHRoaXMudmVsb2NpdHkpLnkpO1xyXG4gICAgfVxyXG4gICAga2V5Q29udHJvbCgpIHtcclxuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbi54ID0gMDtcclxuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbi55ID0gMDtcclxuICAgICAgICBpZiAodGhpcy5sZWZ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uLnggLT0gdGhpcy5rZXlGb3JjZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudXApIHtcclxuICAgICAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24ueSAtPSB0aGlzLmtleUZvcmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5yaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbi54ICs9IHRoaXMua2V5Rm9yY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRvd24pIHtcclxuICAgICAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24ueSArPSB0aGlzLmtleUZvcmNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLkJhbGwgPSBCYWxsO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkJvZHkgPSB2b2lkIDA7XHJcbmNvbnN0IHZlY3RvcjJfMSA9IHJlcXVpcmUoXCIuLi92ZWN0b3IyXCIpO1xyXG5jbGFzcyBCb2R5IHtcclxuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xyXG4gICAgICAgIHRoaXMudXAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmRvd24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxlZnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbXBvc2l0aW9uID0gW107XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IG5ldyB2ZWN0b3IyXzEuVmVjdG9yMih4LCB5KTtcclxuICAgICAgICB0aGlzLm1hc3MgPSAwO1xyXG4gICAgICAgIHRoaXMuaW52TWFzcyA9IDA7XHJcbiAgICAgICAgdGhpcy5pbmVydGlhID0gMDtcclxuICAgICAgICB0aGlzLmludkluZXJ0aWEgPSAwO1xyXG4gICAgICAgIHRoaXMuZWxhc3RpY2l0eSA9IDE7XHJcbiAgICAgICAgdGhpcy5mcmljdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy5hbmdGcmljdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXhTcGVlZCA9IDA7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IDA7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy51cCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZG93biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGVmdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmlnaHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSBuZXcgdmVjdG9yMl8xLlZlY3RvcjIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24gPSBuZXcgdmVjdG9yMl8xLlZlY3RvcjIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5rZXlGb3JjZSA9IDE7XHJcbiAgICAgICAgdGhpcy5hbmdLZXlGb3JjZSA9IDAuMTtcclxuICAgICAgICB0aGlzLmFuZ2xlID0gMDtcclxuICAgICAgICB0aGlzLmFuZ1ZlbG9jaXR5ID0gMDtcclxuICAgIH1cclxuICAgIGRyYXcoY3R4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLmNvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmNvbXBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9zaXRpb25baV0uZHJhdyhjdHgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IHRoaXMuYWNjZWxlcmF0aW9uLnVuaXQoKS5tdWx0KHRoaXMua2V5Rm9yY2UpO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5LmFkZCh0aGlzLmFjY2VsZXJhdGlvbik7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHkubXVsdCgxIC0gdGhpcy5mcmljdGlvbik7XHJcbiAgICAgICAgaWYgKHRoaXMudmVsb2NpdHkubWFnKCkgPiB0aGlzLm1heFNwZWVkICYmIHRoaXMubWF4U3BlZWQgIT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHkudW5pdCgpLm11bHQodGhpcy5tYXhTcGVlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYW5nVmVsb2NpdHkgKj0gMSAtIHRoaXMuYW5nRnJpY3Rpb247XHJcbiAgICB9XHJcbiAgICBrZXlDb250cm9sKCkgeyB9XHJcbiAgICBzZXRDb2xvcihjb2xvcikge1xyXG4gICAgICAgIHRoaXMuY29tcG9zaXRpb24uZm9yRWFjaCgoY29tcCkgPT4ge1xyXG4gICAgICAgICAgICBjb21wLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Cb2R5ID0gQm9keTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Cb3ggPSB2b2lkIDA7XHJcbmNvbnN0IGJvZHlfMSA9IHJlcXVpcmUoXCIuLi9ib2RpZXMvYm9keVwiKTtcclxuY29uc3QgX18xID0gcmVxdWlyZShcIi4uXCIpO1xyXG5jbGFzcyBCb3ggZXh0ZW5kcyBib2R5XzEuQm9keSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4MSwgeTEsIHgyLCB5Miwgd2lkdGgsIG1hc3MpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuY29tcG9zaXRpb24gPSBbbmV3IF9fMS5SZWN0YW5nbGUoeDEsIHkxLCB4MiwgeTIsIC13aWR0aCldO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLmNvbXBvc2l0aW9uWzBdLnBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMubWFzcyA9IG1hc3M7XHJcbiAgICAgICAgaWYgKHRoaXMubWFzcyA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmludk1hc3MgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pbnZNYXNzID0gMSAvIHRoaXMubWFzcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbmVydGlhID0gKHRoaXMubWFzcyAqICh0aGlzLmNvbXBvc2l0aW9uWzBdLndpZHRoICoqIDIgKyB0aGlzLmNvbXBvc2l0aW9uWzBdLmxlbmd0aCAqKiAyKSkgLyAxMjtcclxuICAgICAgICBpZiAodGhpcy5tYXNzID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW52SW5lcnRpYSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmludkluZXJ0aWEgPSAxIC8gdGhpcy5pbmVydGlhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGtleUNvbnRyb2woKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXApIHtcclxuICAgICAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24gPSB0aGlzLmNvbXBvc2l0aW9uWzBdLmRpci5tdWx0KC10aGlzLmtleUZvcmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZG93bikge1xyXG4gICAgICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IHRoaXMuY29tcG9zaXRpb25bMF0uZGlyLm11bHQodGhpcy5rZXlGb3JjZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmxlZnQpIHtcclxuICAgICAgICAgICAgdGhpcy5hbmdWZWxvY2l0eSA9IC10aGlzLmFuZ0tleUZvcmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5yaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLmFuZ1ZlbG9jaXR5ID0gdGhpcy5hbmdLZXlGb3JjZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnVwICYmICF0aGlzLmRvd24pIHtcclxuICAgICAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24uc2V0KDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldFBvc2l0aW9uKHgsIHksIGEgPSB0aGlzLmFuZ2xlKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5zZXQoeCwgeSk7XHJcbiAgICAgICAgdGhpcy5hbmdsZSA9IGE7XHJcbiAgICAgICAgdGhpcy5jb21wb3NpdGlvblswXS5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5jb21wb3NpdGlvblswXS5nZXRWZXJ0aWNlcyh0aGlzLmFuZ2xlICsgdGhpcy5hbmdWZWxvY2l0eSk7XHJcbiAgICAgICAgdGhpcy5hbmdsZSArPSB0aGlzLmFuZ1ZlbG9jaXR5O1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5wb3NpdGlvbi5hZGQodGhpcy52ZWxvY2l0eSkueCwgdGhpcy5wb3NpdGlvbi5hZGQodGhpcy52ZWxvY2l0eSkueSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Cb3ggPSBCb3g7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuUHlyYW1pZCA9IHZvaWQgMDtcclxuY29uc3QgYm9keV8xID0gcmVxdWlyZShcIi4vYm9keVwiKTtcclxuY29uc3QgX18xID0gcmVxdWlyZShcIi4uXCIpO1xyXG5jbGFzcyBQeXJhbWlkIGV4dGVuZHMgYm9keV8xLkJvZHkge1xyXG4gICAgY29uc3RydWN0b3IoeDEsIHkxLCByLCBtKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmNvbXBvc2l0aW9uID0gW107XHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByO1xyXG4gICAgICAgIGxldCBjZW50ZXIgPSBuZXcgX18xLlZlY3RvcjIoeDEsIHkxKTtcclxuICAgICAgICBsZXQgdXBEaXIgPSBuZXcgX18xLlZlY3RvcjIoMCwgLTEpO1xyXG4gICAgICAgIGxldCBwMSA9IGNlbnRlci5hZGQodXBEaXIubXVsdChyKSk7XHJcbiAgICAgICAgbGV0IHAyID0gY2VudGVyLmFkZCh1cERpci5tdWx0KC1yIC8gMikpLmFkZCh1cERpci5ub3JtYWwoKS5tdWx0KCgtciAqIE1hdGguc3FydCgzKSkgLyAyKSk7XHJcbiAgICAgICAgbGV0IHAzID0gY2VudGVyLmFkZCh1cERpci5tdWx0KC1yIC8gMikpLmFkZCh1cERpci5ub3JtYWwoKS5tdWx0KChyICogTWF0aC5zcXJ0KDMpKSAvIDIpKTtcclxuICAgICAgICB0aGlzLmNvbXBvc2l0aW9uLnB1c2gobmV3IF9fMS5UcmlhbmdsZShwMS54LCBwMS55LCBwMi54LCBwMi55LCBwMy54LCBwMy55KSk7XHJcbiAgICAgICAgLy8gcDEgPSBjZW50ZXIuYWRkKHVwRGlyLm11bHQoLXIpKTtcclxuICAgICAgICAvLyBwMiA9IGNlbnRlci5hZGQodXBEaXIubXVsdChyIC8gMikpLmFkZCh1cERpci5ub3JtYWwoKS5tdWx0KCgtciAqIE1hdGguc3FydCgzKSkgLyAyKSk7XHJcbiAgICAgICAgLy8gcDMgPSBjZW50ZXIuYWRkKHVwRGlyLm11bHQociAvIDIpKS5hZGQodXBEaXIubm9ybWFsKCkubXVsdCgociAqIE1hdGguc3FydCgzKSkgLyAyKSk7XHJcbiAgICAgICAgLy8gdGhpcy5jb21wLnB1c2gobmV3IFRyaWFuZ2xlKHAxLngsIHAxLnksIHAyLngsIHAyLnksIHAzLngsIHAzLnkpKTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5jb21wb3NpdGlvblswXS5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLm1hc3MgPSBtO1xyXG4gICAgICAgIGlmICh0aGlzLm1hc3MgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pbnZNYXNzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW52TWFzcyA9IDEgLyB0aGlzLm1hc3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5lcnRpYSA9ICh0aGlzLm1hc3MgKiAoMiAqIHRoaXMucmFkaXVzKSAqKiAyKSAvIDEyO1xyXG4gICAgICAgIGlmICh0aGlzLm1hc3MgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pbnZJbmVydGlhID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW52SW5lcnRpYSA9IDEgLyB0aGlzLmluZXJ0aWE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAga2V5Q29udHJvbCgpIHtcclxuICAgICAgICBpZiAodGhpcy51cCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IHRoaXMuY29tcG9zaXRpb25bMF0uZGlyZWN0aW9uLm11bHQoLXRoaXMua2V5Rm9yY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5kb3duKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gdGhpcy5jb21wb3NpdGlvblswXS5kaXJlY3Rpb24ubXVsdCh0aGlzLmtleUZvcmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubGVmdCkge1xyXG4gICAgICAgICAgICB0aGlzLmFuZ1ZlbG9jaXR5ID0gLXRoaXMuYW5nS2V5Rm9yY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnJpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5nVmVsb2NpdHkgPSB0aGlzLmFuZ0tleUZvcmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMudXAgJiYgIXRoaXMuZG93bikge1xyXG4gICAgICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbi5zZXQoMCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0UG9zaXRpb24oeCwgeSwgYSA9IHRoaXMuYW5nbGUpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnNldCh4LCB5KTtcclxuICAgICAgICB0aGlzLmFuZ2xlID0gYTtcclxuICAgICAgICB0aGlzLmNvbXBvc2l0aW9uWzBdLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcclxuICAgICAgICAvLyB0aGlzLmNvbXBvc2l0aW9uWzFdLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLmNvbXBvc2l0aW9uWzBdLmdldFZlcnRpY2VzKHRoaXMuYW5nbGUgKyB0aGlzLmFuZ1ZlbG9jaXR5KTtcclxuICAgICAgICAvLyB0aGlzLmNvbXBvc2l0aW9uWzFdLmdldFZlcnRpY2VzKHRoaXMuYW5nbGUgKyB0aGlzLmFuZ1ZlbG9jaXR5KTtcclxuICAgICAgICB0aGlzLmFuZ2xlICs9IHRoaXMuYW5nVmVsb2NpdHk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLnZlbG9jaXR5KS54LCB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLnZlbG9jaXR5KS55KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlB5cmFtaWQgPSBQeXJhbWlkO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLldhbGwgPSB2b2lkIDA7XHJcbmNvbnN0IGJvZHlfMSA9IHJlcXVpcmUoXCIuL2JvZHlcIik7XHJcbmNvbnN0IF9fMSA9IHJlcXVpcmUoXCIuLlwiKTtcclxuY2xhc3MgV2FsbCBleHRlbmRzIGJvZHlfMS5Cb2R5IHtcclxuICAgIGNvbnN0cnVjdG9yKHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gbmV3IF9fMS5WZWN0b3IyKHgxLCB5MSk7XHJcbiAgICAgICAgdGhpcy5lbmQgPSBuZXcgX18xLlZlY3RvcjIoeDIsIHkyKTtcclxuICAgICAgICB0aGlzLmNvbXBvc2l0aW9uID0gW25ldyBfXzEuTGluZSh4MSwgeTEsIHgyLCB5MildO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5lbmQuc3VidHIodGhpcy5zdGFydCkudW5pdCgpO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBuZXcgX18xLlZlY3RvcjIoKHgxICsgeDIpIC8gMiwgKHkxICsgeTIpIC8gMik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5XYWxsID0gV2FsbDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Db2xsaWRlciA9IHZvaWQgMDtcclxuY29uc3QgdmVjdG9yMl8xID0gcmVxdWlyZShcIi4vdmVjdG9yMlwiKTtcclxuLy8gaW1wb3J0IHsgQm9keSB9IGZyb20gXCIuL2JvZGllcy9ib2R5XCI7XHJcbmNvbnN0IF8xID0gcmVxdWlyZShcIi5cIik7XHJcbmNsYXNzIENvbGxpZGVyIHtcclxuICAgIHNhdChvMSwgbzIpIHtcclxuICAgICAgICBsZXQgbWluT3ZlcmxhcCA9IG51bGw7XHJcbiAgICAgICAgbGV0IHNtYWxsZXN0QXhpcztcclxuICAgICAgICBsZXQgdmVydGV4T2JqO1xyXG4gICAgICAgIGxldCBheGVzID0gdGhpcy5maW5kQXhlcyhvMSwgbzIpO1xyXG4gICAgICAgIGxldCBwcm9qMSwgcHJvajI7XHJcbiAgICAgICAgbGV0IGZpcnN0U2hhcGVBeGVzID0gdGhpcy5nZXRTaGFwZUF4ZXMobzEpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXhlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBwcm9qMSA9IHRoaXMucHJvalNoYXBlT250b0F4aXMoYXhlc1tpXSwgbzEpO1xyXG4gICAgICAgICAgICBwcm9qMiA9IHRoaXMucHJvalNoYXBlT250b0F4aXMoYXhlc1tpXSwgbzIpO1xyXG4gICAgICAgICAgICBsZXQgb3ZlcmxhcCA9IE1hdGgubWluKHByb2oxLm1heCwgcHJvajIubWF4KSAtIE1hdGgubWF4KHByb2oxLm1pbiwgcHJvajIubWluKTtcclxuICAgICAgICAgICAgaWYgKG92ZXJsYXAgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKHByb2oxLm1heCA+IHByb2oyLm1heCAmJiBwcm9qMS5taW4gPCBwcm9qMi5taW4pIHx8IChwcm9qMS5tYXggPCBwcm9qMi5tYXggJiYgcHJvajEubWluID4gcHJvajIubWluKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pbnMgPSBNYXRoLmFicyhwcm9qMS5taW4gLSBwcm9qMi5taW4pO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1heHMgPSBNYXRoLmFicyhwcm9qMS5tYXggLSBwcm9qMi5tYXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1pbnMgPCBtYXhzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxhcCArPSBtaW5zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxhcCArPSBtYXhzO1xyXG4gICAgICAgICAgICAgICAgICAgIGF4ZXNbaV0gPSBheGVzW2ldLm11bHQoLTEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvdmVybGFwIDwgbWluT3ZlcmxhcCB8fCBtaW5PdmVybGFwID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBtaW5PdmVybGFwID0gb3ZlcmxhcDtcclxuICAgICAgICAgICAgICAgIHNtYWxsZXN0QXhpcyA9IGF4ZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IGZpcnN0U2hhcGVBeGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4T2JqID0gbzI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2oxLm1heCA+IHByb2oyLm1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbGVzdEF4aXMgPSBheGVzW2ldLm11bHQoLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleE9iaiA9IG8xO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9qMS5tYXggPCBwcm9qMi5tYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc21hbGxlc3RBeGlzID0gYXhlc1tpXS5tdWx0KC0xKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbnRhY3RWZXJ0ZXggPSB0aGlzLnByb2pTaGFwZU9udG9BeGlzKHNtYWxsZXN0QXhpcywgdmVydGV4T2JqKS5jb2xsVmVydGV4O1xyXG4gICAgICAgIGlmICh2ZXJ0ZXhPYmogPT09IG8yKSB7XHJcbiAgICAgICAgICAgIHNtYWxsZXN0QXhpcyA9IHNtYWxsZXN0QXhpcy5tdWx0KC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcGVuOiBtaW5PdmVybGFwLFxyXG4gICAgICAgICAgICBheGlzOiBzbWFsbGVzdEF4aXMsXHJcbiAgICAgICAgICAgIHZlcnRleDogY29udGFjdFZlcnRleCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29sbGlkZShvMSwgbzIpIHtcclxuICAgICAgICBsZXQgYmVzdFNhdCA9IHtcclxuICAgICAgICAgICAgcGVuOiBudWxsLFxyXG4gICAgICAgICAgICBheGlzOiBudWxsLFxyXG4gICAgICAgICAgICB2ZXJ0ZXg6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBpZiAob2JqIGluc3RhbmNlb2YgQ2lyY2xlKVxyXG4gICAgICAgIGZvciAobGV0IG8xY29tcCA9IDA7IG8xY29tcCA8IG8xLmNvbXBvc2l0aW9uLmxlbmd0aDsgbzFjb21wKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbzJjb21wID0gMDsgbzJjb21wIDwgbzIuY29tcG9zaXRpb24ubGVuZ3RoOyBvMmNvbXArKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNhdCA9IHRoaXMuc2F0KG8xLmNvbXBvc2l0aW9uW28xY29tcF0sIG8yLmNvbXBvc2l0aW9uW28yY29tcF0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzYXQuZXJyb3IgJiYgc2F0LnBlbiA+IGJlc3RTYXQucGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdFNhdCA9IHRoaXMuc2F0KG8xLmNvbXBvc2l0aW9uW28xY29tcF0sIG8yLmNvbXBvc2l0aW9uW28yY29tcF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiZXN0U2F0LnBlbiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYmVzdFNhdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRTaGFwZUF4ZXMob2JqKSB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIF8xLkNpcmNsZSB8fCBvYmogaW5zdGFuY2VvZiBfMS5MaW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiAob2JqIGluc3RhbmNlb2YgUmVjdGFuZ2xlKSB7XHJcbiAgICAgICAgLy8gICByZXR1cm4gMjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYgKG9iaiBpbnN0YW5jZW9mIFRyaWFuZ2xlKSB7XHJcbiAgICAgICAgLy8gICByZXR1cm4gMztcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbiAgICBmaW5kQXhlcyhvMSwgbzIpIHtcclxuICAgICAgICBsZXQgYXhlcyA9IFtdO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICBDaXJjbGUgdG8gQ2lyY2xlIGNvbGxpc2lvblxyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYgKG8xIGluc3RhbmNlb2YgXzEuQ2lyY2xlICYmIG8yIGluc3RhbmNlb2YgXzEuQ2lyY2xlKSB7XHJcbiAgICAgICAgICAgIGlmIChvMi5wb3NpdGlvbi5zdWJ0cihvMS5wb3NpdGlvbikubWFnKCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBheGVzLnB1c2gobzIucG9zaXRpb24uc3VidHIobzEucG9zaXRpb24pLnVuaXQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBheGVzLnB1c2gobmV3IHZlY3RvcjJfMS5WZWN0b3IyKE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCkpLnVuaXQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGF4ZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICBIYW5kbGUgQ2lyY2xlcyBjb2xsaXNpb25cclxuICAgICAgICAqL1xyXG4gICAgICAgIGlmIChvMSBpbnN0YW5jZW9mIF8xLkNpcmNsZSkge1xyXG4gICAgICAgICAgICBheGVzLnB1c2godGhpcy5jbG9zZXN0VmVydGV4VG9Qb2ludChvMiwgbzEucG9zaXRpb24pLnN1YnRyKG8xLnBvc2l0aW9uKS51bml0KCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobzIgaW5zdGFuY2VvZiBfMS5DaXJjbGUpIHtcclxuICAgICAgICAgICAgYXhlcy5wdXNoKHRoaXMuY2xvc2VzdFZlcnRleFRvUG9pbnQobzEsIG8yLnBvc2l0aW9uKS5zdWJ0cihvMi5wb3NpdGlvbikudW5pdCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLypcclxuICAgICAgICAgIEhhbmRsZSBMaW5lcyBjb2xsaXNpb25cclxuICAgICAgICAqL1xyXG4gICAgICAgIGlmIChvMSBpbnN0YW5jZW9mIF8xLkxpbmUpIHtcclxuICAgICAgICAgICAgYXhlcy5wdXNoKG8xLmRpcmVjdGlvbi5ub3JtYWwoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvMiBpbnN0YW5jZW9mIF8xLkxpbmUpIHtcclxuICAgICAgICAgICAgYXhlcy5wdXNoKG8yLmRpcmVjdGlvbi5ub3JtYWwoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICBIYW5kbGUgUmV0YW5nbGVzIGNvbGxpc2lvblxyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYgKG8xIGluc3RhbmNlb2YgXzEuUmVjdGFuZ2xlKSB7XHJcbiAgICAgICAgICAgIGF4ZXMucHVzaChvMS5kaXJlY3Rpb24ubm9ybWFsKCkpO1xyXG4gICAgICAgICAgICBheGVzLnB1c2gobzEuZGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG8yIGluc3RhbmNlb2YgXzEuUmVjdGFuZ2xlKSB7XHJcbiAgICAgICAgICAgIGF4ZXMucHVzaChvMi5kaXJlY3Rpb24ubm9ybWFsKCkpO1xyXG4gICAgICAgICAgICBheGVzLnB1c2gobzIuZGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgKG8xIGluc3RhbmNlb2YgVHJpYW5nbGUpIHtcclxuICAgICAgICAvLyAgIGF4ZXMucHVzaChvMS52ZXJ0ZXhbMV0uc3VidHIobzEudmVydGV4WzBdKS5ub3JtYWwoKSk7XHJcbiAgICAgICAgLy8gICBheGVzLnB1c2gobzEudmVydGV4WzJdLnN1YnRyKG8xLnZlcnRleFsxXSkubm9ybWFsKCkpO1xyXG4gICAgICAgIC8vICAgYXhlcy5wdXNoKG8xLnZlcnRleFswXS5zdWJ0cihvMS52ZXJ0ZXhbMl0pLm5vcm1hbCgpKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYgKG8yIGluc3RhbmNlb2YgVHJpYW5nbGUpIHtcclxuICAgICAgICAvLyAgIGF4ZXMucHVzaChvMi52ZXJ0ZXhbMV0uc3VidHIobzIudmVydGV4WzBdKS5ub3JtYWwoKSk7XHJcbiAgICAgICAgLy8gICBheGVzLnB1c2gobzIudmVydGV4WzJdLnN1YnRyKG8yLnZlcnRleFsxXSkubm9ybWFsKCkpO1xyXG4gICAgICAgIC8vICAgYXhlcy5wdXNoKG8yLnZlcnRleFswXS5zdWJ0cihvMi52ZXJ0ZXhbMl0pLm5vcm1hbCgpKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgcmV0dXJuIGF4ZXM7XHJcbiAgICB9XHJcbiAgICBwcm9qU2hhcGVPbnRvQXhpcyhheGlzLCBvYmopIHtcclxuICAgICAgICB0aGlzLnNldEJhbGxWZXJ0aWNlc0Fsb25nQXhpcyhvYmosIGF4aXMpO1xyXG4gICAgICAgIGxldCBtaW4gPSB2ZWN0b3IyXzEuVmVjdG9yMi5kb3QoYXhpcywgb2JqLnZlcnRleFswXSk7XHJcbiAgICAgICAgbGV0IG1heCA9IG1pbjtcclxuICAgICAgICBsZXQgY29sbFZlcnRleCA9IG9iai52ZXJ0ZXhbMF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmoudmVydGV4Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwID0gdmVjdG9yMl8xLlZlY3RvcjIuZG90KGF4aXMsIG9iai52ZXJ0ZXhbaV0pO1xyXG4gICAgICAgICAgICBpZiAocCA8IG1pbikge1xyXG4gICAgICAgICAgICAgICAgbWluID0gcDtcclxuICAgICAgICAgICAgICAgIGNvbGxWZXJ0ZXggPSBvYmoudmVydGV4W2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBtYXggPSBwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pbjogbWluLFxyXG4gICAgICAgICAgICBtYXg6IG1heCxcclxuICAgICAgICAgICAgY29sbFZlcnRleDogY29sbFZlcnRleCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY2xvc2VzdFZlcnRleFRvUG9pbnQob2JqLCBwb3NpdGlvbikge1xyXG4gICAgICAgIGxldCBjbG9zZXN0VmVydGV4O1xyXG4gICAgICAgIGxldCBtaW5EaXN0ID0gbnVsbDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iai52ZXJ0ZXgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHBvc2l0aW9uLnN1YnRyKG9iai52ZXJ0ZXhbaV0pLm1hZygpIDwgbWluRGlzdCB8fCBtaW5EaXN0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0VmVydGV4ID0gb2JqLnZlcnRleFtpXTtcclxuICAgICAgICAgICAgICAgIG1pbkRpc3QgPSBwb3NpdGlvbi5zdWJ0cihvYmoudmVydGV4W2ldKS5tYWcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2xvc2VzdFZlcnRleDtcclxuICAgIH1cclxuICAgIHNldEJhbGxWZXJ0aWNlc0Fsb25nQXhpcyhvYmosIGF4aXMpIHtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgXzEuQ2lyY2xlKSB7XHJcbiAgICAgICAgICAgIG9iai52ZXJ0ZXhbMF0gPSBvYmoucG9zaXRpb24uYWRkKGF4aXMudW5pdCgpLm11bHQoLW9iai5yYWRpdXMpKTtcclxuICAgICAgICAgICAgb2JqLnZlcnRleFsxXSA9IG9iai5wb3NpdGlvbi5hZGQoYXhpcy51bml0KCkubXVsdChvYmoucmFkaXVzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9Db2xsaXNpb24gaXMgaGFuZGxlZCBiYXNlZCBvbiB0aGUgYm9keSBsYXllclxyXG4gICAgLy9MYXllciAtMTogY29sbGlzaW9uIGhhbmRsaW5nIHdpdGggbGF5ZXIgMCBib2RpZXMgT05MWVxyXG4gICAgLy9MYXllciAtMjogbm8gY29sbGlzaW9uIGhhbmRsaW5nIHdpdGggYW55IG90aGVyIGJvZHlcclxuICAgIGNvbGxpc2lvbkxheWVyKGJvZHkxLCBib2R5Mikge1xyXG4gICAgICAgIHJldHVybiAoKGJvZHkxLmxheWVyID09PSBib2R5Mi5sYXllciAmJiAhKGJvZHkxLmxheWVyID09PSAtMSB8fCBib2R5MS5sYXllciA9PT0gLTIpKSB8fFxyXG4gICAgICAgICAgICAoYm9keTEubGF5ZXIgPT09IDAgJiYgYm9keTIubGF5ZXIgIT09IC0yKSB8fFxyXG4gICAgICAgICAgICAoYm9keTIubGF5ZXIgPT09IDAgJiYgYm9keTEubGF5ZXIgIT09IC0yKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Db2xsaWRlciA9IENvbGxpZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNvbGxpc2lvbiA9IHZvaWQgMDtcclxuY29uc3QgdmVjdG9yMl8xID0gcmVxdWlyZShcIi4vdmVjdG9yMlwiKTtcclxuY2xhc3MgQ29sbGlzaW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKG8xLCBvMiwgYXhpcywgcGVuLCB2ZXJ0ZXgpIHtcclxuICAgICAgICB0aGlzLm8xID0gbzE7XHJcbiAgICAgICAgdGhpcy5vMiA9IG8yO1xyXG4gICAgICAgIHRoaXMuYXhpcyA9IGF4aXM7XHJcbiAgICAgICAgdGhpcy5wZW5ldHJhdGlvbiA9IHBlbjtcclxuICAgICAgICB0aGlzLnZlcnRleCA9IHZlcnRleDtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAgIFJlc29sdmUgY29sbGlzaW9uIHBlbmV0cmF0aW9uXHJcbiAgICAqL1xyXG4gICAgcGVuUmVzKCkge1xyXG4gICAgICAgIGxldCBwZW5SZXNvbHV0aW9uID0gdGhpcy5heGlzLm11bHQodGhpcy5wZW5ldHJhdGlvbiAvICh0aGlzLm8xLmludk1hc3MgKyB0aGlzLm8yLmludk1hc3MpKTtcclxuICAgICAgICB0aGlzLm8xLnBvc2l0aW9uID0gdGhpcy5vMS5wb3NpdGlvbi5hZGQocGVuUmVzb2x1dGlvbi5tdWx0KHRoaXMubzEuaW52TWFzcykpO1xyXG4gICAgICAgIHRoaXMubzIucG9zaXRpb24gPSB0aGlzLm8yLnBvc2l0aW9uLmFkZChwZW5SZXNvbHV0aW9uLm11bHQoLXRoaXMubzIuaW52TWFzcykpO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgICAgUHJvY2VzcyBjb2xsaXNpb25cclxuICAgICovXHJcbiAgICBjb2xsUmVzKCkge1xyXG4gICAgICAgIC8vMS4gQ2xvc2luZyB2ZWxvY2l0eVxyXG4gICAgICAgIGxldCBjb2xsQXJtMSA9IHRoaXMudmVydGV4LnN1YnRyKHRoaXMubzEuY29tcG9zaXRpb25bMF0ucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCByb3RWZWwxID0gbmV3IHZlY3RvcjJfMS5WZWN0b3IyKC10aGlzLm8xLmFuZ1ZlbG9jaXR5ICogY29sbEFybTEueSwgdGhpcy5vMS5hbmdWZWxvY2l0eSAqIGNvbGxBcm0xLngpO1xyXG4gICAgICAgIGxldCBjbG9zVmVsMSA9IHRoaXMubzEudmVsb2NpdHkuYWRkKHJvdFZlbDEpO1xyXG4gICAgICAgIGxldCBjb2xsQXJtMiA9IHRoaXMudmVydGV4LnN1YnRyKHRoaXMubzIuY29tcG9zaXRpb25bMF0ucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCByb3RWZWwyID0gbmV3IHZlY3RvcjJfMS5WZWN0b3IyKC10aGlzLm8yLmFuZ1ZlbG9jaXR5ICogY29sbEFybTIueSwgdGhpcy5vMi5hbmdWZWxvY2l0eSAqIGNvbGxBcm0yLngpO1xyXG4gICAgICAgIGxldCBjbG9zVmVsMiA9IHRoaXMubzIudmVsb2NpdHkuYWRkKHJvdFZlbDIpO1xyXG4gICAgICAgIC8vMi4gSW1wdWxzZSBhdWdtZW50YXRpb25cclxuICAgICAgICBsZXQgaW1wQXVnMSA9IHZlY3RvcjJfMS5WZWN0b3IyLmNyb3NzKGNvbGxBcm0xLCB0aGlzLmF4aXMpO1xyXG4gICAgICAgIGltcEF1ZzEgPSBpbXBBdWcxICogdGhpcy5vMS5pbnZJbmVydGlhICogaW1wQXVnMTtcclxuICAgICAgICBsZXQgaW1wQXVnMiA9IHZlY3RvcjJfMS5WZWN0b3IyLmNyb3NzKGNvbGxBcm0yLCB0aGlzLmF4aXMpO1xyXG4gICAgICAgIGltcEF1ZzIgPSBpbXBBdWcyICogdGhpcy5vMi5pbnZJbmVydGlhICogaW1wQXVnMjtcclxuICAgICAgICBsZXQgcmVsVmVsID0gY2xvc1ZlbDEuc3VidHIoY2xvc1ZlbDIpO1xyXG4gICAgICAgIGxldCBzZXBWZWwgPSB2ZWN0b3IyXzEuVmVjdG9yMi5kb3QocmVsVmVsLCB0aGlzLmF4aXMpO1xyXG4gICAgICAgIGxldCBuZXdfc2VwVmVsID0gLXNlcFZlbCAqIE1hdGgubWluKHRoaXMubzEuZWxhc3RpY2l0eSwgdGhpcy5vMi5lbGFzdGljaXR5KTtcclxuICAgICAgICBsZXQgdnNlcF9kaWZmID0gbmV3X3NlcFZlbCAtIHNlcFZlbDtcclxuICAgICAgICBsZXQgaW1wdWxzZSA9IHZzZXBfZGlmZiAvICh0aGlzLm8xLmludk1hc3MgKyB0aGlzLm8yLmludk1hc3MgKyBpbXBBdWcxICsgaW1wQXVnMik7XHJcbiAgICAgICAgbGV0IGltcHVsc2VWZWMgPSB0aGlzLmF4aXMubXVsdChpbXB1bHNlKTtcclxuICAgICAgICAvLzMuIENoYW5naW5nIHRoZSB2ZWxvY2l0aWVzXHJcbiAgICAgICAgdGhpcy5vMS52ZWxvY2l0eSA9IHRoaXMubzEudmVsb2NpdHkuYWRkKGltcHVsc2VWZWMubXVsdCh0aGlzLm8xLmludk1hc3MpKTtcclxuICAgICAgICB0aGlzLm8yLnZlbG9jaXR5ID0gdGhpcy5vMi52ZWxvY2l0eS5hZGQoaW1wdWxzZVZlYy5tdWx0KC10aGlzLm8yLmludk1hc3MpKTtcclxuICAgICAgICB0aGlzLm8xLmFuZ1ZlbG9jaXR5ICs9IHRoaXMubzEuaW52SW5lcnRpYSAqIHZlY3RvcjJfMS5WZWN0b3IyLmNyb3NzKGNvbGxBcm0xLCBpbXB1bHNlVmVjKTtcclxuICAgICAgICB0aGlzLm8yLmFuZ1ZlbG9jaXR5IC09IHRoaXMubzIuaW52SW5lcnRpYSAqIHZlY3RvcjJfMS5WZWN0b3IyLmNyb3NzKGNvbGxBcm0yLCBpbXB1bHNlVmVjKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkNvbGxpc2lvbiA9IENvbGxpc2lvbjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Xb3JsZCA9IGV4cG9ydHMuUHlyYW1pZCA9IGV4cG9ydHMuQm94ID0gZXhwb3J0cy5XYWxsID0gZXhwb3J0cy5CYWxsID0gZXhwb3J0cy5Cb2R5ID0gZXhwb3J0cy5UcmlhbmdsZSA9IGV4cG9ydHMuUmVjdGFuZ2xlID0gZXhwb3J0cy5MaW5lID0gZXhwb3J0cy5DaXJjbGUgPSBleHBvcnRzLnVzZXJJbnB1dCA9IGV4cG9ydHMuVmVjdG9yMiA9IHZvaWQgMDtcclxudmFyIHZlY3RvcjJfMSA9IHJlcXVpcmUoXCIuL3ZlY3RvcjJcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlZlY3RvcjJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZlY3RvcjJfMS5WZWN0b3IyOyB9IH0pO1xyXG52YXIgaW5wdXRfMSA9IHJlcXVpcmUoXCIuL2lucHV0XCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ1c2VySW5wdXRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlucHV0XzEudXNlcklucHV0OyB9IH0pO1xyXG4vKlxyXG4gICAgU2hhcGVzXHJcbiovXHJcbnZhciBjaXJjbGVfMSA9IHJlcXVpcmUoXCIuL3NoYXBlcy9jaXJjbGVcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNpcmNsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY2lyY2xlXzEuQ2lyY2xlOyB9IH0pO1xyXG52YXIgbGluZV8xID0gcmVxdWlyZShcIi4vc2hhcGVzL2xpbmVcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkxpbmVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGxpbmVfMS5MaW5lOyB9IH0pO1xyXG52YXIgcmV0YW5nbGVfMSA9IHJlcXVpcmUoXCIuL3NoYXBlcy9yZXRhbmdsZVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUmVjdGFuZ2xlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZXRhbmdsZV8xLlJlY3RhbmdsZTsgfSB9KTtcclxudmFyIHRyaWFuZ2xlXzEgPSByZXF1aXJlKFwiLi9zaGFwZXMvdHJpYW5nbGVcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlRyaWFuZ2xlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0cmlhbmdsZV8xLlRyaWFuZ2xlOyB9IH0pO1xyXG4vKlxyXG4gICAgQm9kaWVzXHJcbiovXHJcbnZhciBib2R5XzEgPSByZXF1aXJlKFwiLi9ib2RpZXMvYm9keVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQm9keVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYm9keV8xLkJvZHk7IH0gfSk7XHJcbnZhciBiYWxsXzEgPSByZXF1aXJlKFwiLi9ib2RpZXMvYmFsbFwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQmFsbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYmFsbF8xLkJhbGw7IH0gfSk7XHJcbnZhciB3YWxsXzEgPSByZXF1aXJlKFwiLi9ib2RpZXMvd2FsbFwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiV2FsbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gd2FsbF8xLldhbGw7IH0gfSk7XHJcbnZhciBib3hfMSA9IHJlcXVpcmUoXCIuL2JvZGllcy9ib3hcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkJveFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYm94XzEuQm94OyB9IH0pO1xyXG52YXIgcHlyYW1pZF8xID0gcmVxdWlyZShcIi4vYm9kaWVzL3B5cmFtaWRcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlB5cmFtaWRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHB5cmFtaWRfMS5QeXJhbWlkOyB9IH0pO1xyXG4vKlxyXG4gICAgQ29sbGlkZXJcclxuKi9cclxuY29uc3QgY29sbGlkZXJfMSA9IHJlcXVpcmUoXCIuL2NvbGxpZGVyXCIpO1xyXG5jb25zdCBjb2xsaXNpb25fMSA9IHJlcXVpcmUoXCIuL2NvbGxpc2lvblwiKTtcclxuY2xhc3MgV29ybGQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlciA9IG5ldyBjb2xsaWRlcl8xLkNvbGxpZGVyKCk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoY3R4ID0gZmFsc2UsIGNhbnZhcyA9IGZhbHNlKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgIFVwZGF0ZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25zID0gW107IC8vcmVzZXQgY29sbGlzaW9uc1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKG9iai5ib2R5LmtleUNvbnRyb2wpXHJcbiAgICAgICAgICAgICAgICBvYmouYm9keS5rZXlDb250cm9sKCk7XHJcbiAgICAgICAgICAgIGlmIChvYmouYm9keS51cGRhdGUpXHJcbiAgICAgICAgICAgICAgICBvYmouYm9keS51cGRhdGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm9iamVjdHMuZm9yRWFjaCgob2JqLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBib2R5UGFpciA9IGluZGV4ICsgMTsgYm9keVBhaXIgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBib2R5UGFpcisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2sgPSB0aGlzLmNvbGxpZGVyLmNvbGxpc2lvbkxheWVyKHRoaXMuZ2V0QnlJbmRleChpbmRleCkuYm9keSwgdGhpcy5nZXRCeUluZGV4KGJvZHlQYWlyKS5ib2R5KTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGVjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiZXN0U2F0ID0gdGhpcy5jb2xsaWRlci5jb2xsaWRlKHRoaXMuZ2V0QnlJbmRleChpbmRleCkuYm9keSwgdGhpcy5nZXRCeUluZGV4KGJvZHlQYWlyKS5ib2R5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmVzdFNhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxpc2lvbnMucHVzaChuZXcgY29sbGlzaW9uXzEuQ29sbGlzaW9uKHRoaXMuZ2V0QnlJbmRleChpbmRleCkuYm9keSwgdGhpcy5nZXRCeUluZGV4KGJvZHlQYWlyKS5ib2R5LCBiZXN0U2F0LmF4aXMsIGJlc3RTYXQucGVuLCBiZXN0U2F0LnZlcnRleCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9ucy5mb3JFYWNoKChjKSA9PiB7XHJcbiAgICAgICAgICAgIGMucGVuUmVzKCk7XHJcbiAgICAgICAgICAgIGMuY29sbFJlcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICBEcmF3XHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZiAoY3R4ICYmIGNhbnZhcykge1xyXG4gICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy5jbGllbnRXaWR0aCwgY2FudmFzLmNsaWVudEhlaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0cy5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgICAgICAgICAgIG9iai5ib2R5LmRyYXcoY3R4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWRkKGlkLCBib2R5KSB7XHJcbiAgICAgICAgbGV0IGNoZWNrID0gdGhpcy5nZXQoaWQpO1xyXG4gICAgICAgIGlmIChjaGVjaylcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICBib2R5LFxyXG4gICAgICAgICAgICBzZXQoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5W2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gob2JqKTtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgZ2V0KGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5maWx0ZXIoKG9iaikgPT4gb2JqLmlkID09PSBpZClbMF0gfHwgZmFsc2U7XHJcbiAgICB9XHJcbiAgICBnZXRCeUluZGV4KGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0c1tpZF07XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Xb3JsZCA9IFdvcmxkO1xyXG5pZiAodHlwZW9mIHdpbmRvdyAhPSBcInVuZGVmaW5lZFwiKVxyXG4gICAgd2luZG93LlBoeXNpY3MgPSB0aGlzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnVzZXJJbnB1dCA9IHZvaWQgMDtcclxuY29uc3QgdXNlcklucHV0ID0gKGJvZHksIGVsLCBrZXlzID0geyBsZWZ0OiBcIkFycm93TGVmdFwiLCB1cDogXCJBcnJvd1VwXCIsIHJpZ2h0OiBcIkFycm93UmlnaHRcIiwgZG93bjogXCJBcnJvd0Rvd25cIiwgYWN0aW9uOiBcIlNwYWNlXCIgfSkgPT4ge1xyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoZS5jb2RlID09PSBrZXlzLmxlZnQpIHtcclxuICAgICAgICAgICAgYm9keS5sZWZ0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGUuY29kZSA9PT0ga2V5cy51cCkge1xyXG4gICAgICAgICAgICBib2R5LnVwID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGUuY29kZSA9PT0ga2V5cy5yaWdodCkge1xyXG4gICAgICAgICAgICBib2R5LnJpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGUuY29kZSA9PT0ga2V5cy5kb3duKSB7XHJcbiAgICAgICAgICAgIGJvZHkuZG93biA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlLmNvZGUgPT09IGtleXMuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGJvZHkuYWN0aW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChlLmNvZGUgPT09IGtleXMubGVmdCkge1xyXG4gICAgICAgICAgICBib2R5LmxlZnQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGUuY29kZSA9PT0ga2V5cy51cCkge1xyXG4gICAgICAgICAgICBib2R5LnVwID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlLmNvZGUgPT09IGtleXMucmlnaHQpIHtcclxuICAgICAgICAgICAgYm9keS5yaWdodCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZS5jb2RlID09PSBrZXlzLmRvd24pIHtcclxuICAgICAgICAgICAgYm9keS5kb3duID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlLmNvZGUgPT09IGtleXMuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGJvZHkuYWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydHMudXNlcklucHV0ID0gdXNlcklucHV0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLk1hdHJpeCA9IHZvaWQgMDtcclxuY29uc3QgdmVjdG9yMl8xID0gcmVxdWlyZShcIi4vdmVjdG9yMlwiKTtcclxuY2xhc3MgTWF0cml4IHtcclxuICAgIGNvbnN0cnVjdG9yKHJvd3MsIGNvbHMpIHtcclxuICAgICAgICB0aGlzLnJvd3MgPSByb3dzO1xyXG4gICAgICAgIHRoaXMuY29scyA9IGNvbHM7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFbaV0gPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHM7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhW2ldW2pdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG11bHRpcGx5VmVjKHZlYykge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgdmVjdG9yMl8xLlZlY3RvcjIoMCwgMCk7XHJcbiAgICAgICAgcmVzdWx0LnggPSB0aGlzLmRhdGFbMF1bMF0gKiB2ZWMueCArIHRoaXMuZGF0YVswXVsxXSAqIHZlYy55O1xyXG4gICAgICAgIHJlc3VsdC55ID0gdGhpcy5kYXRhWzFdWzBdICogdmVjLnggKyB0aGlzLmRhdGFbMV1bMV0gKiB2ZWMueTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcm90TXgyMihhbmdsZSkge1xyXG4gICAgICAgIHRoaXMuZGF0YVswXVswXSA9IE1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgICB0aGlzLmRhdGFbMF1bMV0gPSAtTWF0aC5zaW4oYW5nbGUpO1xyXG4gICAgICAgIHRoaXMuZGF0YVsxXVswXSA9IE1hdGguc2luKGFuZ2xlKTtcclxuICAgICAgICB0aGlzLmRhdGFbMV1bMV0gPSBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5NYXRyaXggPSBNYXRyaXg7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQ2lyY2xlID0gdm9pZCAwO1xyXG5jb25zdCB2ZWN0b3IyXzEgPSByZXF1aXJlKFwiLi4vdmVjdG9yMlwiKTtcclxuY2xhc3MgQ2lyY2xlIHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHJhZGl1cykge1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSAtMjtcclxuICAgICAgICB0aGlzLmNvbG9yID0gXCJcIjtcclxuICAgICAgICB0aGlzLnZlcnRleCA9IFtdO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBuZXcgdmVjdG9yMl8xLlZlY3RvcjIoeCwgeSk7XHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XHJcbiAgICB9XHJcbiAgICBkcmF3KGN0eCkge1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHguYXJjKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLnJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xyXG4gICAgICAgIGlmICghdGhpcy5jb2xvcikge1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJcIjtcclxuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5DaXJjbGUgPSBDaXJjbGU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuTGluZSA9IHZvaWQgMDtcclxuY29uc3QgdmVjdG9yMl8xID0gcmVxdWlyZShcIi4uL3ZlY3RvcjJcIik7XHJcbmNsYXNzIExpbmUge1xyXG4gICAgY29uc3RydWN0b3IoeDAsIHkwLCB4MSwgeTEpIHtcclxuICAgICAgICB0aGlzLmNvbG9yID0gXCJcIjtcclxuICAgICAgICB0aGlzLnZlcnRleCA9IFtdO1xyXG4gICAgICAgIHRoaXMudmVydGV4WzBdID0gbmV3IHZlY3RvcjJfMS5WZWN0b3IyKHgwLCB5MCk7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhbMV0gPSBuZXcgdmVjdG9yMl8xLlZlY3RvcjIoeDEsIHkxKTtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMudmVydGV4WzFdLnN1YnRyKHRoaXMudmVydGV4WzBdKS51bml0KCk7XHJcbiAgICAgICAgdGhpcy5tYWduaXR1ZGUgPSB0aGlzLnZlcnRleFsxXS5zdWJ0cih0aGlzLnZlcnRleFswXSkubWFnKCk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IG5ldyB2ZWN0b3IyXzEuVmVjdG9yMigodGhpcy52ZXJ0ZXhbMF0ueCArIHRoaXMudmVydGV4WzFdLngpIC8gMiwgKHRoaXMudmVydGV4WzBdLnkgKyB0aGlzLnZlcnRleFsxXS55KSAvIDIpO1xyXG4gICAgfVxyXG4gICAgZHJhdyhjdHgpIHtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyh0aGlzLnZlcnRleFswXS54LCB0aGlzLnZlcnRleFswXS55KTtcclxuICAgICAgICBjdHgubGluZVRvKHRoaXMudmVydGV4WzFdLngsIHRoaXMudmVydGV4WzFdLnkpO1xyXG4gICAgICAgIGlmICghdGhpcy5jb2xvcikge1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJcIjtcclxuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5MaW5lID0gTGluZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5SZWN0YW5nbGUgPSB2b2lkIDA7XHJcbmNvbnN0IHZlY3RvcjJfMSA9IHJlcXVpcmUoXCIuLi92ZWN0b3IyXCIpO1xyXG5jb25zdCBtYXRyaXhfMSA9IHJlcXVpcmUoXCIuLi9tYXRyaXhcIik7XHJcbmNsYXNzIFJlY3RhbmdsZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4MSwgeTEsIHgyLCB5Miwgd2lkdGgpIHtcclxuICAgICAgICB0aGlzLmNvbG9yID0gXCJcIjtcclxuICAgICAgICB0aGlzLnZlcnRleCA9IFtdO1xyXG4gICAgICAgIHRoaXMudmVydGV4WzBdID0gbmV3IHZlY3RvcjJfMS5WZWN0b3IyKHgxLCB5MSk7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhbMV0gPSBuZXcgdmVjdG9yMl8xLlZlY3RvcjIoeDIsIHkyKTtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMudmVydGV4WzFdLnN1YnRyKHRoaXMudmVydGV4WzBdKS51bml0KCk7XHJcbiAgICAgICAgdGhpcy5yZWZEaXJlY3Rpb24gPSB0aGlzLnZlcnRleFsxXS5zdWJ0cih0aGlzLnZlcnRleFswXSkudW5pdCgpO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy52ZXJ0ZXhbMV0uc3VidHIodGhpcy52ZXJ0ZXhbMF0pLm1hZygpO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLnZlcnRleFsyXSA9IHRoaXMudmVydGV4WzFdLmFkZCh0aGlzLmRpcmVjdGlvbi5ub3JtYWwoKS5tdWx0KHRoaXMud2lkdGgpKTtcclxuICAgICAgICB0aGlzLnZlcnRleFszXSA9IHRoaXMudmVydGV4WzJdLmFkZCh0aGlzLmRpcmVjdGlvbi5tdWx0KC10aGlzLmxlbmd0aCkpO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnZlcnRleFswXVxyXG4gICAgICAgICAgICAuYWRkKHRoaXMuZGlyZWN0aW9uLm11bHQodGhpcy5sZW5ndGggLyAyKSlcclxuICAgICAgICAgICAgLmFkZCh0aGlzLmRpcmVjdGlvbi5ub3JtYWwoKS5tdWx0KHRoaXMud2lkdGggLyAyKSk7XHJcbiAgICAgICAgdGhpcy5hbmdsZSA9IDA7XHJcbiAgICAgICAgdGhpcy5yb3RNYXQgPSBuZXcgbWF0cml4XzEuTWF0cml4KDIsIDIpO1xyXG4gICAgfVxyXG4gICAgZHJhdyhjdHgpIHtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyh0aGlzLnZlcnRleFswXS54LCB0aGlzLnZlcnRleFswXS55KTtcclxuICAgICAgICBjdHgubGluZVRvKHRoaXMudmVydGV4WzFdLngsIHRoaXMudmVydGV4WzFdLnkpO1xyXG4gICAgICAgIGN0eC5saW5lVG8odGhpcy52ZXJ0ZXhbMl0ueCwgdGhpcy52ZXJ0ZXhbMl0ueSk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh0aGlzLnZlcnRleFszXS54LCB0aGlzLnZlcnRleFszXS55KTtcclxuICAgICAgICBjdHgubGluZVRvKHRoaXMudmVydGV4WzBdLngsIHRoaXMudmVydGV4WzBdLnkpO1xyXG4gICAgICAgIGlmICghdGhpcy5jb2xvcikge1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJcIjtcclxuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICB9XHJcbiAgICBnZXRWZXJ0aWNlcyhhbmdsZSkge1xyXG4gICAgICAgIHRoaXMucm90TWF0LnJvdE14MjIoYW5nbGUpO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5yb3RNYXQubXVsdGlwbHlWZWModGhpcy5yZWZEaXJlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMudmVydGV4WzBdID0gdGhpcy5wb3NpdGlvblxyXG4gICAgICAgICAgICAuYWRkKHRoaXMuZGlyZWN0aW9uLm11bHQoLXRoaXMubGVuZ3RoIC8gMikpXHJcbiAgICAgICAgICAgIC5hZGQodGhpcy5kaXJlY3Rpb24ubm9ybWFsKCkubXVsdCh0aGlzLndpZHRoIC8gMikpO1xyXG4gICAgICAgIHRoaXMudmVydGV4WzFdID0gdGhpcy5wb3NpdGlvblxyXG4gICAgICAgICAgICAuYWRkKHRoaXMuZGlyZWN0aW9uLm11bHQoLXRoaXMubGVuZ3RoIC8gMikpXHJcbiAgICAgICAgICAgIC5hZGQodGhpcy5kaXJlY3Rpb24ubm9ybWFsKCkubXVsdCgtdGhpcy53aWR0aCAvIDIpKTtcclxuICAgICAgICB0aGlzLnZlcnRleFsyXSA9IHRoaXMucG9zaXRpb25cclxuICAgICAgICAgICAgLmFkZCh0aGlzLmRpcmVjdGlvbi5tdWx0KHRoaXMubGVuZ3RoIC8gMikpXHJcbiAgICAgICAgICAgIC5hZGQodGhpcy5kaXJlY3Rpb24ubm9ybWFsKCkubXVsdCgtdGhpcy53aWR0aCAvIDIpKTtcclxuICAgICAgICB0aGlzLnZlcnRleFszXSA9IHRoaXMucG9zaXRpb25cclxuICAgICAgICAgICAgLmFkZCh0aGlzLmRpcmVjdGlvbi5tdWx0KHRoaXMubGVuZ3RoIC8gMikpXHJcbiAgICAgICAgICAgIC5hZGQodGhpcy5kaXJlY3Rpb24ubm9ybWFsKCkubXVsdCh0aGlzLndpZHRoIC8gMikpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuUmVjdGFuZ2xlID0gUmVjdGFuZ2xlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlRyaWFuZ2xlID0gdm9pZCAwO1xyXG5jb25zdCB2ZWN0b3IyXzEgPSByZXF1aXJlKFwiLi4vdmVjdG9yMlwiKTtcclxuY29uc3QgbWF0cml4XzEgPSByZXF1aXJlKFwiLi4vbWF0cml4XCIpO1xyXG5jbGFzcyBUcmlhbmdsZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4MSwgeTEsIHgyLCB5MiwgeDMsIHkzKSB7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXggPSBbXTtcclxuICAgICAgICB0aGlzLnZlcnRleFswXSA9IG5ldyB2ZWN0b3IyXzEuVmVjdG9yMih4MSwgeTEpO1xyXG4gICAgICAgIHRoaXMudmVydGV4WzFdID0gbmV3IHZlY3RvcjJfMS5WZWN0b3IyKHgyLCB5Mik7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhbMl0gPSBuZXcgdmVjdG9yMl8xLlZlY3RvcjIoeDMsIHkzKTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gbmV3IHZlY3RvcjJfMS5WZWN0b3IyKCh0aGlzLnZlcnRleFswXS54ICsgdGhpcy52ZXJ0ZXhbMV0ueCArIHRoaXMudmVydGV4WzJdLngpIC8gMywgKHRoaXMudmVydGV4WzBdLnkgKyB0aGlzLnZlcnRleFsxXS55ICsgdGhpcy52ZXJ0ZXhbMl0ueSkgLyAzKTtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMudmVydGV4WzBdLnN1YnRyKHRoaXMucG9zaXRpb24pLnVuaXQoKTtcclxuICAgICAgICB0aGlzLnJlZkRpciA9IHRoaXMuZGlyZWN0aW9uO1xyXG4gICAgICAgIHRoaXMucmVmRGlhbSA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVmRGlhbVswXSA9IHRoaXMudmVydGV4WzBdLnN1YnRyKHRoaXMucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMucmVmRGlhbVsxXSA9IHRoaXMudmVydGV4WzFdLnN1YnRyKHRoaXMucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMucmVmRGlhbVsyXSA9IHRoaXMudmVydGV4WzJdLnN1YnRyKHRoaXMucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuYW5nbGUgPSAwO1xyXG4gICAgICAgIHRoaXMucm90TWF0ID0gbmV3IG1hdHJpeF8xLk1hdHJpeCgyLCAyKTtcclxuICAgIH1cclxuICAgIGRyYXcoY3R4KSB7XHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5tb3ZlVG8odGhpcy52ZXJ0ZXhbMF0ueCwgdGhpcy52ZXJ0ZXhbMF0ueSk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh0aGlzLnZlcnRleFsxXS54LCB0aGlzLnZlcnRleFsxXS55KTtcclxuICAgICAgICBjdHgubGluZVRvKHRoaXMudmVydGV4WzJdLngsIHRoaXMudmVydGV4WzJdLnkpO1xyXG4gICAgICAgIGN0eC5saW5lVG8odGhpcy52ZXJ0ZXhbMF0ueCwgdGhpcy52ZXJ0ZXhbMF0ueSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbG9yKSB7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIlwiO1xyXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgIH1cclxuICAgIGdldFZlcnRpY2VzKGFuZ2xlKSB7XHJcbiAgICAgICAgdGhpcy5yb3RNYXQucm90TXgyMihhbmdsZSk7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLnJvdE1hdC5tdWx0aXBseVZlYyh0aGlzLnJlZkRpcik7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhbMF0gPSB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLnJvdE1hdC5tdWx0aXBseVZlYyh0aGlzLnJlZkRpYW1bMF0pKTtcclxuICAgICAgICB0aGlzLnZlcnRleFsxXSA9IHRoaXMucG9zaXRpb24uYWRkKHRoaXMucm90TWF0Lm11bHRpcGx5VmVjKHRoaXMucmVmRGlhbVsxXSkpO1xyXG4gICAgICAgIHRoaXMudmVydGV4WzJdID0gdGhpcy5wb3NpdGlvbi5hZGQodGhpcy5yb3RNYXQubXVsdGlwbHlWZWModGhpcy5yZWZEaWFtWzJdKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5UcmlhbmdsZSA9IFRyaWFuZ2xlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlZlY3RvcjIgPSB2b2lkIDA7XHJcbmNsYXNzIFZlY3RvcjIge1xyXG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG4gICAgc2V0KHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICAgICAgdGhpcy55ID0geSB8fCAwO1xyXG4gICAgfVxyXG4gICAgY2xvbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHRoaXMueCwgdGhpcy55KTtcclxuICAgIH1cclxuICAgIGFkZCh2KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55KTtcclxuICAgIH1cclxuICAgIHN1YnRyKHYpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodGhpcy54IC0gdi54LCB0aGlzLnkgLSB2LnkpO1xyXG4gICAgfVxyXG4gICAgbWFnKCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54ICoqIDIgKyB0aGlzLnkgKiogMik7XHJcbiAgICB9XHJcbiAgICBtdWx0KG4pIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodGhpcy54ICogbiwgdGhpcy55ICogbik7XHJcbiAgICB9XHJcbiAgICBub3JtYWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKC10aGlzLnksIHRoaXMueCkudW5pdCgpO1xyXG4gICAgfVxyXG4gICAgdW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5tYWcoKSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoMCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodGhpcy54IC8gdGhpcy5tYWcoKSwgdGhpcy55IC8gdGhpcy5tYWcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGRvdCh2MSwgdjIpIHtcclxuICAgICAgICByZXR1cm4gdjEueCAqIHYyLnggKyB2MS55ICogdjIueTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjcm9zcyh2MSwgdjIpIHtcclxuICAgICAgICByZXR1cm4gdjEueCAqIHYyLnkgLSB2MS55ICogdjIueDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlZlY3RvcjIgPSBWZWN0b3IyO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=