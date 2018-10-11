class ImageHandler {

  constructor(context) {
    this._ctx = context;
    this._images = [];
  }

  /**
   * Loads an individual image
   * @param {string} name
   */
  loadImage(name, period, width, height) {
    this._images[name] = new Image(name, period, this.context, width, height);
  }

  /**
   * Gets the image of associated with the name
   * @param {string} name
   * @return {Image}
   */
  getImage(name) {
    if (name in this._images) {
      return this._images[name]
    } else {
      throw name + " is not an image in this ImageHandler";
    }
  }

  /**
   * Draws the provided image
   * @param {string} name
   * @param {number} x
   * @param {number} y
   * @param {number} angle
   */
  drawImage(name, x, y, angle) {
    if (name in this._images) {
      this._images[name].draw(x, y, angle);
    } else {
      throw "Image {" + name + "} not contained in ImageHandler";
    }
  }

  /**
   * Draws the provided image
   * @param {string} name
   * @param {number} x
   * @param {number} y
   * @param {number} angle
   * @param {number} stime (ms)
   */
  drawSpriteImage(name, x, y, angle, stime) {
    if (name in this._images) {
      this._images[name].drawSprite(x, y, angle, stime);
    } else {
      throw "Image {" + name + "} not contained in ImageHandler";
    }
  }

  get context() {
    return this._ctx;
  }

  set context(context) {
    this._ctx = context;
    for (var name in this._images) {
      this._images[name].context = context;
    }
  }

}

class Image {

  /**
   * Builds an image object, which can be comprised of multiple image
   * elements that repeat by a given period. For sprites, this class
   * requires an image with multiple individual images placed vertically
   * next to one another.
   * @param {string} name
   * @param {number} period
   * @param {Context} context
   * @param {number} width
   * @param {number} height
   */
  constructor(name, period, context, width, height) {
    this._name = name;
    this._element = document.getElementById(name);
    this.period = period;
    this.context = context;
    this.width = width;
    this.height = height;
    this.swidth = this._element.width;
    this.sheight = this._element.width;
    this.spriteLength = this._element.height / this._element.width;
  }

  get name() {
    return this._name;
  }

  /**
   * Will iterate through the images stored within this image class periodically
   * and draw the correct image.
   * @param {number} x
   * @param {number} y
   * @param {number} angle
   */
  draw(x, y, angle) {
    if (this.spriteLength > 1) {
      var time = (new Date()).getTime() % (1000 * this.period);
      var loc = Math.floor(this.spriteLength * time / (this.period*1000));
      if (angle != 0) {
        this.context.save();
        this.context.translate(x + 0.5 * this.width, y + 0.5 * this.height);
        this.context.rotate(-angle);
        this.context.drawImage(this._element, 0, this.sheight * loc, this.swidth,
          this.sheight, - 0.5 * this.width, - 0.5 * this.height,
          this.width, this.height);
        this.context.restore();
      } else {
        this.context.drawImage(this._element, 0, this.sheight * loc, this.swidth,
          this.sheight, x, y, this.width, this.height);
      }
    } else {
      if (angle != 0) {
        this.context.save();
        this.context.translate(x + 0.5 * this.width, y + 0.5 * this.height);
        this.context.rotate(-angle);
        this.context.drawImage(this._element, - 0.5 * this.width,
          - 0.5 * this.height, this.width, this.height);
        this.context.restore();
      } else {
        this.context.drawImage(this._element, x, y, this.width, this.height);
      }
    }
  }

  /**
   * Will iterate through the images stored within this image class periodically
   * and draw the correct image.
   * @param {number} x
   * @param {number} y
   * @param {number} angle
   * @param {number} stime (ms)
   */
  drawSprite(x, y, angle, stime) {
    if (this.spriteLength > 1) {
      var time = stime % (1000 * this.period);
      var loc = Math.floor(this.spriteLength * time / (this.period*1000));
      if (angle != 0) {
        this.context.save();
        this.context.translate(x + 0.5 * this.width, y + 0.5 * this.height);
        this.context.rotate(-angle);
        this.context.drawImage(this._element, 0, this.sheight * loc, this.swidth,
          this.sheight, - 0.5 * this.width, - 0.5 * this.height,
          this.width, this.height);
        this.context.restore();
      } else {
        this.context.drawImage(this._element, 0, this.sheight * loc, this.swidth,
          this.sheight, x, y, this.width, this.height);
      }
    } else {
      if (angle != 0) {
        this.context.save();
        this.context.translate(x + 0.5 * this.width, y + 0.5 * this.height);
        this.context.rotate(-angle);
        this.context.drawImage(this._element, - 0.5 * this.width,
          - 0.5 * this.height, this.width, this.height);
        this.context.restore();
      } else {
        this.context.drawImage(this._element, x, y, this.width, this.height);
      }
    }
  }

}
