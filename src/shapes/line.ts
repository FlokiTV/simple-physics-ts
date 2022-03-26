import { Vector2 } from "../vector2";

export class Line {
  vertex: any;
  color: any;
  direction: any;
  magnitude: any;
  position: any;
  constructor(x0, y0, x1, y1) {
    this.color = "";
    this.vertex = [];
    this.vertex[0] = new Vector2(x0, y0);
    this.vertex[1] = new Vector2(x1, y1);
    this.direction = this.vertex[1].subtr(this.vertex[0]).unit();
    this.magnitude = this.vertex[1].subtr(this.vertex[0]).mag();
    this.position = new Vector2((this.vertex[0].x + this.vertex[1].x) / 2, (this.vertex[0].y + this.vertex[1].y) / 2);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.vertex[0].x, this.vertex[0].y);
    ctx.lineTo(this.vertex[1].x, this.vertex[1].y);
    if (!this.color) {
      ctx.strokeStyle = "black";
      ctx.stroke();
    } else {
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
    ctx.strokeStyle = "";
    ctx.closePath();
  }
}
