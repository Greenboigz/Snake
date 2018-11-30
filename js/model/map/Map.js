class Map {

  /**
   * Builds the map object to the specified height and width
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    this._width = width;
    this._height = height;
    this._grid = [];
    this._protagonist = null;

    this.buildGrid();
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get protagonist() {
    return this._protagonist;
  }

  /**
   * Gets the tile at the given location
   * @param {number} x
   * @param {number} y
   * @return {Tile}
   */
  getTile(x, y) {
    if (Math.floor(x) == x && Math.floor(y) == y) {
      if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
        return this._grid[y][x];
      } else {
        return new Space(x,y);
      }
    }
    throw "x and y coordinates must be integers - " + "{" + x + "," + y + "}";
  }

  /**
   * Gets the tile at the given location
   * @param {Tile} tile
   */
  setTile(tile) {
    if (this._grid[tile.location.y][tile.location.x]._prevState != null) {
      tile._prevState = this._grid[tile.location.y][tile.location.x]._prevState;
    }
    this._grid[tile.location.y][tile.location.x] = tile;
  }

  /**
   * Builds the grid of the Map
   */
  buildGrid() {
    for (var y = 0; y < this._height; y++) {
      this._grid.push([]);
      for (var x = 0; x < this._width; x++) {
        this._grid[y].push(new Wall(x, y));
      }
    }
  }

  /**
   * Checks if the location entered is valid
   * @param {Number} x
   * @param {Number} y
   * @return {boolean}
   */
  isValidLocation(x, y) {
    return x >= 0 && x < this._width && y >= 0 && y < this._height;
  }

  /**
   * Prints the map to the console
   * @return {string}
   */
  toString() {
    var output = "";
    for (var y = this._height - 1; y >= 0; y--) {
      var line = "";
      for (var x = 0; x < this._width; x++) {
        var tile = this.getTile(x,y);
        line += tile.toString();
      }
      output += line + "\n";
    }
    return output;
  }

  /**
   * Prints the map to the console
   * @return {string}
   */
  toItemString() {
    var output = "";
    for (var y = this._height - 1; y >= 0; y--) {
      var line = "";
      for (var x = 0; x < this._width; x++) {
        var tile = this.getTile(x,y);
        if (tile.hasItem()) {
          line += tile.item.toString();
        } else {
          line += " ";
        }
      }
      output += line + "\n";
    }
    return output;
    }

  /**
   * Loads a map object from the file (fileName)
   * @param {String} mapGrid
   * @param {String} itemGrid
   * @param {Array} enemies
   * @return {Map}
   */
  static loadFromString(mapGrid, itemGrid, enemies) {
    mapGrid = mapGrid.split('\n');
    itemGrid = itemGrid.split('\n');
    var height = mapGrid.length;
    var width = mapGrid[0].length;

    var myMap = new Map(width, height);
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var tile = Tile.createTile(x,y,mapGrid[height - y - 1][x]);
        if (tile.isStorable()) {
          tile.item = Item.createItem(itemGrid[height - y - 1][x]);
        }
        myMap.setTile(tile);
      }
    }

    for (var e = 0; e < enemies.length; e++) {
      var enemy = enemies[e];
      enemy = Enemy.createEnemyFromString(enemy.type, enemy.coordinate, enemy.direction, myMap);
    }

    return myMap;
  }

}

class BaseMap extends Map {

  /**
   * Builds a map with just an outer wall
   * @param {Number} width
   * @param {Number} height
   */
  constructor(width, height) {
    super(width, height);

    this.clearInit();
  }

  /**
   * Clears the map on initialization
   */
  clearInit() {
    for (var x = 1; x < this._width - 1; x++) {
      for (var y = 1; y < this._height - 1; y++) {
        this.setTile(new Space(x,y));
      }
    }
  }

  randomTile() {
    return this.getTile(1+getRandomInt(this.width-2), 1+getRandomInt(this.height-2));
  }

}
