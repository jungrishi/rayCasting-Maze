const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;

const SCALE_FACTOR = 0.4;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

const ROTATE_SPEED = 4;
const ROTATE_SPEED_R = degToRadian(ROTATE_SPEED);
const MOVE_SPEED = 0.14;
const SPEED = 0;
const MAP_SCALE = 8;

const PLAYER_START_POSX = 16;
const PLAYER_START_POSY = 10;
const START_ANGLE = -10;

const FOV = degToRadian(60);
const HALF_FOV = FOV / 2;
const DOUBLEPI =( Math.PI * 2);
const RAY_WIDTH = 4;
const PROJECTION_PLANE_WIDTH = 320;
const PROJECTION_PLANE_HEIGHT = 200;
const VIEW_DIST = (PROJECTION_PLANE_WIDTH / 2) / Math.tan(HALF_FOV); //perp distance
const NUM_RAYS = (PROJECTION_PLANE_WIDTH / RAY_WIDTH);
const MAX_VISION_RANGE = 100;

var LOAD_STATE = 0
var MENU_STATE = 1
var START = 2
var IS_PLAYING = 3
var IS_PAUSED = 4
var GAMEOVER = 5