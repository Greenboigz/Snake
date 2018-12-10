var map, snake, timer, view, keypadListener, loaded = 0;
var INIT_RELOAD = 5000, RELOAD = 12, DIV_SIZE = 8, PIXELS_PER_DIV = 32;
var GRID_DIM = 15;

var handlerIncludes = ["js/handlers/KeypadListener.js", "js/handlers/MoveHandler.js"];
var mathIncludes = ["js/math/Random.js", "js/math/Direction.js", "js/math/Vector.js", "js/math/Timer.js"];
var modelIncludes = ["js/model/items/Item.js", "js/model/items/Fruit.js", 
  "js/model/map/Tile.js", "js/model/map/Map.js", "js/model/protagonist/Protagonist.js", 
  "js/model/protagonist/Snake.js"];
var viewIncludes = ["js/view/ImageHandler.js", "js/view/View.js", "js/view/Fence.js"];

var includes = [];
includes = includes.concat(handlerIncludes);
includes = includes.concat(mathIncludes);
includes = includes.concat(modelIncludes);
includes = includes.concat(viewIncludes);

/**
 * Loads the Javascript files
 * @param {string} url 
 * @param {function} callback 
 */
function loadScript(url, callback) {
  // Adding the script tag to the head as suggested before
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  // script.onreadystatechange = callback;
  script.onload = callback;
  script.async = false;

  // Fire the loading
  head.appendChild(script);
}

/**
 * Reads the text file specified by the file string and the 
 * @param {string} file URL path to the file
 * @param {function} onSuccess function called when the file is successfully read
 */
function readTextFile(file, onSuccess) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        onSuccess(allText);
      }
    }
  }
  rawFile.send(null);
}

/**
 * Reads the text file specified by the file string and the 
 * @param {string} file URL path to the file
 * @param {function} onSuccess function called when the file is successfully read
 */
function readJSONFile(file, onSuccess) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        onSuccess(JSON.parse(allText));
      }
    }
  }
  rawFile.send(null);
}

function loadCallback(name) {
  loaded++;
  if (loaded >= includes.length) {
    setTimeout(() => {
      init();
      repeat(); 
    }, INIT_RELOAD);
  }
}

function load_files() {
  var i;

  for (i = 0; i < includes.length; i++) {
    loadScript(includes[i], loadCallback(includes[i]));
  }
}

function print(param) {
  console.log("param = " + param);
}

/**
 * Loads the map
 */
function init() {
  map = new BaseMap(GRID_DIM, GRID_DIM);
  snake = new Snake(map);
  map._protagonist = snake;
  timer = new Timer();
  snake.onDie = () => { timer.stop() };
  timer.start();
  view = new View(map, timer);
  view.local = false;
  setFruit();

  keypadListener = new KeypadListener();

  keypadListener.getKeyListener("up").addKeyDownEvent(callDownNorth);
  keypadListener.getKeyListener("right").addKeyDownEvent(callDownEast);
  keypadListener.getKeyListener("down").addKeyDownEvent(callDownSouth);
  keypadListener.getKeyListener("left").addKeyDownEvent(callDownWest);
  keypadListener.getKeyListener("w").addKeyDownEvent(callDownNorth);
  keypadListener.getKeyListener("d").addKeyDownEvent(callDownEast);
  keypadListener.getKeyListener("s").addKeyDownEvent(callDownSouth);
  keypadListener.getKeyListener("a").addKeyDownEvent(callDownWest);
  // keypadListener.getKeyListener("up").addKeyUpEvent(callUpNorth);
  // keypadListener.getKeyListener("right").addKeyUpEvent(callUpEast);
  // keypadListener.getKeyListener("down").addKeyUpEvent(callUpSouth);
  // keypadListener.getKeyListener("left").addKeyUpEvent(callUpWest);
}

function setFruit() {
  var tile;
  while (!tile) {
    tile = map.randomTile();
    if (snake.containsTile(tile.location)) {
      tile = null;
    }
  }
  var fruit = new Fruit();
  fruit.onConsume = setFruit;
  map.getTile(tile.location.x, tile.location.y).item = fruit;
}

function callDownNorth() {
  snake.turn(Direction.NORTH());
}

function callDownEast() {
  snake.turn(Direction.EAST());
}

function callDownSouth() {
  snake.turn(Direction.SOUTH());
}

function callDownWest() {
  snake.turn(Direction.WEST());
}

function callUpNorth() {
  snake.unturn(Direction.NORTH());
}

function callUpEast() {
  snake.unturn(Direction.EAST());
}

function callUpSouth() {
  snake.unturn(Direction.SOUTH());
}

function callUpWest() {
  snake.unturn(Direction.WEST());
}

function repeat() {
  //document.getElementById("divGameStage").innerHTML = map.toString();
  view.draw();
  modelRepeat();
  setTimeout(repeat, RELOAD);
}

function modelRepeat() {
  snake.move();
}

load_files();
