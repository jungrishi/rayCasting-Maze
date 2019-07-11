//color for each block and power ups and obstacle define

const KEY_BIND = {
    LEFT_ARROW :37,
    UP_ARROW :38,
    RIGHT_ARROW:39,
    DOWN_ARROW :40,
    START_KEY: 13,
    PAUSE_KEY: 32,
    QUIT_KEY: 81,
}

const DIRECTION = {
    LEFT_ROTATE:   KEY_BIND.LEFT_ARROW,
    RIGHT_ROTATE:  KEY_BIND.RIGHT_ARROW,
    FORWARD_MOVE:  KEY_BIND.UP_ARROW,
    BACKWARD_MOVE: KEY_BIND.DOWN_ARROW
}

const GAME_STATES_PLAYER = {
    START_GAME: KEY_BIND.START_KEY,     
    PAUSE_GAME: KEY_BIND.PAUSE_KEY,
    QUIT_GAME:  KEY_BIND.QUIT_KEY
}

const PAUSE_TEXT = ["Game Paused \n Press 'Space Bar' To Resume or  'q' to Quit"];
const START_TEXT = ["WelCome! To The Game", "Press Enter to start the Game"];

const LOAD_STATE =0;
const  MENU_STATE=1;
     const       START=2;
          const  IS_PLAYING=3;
         const   IS_PAUSED=4;
       const     GAMEOVER=5;


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

