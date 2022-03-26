"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collider = void 0;
var vector2_1 = require("./vector2");
// import { Body } from "./bodies/body";
var _1 = require(".");
var Collider = /** @class */ (function () {
    function Collider() {
    }
    Collider.prototype.sat = function (o1, o2) {
        var minOverlap = null;
        var smallestAxis;
        var vertexObj;
        var axes = this.findAxes(o1, o2);
        var proj1, proj2;
        var firstShapeAxes = this.getShapeAxes(o1);
        for (var i = 0; i < axes.length; i++) {
            proj1 = this.projShapeOntoAxis(axes[i], o1);
            proj2 = this.projShapeOntoAxis(axes[i], o2);
            var overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
            if (overlap < 0) {
                return {
                    error: true,
                };
            }
            if ((proj1.max > proj2.max && proj1.min < proj2.min) || (proj1.max < proj2.max && proj1.min > proj2.min)) {
                var mins = Math.abs(proj1.min - proj2.min);
                var maxs = Math.abs(proj1.max - proj2.max);
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
        var contactVertex = this.projShapeOntoAxis(smallestAxis, vertexObj).collVertex;
        if (vertexObj === o2) {
            smallestAxis = smallestAxis.mult(-1);
        }
        return {
            pen: minOverlap,
            axis: smallestAxis,
            vertex: contactVertex,
        };
    };
    Collider.prototype.collide = function (o1, o2) {
        var bestSat = {
            pen: null,
            axis: null,
            vertex: null,
        };
        // if (obj instanceof Circle)
        for (var o1comp = 0; o1comp < o1.composition.length; o1comp++) {
            for (var o2comp = 0; o2comp < o2.composition.length; o2comp++) {
                var sat = this.sat(o1.composition[o1comp], o2.composition[o2comp]);
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
    };
    Collider.prototype.getShapeAxes = function (obj) {
        if (obj instanceof _1.Circle || obj instanceof _1.Line) {
            return 1;
        }
        // if (obj instanceof Rectangle) {
        //   return 2;
        // }
        // if (obj instanceof Triangle) {
        //   return 3;
        // }
    };
    Collider.prototype.findAxes = function (o1, o2) {
        var axes = [];
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
    };
    Collider.prototype.projShapeOntoAxis = function (axis, obj) {
        this.setBallVerticesAlongAxis(obj, axis);
        var min = vector2_1.Vector2.dot(axis, obj.vertex[0]);
        var max = min;
        var collVertex = obj.vertex[0];
        for (var i = 0; i < obj.vertex.length; i++) {
            var p = vector2_1.Vector2.dot(axis, obj.vertex[i]);
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
    };
    Collider.prototype.closestVertexToPoint = function (obj, position) {
        var closestVertex;
        var minDist = null;
        for (var i = 0; i < obj.vertex.length; i++) {
            if (position.subtr(obj.vertex[i]).mag() < minDist || minDist === null) {
                closestVertex = obj.vertex[i];
                minDist = position.subtr(obj.vertex[i]).mag();
            }
        }
        return closestVertex;
    };
    Collider.prototype.setBallVerticesAlongAxis = function (obj, axis) {
        if (obj instanceof _1.Circle) {
            obj.vertex[0] = obj.position.add(axis.unit().mult(-obj.radius));
            obj.vertex[1] = obj.position.add(axis.unit().mult(obj.radius));
        }
    };
    //Collision is handled based on the body layer
    //Layer -1: collision handling with layer 0 bodies ONLY
    //Layer -2: no collision handling with any other body
    Collider.prototype.collisionLayer = function (body1, body2) {
        return ((body1.layer === body2.layer && !(body1.layer === -1 || body1.layer === -2)) ||
            (body1.layer === 0 && body2.layer !== -2) ||
            (body2.layer === 0 && body1.layer !== -2));
    };
    return Collider;
}());
exports.Collider = Collider;
