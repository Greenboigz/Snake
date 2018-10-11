TILE_LETTERS = ["W"," ","w"];

class Tile {

  /**
   * Abstract class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   * @param {number} type
   * @param {string} string
   * @param {string} image
   */
  constructor(x, y, type, string, image) {
    this._loc = new Vector(x,y);
    this._type = type;
    this._string = string;
    this._image = image;

    this._item = null;
    this._hasItem = false;
    this._storable = false;
    this._traversible = false;

    this._prevState = null;
  }

  /**
   * Gets the string representation
   * @return {string}
   */
  toString() {
    return this._string;
  }

  /**
   * Gets the type of the tile
   * @return {number}
   */
  get type() {
    return this._type;
  }

  /**
   * Gets the vector of the location of the tile
   * @return {Vector}
   */
  get location() {
    return new Vector(this._loc.x, this._loc.y)
  }

  /**
   * Gets the image name of the tile
   * @return {string}
   */
  get image() {
    return this._image;
  }

  /**
   * Gets the item on the tile
   * @return {Item}
   */
  get item() {
    if (this._hasItem) {
      return this._item;
    }
  }

  /**
   * Saves the current state of the tile
   */
  storeState() {
    if (this._prevState == null) {
      this._prevState = this.copy();
    }
  }

  /**
   * Restores the previous state of the tile
   */
  restoreState() {
    if (this._prevState != null) {
      this._type = this._prevState._type;
      this._string = this._prevState._string;
      this._image = this._prevState._image;

      this._item = this._prevState._item;
      this._hasItem = this._prevState._hasItem;
      this._storable = this._prevState._storable;
      this._traversible = this._prevState._traversible;

      this._prevState = null;
    }
  }

  /**
   * CLear stored state
   */
  clearStored() {
    this._prevState = null;
  }

  /**
   * Sets the item associated to the tile
   * @param {Item} item
   */
  set item(item) {
    if (this.isStorable() && !this._hasItem && item != null) {
      this._item = item;
      this._hasItem = true;
    } else if (!this.isStorable()) {
      throw "This tile cannot store items";
    }
  }

  /**
   * Removes the item from the tile
   * @return {Item}
   */
  removeItem() {
    if (this.hasItem()) {
      var item = this._item;
      this._item = null;
      this._hasItem = false;
      return item;
    }
  }

  /**
   * Checks if the tile is storing an item
   * @return {boolean}
   */
  hasItem() {
    return this._hasItem;
  }

  /**
   * Checks if the tile can store items
   * @return {boolean}
   */
  isStorable() {
    return this._storable;
  }

  /**
   * Checks if the tile is traversible
   * @return {boolean}
   */
   isTraversible() {
     return this._traversible;
   }

   /**
    * Copies the tile to the new coordinates
    * @param {Number} x
    * @param {Number} y
    * @return {Tile}
    */
   copy(x, y) {
     var tile = Tile.createTile(x, y, this._string);
     if (this.hasItem()) {
       tile._item = this._item.copy();
     }
     return tile;
   }

    /**
     * Compares the type values of tiles
     * @param {Tile} tile1
     * @param {Tile} tile2
     * @return {boolean}
     */
    static compare(tile1, tile2) {
      return tile1._type == tile2._type;
    }

    /**
     * Creates a tile from the provided information
     * @param {number} x
     * @param {number} y
     * @param {string} type
     * @return {Tile}
     */
    static createTile(x, y, type) {
      var tile;
      switch (type) {
        case 'w':
          tile = new Wall(x, y);
          break;
        case ' ':
          tile = new Space(x, y);
          break;
        default:
          tile = new Space(x, y);
      }

      return tile;
    }

}


class Wall extends Tile {

  /**
   * Wall class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 0, "w", "wall");
  }

}

class Space extends Tile {

  /**
   * Space class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 1, " ", "space");
    this._traversible = true;
    this._storable = true;
  }

}