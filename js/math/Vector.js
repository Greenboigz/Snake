class Vector {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return "{" + this.x + "," + this.y + "}";
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  /**
   * Adds the other to itself and returns
   * @param {Vector} vec1
   * @param {Vector} vec2
   */
  static add(vec1, vec2) {
    return new Vector(vec1.x + vec2.x, vec1.y + vec2.y);
  }

  /**
   * Subtracts vec2 from vec 1
   * @param {Vector} vec1
   * @param {Vector} vec2
   */
  static subtract(vec1, vec2) {
    return new Vector(vec1.x - vec2.x, vec1.y - vec2.y);
  }

  static scale(vec1, amount) {
    return new Vector(amount * vec1.x, amount * vec1.y);
  }

  static round(vec) {
    return new Vector(Math.round(vec.x), Math.round(vec.y));
  }

  static compare(vec1, vec2, epsilon) {
    return Math.abs(vec1.x - vec2.x) < epsilon && Math.abs(vec1.y - vec2.y) < epsilon;
  }

}
