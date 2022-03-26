import { Vector2 } from "../vector2";
export declare class Circle {
    color: string;
    vertex: any;
    position: Vector2;
    radius: number;
    layer: number;
    constructor(x: number, y: number, radius: number);
    draw(ctx: any): void;
}
