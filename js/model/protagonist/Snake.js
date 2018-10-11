class Snake extends Protagonist {
    
    /**
     * @param {Map} grid 
     */
    constructor(grid) {
        super(Math.floor(grid.width / 2), Math.floor(grid.height / 2), grid);

        this._length = 10;
        this._body = [new SnakeSegment(this.location, this.direction)];
    }

    /**
     * Consumes the item on the tile if the tile contains an item
     */
    consume() {
        super.consume();
        // this._body.push(this.gridLocation);
    }

    /**
     * Moves the snake forward if it can
     */
    move() {
        if (this.isAlive()) {
            this._body.reverse().push(new SnakeSegment(this.location, this.direction));
            this._body.reverse();
            if (this._body.length > this._length * DIV_SIZE + 1) {
                this._body.pop();
            }
        }
        super.move();
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

}

class SnakeSegment {

    /**
     * Builds the snake segment
     * @param {Vector} location 
     * @param {Direction} direction 
     */
    constructor(location, direction) {
        this._loc = location;
        this._dir = direction;
    }

    /** @return { Vector } */
    get location() {
        return this._loc;
    }

    /** @return { Direction } */
    get direction() {
        return this._dir;
    }

}