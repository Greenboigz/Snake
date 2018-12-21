class Mouse extends Item {

    /**
     * Builds the fruit object
     */
    constructor(map, location, direction) {
      super(map, location, direction, 1 / DIV_SIZE / 4, 3, "mouse", "m");

      this._moving = false;
      this._prevGridLoc = this.gridLocation;
    }

    get prevGridLocation() {
        return this._prevGridLoc;
    }

    /**
     * Handles all the movements of the enemy
     */
    move() {
        this.moveDecision();
        if (this._moving) {
            var newLoc = Vector.add(this._gridLoc, this.unit_step);
            if (this._grid.getTile(newLoc.x, newLoc.y).isTraversible() && !this._grid.getTile(newLoc.x, newLoc.y).containsProtagonist()) {
                this._loc = Vector.add(this._loc, this.step);
                if (!this.isBetween()) {
                    this._loc = Vector.round(this._loc);
                    this.map.getTile(this.gridLocation.x, this.gridLocation.y).removeItem();
                    this._prevGridLoc = this._gridLoc;
                    this._gridLoc = Vector.round(this._loc);
                    this.map.getTile(this.gridLocation.x, this.gridLocation.y).item = this;
                    
                    this.randomDirection();
                }
            } else {
                this.randomDirection();
            }
        }
    }

    moveDecision() {
        if (!this.isBetween()) {
            this._moving = Math.floor(Math.random() * 10) == 0;
        }
    }

    randomDirection() {
        var randInt = Math.floor(Math.random() * 4);
        switch (randInt) {
            case 0:
            this._direction = Direction.NORTH();
            break;
            case 1:
            this._direction = Direction.EAST();
            break;
            case 2:
            this._direction = Direction.SOUTH();
            break;
            case 3:
            this._direction = Direction.WEST();
            break;
        }
    }
  
}