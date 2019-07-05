class GameWorld {
    constructor(gameWrapper) {
        this.gameContainer = gameWrapper;
        this.gameStates = [{
            Load_state: true,
            Menu_state: false,
            Game_start: {
                isplaying: false,
                isPaused: false,
                gameOver: false,
                quitGame: false
            }
        }]

        this.left = false;
        this.up = false;
        this.right = false;
        this.down = false;
            }

    init() {
        this.mapWorld = new MapWorld(); 
        this.mapWorld.init();
        this.mapWorld.drawMapWorld();
        this.ray = new Raycast(PLAYER_START_POSX, PLAYER_START_POSY, START_ANGLE, SPEED, MOVE_SPEED, ROTATE_SPEED_R, this.mapWorld);
        window.addEventListener("keydown", () => this.handleKeyDown(event));
        window.addEventListener("keyup", () => this.handleKeyUp(event));
    }

    startGameLoop() {
        console.log('gameloop');
        console.log(this.ray);
        this.ray.draw();
        this.ray.move();
        window.requestAnimationFrame(this.startGameLoop.bind(this));
    }

    handleKeyDown(event) {
        console.log(this);
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.left = true;
                this.ray.rotateLeft(event);
                break;
            case UP_ARROW:
                this.up = true;
                this.ray.moveForward(event);
                break;
            case RIGHT_ARROW:
                this.right = true;
                this.ray.rotateRight(event);
                break;
            case DOWN_ARROW:
                this.down = true;
                this.ray.moveBackward(event); 
                }
    }

    handleKeyUp(event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
            case RIGHT_ARROW:
                this.ray.left = false;
                this.ray.right = false;
                this.ray.stopRotate();
                break;
            case UP_ARROW:
            case DOWN_ARROW:
                this.up = false;
                this.down = false;
                this.ray.stopMovement();
                break;
        }
    }

}