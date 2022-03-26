declare module "vector2" {
    export class Vector2 {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        set(x: any, y: any): void;
        clone(): Vector2;
        add(v: any): Vector2;
        subtr(v: any): Vector2;
        mag(): number;
        mult(n: any): Vector2;
        normal(): Vector2;
        unit(): Vector2;
        static dot(v1: any, v2: any): number;
        static cross(v1: any, v2: any): number;
    }
}
declare module "collider" {
    interface SATResponde {
        pen: any;
        axis: any;
        vertex: any;
        error: boolean;
    }
    export class Collider {
        sat(o1: any, o2: any): SATResponde;
        collide(o1: any, o2: any): false | {
            pen: any;
            axis: any;
            vertex: any;
        };
        getShapeAxes(obj: any): number;
        findAxes(o1: any, o2: any): any[];
        projShapeOntoAxis(axis: any, obj: any): {
            min: number;
            max: number;
            collVertex: any;
        };
        closestVertexToPoint(obj: any, position: any): any;
        setBallVerticesAlongAxis(obj: any, axis: any): void;
        collisionLayer(body1: any, body2: any): boolean;
    }
}
declare module "collision" {
    export class Collision {
        o1: any;
        o2: any;
        axis: any;
        penetration: any;
        vertex: any;
        constructor(o1: any, o2: any, axis: any, pen: any, vertex: any);
        penRes(): void;
        collRes(): void;
    }
}
declare module "input" {
    export const userInput: (body: any, el: any, keys?: {
        left: string;
        up: string;
        right: string;
        down: string;
        action: string;
    }) => void;
}
declare module "shapes/circle" {
    import { Vector2 } from "vector2";
    export class Circle {
        color: string;
        vertex: any;
        position: Vector2;
        radius: number;
        layer: number;
        constructor(x: number, y: number, radius: number);
        draw(ctx: any): void;
    }
}
declare module "shapes/line" {
    export class Line {
        vertex: any;
        color: any;
        direction: any;
        magnitude: any;
        position: any;
        constructor(x0: any, y0: any, x1: any, y1: any);
        draw(ctx: any): void;
    }
}
declare module "matrix" {
    import { Vector2 } from "vector2";
    export class Matrix {
        rows: any;
        cols: any;
        data: any;
        constructor(rows: any, cols: any);
        multiplyVec(vec: any): Vector2;
        rotMx22(angle: any): void;
    }
}
declare module "shapes/retangle" {
    export class Rectangle {
        vertex: any;
        color: string;
        direction: any;
        refDirection: any;
        position: any;
        angle: any;
        length: any;
        width: any;
        rotMat: any;
        constructor(x1: any, y1: any, x2: any, y2: any, width: any);
        draw(ctx: any): void;
        getVertices(angle: any): void;
    }
}
declare module "shapes/triangle" {
    export class Triangle {
        color: string;
        vertex: any;
        position: any;
        direction: any;
        refDir: any;
        refDiam: any;
        angle: any;
        rotMat: any;
        constructor(x1: any, y1: any, x2: any, y2: any, x3: any, y3: any);
        draw(ctx: any): void;
        getVertices(angle: any): void;
    }
}
declare module "bodies/body" {
    import { Vector2 } from "vector2";
    export class Body {
        composition: any;
        position: Vector2;
        mass: number;
        invMass: number;
        inertia: number;
        invInertia: number;
        elasticity: number;
        friction: number;
        angFriction: number;
        maxSpeed: number;
        velocity: Vector2;
        acceleration: Vector2;
        angle: number;
        angVelocity: number;
        layer: number;
        color: string;
        keyForce: number;
        angKeyForce: number;
        up: boolean;
        down: boolean;
        left: boolean;
        right: boolean;
        action: boolean;
        constructor(x?: number, y?: number);
        draw(ctx: any): void;
        update(): void;
        keyControl(): void;
        setColor(color: any): void;
    }
}
declare module "bodies/ball" {
    import { Body } from "bodies/body";
    export class Ball extends Body {
        constructor(x: any, y: any, radius: any, mass: any);
        setPosition(x: any, y: any, a?: number): void;
        update(): void;
        keyControl(): void;
    }
}
declare module "bodies/wall" {
    import { Body } from "bodies/body";
    export class Wall extends Body {
        start: any;
        end: any;
        direction: any;
        constructor(x1: any, y1: any, x2: any, y2: any);
    }
}
declare module "bodies/box" {
    import { Body } from "bodies/body";
    export class Box extends Body {
        constructor(x1: any, y1: any, x2: any, y2: any, width: any, mass: any);
        keyControl(): void;
        setPosition(x: any, y: any, a?: number): void;
        update(): void;
    }
}
declare module "bodies/pyramid" {
    import { Body } from "bodies/body";
    export class Pyramid extends Body {
        radius: any;
        constructor(x1: any, y1: any, r: any, m: any);
        keyControl(): void;
        setPosition(x: any, y: any, a?: number): void;
        update(): void;
    }
}
declare module "index" {
    export { Vector2 } from "vector2";
    export { userInput } from "input";
    export { Circle } from "shapes/circle";
    export { Line } from "shapes/line";
    export { Rectangle } from "shapes/retangle";
    export { Triangle } from "shapes/triangle";
    export { Body } from "bodies/body";
    export { Ball } from "bodies/ball";
    export { Wall } from "bodies/wall";
    export { Box } from "bodies/box";
    export { Pyramid } from "bodies/pyramid";
    import { Collider } from "collider";
    interface Entity {
        id: string;
        body: any;
        set(key: string, value: any): Entity;
    }
    export class World {
        objects: any;
        collisions: any;
        collider: Collider;
        constructor();
        update(ctx?: any, canvas?: any): void;
        add(id: string, body: any): false | Entity;
        get(id: string): any;
        getByIndex(id: number): any;
    }
}
declare module "utils" {
    export const utils: {
        round(number: number, precision: number): number;
        randInt(min: number, max: number): number;
    };
}
