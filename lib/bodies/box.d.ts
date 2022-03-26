import { Body } from "../bodies/body";
export declare class Box extends Body {
    constructor(x1: any, y1: any, x2: any, y2: any, width: any, mass: any);
    keyControl(): void;
    setPosition(x: any, y: any, a?: number): void;
    update(): void;
}
