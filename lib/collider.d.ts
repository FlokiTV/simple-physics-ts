interface SATResponde {
    pen: any;
    axis: any;
    vertex: any;
    error: boolean;
}
export declare class Collider {
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
export {};
