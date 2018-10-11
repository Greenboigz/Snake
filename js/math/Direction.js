const NONE = 0, NORTH = 'North', EAST = 'East', SOUTH = 'South', WEST = 'West'

/**
 * This class represents the direction of the skater
 */
class Direction {

  /** @return {Direction} */
  static NONE() { return new Direction(NONE); }
  /** @return {Direction} */
  static NORTH() { return new Direction(NORTH); }
  /** @return {Direction} */
  static EAST() { return new Direction(EAST); }
  /** @return {Direction} */
  static SOUTH() { return new Direction(SOUTH); }
  /** @return {Direction} */
  static WEST() { return new Direction(WEST); }

  /**
   * The constructor for the enum class representing direction
   * @param {string} direction 
   */
  constructor(direction) {
    this.val = direction;
  }

  /**
   * Gets the vector value of the direction enum
   * @return {number}
   */
  toVector() {
    if (this.val == NORTH) {
      return new Vector(0,1);
    } else if (this.val == EAST) {
      return new Vector(1,0);
    } else if (this.val == SOUTH) {
      return new Vector(0,-1);
    } else if (this.val == WEST) {
      return new Vector(-1,0);
    } else {
      return new Vector(0,0);
    }
  }

  /**
   * Gets the radians of the angle
   * @return {number}
   */
  get radians() {
    if (this.val == NORTH) {
      return 3.1415926/2;
    } else if (this.val == EAST) {
      return 0;
    } else if (this.val == SOUTH) {
      return -3.1415926/2;
    } else if (this.val == WEST) {
      return 3.1415926;
    } else {
      throw "Not a valid direction";
    }
  }

  /**
   * Gets the right of the direction
   * @return {Direction}
   */
  get right() {
    if (this.val == NORTH) {
      return Direction.EAST();
    } else if (this.val == EAST) {
      return Direction.SOUTH();
    } else if (this.val == SOUTH) {
      return Direction.WEST();
    } else if (this.val == WEST) {
      return Direction.NORTH();
    } else {
      throw "Not a valid direction";
    }
  }

  /**
   * Gets the left of the direction
   * @return {Direction}
   */
  get left() {
    if (this.val == NORTH) {
      return Direction.WEST();
    } else if (this.val == EAST) {
      return Direction.NORTH();
    } else if (this.val == SOUTH) {
      return Direction.EAST();
    } else if (this.val == WEST) {
      return Direction.SOUTH();
    } else {
      throw "Not a valid direction";
    }
  }

  /**
   * Gets the opposite of the direction
   * @return {Direction}
   */
  get opposite() {
    if (this.val == NORTH) {
      return Direction.SOUTH();
    } else if (this.val == EAST) {
      return Direction.WEST();
    } else if (this.val == SOUTH) {
      return Direction.NORTH();
    } else if (this.val == WEST) {
      return Direction.EAST();
    } else {
      throw "Not a valid direction";
    }
  }

  /**
   * Gets the string of the direction
   * @return {string}
   */
  toString() {
    if (this.val == NORTH) {
      return "North";
    } else if (this.val == EAST) {
      return "East";
    } else if (this.val == SOUTH) {
      return "South";
    } else if (this.val == WEST) {
      return "West";
    } else {
      return "None";
    }
  }

  /**
   * Compares the direction objects
   * @param {Direction} dir1
   * @param {Direction} dir2
   * @param {boolean}
   */
  static compare(dir1, dir2) {
    return dir1.val == dir2.val;
  }

}
