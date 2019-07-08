class GameWorld {
    constructor(gameWrapper) {
        this.gameContainer = gameWrapper;
        this.currentStates = [LOAD_STATE,MENU_STATE,START,IS_PLAYING,IS_PAUSED,GAMEOVER];
        this.left = false;
        this.up = false;
        this.right = false;
        this.down = false;
    }
    

    init() {
        this.imageLoader = new ImageLoader();
        this.audioLoader = new AudioListener();
        this.resetGameComponents();
        this.startGameLoop();
    }

    startGameLoop() {
        this.mainLoop = requestAnimationFrame(() => this.startGameLoop());
        switch(this.currentStates) {
            case MENU_STATE:
                this.menu.draw();
                break;
            case START: 
                this.mapWorld.init();
                this.mapWorld.drawMapWorld();
            case IS_PLAYING:
                this.player.move();
                this.player.draw();
                this.particle.castRay();    
                break;
            case IS_PAUSED:
                this.pauseMenu.draw();
                break;
            case GAMEOVER: 
                this.gameOver();
                break;                            
        }
    }

    resetGameComponents() {
        this.gameMenu = new GameMenu(this);

        this.mapWorld = new MapWorld(); 
        // this.mapWorld.init();
        // this.mapWorld.drawMapWorld();
        this.player = new Player(
                                    PLAYER_START_POSX, 
                                    PLAYER_START_POSY,
                                    START_ANGLE, SPEED, 
                                    MOVE_SPEED, 
                                    ROTATE_SPEED_R, 
                                    this.mapWorld);

        this.particle = new Light(
                                    PROJECTION_PLANE_WIDTH, 
                                    RAY_WIDTH, 
                                    VIEW_DIST, 
                                    NUM_RAYS, 
                                    this.player);  
                                    
        LOAD_STATE = false;
        MENU_STATE = true;                            

        window.addEventListener("keydown", () => this.handleKeyDown(event));
        window.addEventListener("keyup", () => this.handleKeyUp(event));       
    }

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