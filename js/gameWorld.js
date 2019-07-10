class GameWorld {
    constructor(canvasEle) {
        this.canvasElement = canvasEle;
        this.ctx = this.canvasElement.getContext("2d");  
        this.canvasElement.width = CANVAS_WIDTH;
        this.canvasElement.height = CANVAS_HEIGHT;

        this.currentState = LOAD_STATE;
        this.left = false;
        this.up = false;
        this.right = false;
        this.down = false;
    }
    
    init() {
        this.imageLoader = new ImageLoader();
        this.resetGameComponents();
        this.startGameLoop();
    }

    startGameLoop() {
        this.mainLoopID = requestAnimationFrame(() => this.startGameLoop());
        switch(this.currentState) {
            case MENU_STATE:
                this.gameMenu.draw();
                break;
            case START: 
                this.mapWorld.drawMapWorld();
                this.currentState = IS_PLAYING;
                break;
            case IS_PLAYING:
                this.player.draw();
                this.player.move();
                this.particle.castRay();    
                // this.mapWorld.drawMapWorld();
                break;
            // case IS_PAUSED:
            //     this.pauseMenu.draw();
            //     break;
            // case GAMEOVER: 
            //     this.gameOver();
            //     break;
            default: 
                break;                            
        }
    }

    resetGameComponents() {
        this.gameMenu = new GameMenu(this, this.ctx);

        this.mapWorld = new MapWorld(this.ctx); 
        // this.player = new Player(
        //                             PLAYER_START_POSX, 
        //                             PLAYER_START_POSY,
        //                             START_ANGLE, SPEED, 
        //                             MOVE_SPEED, 
        //                             ROTATE_SPEED_R,
        //                             this.ctx
        //                             );

        // this.particle = new Light(
        //                             PROJECTION_PLANE_WIDTH, 
        //                             RAY_WIDTH, 
        //                             VIEW_DIST, 
        //                             NUM_RAYS, 
        //                             this.player,
        //                             this.ctx);  
                                    
        this.currentState = MENU_STATE;    

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
            default:
                break;    
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