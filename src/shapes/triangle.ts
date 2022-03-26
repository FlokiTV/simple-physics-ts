import { Vector2 } from "../vector2";
import { Matrix } from "../matrix";

export class Triangle {
  color: string;
  vertex: any;
  position: any;
  direction: any;
  refDir;
  refDiam;
  angle;
  rotMat;
  constructor(x1, y1, x2, y2, x3, y3) {
    this.color = "";
    this.vertex = [];
    this.vertex[0] = new Vector2(x1, y1);
    this.vertex[1] = new Vector2(x2, y2);
    this.vertex[2] = new Vector2(x3, y3);
    this.position = new Vector2(
      (this.vertex[0].x + this.vertex[1].x + this.vertex[2].x) / 3,
      (this.vertex[0].y + this.vertex[1].y + this.vertex[2].y) / 3
    );
    this.direction = this.vertex[0].subtr(this.position).unit();
    this.refDir = this.direction;
    this.refDiam = [];
    this.refDiam[0] = this.vertex[0].subtr(this.position);
    this.refDiam[1] = this.vertex[1].subtr(this.position);
    this.refDiam[2] = this.vertex[2].subtr(this.position);
    this.angle = 0;
    this.rotMat = new Matrix(2, 2);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.vertex[0].x, this.vertex[0].y);
    ctx.lineTo(this.vertex[1].x, this.vertex[1].y);
    ctx.lineTo(this.vertex[2].x, this.vertex[2].y);
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
    this.direction = this.rotMat.multiplyVec(this.refDir);
    this.vertex[0] = this.position.add(this.rotMat.multiplyVec(this.refDiam[0]));
    this.vertex[1] = this.position.add(this.rotMat.multiplyVec(this.refDiam[1]));
    this.vertex[2] = this.position.add(this.rotMat.multiplyVec(this.refDiam[2]));
  }
}
