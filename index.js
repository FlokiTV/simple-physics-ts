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
define("vector2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Vector2 = void 0;
    var Vector2 = /** @class */ (function () {
        function Vector2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Vector2.prototype.set = function (x, y) {
            this.x = x || 0;
            this.y = y || 0;
        };
        Vector2.prototype.clone = function () {
            return new Vector2(this.x, this.y);
        };
        Vector2.prototype.add = function (v) {
            return new Vector2(this.x + v.x, this.y + v.y);
        };
        Vector2.prototype.subtr = function (v) {
            return new Vector2(this.x - v.x, this.y - v.y);
        };
        Vector2.prototype.mag = function () {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        };
        Vector2.prototype.mult = function (n) {
            return new Vector2(this.x * n, this.y * n);
        };
        Vector2.prototype.normal = function () {
            return new Vector2(-this.y, this.x).unit();
        };
        Vector2.prototype.unit = function () {
            if (this.mag() === 0) {
                return new Vector2(0, 0);
            }
            else {
                return new Vector2(this.x / this.mag(), this.y / this.mag());
            }
        };
        Vector2.dot = function (v1, v2) {
            return v1.x * v2.x + v1.y * v2.y;
        };
        Vector2.cross = function (v1, v2) {
            return v1.x * v2.y - v1.y * v2.x;
        };
        return Vector2;
    }());
    exports.Vector2 = Vector2;
});
define("collider", ["require", "exports", "vector2", "."], function (require, exports, vector2_1, _1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Collider = void 0;
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
});
define("collision", ["require", "exports", "vector2"], function (require, exports, vector2_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Collision = void 0;
    var Collision = /** @class */ (function () {
        function Collision(o1, o2, axis, pen, vertex) {
            this.o1 = o1;
            this.o2 = o2;
            this.axis = axis;
            this.penetration = pen;
            this.vertex = vertex;
        }
        /*
          Resolve collision penetration
        */
        Collision.prototype.penRes = function () {
            var penResolution = this.axis.mult(this.penetration / (this.o1.invMass + this.o2.invMass));
            this.o1.position = this.o1.position.add(penResolution.mult(this.o1.invMass));
            this.o2.position = this.o2.position.add(penResolution.mult(-this.o2.invMass));
        };
        /*
          Process collision
        */
        Collision.prototype.collRes = function () {
            //1. Closing velocity
            var collArm1 = this.vertex.subtr(this.o1.composition[0].position);
            var rotVel1 = new vector2_2.Vector2(-this.o1.angVelocity * collArm1.y, this.o1.angVelocity * collArm1.x);
            var closVel1 = this.o1.velocity.add(rotVel1);
            var collArm2 = this.vertex.subtr(this.o2.composition[0].position);
            var rotVel2 = new vector2_2.Vector2(-this.o2.angVelocity * collArm2.y, this.o2.angVelocity * collArm2.x);
            var closVel2 = this.o2.velocity.add(rotVel2);
            //2. Impulse augmentation
            var impAug1 = vector2_2.Vector2.cross(collArm1, this.axis);
            impAug1 = impAug1 * this.o1.invInertia * impAug1;
            var impAug2 = vector2_2.Vector2.cross(collArm2, this.axis);
            impAug2 = impAug2 * this.o2.invInertia * impAug2;
            var relVel = closVel1.subtr(closVel2);
            var sepVel = vector2_2.Vector2.dot(relVel, this.axis);
            var new_sepVel = -sepVel * Math.min(this.o1.elasticity, this.o2.elasticity);
            var vsep_diff = new_sepVel - sepVel;
            var impulse = vsep_diff / (this.o1.invMass + this.o2.invMass + impAug1 + impAug2);
            var impulseVec = this.axis.mult(impulse);
            //3. Changing the velocities
            this.o1.velocity = this.o1.velocity.add(impulseVec.mult(this.o1.invMass));
            this.o2.velocity = this.o2.velocity.add(impulseVec.mult(-this.o2.invMass));
            this.o1.angVelocity += this.o1.invInertia * vector2_2.Vector2.cross(collArm1, impulseVec);
            this.o2.angVelocity -= this.o2.invInertia * vector2_2.Vector2.cross(collArm2, impulseVec);
        };
        return Collision;
    }());
    exports.Collision = Collision;
});
define("input", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.userInput = void 0;
    var userInput = function (body, el, keys) {
        if (keys === void 0) { keys = { left: "ArrowLeft", up: "ArrowUp", right: "ArrowRight", down: "ArrowDown", action: "Space" }; }
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
});
define("shapes/circle", ["require", "exports", "vector2"], function (require, exports, vector2_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Circle = void 0;
    var Circle = /** @class */ (function () {
        function Circle(x, y, radius) {
            this.layer = -2;
            this.color = "";
            this.vertex = [];
            this.position = new vector2_3.Vector2(x, y);
            this.radius = radius;
        }
        Circle.prototype.draw = function (ctx) {
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
        };
        return Circle;
    }());
    exports.Circle = Circle;
});
define("shapes/line", ["require", "exports", "vector2"], function (require, exports, vector2_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Line = void 0;
    var Line = /** @class */ (function () {
        function Line(x0, y0, x1, y1) {
            this.color = "";
            this.vertex = [];
            this.vertex[0] = new vector2_4.Vector2(x0, y0);
            this.vertex[1] = new vector2_4.Vector2(x1, y1);
            this.direction = this.vertex[1].subtr(this.vertex[0]).unit();
            this.magnitude = this.vertex[1].subtr(this.vertex[0]).mag();
            this.position = new vector2_4.Vector2((this.vertex[0].x + this.vertex[1].x) / 2, (this.vertex[0].y + this.vertex[1].y) / 2);
        }
        Line.prototype.draw = function (ctx) {
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
        };
        return Line;
    }());
    exports.Line = Line;
});
define("matrix", ["require", "exports", "vector2"], function (require, exports, vector2_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Matrix = void 0;
    var Matrix = /** @class */ (function () {
        function Matrix(rows, cols) {
            this.rows = rows;
            this.cols = cols;
            this.data = [];
            for (var i = 0; i < this.rows; i++) {
                this.data[i] = [];
                for (var j = 0; j < this.cols; j++) {
                    this.data[i][j] = 0;
                }
            }
        }
        Matrix.prototype.multiplyVec = function (vec) {
            var result = new vector2_5.Vector2(0, 0);
            result.x = this.data[0][0] * vec.x + this.data[0][1] * vec.y;
            result.y = this.data[1][0] * vec.x + this.data[1][1] * vec.y;
            return result;
        };
        Matrix.prototype.rotMx22 = function (angle) {
            this.data[0][0] = Math.cos(angle);
            this.data[0][1] = -Math.sin(angle);
            this.data[1][0] = Math.sin(angle);
            this.data[1][1] = Math.cos(angle);
        };
        return Matrix;
    }());
    exports.Matrix = Matrix;
});
define("shapes/retangle", ["require", "exports", "vector2", "matrix"], function (require, exports, vector2_6, matrix_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Rectangle = void 0;
    var Rectangle = /** @class */ (function () {
        function Rectangle(x1, y1, x2, y2, width) {
            this.color = "";
            this.vertex = [];
            this.vertex[0] = new vector2_6.Vector2(x1, y1);
            this.vertex[1] = new vector2_6.Vector2(x2, y2);
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
        Rectangle.prototype.draw = function (ctx) {
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
        };
        Rectangle.prototype.getVertices = function (angle) {
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
        };
        return Rectangle;
    }());
    exports.Rectangle = Rectangle;
});
define("shapes/triangle", ["require", "exports", "vector2", "matrix"], function (require, exports, vector2_7, matrix_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Triangle = void 0;
    var Triangle = /** @class */ (function () {
        function Triangle(x1, y1, x2, y2, x3, y3) {
            this.color = "";
            this.vertex = [];
            this.vertex[0] = new vector2_7.Vector2(x1, y1);
            this.vertex[1] = new vector2_7.Vector2(x2, y2);
            this.vertex[2] = new vector2_7.Vector2(x3, y3);
            this.position = new vector2_7.Vector2((this.vertex[0].x + this.vertex[1].x + this.vertex[2].x) / 3, (this.vertex[0].y + this.vertex[1].y + this.vertex[2].y) / 3);
            this.direction = this.vertex[0].subtr(this.position).unit();
            this.refDir = this.direction;
            this.refDiam = [];
            this.refDiam[0] = this.vertex[0].subtr(this.position);
            this.refDiam[1] = this.vertex[1].subtr(this.position);
            this.refDiam[2] = this.vertex[2].subtr(this.position);
            this.angle = 0;
            this.rotMat = new matrix_2.Matrix(2, 2);
        }
        Triangle.prototype.draw = function (ctx) {
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
        };
        Triangle.prototype.getVertices = function (angle) {
            this.rotMat.rotMx22(angle);
            this.direction = this.rotMat.multiplyVec(this.refDir);
            this.vertex[0] = this.position.add(this.rotMat.multiplyVec(this.refDiam[0]));
            this.vertex[1] = this.position.add(this.rotMat.multiplyVec(this.refDiam[1]));
            this.vertex[2] = this.position.add(this.rotMat.multiplyVec(this.refDiam[2]));
        };
        return Triangle;
    }());
    exports.Triangle = Triangle;
});
define("bodies/body", ["require", "exports", "vector2"], function (require, exports, vector2_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Body = void 0;
    var Body = /** @class */ (function () {
        function Body(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.up = false;
            this.down = false;
            this.left = false;
            this.right = false;
            this.action = false;
            this.composition = [];
            this.position = new vector2_8.Vector2(x, y);
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
            this.velocity = new vector2_8.Vector2(0, 0);
            this.acceleration = new vector2_8.Vector2(0, 0);
            this.keyForce = 1;
            this.angKeyForce = 0.1;
            this.angle = 0;
            this.angVelocity = 0;
        }
        Body.prototype.draw = function (ctx) {
            if (this.color) {
                this.setColor(this.color);
            }
            for (var i in this.composition) {
                this.composition[i].draw(ctx);
            }
        };
        Body.prototype.update = function () {
            this.acceleration = this.acceleration.unit().mult(this.keyForce);
            this.velocity = this.velocity.add(this.acceleration);
            this.velocity = this.velocity.mult(1 - this.friction);
            if (this.velocity.mag() > this.maxSpeed && this.maxSpeed !== 0) {
                this.velocity = this.velocity.unit().mult(this.maxSpeed);
            }
            this.angVelocity *= 1 - this.angFriction;
        };
        Body.prototype.keyControl = function () { };
        Body.prototype.setColor = function (color) {
            this.composition.forEach(function (comp) {
                comp.color = color;
            });
        };
        return Body;
    }());
    exports.Body = Body;
});
define("bodies/ball", ["require", "exports", "bodies/body", "..", "vector2"], function (require, exports, body_1, __1, vector2_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ball = void 0;
    var Ball = /** @class */ (function (_super) {
        __extends(Ball, _super);
        function Ball(x, y, radius, mass) {
            var _this = _super.call(this) || this;
            _this.position = new vector2_9.Vector2(x, y);
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
});
define("bodies/wall", ["require", "exports", "bodies/body", ".."], function (require, exports, body_2, __2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Wall = void 0;
    var Wall = /** @class */ (function (_super) {
        __extends(Wall, _super);
        function Wall(x1, y1, x2, y2) {
            var _this = _super.call(this) || this;
            _this.start = new __2.Vector2(x1, y1);
            _this.end = new __2.Vector2(x2, y2);
            _this.composition = [new __2.Line(x1, y1, x2, y2)];
            _this.direction = _this.end.subtr(_this.start).unit();
            _this.position = new __2.Vector2((x1 + x2) / 2, (y1 + y2) / 2);
            return _this;
        }
        return Wall;
    }(body_2.Body));
    exports.Wall = Wall;
});
define("bodies/box", ["require", "exports", "bodies/body", ".."], function (require, exports, body_3, __3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Box = void 0;
    var Box = /** @class */ (function (_super) {
        __extends(Box, _super);
        function Box(x1, y1, x2, y2, width, mass) {
            var _this = _super.call(this) || this;
            _this.composition = [new __3.Rectangle(x1, y1, x2, y2, -width)];
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
    }(body_3.Body));
    exports.Box = Box;
});
define("bodies/pyramid", ["require", "exports", "bodies/body", ".."], function (require, exports, body_4, __4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pyramid = void 0;
    var Pyramid = /** @class */ (function (_super) {
        __extends(Pyramid, _super);
        function Pyramid(x1, y1, r, m) {
            var _this = _super.call(this) || this;
            _this.composition = [];
            _this.radius = r;
            var center = new __4.Vector2(x1, y1);
            var upDir = new __4.Vector2(0, -1);
            var p1 = center.add(upDir.mult(r));
            var p2 = center.add(upDir.mult(-r / 2)).add(upDir.normal().mult((-r * Math.sqrt(3)) / 2));
            var p3 = center.add(upDir.mult(-r / 2)).add(upDir.normal().mult((r * Math.sqrt(3)) / 2));
            _this.composition.push(new __4.Triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));
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
    }(body_4.Body));
    exports.Pyramid = Pyramid;
});
define("index", ["require", "exports", "vector2", "input", "shapes/circle", "shapes/line", "shapes/retangle", "shapes/triangle", "bodies/body", "bodies/ball", "bodies/wall", "bodies/box", "bodies/pyramid", "collider", "collision"], function (require, exports, vector2_10, input_1, circle_1, line_1, retangle_1, triangle_1, body_5, ball_1, wall_1, box_1, pyramid_1, collider_1, collision_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.World = exports.Pyramid = exports.Box = exports.Wall = exports.Ball = exports.Body = exports.Triangle = exports.Rectangle = exports.Line = exports.Circle = exports.userInput = exports.Vector2 = void 0;
    Object.defineProperty(exports, "Vector2", { enumerable: true, get: function () { return vector2_10.Vector2; } });
    Object.defineProperty(exports, "userInput", { enumerable: true, get: function () { return input_1.userInput; } });
    Object.defineProperty(exports, "Circle", { enumerable: true, get: function () { return circle_1.Circle; } });
    Object.defineProperty(exports, "Line", { enumerable: true, get: function () { return line_1.Line; } });
    Object.defineProperty(exports, "Rectangle", { enumerable: true, get: function () { return retangle_1.Rectangle; } });
    Object.defineProperty(exports, "Triangle", { enumerable: true, get: function () { return triangle_1.Triangle; } });
    Object.defineProperty(exports, "Body", { enumerable: true, get: function () { return body_5.Body; } });
    Object.defineProperty(exports, "Ball", { enumerable: true, get: function () { return ball_1.Ball; } });
    Object.defineProperty(exports, "Wall", { enumerable: true, get: function () { return wall_1.Wall; } });
    Object.defineProperty(exports, "Box", { enumerable: true, get: function () { return box_1.Box; } });
    Object.defineProperty(exports, "Pyramid", { enumerable: true, get: function () { return pyramid_1.Pyramid; } });
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
});
define("utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.utils = void 0;
    exports.utils = {
        round: function (number, precision) {
            var factor = Math.pow(10, precision);
            return Math.round(number * factor) / factor;
        },
        randInt: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
    };
});
