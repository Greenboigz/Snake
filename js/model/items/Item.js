class Item extends Placeable {

  /**
   * Builds the item object
   * @param {number} points
   * @param {string} image
   * @param {string} string
   */
  constructor(map, location, direction, speed, points, image, string) {
    super(map, location, direction, speed);
    
    this._pointValue = points;
    this._image = image;
    this._string = string; 

    this._onConsume = () => {};
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
   * Called when the item is consumed
   */
  consume() {
    return this._onConsume();
  }

  /**
   * Sets the consume function of the fruit
   * @param {function} func
   */
  set onConsume(func) {
    this._onConsume = func;
  }

  /**
   * Copies the item object to a new instance
   */
  copy() {
    return new Item(points, image, string);
  }

}