export class Vector2 {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  clone() {
    return new Vector2(this.x, this.y);
  }
  add(v) {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  subtr(v) {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  mult(n) {
    return new Vector2(this.x * n, this.y * n);
  }

  normal() {
    return new Vector2(-this.y, this.x).unit();
  }

  unit() {
    if (this.mag() === 0) {
      return new Vector2(0, 0);
    } else {
      return new Vector2(this.x / this.mag(), this.y / this.mag());
    }
  }
  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  static cross(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
  }
  // add: function(vector) {
  // 	return new Vector2(this.x + vector.x, this.y + vector.y);
  // },

  // subtract: function(vector) {
  // 	return new Vector2(this.x - vector.x, this.y - vector.y);
  // },

  // scale: function(scalar) {
  // 	return new Vector2(this.x * scalar, this.y * scalar);
  // },

  // dot: function(vector) {
  // 	return (this.x * vector.x + this.y + vector.y);
  // },

  // moveTowards: function(vector, t) {
  // 	// Linearly interpolates between vectors A and B by t.
  // 	// t = 0 returns A, t = 1 returns B
  // 	t = Math.min(t, 1); // still allow negative t
  // 	var diff = vector.subtract(this);
  // 	return this.add(diff.scale(t));
  // },

  // magnitude: function() {
  // 	return Math.sqrt(this.magnitudeSqr());
  // },

  // magnitudeSqr: function() {
  // 	return (this.x * this.x + this.y * this.y);
  // },

  // distance: function (vector) {
  // 	return Math.sqrt(this.distanceSqr(vector));
  // },

  // distanceSqr: function (vector) {
  // 	var deltaX = this.x - vector.x;
  // 	var deltaY = this.y - vector.y;
  // 	return (deltaX * deltaX + deltaY * deltaY);
  // },

  // normalize: function() {
  // 	var mag = this.magnitude();
  // 	var vector = this.clone();
  // 	if(Math.abs(mag) < 1e-9) {
  // 		vector.x = 0;
  // 		vector.y = 0;
  // 	} else {
  // 		vector.x /= mag;
  // 		vector.y /= mag;
  // 	}
  // 	return vector;
  // },

  // angle: function() {
  // 	return Math.atan2(this.y, this.x);
  // },

  // rotate: function(alpha) {
  // 	var cos = Math.cos(alpha);
  // 	var sin = Math.sin(alpha);
  // 	var vector = new Vector2();
  // 	vector.x = this.x * cos - this.y * sin;
  // 	vector.y = this.x * sin + this.y * cos;
  // 	return vector;
  // },

  // toPrecision: function(precision) {
  // 	var vector = this.clone();
  // 	vector.x = vector.x.toFixed(precision);
  // 	vector.y = vector.y.toFixed(precision);
  // 	return vector;
  // },

  // toString: function () {
  // 	var vector = this.toPrecision(1);
  // 	return ("[" + vector.x + "; " + vector.y + "]");
  // }
}
