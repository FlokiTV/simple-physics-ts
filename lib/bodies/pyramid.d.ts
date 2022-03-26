import { Body } from "./body";
export declare class Pyramid extends Body {
    radius: any;
    constructor(x1: any, y1: any, r: any, m: any);
    keyControl(): void;
    setPosition(x: any, y: any, a?: number): void;
    update(): void;
}
