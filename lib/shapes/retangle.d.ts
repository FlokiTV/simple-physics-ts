export declare class Rectangle {
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
