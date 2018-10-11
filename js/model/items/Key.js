class Key extends Item {

  /**
   * Creates a key of the color
   * @param {string} color
   */
  constructor(color) {
    super(0, 0, color + "_key");
    this._color = color;
    this._is_key = true;
  }

  get color() {
    return this._color;
  }

}
