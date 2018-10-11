class Item {

  /**
   * Builds the item object
   * @param {number} points
   * @param {string} image
   * @param {string} string
   */
  constructor(points, image, string) {
    this._pointValue = points;
    this._image = image;
    this._string = string;
  }

  /**
   * Gets the point value of the item
   * @return {number}
   */
  get points() {
    return this._pointValue;
  }

  /**
   * Gets the image name associated to the item
   * @return {string}
   */
  get image() {
    return this._image;
  }

  /**
   * Gets the string of the item object
   * @param {string} string
   */
  get string() {
    return this._string;
  }

  /**
   * Copies the item object to a new instance
   */
  copy() {
    return new Item(points, image, string);
  }

}

class Token extends Item {

  /**
   * Builds the token object
   */
  constructor() {
    super(1, "token", "t");
  }

}