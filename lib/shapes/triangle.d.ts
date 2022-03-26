export declare class Triangle {
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
