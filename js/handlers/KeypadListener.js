var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
var A = 65, W = 87, D = 68, S = 83;
var TESTING = false;
var CTRL = -1;
var SHIFT = -2;

/**
 * Base class to handle any key event listener
 */
class KeyHandler {

  constructor() {
    this.keys = [];

    this._ctrlKey = false;
    this._ctrl = false;

    this._shiftKey = false;
    this._shift = false;

    document.addEventListener("keydown", this.keyDownEvent.bind(this), false);
    //document.addEventListener("keypress", this.keyPressEvent.bind(this), false);
    document.addEventListener("keyup", this.keyUpEvent.bind(this), false);
  }

  /**
   * Handles all keydown events
   * @param {Event} event
   */
  keyDownEvent(event) {
    if (TESTING) {
      console.log("keydown{" + event.keyCode + "}");
    }
    var keyCode = event.keyCode;
    if (this._ctrl && event.ctrlKey && !this._ctrlKey) {
      this._ctrlKey = true;
      keyCode = CTRL;
    } else if (this._shift && event.shiftKey && !this._shiftKey) {
      this._shiftKey = true;
      keyCode = SHIFT;
    }
    for (var i = 0; i < this.keys.length; i++) {
      var keyListener = this.keys[i];
      if (keyCode == keyListener.keyCode) {
        keyListener.keyDown();
        break;
      }
    }
  }

  /**
   * Handles all keypress events
   * @param {Event} event
   */
  keyPressEvent(event) {
    if (TESTING) {
      console.log("keypress{" + event.keyCode + "}");
    }
    for (var i = 0; i < this.keys.length; i++) {
      var keyListener = this.keys[i];
      if (event.keyCode == keyListener.keyCode) {
        keyListener.keyPress();
        break;
      }
    }
  }

  /**
   * Handles all keyup events
   * @param {Event} event
   */
  keyUpEvent(event) {
    if (TESTING) {
      console.log("keyup{" + event.keyCode + "}");
    }
    var keyCode = event.keyCode;
    if (this._ctrl && !event.ctrlKey && this._ctrlKey) {
      this._ctrlKey = false;
      keyCode = CTRL;
    } else if (this._shift && !event.shiftKey && this._shiftKey) {
      this._shiftKey = false;
      keyCode = SHIFT;
    }
    for (var i = 0; i < this.keys.length; i++) {
      var keyListener = this.keys[i];
      if (keyCode == keyListener.keyCode) {
        keyListener.keyUp();
        break;
      }
    }
  }

  /**
   * Adds the key to the list of keys to handle key-events
   * @param {string} keyName
   * @param {number} keyNumber
   */
  addKeyListener(keyName, keyNumber) {
    if (keyName == "ctrl") {
      this._ctrl = true;
      keyNumber = CTRL;
    } else if (keyName == "shift") {
      this._shift = true;
      keyNumber = SHIFT;
    }
    this.keys.push(new KeyListener(keyName, keyNumber));
  }

  /**
   * Gets the key listener
   * @return {KeyListener}
   */
  getKeyListener(keyName) {
    for (var i = 0; i < this.keys.length; i++) {
      var keyListener = this.keys[i];
      if (keyListener.keyName == keyName) {
        return keyListener;
      }
    }
    throw "keyName {" + keyName + "} does not exist in KeyHandler";
  }

  /**
   * Remove KeyListener
   * @param {string} keyName
   * @return {KeyListener}
   */
  removeKeyListener(keyName) {
    for (var i = 0; i < this.keys.length; i++) {
      var keyListener = this.keys[i];
      if (keyListener.keyName == keyName) {
        this.keys.splice(i, 1);
        return keyListener;
      }
    }
    throw "keyName {" + keyName + "} does not exist in KeyHandler";
  }

}

/**
 * Specific KeyHandler for the arrow keys
 */
class KeypadListener extends KeyHandler {

  constructor() {
    super();

    this.addKeyListener("left", LEFT);
    this.addKeyListener("up", UP);
    this.addKeyListener("right", RIGHT);
    this.addKeyListener("down", DOWN);
    this.addKeyListener("a", A);
    this.addKeyListener("s", S);
    this.addKeyListener("d", D);
    this.addKeyListener("w", W);
  }

}

/**
 * Handles individual key linstening information
 */
class KeyListener {

  constructor(name, number) {
    this._number = number;
    this._name = name;
    this._pressed = false;

    this._keyDown = null;
    this._keyPress = null;
    this._keyUp = null;
  }

  get keyCode() {
    return this._number;
  }

  get keyName() {
    return this._name;
  }

  /**
   * Returns if the key is pressed
   * @return {boolean}
   */
  isPressed() {
    return this._pressed;
  }

  /**
   * Handles keyDown event
   */
  keyDown() {
    if (!this._pressed) {
      this._pressed = true;
      if (this._keyDown != null) {
        this._keyDown();
      }
      if (TESTING) {
        console.log("keydown {" + this._name + "}");
      }
    }
  }

  /**
   * Handles keyPress event
   */
  keyPress() {
    this._pressed = true;
    if (this._keyPress != null) {
      this._keyPress();
    }
    if (TESTING) {
      console.log("keypress {" + this._name + "}");
    }
  }

  /**
   * Handles keyUp event
   */
  keyUp() {
    if (this._pressed) {
      this._pressed = false;
      if (this._keyUp != null) {
        this._keyUp();
      }
      if (TESTING) {
        console.log("keyup {" + this._name + "}");
      }
    }
  }

  /**
   * Adds a function for the keyDownEvent
   * @param {function} keyDownEvent
   */
  addKeyDownEvent(keyDownEvent) {
    this._keyDown = keyDownEvent;
  }

  /**
   * Adds a function for the keyPressEvent
   * @param {function} keyPressEvent
   */
  addKeyPressEvent(keyPressEvent) {
    this._keyPress = keyPressEvent;
  }

  /**
   * Adds a function for the keyUpEvent
   * @param {function} keyUpEvent
   */
  addKeyUpEvent(keyUpEvent) {
    this._keyUp = keyUpEvent;
  }

}
