/**
 * Abstract class for the Enemy
 */
class Enemy {

    /**
     * Builds the object of this abstract class
     * @param {Vector} location
     * @param {Direction} direction
     * @param {Map} map
     * @param {number} speed
     * @param {string} image
     */
    constructor(location, direction, map, speed, image) {
      this._loc = location;
      this._gridLoc = location;
      this._direction = direction;
      this._map = map;
      this._speed = speed;
      this._image = image;
      this._moving = true;
    }
  
    get location() {
      return this._loc;
    }
  
    get direction() {
      return this._direction;
    }
  
    get image() {
      return this._image;
    }
  
    /**
     * Gets the back of the turtle
     * @return {Vector}
     */
    get back() {
      if (Direction.compare(this._direction, Direction.NORTH())) {
        return new Vector(this._loc.x, Math.floor(this._loc.y));
      } else if (Direction.compare(this._direction, Direction.EAST())) {
        return new Vector(Math.floor(this._loc.x), this._loc.y);
      } else if (Direction.compare(this._direction, Direction.SOUTH())) {
        return new Vector(this._loc.x, Math.ceil(this._loc.y));
      } else if (Direction.compare(this._direction, Direction.WEST())) {
        return new Vector(Math.ceil(this._loc.x), this._loc.y);
      } else {
        throw "Direction is not set";
      }
    }
  
    /**
     * Gets the front of the turtle
     * @return {Vector}
     */
    get front() {
      if (Direction.compare(this._direction, Direction.NORTH())) {
        return new Vector(this._loc.x, Math.ceil(this._loc.y));
      } else if (Direction.compare(this._direction, Direction.EAST())) {
        return new Vector(Math.ceil(this._loc.x), this._loc.y);
      } else if (Direction.compare(this._direction, Direction.SOUTH())) {
        return new Vector(this._loc.x, Math.floor(this._loc.y));
      } else if (Direction.compare(this._direction, Direction.WEST())) {
        return new Vector(Math.floor(this._loc.x), this._loc.y);
      } else {
        throw "Direction is not set";
      }
    }
  
    /**
     * Handles all the movements of the enemy
     */
    move() {
      throw "Move method not implemented";
    }
  
    /**
     * Moves the enemy forward by its speed
     */
    moveForward() {
      if (this._moving) {
        this._loc = Vector.add(this._loc, this.step);
        if (Vector.compare(this.front, this.back, this.speed)) {
          this._gridLoc = this._loc;
        }
      }
    }
  
    get speed() {
      return this._speed / PIXELS_PER_DIV;
    }
  
    /**
     * Gets the step vector of the enemy
     * @return {Vector}
     */
    get step() {
      return Vector.scale(this._direction.toVector(), this.speed);
    }
  
    /**
     * Creates any enemy from the input and adds it to the map
     * @param {string} name
     * @param {Vector} location
     * @param {Direction} direction
     * @param {Map} map
     */
    static createEnemy(name, location, direction, map) {
      var enemy;
      switch (name) {
        case "shark":
          enemy = new Shark(location, direction, map);
          break;
        default:
          throw "Name, " + name + ", is not valid";
      }
      map.addEnemy(enemy);
      return enemy;
    }
  
    /**
     * Creates any enemy from the input and adds it to the map
     * @param {string} name
     * @param {[number]} location
     * @param {string} direction
     * @param {Map} map
     */
    static createEnemyFromString(name, location, direction, map) {
      Enemy.createEnemy(name, new Vector(location[0], location[1]), new Direction(direction), map);
    }
  
  }