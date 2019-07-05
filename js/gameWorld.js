class GameWorld {
    constructor() {
        this.gameContext = ctx;
        this.gameStates = [
            {   
                Load_state : true,
                Menu_state : false,
                Game_start : {
                    isplaying: false,
                    isPaused: false,
                    gameOver: false,
                    quitGame: false
                } 
            }
        ]
        // console.log(this);
    }

    init() {
        if(gameWrapper.getContext('2d')) {
            this.map = new Map(); //let
            this.map.drawMap();
            console.log('this');
            this.ray = new Raycast(PLAYER_START_POSX, PLAYER_START_POSY, START_ANGLE_R, ROTATE_SPEED_R, MOVE_SPEED);
            console.log(this.ray);
            this.gameLoop();
        }

        else {
            console.log('not support');
        }
    }

    gameLoop() {
        console.log('gameloop');
        this.ray.draw();
        this.ray.update();
        // window.requestAnimationFrame(this.gameLoop);
    }
}