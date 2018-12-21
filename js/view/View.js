var DISPLAY_DIM = 15;

var SCOREBOARD_DIVS_HEIGHT = 2;
var SCOREBOARD_DIVS_WIDTH = 5;

var SCOREBOARD_X_OFFSET = 14 * 2;
var SCOREBOARD_Y_OFFSET = 4 * 2;

var NUMBER_HEIGHT = 20 * 2;
var NUMBER_WIDTH = 10 * 2;

var NUMBER_SEPARATION = 4 * 2;

class View {

  /**
   * Constructs the View object
   * @param {Map} map
   * @param {boolean} local
   */
  constructor(map, timer) {
    this.map = map;
    this.local = true;
    this.protagonist = map.protagonist;
    this.IMAGES = {};
    this.divImg = document.getElementById("divGameImg");
    this.count = 0;
    this.tail_direction = Direction.EAST();

    this._tilesDrawn = [];
    this._prevTilesDrawn = [];

    this.timer = timer;
  }

  set local(local) {
    var canvas = document.createElement("canvas");
    canvas.width = (this.map.width)*PIXELS_PER_DIV;
    canvas.height = (this.map.height+SCOREBOARD_DIVS_HEIGHT)*PIXELS_PER_DIV;
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
    var STEPS = 5;
    this.imageHandler.loadImage("wall", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("space", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("snake", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("token", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("snake_head", STEPS*DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("snake_segment", STEPS*DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("snake_corner", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("snake_tail", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("snake_2_head", STEPS*DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("snake_2_segment", STEPS*DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("snake_2_corner", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("snake_2_corner_left", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("snake_2_corner_right", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("snake_2_corner_left_moving", 0.5*RELOAD*DIV_SIZE/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("snake_2_corner_right_moving", 0.5*RELOAD*DIV_SIZE/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("snake_2_tail", STEPS*DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("centipede_head", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("centipede_segment", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("centipede_corner_right", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);    
    this.imageHandler.loadImage("centipede_corner_left", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("centipede_tail", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("apple", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("grass", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("mouse", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("fence_hor", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("fence_ver", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("fence_ver_bottom", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("fence_top_left", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("fence_top_right", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("fence_bottom_left", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("fence_bottom_right", DIV_SIZE*RELOAD/1000, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("scoreboard-0", DIV_SIZE*RELOAD/1000, NUMBER_WIDTH, NUMBER_HEIGHT, false);
    this.imageHandler.loadImage("scoreboard-1", DIV_SIZE*RELOAD/1000, NUMBER_WIDTH, NUMBER_HEIGHT, false);
    this.imageHandler.loadImage("scoreboard-2", DIV_SIZE*RELOAD/1000, NUMBER_WIDTH, NUMBER_HEIGHT, false);
    this.imageHandler.loadImage("scoreboard-3", DIV_SIZE*RELOAD/1000, NUMBER_WIDTH, NUMBER_HEIGHT, false);
    this.imageHandler.loadImage("scoreboard-4", DIV_SIZE*RELOAD/1000, NUMBER_WIDTH, NUMBER_HEIGHT, false);
    this.imageHandler.loadImage("scoreboard-5", DIV_SIZE*RELOAD/1000, NUMBER_WIDTH, NUMBER_HEIGHT, false);
    this.imageHandler.loadImage("scoreboard-6", DIV_SIZE*RELOAD/1000, NUMBER_WIDTH, NUMBER_HEIGHT, false);
    this.imageHandler.loadImage("scoreboard-7", DIV_SIZE*RELOAD/1000, NUMBER_WIDTH, NUMBER_HEIGHT, false);
    this.imageHandler.loadImage("scoreboard-8", DIV_SIZE*RELOAD/1000, NUMBER_WIDTH, NUMBER_HEIGHT, false);
    this.imageHandler.loadImage("scoreboard-9", DIV_SIZE*RELOAD/1000, NUMBER_WIDTH, NUMBER_HEIGHT, false);
    this.imageHandler.loadImage("empty_scoreboard", DIV_SIZE*RELOAD/1000, SCOREBOARD_DIVS_WIDTH * PIXELS_PER_DIV, SCOREBOARD_DIVS_HEIGHT * PIXELS_PER_DIV);
    this.imageHandler.loadImage("empty_timeboard", DIV_SIZE*RELOAD/1000, SCOREBOARD_DIVS_WIDTH * PIXELS_PER_DIV, SCOREBOARD_DIVS_HEIGHT * PIXELS_PER_DIV);
  }

  draw() {
    this.drawScoreboard();
    this.drawMap();
    this.drawProtagonist();
    this.count++;
  }

  drawScoreboard() {
    if (this.count == 0) {
      for (var x = 0; x < this.map.width; x++) {
        for (var y = 0; y < Math.ceil(SCOREBOARD_DIVS_HEIGHT); y++) {
          this.imageHandler.drawImage("grass", x * PIXELS_PER_DIV, (y - SCOREBOARD_DIVS_HEIGHT) * PIXELS_PER_DIV, 0);
        }
      }

      this.imageHandler.drawImage("empty_scoreboard", 
        0,
        - SCOREBOARD_DIVS_HEIGHT * PIXELS_PER_DIV,
        0);
  
      this.imageHandler.drawImage("empty_timeboard", 
        (this.map.width - SCOREBOARD_DIVS_WIDTH) * PIXELS_PER_DIV,
        - SCOREBOARD_DIVS_HEIGHT * PIXELS_PER_DIV,
        0);
    }

    this.imageHandler.drawImage(
      "scoreboard-" + Math.floor((this.protagonist.points % 10000) / 1000), 
      SCOREBOARD_X_OFFSET, 
      SCOREBOARD_Y_OFFSET - SCOREBOARD_DIVS_HEIGHT * PIXELS_PER_DIV, 
      0);
    this.imageHandler.drawImage(
      "scoreboard-" + Math.floor((this.protagonist.points % 1000) / 100), 
      SCOREBOARD_X_OFFSET + NUMBER_WIDTH + NUMBER_SEPARATION, 
      SCOREBOARD_Y_OFFSET - SCOREBOARD_DIVS_HEIGHT * PIXELS_PER_DIV,
      0);
    this.imageHandler.drawImage(
      "scoreboard-" + Math.floor((this.protagonist.points % 100) / 10), 
      SCOREBOARD_X_OFFSET + (NUMBER_WIDTH + NUMBER_SEPARATION) * 2, 
      SCOREBOARD_Y_OFFSET - SCOREBOARD_DIVS_HEIGHT * PIXELS_PER_DIV,
      0);
    this.imageHandler.drawImage(
      "scoreboard-" + Math.floor((this.protagonist.points % 10)), 
      SCOREBOARD_X_OFFSET + (NUMBER_WIDTH + NUMBER_SEPARATION) * 3, 
      SCOREBOARD_Y_OFFSET - SCOREBOARD_DIVS_HEIGHT * PIXELS_PER_DIV,
      0);
    
    var time = this.timer.getTime();
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    // var milliseconds = time - Math.floor(time);

    this.imageHandler.drawImage(
      "scoreboard-" + Math.floor( minutes / 10), 
      (this.map.width - SCOREBOARD_DIVS_WIDTH) * PIXELS_PER_DIV + SCOREBOARD_X_OFFSET, 
      SCOREBOARD_Y_OFFSET - SCOREBOARD_DIVS_HEIGHT * PIXELS_PER_DIV, 
      0);
    this.imageHandler.drawImage(
      "scoreboard-" + minutes % 10, 
      (this.map.width - SCOREBOARD_DIVS_WIDTH) * PIXELS_PER_DIV + SCOREBOARD_X_OFFSET + NUMBER_WIDTH + NUMBER_SEPARATION, 
      SCOREBOARD_Y_OFFSET - SCOREBOARD_DIVS_HEIGHT * PIXELS_PER_DIV,
      0);

    this.imageHandler.drawImage(
      "scoreboard-" + Math.floor( seconds / 10), 
      (this.map.width - SCOREBOARD_DIVS_WIDTH) * PIXELS_PER_DIV + SCOREBOARD_X_OFFSET + (NUMBER_WIDTH + NUMBER_SEPARATION) * 2, 
      SCOREBOARD_Y_OFFSET - SCOREBOARD_DIVS_HEIGHT * PIXELS_PER_DIV,
      0);
    this.imageHandler.drawImage(
      "scoreboard-" + seconds % 10, 
      (this.map.width - SCOREBOARD_DIVS_WIDTH) * PIXELS_PER_DIV + SCOREBOARD_X_OFFSET + (NUMBER_WIDTH + NUMBER_SEPARATION) * 3, 
      SCOREBOARD_Y_OFFSET - SCOREBOARD_DIVS_HEIGHT * PIXELS_PER_DIV,
      0);
  }

  /**
   * Draws the Protagonist
   */
  drawProtagonist() {
    // console.log(`Protagonist: ${this.protagonist.image}`);
    var body = this.protagonist.getBody();
    var head = Vector.add(body[0].gridLocation, body[0].direction.toVector());
    this.drawTile(head.x, head.y);
    for (var b = 0; b < body.length; b++) {
      this.drawTile(body[b].gridLocation.x, body[b].gridLocation.y);
    }
    var loc = Vector.add(body[body.length - 1].gridLocation, this.tail_direction.opposite.toVector());
    this.drawTile(loc.x, loc.y);
    this.tail_direction = body[body.length - 1].direction;
    for (var b = 0; b < body.length; b++) {
      var image = "snake_2_head";
      var rotation = undefined, turn = 0;
      if (b == this.protagonist.length - 1) {
        image = "snake_2_tail";
      } else if (b > 0) {
        image = "snake_2_segment";
      }
      this.drawSegment(image, body[b].location, body[b].direction);
      if (this.isCornerSegment(b)) {
        var corner = body[b].getCornerRotation(body[b-1].direction);
        rotation = corner[0];
        turn = corner[1];
      }
      if (rotation != undefined) {
        var loc = Vector.add(body[b].gridLocation, body[b].direction.toVector());
        this.drawTile(loc.x, loc.y);
        if (this.protagonist.isAlive()) {
          this.drawSegment(turn < 0 ? "snake_2_corner_left_moving" : "snake_2_corner_right_moving", loc, rotation);
        } else {
          this.drawSegment(turn < 0 ? "snake_2_corner_left" : "snake_2_corner_right", loc, rotation);
        }
      }
    }
    if (this.protagonist.isGrowing()) {
      var loc = body[body.length - 1].gridLocation;
      this.drawTile(loc.x, loc.y);
      this.drawSegment("snake_2_tail", loc, body[body.length - 1].direction);
    }
  }

  isCornerSegment(index) {
    var body = this.protagonist.getBody();
    return (index > 0 && !Direction.compare(body[index].direction, body[index-1].direction) && 
      !Direction.compare(body[index].getCornerRotation(body[index-1].direction), Direction.NONE()));
  }

  clearTile(loc) {
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(loc.x * PIXELS_PER_DIV, (this.map.height - loc.y - 1) * PIXELS_PER_DIV,
      PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.ctx.stroke();
  }

  drawBorder() {
    this.ctx.beginPath();
    this.ctx.lineWidth=PIXELS_PER_DIV;
    this.ctx.strokeStyle="black";
    this.ctx.rect(
      PIXELS_PER_DIV/2,
      PIXELS_PER_DIV/2,
      (this.map.width+1) * PIXELS_PER_DIV, 
      (this.map.height+1) * PIXELS_PER_DIV);
    this.ctx.stroke();
  }

  /**
   * Draws the map
   */
  drawMap() {
    var x, y;
    this._prevTilesDrawn = this._tilesDrawn;
    this._tilesDrawn = [];
    for (x = 0; x < this.map.width; x++) {
      for (y = 0; y < this.map.height; y++) {
        var tile = this.map.getTile(x,y);
        if (tile.hasItem() || this.count == 0) {
          this.drawTile(x,y);
        }
      }
    }
    for (var t = 0; t < this._prevTilesDrawn.length; t++) {
      this.drawTile(this._prevTilesDrawn[t].x, this._prevTilesDrawn[t].y, false);
    }
  }

  drawTile(x, y, recurse = true) {
    var tile = this.map.getTile(x,y);
    this._tilesDrawn.push(tile.gridLocation);
    var image = this.getImage(x,y);
    this.imageHandler.drawImage(image, x * PIXELS_PER_DIV, (this.map.height - y - 1) * PIXELS_PER_DIV, 0);
    if (tile.hasItem() && recurse) {
      this.drawTile(tile.item.front.x, tile.item.front.y, false);
      this.drawTile(tile.item.back.x, tile.item.back.y, false);
      this.imageHandler.drawImage(
        tile.item.image, 
        tile.item.location.x * PIXELS_PER_DIV, 
        (this.map.height - tile.item.location.y - 1) * PIXELS_PER_DIV, 
        tile.item.direction.radians);
    }
  }

  drawSegment(image, loc, direction) {
    this.imageHandler.drawImage(image, loc.x * PIXELS_PER_DIV,
      (this.map.height - loc.y - 1) * PIXELS_PER_DIV,
      direction.radians);
  }

  getImage(x,y) {
    var image = this.map.getTile(x,y).image;
    if (image == "wall") image = "fence_" + chooseFence(this.map, new Vector(x,y));
    else if (image == "space") image = "grass";
    return image;
  }

}