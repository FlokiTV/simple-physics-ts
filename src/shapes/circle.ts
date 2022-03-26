import { Vector2 } from "../vector2";

export class Circle {
  color: string;
  vertex: any;
  position: Vector2;
  radius: number;
  layer: number = -2;

  constructor(x: number, y: number, radius: number) {
    this.color = "";
    this.vertex = [];
    this.position = new Vector2(x, y);
    this.radius = radius;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    if (!this.color) {
      ctx.strokeStyle = "black";
      ctx.stroke();
    } else {
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    ctx.fillStyle = "";
    ctx.closePath();
  }
}
