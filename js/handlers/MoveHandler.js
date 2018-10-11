/**
 * Handles receiving the multiple keypad presses and handles which is of
 * highest priority.
 */
class MoveHandler {

  /**
   * Handles the
   */
  constructor() {
    this.presses = [];
  }

  get direction() {
    if (this.presses.length > 0) {
      return this.presses[0];
    } else {
      return Direction.NONE();
    }
  }

  /**
   * Presses the keypad in this direction
   * @param {Direction} direction
   */
  press(direction) {
    if (!this.contains(direction)) {
      this.enqueue(direction);
    } else {
      throw "MoveHandler already contains the direction, " + direction.toString();
    }
  }

  /**
   * Releases the keypad in this direction
   * @param {Direction} direction
   */
  release(direction) {
    if (this.contains(direction)) {
      this.remove(direction);
    } else {
      throw "MoveHandler already contains the direction, " + direction.toString();
    }
  }

  /**
   * Returns boolean value if direction is in the move handler
   * @return {boolean}
   */
  contains(direction) {
    for (var i=0; i<this.presses.length; i++) {
      if (Direction.compare(direction, this.presses[i])) {
        return true;
      }
    }
    return false;
  }

  /**
   * Enqueues the direction to the end of the presses Array
   * @param {Direction} direction
   */
  enqueue(direction) {
    this.presses.push(direction);
  }

  /**
   * Removes the direction from the array
   * @param {Direction} direction
   */
  remove(direction) {
    var removed = false;
    for (var i=0; i<this.presses.length; i++) {
      if (Direction.compare(direction, this.presses[i])) {
        this.presses.splice(i, 1);
        removed = true;
      }
    }
    if (!removed) {
      throw "MoveHandler does not contain the direction " + direction.toString();
    }
  }

}
