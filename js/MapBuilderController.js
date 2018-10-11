var map, protagonist, view, keypadListener, loaded = 0;
var INIT_RELOAD = 500, RELOAD = 20, DIV_SIZE = 8, PIXELS_PER_DIV = 32;

var handlerIncludes = ["js/handlers/KeypadListener.js",
                       "js/handlers/MoveHandler.js"];
var mathIncludes = ["js/math/Direction.js",
                    "js/math/Vector.js"];
var modelIncludes = ["js/model/enemy/Enemy.js", "js/model/enemy/Shark.js",
                     "js/model/items/Item.js", "js/model/items/Key.js",
                     "js/model/map/Tile.js", "js/model/map/Door.js", "js/model/map/Level.js", "js/model/map/Map.js",
                     "js/model/protagonist/Protagonist.js", "js/model/protagonist/Builder.js"];
var viewIncludes = ["js/view/ImageHandler.js",
                    "js/view/View.js"];

var includes = [];
includes = includes.concat(handlerIncludes);
includes = includes.concat(mathIncludes);
includes = includes.concat(modelIncludes);
includes = includes.concat(viewIncludes);

function loadScript(url, callback)
{
  // Adding the script tag to the head as suggested before
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;
  script.async = false;

  // Fire the loading
  head.appendChild(script);
}

function loadCallback(name) {
  loaded++;
  //console.log(name + " loaded\n");
  if (loaded >= includes.length) {
    setTimeout(function() { init(); repeat(); modelRepeat(); }, INIT_RELOAD);
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
 * Creates a text file from the input text
 * @param {string} fileName
 * @param {string} text
 */
function exportText(fileName, text) {
  var data = new Blob([text], {type: 'text/plain'});

  var textFile = window.URL.createObjectURL(data);

  var a = window.document.createElement('a');
  a.href = textFile;
  a.download = fileName;

  // Append anchor to body.
  document.body.appendChild(a)
  a.click();

  // Remove anchor from body
  document.body.removeChild(a);
};

function getAllUrlParams(url) {
  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}

function getInputs() {
  var height = getAllUrlParams().height;
  if (height == null) {
    height = 10;
  }
  var width = getAllUrlParams().width;
  if (width == null) {
    width = 10;
  }
  return {width, height};
}

function init() {
  var dim = getInputs();
  map = new BaseMap(dim.width, dim.height);
  protagonist = new Builder(1, 1, map);
  map._protagonist = protagonist
  enemies = map.enemies;
  view = new View(this.map);

  keypadListener = new KeypadListener();
  keypadListener.addKeyListener("space", 32);
  keypadListener.addKeyListener("q", 81);
  keypadListener.addKeyListener("a", 65);
  keypadListener.addKeyListener("w", 87);
  keypadListener.addKeyListener("s", 83);
  keypadListener.addKeyListener("e", 69);
  keypadListener.addKeyListener("d", 68);
  keypadListener.addKeyListener("ctrl", CTRL);
  keypadListener.addKeyListener("shift", SHIFT);
  keypadListener.addKeyListener("enter", 13)

  keypadListener.getKeyListener("up").addKeyDownEvent(callDownNorth);
  keypadListener.getKeyListener("right").addKeyDownEvent(callDownEast);
  keypadListener.getKeyListener("down").addKeyDownEvent(callDownSouth);
  keypadListener.getKeyListener("left").addKeyDownEvent(callDownWest);
  keypadListener.getKeyListener("up").addKeyUpEvent(callUpNorth);
  keypadListener.getKeyListener("right").addKeyUpEvent(callUpEast);
  keypadListener.getKeyListener("down").addKeyUpEvent(callUpSouth);
  keypadListener.getKeyListener("left").addKeyUpEvent(callUpWest);
  keypadListener.getKeyListener("space").addKeyDownEvent(callSpecial);
  keypadListener.getKeyListener("space").addKeyUpEvent(callUnspecial);
  keypadListener.getKeyListener("ctrl").addKeyDownEvent(callControl);
  keypadListener.getKeyListener("ctrl").addKeyUpEvent(callUncontrol);
  keypadListener.getKeyListener("shift").addKeyDownEvent(callShift);
  keypadListener.getKeyListener("shift").addKeyUpEvent(callUnshift);
  keypadListener.getKeyListener("enter").addKeyDownEvent(callEnter);
  keypadListener.getKeyListener("q").addKeyDownEvent(callUpTile);
  keypadListener.getKeyListener("a").addKeyDownEvent(callDownTile);
  keypadListener.getKeyListener("w").addKeyDownEvent(callUpItem);
  keypadListener.getKeyListener("s").addKeyDownEvent(callDownItem);
  keypadListener.getKeyListener("e").addKeyDownEvent(callUpEnemy);
  keypadListener.getKeyListener("d").addKeyDownEvent(callDownEnemy);
}

function callDownNorth() {
  protagonist.turn(Direction.NORTH());
}

function callDownEast() {
  protagonist.turn(Direction.EAST());
}

function callDownSouth() {
  protagonist.turn(Direction.SOUTH());
}

function callDownWest() {
  protagonist.turn(Direction.WEST());
}

function callUpNorth() {
  protagonist.unturn(Direction.NORTH());
}

function callUpEast() {
  protagonist.unturn(Direction.EAST());
}

function callUpSouth() {
  protagonist.unturn(Direction.SOUTH());
}

function callUpWest() {
  protagonist.unturn(Direction.WEST());
}

function callSpecial() {
  protagonist.special();
}

function callUnspecial() {
  protagonist.unspecial();
}

function callControl() {
  protagonist.drag();
}

function callUncontrol() {
  protagonist.undrag();
}

function callShift() {
  protagonist.highlight();
}

function callUnshift() {
  protagonist.unhighlight();
}

function callUpTile() {
  protagonist.changeTile(1);
}

function callDownTile() {
  protagonist.changeTile(-1);
}

function callUpItem() {
  console.log("Item Up");
}

function callDownItem() {
  console.log("Item Down");
}

function callUpEnemy() {
  console.log("Enemy Up");
}

function callDownEnemy() {
  console.log("Enemy Down");
}

function callEnter() {
  exportText("tile_map.txt", map.toString());
  exportText("item_map.txt", map.toItemString());

}

function repeat() {
  //document.getElementById("divGameStage").innerHTML = map.toString();
  view.draw();
  setTimeout(repeat, RELOAD);
}

function modelRepeat() {
  protagonist.move();
  setTimeout(modelRepeat, 4*RELOAD);
}

load_files();
