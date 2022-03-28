export { Vector2 } from "./vector2";
export { userInput } from "./input";
/*
    Shapes
*/
export { Circle } from "./shapes/circle";
export { Line } from "./shapes/line";
export { Rectangle } from "./shapes/retangle";
export { Triangle } from "./shapes/triangle";
/*
    Bodies
*/
export { Body } from "./bodies/body";
export { Ball } from "./bodies/ball";
export { Wall } from "./bodies/wall";
export { Box } from "./bodies/box";
export { Pyramid } from "./bodies/pyramid";
/*
    Collider
*/
import { Collider } from "./collider";
import { Collision } from "./collision";
/*
  World
*/
interface Entity {
  id: string;
  body: any;
  set(key: string, value: any): Entity;
}

export class World {
  objects: any = [];
  collisions: any = [];
  collider: Collider;
  beforeUpdate: any;
  beforeCollision: any;
  constructor() {
    this.collider = new Collider();
  }
  update(ctx: any = false, canvas: any = false) {
    /*
      Update
    */
    this.collisions = []; //reset collisions
    if (typeof this.beforeUpdate == "function") this.beforeUpdate();
    this.objects.forEach((obj) => {
      if (obj.body.keyControl) obj.body.keyControl();
      if (obj.body.update) obj.body.update();
    });
    this.objects.forEach((obj, index) => {
      for (let bodyPair = index + 1; bodyPair < this.objects.length; bodyPair++) {
        let check = this.collider.collisionLayer(this.getByIndex(index).body, this.getByIndex(bodyPair).body);
        if (check) {
          let bestSat = this.collider.collide(this.getByIndex(index).body, this.getByIndex(bodyPair).body);
          if (bestSat) {
            this.collisions.push(
              new Collision(
                this.getByIndex(index).body,
                this.getByIndex(bodyPair).body,
                bestSat.axis,
                bestSat.pen,
                bestSat.vertex
              )
            );
          }
        }
      }
    });
    if (typeof this.beforeCollision == "function") this.beforeCollision();
    this.collisions.forEach((c) => {
      c.penRes();
      c.collRes();
    });
    /*
      Draw
    */
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      this.objects.forEach((obj) => {
        obj.body.draw(ctx);
      });
    }
  }

  add(id: string, body: any) {
    let check = this.get(id);
    if (check) return false;
    let obj: Entity = {
      id,
      body,
      set(key: any, value: any) {
        this.body[key] = value;
        return this;
      },
    };
    this.objects.push(obj);
    return obj;
  }
  get(id: string) {
    return this.objects.filter((obj) => obj.id === id)[0] || false;
  }
  getByIndex(id: number) {
    return this.objects[id];
  }
}

declare global {
  interface Window {
    Physics: any;
  }
}
if (typeof window != "undefined") window.Physics = this;
