class Snake extends Protagonist {
    
    /**
     * @param {Map} grid 
     */
    constructor(grid) {
        super(Math.floor(grid.width / 2), Math.floor(grid.height / 2), grid);

        this._prev_points = 1;
        this._points = 2;
        this._body = [new SnakeSegment(this.location, this.gridLocation, this.direction)];
    }

    /**
     * Consumes the item on the tile if the tile contains an item
     */
    consume() {
        super.consume();
    }

    /**
     * Moves the snake forward if it can
     */
    move() {
        if (this.isAlive()) {
            this._prev_points = this._body.length;
            this._body.reverse().push(new SnakeSegment(this.location, this.gridLocation, this.direction));
            this._body.reverse();
            if (this._body.length > this._points * DIV_SIZE) {
                this._body.pop();
            }
        }
        super.move();
        var head = Vector.add(this.gridLocation, this.direction.toVector());
        if (this.containsTile(head)) {
            this.die();
        }
    }

    /**
     * Checks if the snake contains the tile
     * @param {Vector} loc 
     * @return {Boolean}
     */
    containsTile(loc) {
        for (var b = DIV_SIZE; b < this._body.length; b += DIV_SIZE) {
            if (Vector.compare(this._body[b].gridLocation, loc, 0.001)) {
                return true;
            }
        }
        return false;
    }

    isGrowing() {
        return this._prev_points < this._body.length;
    }

    /**
     * @return {[SnakeSegment]}
     */
    getBody() {
        var body = [];
        for (var i = 0; i < this._body.length; i++) {
            if (i % DIV_SIZE == 0) {
                body.push(this._body[i]);
            }
        }
        return body;
    }

    /**
     * Gets the name of the image associated with the protagonist
     * @return {string}
     */
    get image() {
        return "snake";
    }

    get length() {
        return this._points;
    }

}

class SnakeSegment {

    /**
     * Builds the snake segment
     * @param {Vector} location 
     * @param {Vector} gridLocation
     * @param {Direction} direction 
     */
    constructor(location, gridLocation, direction) {
        this._loc = location;
        this._gridLoc = gridLocation;
        this._dir = direction;
    }

    /** @return { Vector } */
    get location() {
        return this._loc;
    }

    /** @return { Vector } */
    get gridLocation() {
        return this._gridLoc;
    }

    /** @return { Direction } */
    get direction() {
        return this._dir;
    }

    /** 
     * Gets the rotation of the given segment
     * @param { Direction } nextDirection
     * @return { Direction } 
     */
    getCornerRotation(nextDirection) {
        if (Direction.compare(this.direction, Direction.NORTH())) {
            if (Direction.compare(nextDirection, Direction.EAST())) {
                return Direction.EAST();
            } else if (Direction.compare(nextDirection, Direction.WEST())) {
                return Direction.SOUTH();
            }
        } else if (Direction.compare(this.direction, Direction.EAST())) {
            if (Direction.compare(nextDirection, Direction.NORTH())) {
                return Direction.WEST();
            } else if (Direction.compare(nextDirection, Direction.SOUTH())) {
                return Direction.SOUTH();
            }
        } else if (Direction.compare(this.direction, Direction.SOUTH())) {
            if (Direction.compare(nextDirection, Direction.EAST())) {
                return Direction.NORTH();
            } else if (Direction.compare(nextDirection, Direction.WEST())) {
                return Direction.WEST();
            }
        } else if (Direction.compare(this.direction, Direction.WEST())) {
            if (Direction.compare(nextDirection, Direction.NORTH())) {
                return Direction.NORTH();
            } else if (Direction.compare(nextDirection, Direction.SOUTH())) {
                return Direction.EAST();
            }
        }
        return Direction.NONE();
    }

}