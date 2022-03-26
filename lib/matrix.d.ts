import { Vector2 } from "./vector2";
export declare class Matrix {
    rows: any;
    cols: any;
    data: any;
    constructor(rows: any, cols: any);
    multiplyVec(vec: any): Vector2;
    rotMx22(angle: any): void;
}
