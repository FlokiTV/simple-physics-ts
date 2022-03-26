import { Vector2 } from "../vector2";
import { Matrix } from "../matrix";

export class Rectangle {
  vertex: any;
  color: string;
  direction: any;
  refDirection: any;
  position: any;
  angle: any;
  length: any;
  width: any;
  rotMat: any;
  constructor(x1, y1, x2, y2, width) {
    this.color = "";
    this.vertex = [];
    this.vertex[0] = new Vector2(x1, y1);
    this.vertex[1] = new Vector2(x2, y2);
    this.direction = this.vertex[1].subtr(this.vertex[0]).unit();
    this.refDirection = this.vertex[1].subtr(this.vertex[0]).unit();
    this.length = this.vertex[1].subtr(this.vertex[0]).mag();
    this.width = width;
    this.vertex[2] = this.vertex[1].add(this.direction.normal().mult(this.width));
    this.vertex[3] = this.vertex[2].add(this.direction.mult(-this.length));
    this.position = this.vertex[0]
      .add(this.direction.mult(this.length / 2))
      .add(this.direction.normal().mult(this.width / 2));
    this.angle = 0;
    this.rotMat = new Matrix(2, 2);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.vertex[0].x, this.vertex[0].y);
    ctx.lineTo(this.vertex[1].x, this.vertex[1].y);
    ctx.lineTo(this.vertex[2].x, this.vertex[2].y);
    ctx.lineTo(this.vertex[3].x, this.vertex[3].y);
    ctx.lineTo(this.vertex[0].x, this.vertex[0].y);
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

  getVertices(angle) {
    this.rotMat.rotMx22(angle);
    this.direction = this.rotMat.multiplyVec(this.refDirection);
    this.vertex[0] = this.position
      .add(this.direction.mult(-this.length / 2))
      .add(this.direction.normal().mult(this.width / 2));
    this.vertex[1] = this.position
      .add(this.direction.mult(-this.length / 2))
      .add(this.direction.normal().mult(-this.width / 2));
    this.vertex[2] = this.position
      .add(this.direction.mult(this.length / 2))
      .add(this.direction.normal().mult(-this.width / 2));
    this.vertex[3] = this.position
      .add(this.direction.mult(this.length / 2))
      .add(this.direction.normal().mult(this.width / 2));
  }
}
