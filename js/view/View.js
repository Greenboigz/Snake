var DISPLAY_DIM = 15;

class View {

  /**
   * Constructs the View object
   * @param {Map} map
   * @param {boolean} local
   */
  constructor(map, local) {
    this.map = map;
    this.local = true;
    this.protagonist = map.protagonist;
    this.IMAGES = {};
    this.divImg = document.getElementById("divGameImg");

    this.local = local;
  }

  set local(local) {
    var canvas = document.createElement("canvas");
    if (local) {
      canvas.width = (DISPLAY_DIM+2)*PIXELS_PER_DIV;
      canvas.height = (DISPLAY_DIM+2)*PIXELS_PER_DIV;
    } else {
      canvas.width = (this.map.width+2)*PIXELS_PER_DIV;
      canvas.height = (this.map.height+2)*PIXELS_PER_DIV;
    }
    this._local = local;
    this.ctx = canvas.getContext("2d");

    var div = document.getElementById("divGameStage");
    if (div.childNodes[0]) {
      div.removeChild(div.childNodes[0]);
    }
    div.appendChild(canvas);
    
    this.imageHandler = new ImageHandler(this.ctx);
    this.loadImages();
  }

  /**
   * Loads all the images in the image div
   */
  loadImages() {
    this.imageHandler.loadImage("wall", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("space", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("snake", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("token", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("snake_head", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("snake_segment", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("snake_corner", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("snake_tail", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("apple", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
  }

  draw() {
    if (this._local) {
      this.drawLocal();
    } else {
      this.drawFull();
    }
  }

  /**
   * Draws the canvas
   */
  drawFull() {
    this.drawMap();
    this.drawProtagonist();
    // this.drawBorder();
  }

  /**
   * Draws the Protagonist
   */
  drawProtagonist() {
    // console.log(`Protagonist: ${this.protagonist.image}`);
    var body = this.protagonist.getBody();
    for (var b = 0; b < body.length; b++) {
      var image = "snake_head";
      var rotation = undefined;
      if (b == this.protagonist.length - 1) {
        image = "snake_tail";
      } else if (b > 0) {
        image = "snake_segment";
      }
      this.imageHandler.drawImage(image, (body[b].location.x + 1) * PIXELS_PER_DIV,
        (this.map.height - body[b].location.y) * PIXELS_PER_DIV,
        body[b].direction.radians);
      if (b > 0 && !Direction.compare(body[b].direction, body[b-1].direction)) {
        if (!Direction.compare(body[b].getCornerRotation(body[b-1].direction), Direction.NONE())) {
          rotation = body[b].getCornerRotation(body[b-1].direction).radians;
        }
      }
      if (rotation != undefined) {
        var loc = Vector.add(body[b].gridLocation, body[b].direction.toVector());
        this.clearTile(loc);
        this.imageHandler.drawImage("snake_corner", (loc.x + 1) * PIXELS_PER_DIV,
          (this.map.height - loc.y) * PIXELS_PER_DIV,
          rotation);
      }
    }
    if (this.protagonist.isGrowing() && body.length < this.protagonist.length) {
      var loc = body[body.length - 1].gridLocation;
      this.clearTile(loc);
      this.imageHandler.drawImage("snake_tail", (loc.x + 1) * PIXELS_PER_DIV,
        (this.map.height - loc.y) * PIXELS_PER_DIV,
        body[body.length - 1].direction.radians);
    }
  }

  clearTile(location) {
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.fillRect((location.x + 1) * PIXELS_PER_DIV, (this.map.height - location.y) * PIXELS_PER_DIV,
      PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.ctx.stroke();
  }

  drawBorder() {
    this.ctx.beginPath();
    this.ctx.lineWidth=PIXELS_PER_DIV;
    this.ctx.strokeStyle="black";
    this.ctx.rect(PIXELS_PER_DIV/2,PIXELS_PER_DIV/2,(this.map.width+1) * PIXELS_PER_DIV, (this.map.height+1) * PIXELS_PER_DIV);
    this.ctx.stroke();
  }

  /**
   * Draws the map
   */
  drawMap() {
    var x, y;
    for (x = 0; x < this.map.width; x++) {
      for (y = 0; y < this.map.height; y++) {
        var tile = this.map.getTile(x,y)
        this.imageHandler.drawImage(tile.image, (x + 1) * PIXELS_PER_DIV, (this.map.height - y) * PIXELS_PER_DIV, 0);
        if (tile.hasItem()) {
          this.imageHandler.drawImage(tile.item.image, (x + 1) * PIXELS_PER_DIV, (this.map.height - y) * PIXELS_PER_DIV, 0);
        }
      }
    }
  }

  /**
   * Only draws the board surrounding the protagonist
   */
  drawLocal() {
    this.drawLocalMap();
    this.drawLocalProtagonist();
    this.drawLocalBorder();
  }

  /**
   * Draws local map of where the protagonist is
   */
  drawLocalMap() {
    var i, j;
    var center = new Vector(Math.floor(DISPLAY_DIM/2)+1, Math.floor(DISPLAY_DIM/2));
    for (i = -1; i < DISPLAY_DIM+2; i++) {
      for (j = -1; j < DISPLAY_DIM+2; j++) {
        var tile = this.map.getTile(i - center.x + this.protagonist.gridLocation.x, j - center.y + this.protagonist.gridLocation.y);
        var location = Vector.add(tile.location, Vector.subtract(center, protagonist.location));
        this.imageHandler.drawImage(tile.image, location.x * PIXELS_PER_DIV, (DISPLAY_DIM - location.y) * PIXELS_PER_DIV, 0);
        if (tile.hasItem()) {
          this.imageHandler.drawImage(tile.item.image, location.x * PIXELS_PER_DIV, (DISPLAY_DIM - location.y) * PIXELS_PER_DIV, 0);
        }
      }
    }
  }

  /**
   * Draws the protagonist at the center of the local map
   */
  drawLocalProtagonist() {
    if (this.protagonist.isAlive()) {
      this.imageHandler.drawImage(this.protagonist.image, Math.floor(DISPLAY_DIM/2 + 1) * PIXELS_PER_DIV,
        Math.floor(DISPLAY_DIM/2 + 1) * PIXELS_PER_DIV, this.protagonist.direction.radians);
    }
  }

  drawLocalBorder() {
    this.ctx.beginPath();
    this.ctx.lineWidth=PIXELS_PER_DIV;
    this.ctx.strokeStyle="black";
    this.ctx.rect(PIXELS_PER_DIV/2,PIXELS_PER_DIV/2,(DISPLAY_DIM+1) * PIXELS_PER_DIV, (DISPLAY_DIM+1) * PIXELS_PER_DIV);
    this.ctx.stroke();
  }

}