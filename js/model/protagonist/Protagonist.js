/**
 * Abstract class for the main character object of the game
 */
class Protagonist {

  /**
   * Protagonist object that traverse the Map
   * @param {number} x
   * @param {number} y
   * @param {Map} grid
   */
  constructor(x, y, grid) {
    this._loc = new Vector(x,y);
    this._gridLoc = new Vector(x,y);
    this._grid = grid;
    this._direction = Direction.EAST();
    this._alive = true;
    this._points = 0;
    this._moves = new MoveHandler();
    this._keys = [];
  }

  /**
   * Turns the protagonist in the correct direction and starts
   * @param {Direction} direction
   */
  turn(direction) {
    this._moves.press(direction);
  }

  /**
   * Handles the button release for the protagonist
   * @param {Direction} direction
   */
  unturn(direction) {
    this._moves.release(direction);
  }

  /**
   * Moves the protagonist forward if it can
   */
  move() {
    this.consume();
    // console.log(`Snake: ${this.location.toString()} - ${this.direction.toString()}`);
    if (this.isAlive()) {
      var newLoc = Vector.add(this._gridLoc, this.unit_step);
      if (this._grid.getTile(newLoc.x, newLoc.y).isTraversible()) {
        this._loc = Vector.add(this._loc, this.step);
        if (!this.isBetween()) {
          this._loc = Vector.round(this._loc);
          this._gridLoc = Vector.round(this._loc);
          if (!Direction.compare(this._moves.direction, Direction.NONE())) {
            this._direction = this._moves.direction;
          }
          this._moves.pop();
        }
      } else {
        this.die();
      }
    }
  }

  /**
   * Consumes the item on the tile if the tile contains an item
   */
  consume() {
    var tile = this.tile;
    if (tile.hasItem()) {
      var item = tile.removeItem();
      item.consume();
      this._points += item.points;
    }
  }

  /**
   * Is the Protagonist alive
   * @return {boolean}
   */
  isAlive() {
    return this._alive;
  }

  /**
   * Gets the current tile of the protagonist
   * @return {Tile}
   */
  get tile() {
    return this._grid.getTile(this._gridLoc.x, this._gridLoc.y);
  }

  /**
   * Gets the step the protagonist takes
   * @return {Vector}
   */
  get step() {
    return Vector.scale(this.unit_step, this.speed);
  }

  /**
   * Gets the speed of the protagonist
   * @return {Number}
   */
  get speed() {
    return 1/DIV_SIZE;
  }

  /**
   * Gets the step the protagonist takes
   * @return {Vector}
   */
  get unit_step() {
    return this._direction.toVector();
  }

  /**
   * Gets the vector for the center of the person
   * @return {Vector}
   */
  get center() {
    return Vector.add(this._loc, new Vector(0.5, 0.5));
  }

  /**
   * Checks if the protagonist is on lond
   * @return {boolean}
   */
  isOnLand() {
    var water = new Water(0,0);
    var tile_front = this._grid.getTile(this.front.x, this.front.y);
    var tile_back = this._grid.getTile(this.back.x, this.back.y);
    return !Tile.compare(tile_front, water) && !Tile.compare(tile_back, water);
  }

  /**
   * Checks if the protagonist is on lond
   * @return {boolean}
   */
  isInWater() {
    var water = new Water(0,0);
    var tile_front = this._grid.getTile(this.front.x, this.front.y);
    var tile_back = this._grid.getTile(this.back.x, this.back.y);
    return Tile.compare(tile_front, water) || Tile.compare(tile_back, water);
  }

  /**
   * Gets the back of the protagonist
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
   * Gets the front of the protagonist
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
   * Gets the direction of the protagonist
   * @return {Direction}
   */
  get direction() {
    return this._direction;
  }

  /**
   * Gets the pending direction of the protagonist
   * @return {Direction}
   */
  get pending_direction() {
    return this._dir_wait;
  }

  /**
   * Get location of the protagonist
   * @return {Vector}
   */
  get location() {
    return this._loc.copy();
  }

  /**
   * Get location of the protagonist
   * @param {Vector} location
   */
  set location(location) {
    return this._loc = location;
  }

  get map() {
    return this._grid;
  }

  get gridLocation() {
    return this._gridLoc.copy();
  }

  /**
   * Checks if the protagonist is between tiles
   * @return {boolean}
   */
  isBetween() {
    return !Vector.compare(this.back, this.front, this.speed);
  }

   /**
    * Get location of the protagonist
    * @return {Vector}
    */
   getLocation() {
     return this._loc;
   }

   /**
    * Sets location of the protagonist
    * @param {number} x
    * @param {number} y
    */
   setLocation(x, y) {
     this._loc = new Vector(x,y);
   }

   /**
    * Handles when the protagonist dies
    */
   die() {
     this._alive = false;
   }

  /**
   * Gets the name of the image associated with the protagonist
   * @return {string}
   */
  get image() {
    throw "image method not implemented for Protagonist object."
  }

}
