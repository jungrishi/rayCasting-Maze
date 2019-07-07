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
        this.player = new Player(PLAYER_START_POSX, PLAYER_START_POSY, START_ANGLE, SPEED, MOVE_SPEED, ROTATE_SPEED_R, this.mapWorld);
        this.particle = new Light(PROJECTION_PLANE_WIDTH, RAY_WIDTH, VIEW_DIST, NUM_RAYS, this.player);        
        this.particle.castRay();
        window.addEventListener("keydown", () => this.handleKeyDown(event));
        window.addEventListener("keyup", () => this.handleKeyUp(event));
    }

    startGameLoop() {
        console.log('gameloop');
        this.player.draw();
        // this.player.castAllRays();
        this.particle.castRay();
        this.player.move();
        window.requestAnimationFrame(this.startGameLoop.bind(this));
    }

    // renderLoop() {
    //     console.log('g')
    //     window.requestAnimationFrame(this.renderLoop.bind(this));
    // }

    handleKeyDown(event) {
        console.log(this);
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.left = true;
                this.player.rotateLeft(event);
                break;
            case UP_ARROW:
                this.up = true;
                this.player.moveForward(event);
                break;
            case RIGHT_ARROW:
                this.right = true;
                this.player.rotateRight(event);
                break;
            case DOWN_ARROW:
                this.down = true;
                this.player.moveBackward(event); 
                }
    }

    handleKeyUp(event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
            case RIGHT_ARROW:
                this.left = false;
                this.right = false;
                this.player.stopRotate();
                break;
            case UP_ARROW:
            case DOWN_ARROW:
                this.up = false;
                this.down = false;
                this.player.stopMovement();
                break;
        }
    }

}