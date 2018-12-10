/**
 * Decides the fence image from the surrounding tiles
 * @param {Map} map
 * @param {Vector} loc
 */
function chooseFence(map, loc) {
    var top = true, left = true, bottom = true, right = true;

    if (map.getTile(loc.x, loc.y - 1)) {
        bottom = map.getTile(loc.x, loc.y - 1).isTraversible();
    }
    if (map.getTile(loc.x, loc.y + 1)) {
        top = map.getTile(loc.x, loc.y + 1).isTraversible();
    }
    if (map.getTile(loc.x - 1, loc.y)) {
        left = map.getTile(loc.x - 1, loc.y).isTraversible();
    }
    if (map.getTile(loc.x + 1, loc.y)) {
        right = map.getTile(loc.x + 1, loc.y).isTraversible();
    }

    if (!top) {
        if (!right) {
            return "bottom_left";
        } else if (!left) {
            return "bottom_right";
        }
    }
    if (!bottom) {
        if (!right) {
            return "top_left";
        } else if (!left) {
            return "top_right";
        }
    }
    if (!top && !bottom) {
        if (chooseFence(map, new Vector(loc.x, loc.y-1)) != "ver" && chooseFence(map, new Vector(loc.x, loc.y-1)) != "ver_bottom") return "ver_bottom";
        else return "ver";
    }
    return "hor";
}