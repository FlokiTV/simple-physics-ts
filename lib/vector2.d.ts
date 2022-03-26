export declare class Vector2 {
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
