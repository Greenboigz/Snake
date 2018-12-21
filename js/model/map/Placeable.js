class Placeable {

    constructor(map, location, direction, speed) {
        this._loc = location;
        this._gridLoc = location;
        this._direction = direction;
        this._grid = map;
        this._speed = speed || 1;
    }
  
    get location() {
        return this._loc.copy();
    }
    
    get gridLocation() {
        return this._gridLoc.copy();
    }

    get direction() {
    return this._direction;
    }
    
    get map() {
        return this._grid;
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
        return this._speed;
    }
    
      /**
       * Gets the step vector of the enemy
       * @return {Vector}
       */
    get step() {
        return Vector.scale(this._direction.toVector(), this.speed);
    }

    /**
     * Gets the unit step vector of the Placeable
     */
    get unit_step() {
        return this._direction.toVector();
    }

    /**
     * Checks if the placeable is between tiles
     * @return {boolean}
     */
    isBetween() {
        return !Vector.compare(this.back, this.front, this.speed);
    }
    
    /**
     * Gets the back of the protagonist
     * @return {Vector}
     */
    get back() {
        if (Direction.compare(this._direction, Direction.NORTH())) {
            return new Vector(this._gridLoc.x, Math.floor(this._loc.y));
        } else if (Direction.compare(this._direction, Direction.EAST())) {
            return new Vector(Math.floor(this._loc.x), this._gridLoc.y);
        } else if (Direction.compare(this._direction, Direction.SOUTH())) {
            return new Vector(this._gridLoc.x, Math.ceil(this._loc.y));
        } else if (Direction.compare(this._direction, Direction.WEST())) {
            return new Vector(Math.ceil(this._loc.x), this._gridLoc.y);
        } else {
            throw "Direction is not set";
        }
    }

    /**
     * Gets the front of the protagonist
     * @return {Vector}
     */
    get front() {
        if (Direction.compare(this._direction, Direction.NORTH())) {
            return new Vector(this._gridLoc.x, Math.ceil(this._loc.y));
        } else if (Direction.compare(this._direction, Direction.EAST())) {
            return new Vector(Math.ceil(this._loc.x), this._gridLoc.y);
        } else if (Direction.compare(this._direction, Direction.SOUTH())) {
            return new Vector(this._gridLoc.x, Math.floor(this._loc.y));
        } else if (Direction.compare(this._direction, Direction.WEST())) {
            return new Vector(Math.floor(this._loc.x), this._gridLoc.y);
        } else {
            throw "Direction is not set";
        }
    }
  
    
}