import { Vector2 } from "./vector2";
// import { Body } from "./bodies/body";
import { Circle, Rectangle, Line, Triangle } from ".";

interface SATResponde {
  pen: any;
  axis: any;
  vertex: any;
  error: boolean;
}

export class Collider {
  sat(o1, o2) {
    let minOverlap = null;
    let smallestAxis;
    let vertexObj;

    let axes = this.findAxes(o1, o2);
    let proj1, proj2;
    let firstShapeAxes = this.getShapeAxes(o1);

    for (let i = 0; i < axes.length; i++) {
      proj1 = this.projShapeOntoAxis(axes[i], o1);
      proj2 = this.projShapeOntoAxis(axes[i], o2);
      let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
      if (overlap < 0) {
        return {
          error: true,
        } as SATResponde;
      }

      if ((proj1.max > proj2.max && proj1.min < proj2.min) || (proj1.max < proj2.max && proj1.min > proj2.min)) {
        let mins = Math.abs(proj1.min - proj2.min);
        let maxs = Math.abs(proj1.max - proj2.max);
        if (mins < maxs) {
          overlap += mins;
        } else {
          overlap += maxs;
          axes[i] = axes[i].mult(-1);
        }
      }

      if (overlap < minOverlap || minOverlap === null) {
        minOverlap = overlap;
        smallestAxis = axes[i];
        if (i < firstShapeAxes) {
          vertexObj = o2;
          if (proj1.max > proj2.max) {
            smallestAxis = axes[i].mult(-1);
          }
        } else {
          vertexObj = o1;
          if (proj1.max < proj2.max) {
            smallestAxis = axes[i].mult(-1);
          }
        }
      }
    }

    let contactVertex = this.projShapeOntoAxis(smallestAxis, vertexObj).collVertex;

    if (vertexObj === o2) {
      smallestAxis = smallestAxis.mult(-1);
    }

    return {
      pen: minOverlap,
      axis: smallestAxis,
      vertex: contactVertex,
    } as SATResponde;
  }
  collide(o1, o2) {
    let bestSat = {
      pen: null,
      axis: null,
      vertex: null,
    };
    // if (obj instanceof Circle)
    for (let o1comp = 0; o1comp < o1.composition.length; o1comp++) {
      for (let o2comp = 0; o2comp < o2.composition.length; o2comp++) {
        let sat = this.sat(o1.composition[o1comp], o2.composition[o2comp]);
        if (!sat.error && sat.pen > bestSat.pen) {
          bestSat = this.sat(o1.composition[o1comp], o2.composition[o2comp]);
        }
      }
    }
    if (bestSat.pen !== null) {
      return bestSat;
    } else {
      return false;
    }
  }
  getShapeAxes(obj) {
    if (obj instanceof Circle || obj instanceof Line) {
      return 1;
    }
    if (obj instanceof Rectangle) {
      return 2;
    }
    if (obj instanceof Triangle) {
      return 3;
    }
  }
  findAxes(o1, o2) {
    let axes = [];
    /*
      Circle to Circle collision
    */
    if (o1 instanceof Circle && o2 instanceof Circle) {
      if (o2.position.subtr(o1.position).mag() > 0) {
        axes.push(o2.position.subtr(o1.position).unit());
      } else {
        axes.push(new Vector2(Math.random(), Math.random()).unit());
      }
      return axes;
    }
    /*
      Handle Circles collision
    */
    if (o1 instanceof Circle) {
      axes.push(this.closestVertexToPoint(o2, o1.position).subtr(o1.position).unit());
    }
    if (o2 instanceof Circle) {
      axes.push(this.closestVertexToPoint(o1, o2.position).subtr(o2.position).unit());
    }
    /*
      Handle Lines collision
    */
    if (o1 instanceof Line) {
      axes.push(o1.direction.normal());
    }
    if (o2 instanceof Line) {
      axes.push(o2.direction.normal());
    }
    /*
      Handle Retangles collision
    */
    if (o1 instanceof Rectangle) {
      axes.push(o1.direction.normal());
      axes.push(o1.direction);
    }
    if (o2 instanceof Rectangle) {
      axes.push(o2.direction.normal());
      axes.push(o2.direction);
    }
    /*
      Handle Triangles collision
    */
    if (o1 instanceof Triangle) {
      axes.push(o1.vertex[1].subtr(o1.vertex[0]).normal());
      axes.push(o1.vertex[2].subtr(o1.vertex[1]).normal());
      axes.push(o1.vertex[0].subtr(o1.vertex[2]).normal());
    }

    if (o2 instanceof Triangle) {
      axes.push(o2.vertex[1].subtr(o2.vertex[0]).normal());
      axes.push(o2.vertex[2].subtr(o2.vertex[1]).normal());
      axes.push(o2.vertex[0].subtr(o2.vertex[2]).normal());
    }
    return axes;
  }
  projShapeOntoAxis(axis, obj) {
    this.setBallVerticesAlongAxis(obj, axis);
    let min = Vector2.dot(axis, obj.vertex[0]);
    let max = min;
    let collVertex = obj.vertex[0];
    for (let i = 0; i < obj.vertex.length; i++) {
      let p = Vector2.dot(axis, obj.vertex[i]);
      if (p < min) {
        min = p;
        collVertex = obj.vertex[i];
      }
      if (p > max) {
        max = p;
      }
    }
    return {
      min: min,
      max: max,
      collVertex: collVertex,
    };
  }
  closestVertexToPoint(obj, position) {
    let closestVertex;
    let minDist = null;
    for (let i = 0; i < obj.vertex.length; i++) {
      if (position.subtr(obj.vertex[i]).mag() < minDist || minDist === null) {
        closestVertex = obj.vertex[i];
        minDist = position.subtr(obj.vertex[i]).mag();
      }
    }
    return closestVertex;
  }
  setBallVerticesAlongAxis(obj, axis) {
    if (obj instanceof Circle) {
      obj.vertex[0] = obj.position.add(axis.unit().mult(-obj.radius));
      obj.vertex[1] = obj.position.add(axis.unit().mult(obj.radius));
    }
  }
  //Collision is handled based on the body layer
  //Layer -1: collision handling with layer 0 bodies ONLY
  //Layer -2: no collision handling with any other body
  collisionLayer(body1: any, body2: any) {
    return (
      (body1.layer === body2.layer && !(body1.layer === -1 || body1.layer === -2)) ||
      (body1.layer === 0 && body2.layer !== -2) ||
      (body2.layer === 0 && body1.layer !== -2)
    );
  }
}
