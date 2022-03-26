import { Body } from "./body";
import { Vector2, Line } from "..";

export class Wall extends Body {
  start: any;
  end: any;
  direction: any;
  constructor(x1, y1, x2, y2) {
    super();
    this.start = new Vector2(x1, y1);
    this.end = new Vector2(x2, y2);
    this.composition = [new Line(x1, y1, x2, y2)];
    this.direction = this.end.subtr(this.start).unit();
    this.position = new Vector2((x1 + x2) / 2, (y1 + y2) / 2);
  }
}
