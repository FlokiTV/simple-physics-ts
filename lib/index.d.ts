export { Vector2 } from "./vector2";
export { userInput } from "./input";
export { Circle } from "./shapes/circle";
export { Line } from "./shapes/line";
export { Rectangle } from "./shapes/retangle";
export { Triangle } from "./shapes/triangle";
export { Body } from "./bodies/body";
export { Ball } from "./bodies/ball";
export { Wall } from "./bodies/wall";
export { Box } from "./bodies/box";
export { Pyramid } from "./bodies/pyramid";
import { Collider } from "./collider";
interface Entity {
    id: string;
    body: any;
    set(key: string, value: any): Entity;
}
export declare class World {
    objects: any;
    collisions: any;
    collider: Collider;
    constructor();
    update(ctx?: any, canvas?: any): void;
    add(id: string, body: any): false | Entity;
    get(id: string): any;
    getByIndex(id: number): any;
}
