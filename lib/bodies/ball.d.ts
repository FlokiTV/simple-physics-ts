import { Body } from "./body";
export declare class Ball extends Body {
    constructor(x: any, y: any, radius: any, mass: any);
    setPosition(x: any, y: any, a?: number): void;
    update(): void;
    keyControl(): void;
}
