const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;

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
const PROJECTION_PLANE_WIDTH = 32;
const PROJECTION_PLANE_HEIGHT = 20;
const VIEW_DIST = (PROJECTION_PLANE_WIDTH / 2) / Math.tan(HALF_FOV); //perp distance
const NUM_RAYS = (PROJECTION_PLANE_WIDTH / RAY_WIDTH);
const MAX_VISION_RANGE = 100;