class GameWorld {
    constructor(canvasEle) {
        this.canvasElement = canvasEle;
        this.ctx = this.canvasElement.getContext("2d");  
        this.canvasElement.width = CANVAS_WIDTH;
        this.canvasElement.height = CANVAS_HEIGHT;

        this.isplaying = false;
        this.currentState = MENU_STATE;

        this.left = false;
        this.up = false;
        this.right = false;
        this.down = false;
    }
    
    init() {
        this.audioLoader = new AudioLoader();
        this.resetGameComponents();
        this.checkLoad();
    }

    checkLoad() {
        let intervalID =  setInterval(() => {
            if ( this.audioLoader.hasAllAudiosLoaded()) {
                clearInterval(intervalID);
                this.startGameWorld();
            }
            else {
                console.log('loading');
            }
        });
    }

    pauseGame() {
        console.log(this.checkPauseState);
        this.gameMenu.draw(PAUSE_TEXT[0], PAUSE_TEXT[1]);
        } 

    startGameWorld() {
        this.mainLoopID = requestAnimationFrame(() => this.startGameWorld());
        this.ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
        switch(this.currentState) {
            case MENU_STATE:
                this.gameMenu.draw(START_TEXT[0], START_TEXT[1]);
                break;
            case START:
                this.mapWorld.drawMapWorld();
                this.currentState = IS_PLAYING;
                break;
            case IS_PLAYING:
                this.audioLoader.play("active");
                this.mapWorld.drawMapWorld();
                this.player.move();
                let winState = this.player.isFinish();
                if (winState) {
                    this.currentState = GAMEOVER;
                }
                this.player.draw();
                this.particle.castRay();    
                break;
            case IS_PAUSED:
                this.audioLoader.stop("active");
                this.pauseGame();
                break;
            case GAMEOVER: 
                this.gameOver();
                break;
            default: 
                break;                            
        }
    }

    resetGameComponents() {
        this.gameMenu = new GameMenu(this.ctx);
        this.mapWorld = new MapWorld(this.ctx); 
        this.player = new Player(
                                    POSITION.PLAYER_START_POSX, 
                                    POSITION.PLAYER_START_POSY,
                                    POSITION.START_ANGLE,
                                    ATTRIBUTES.PLAYER_SPEED, 
                                    ATTRIBUTES.PLAYER_MOVE_SPEED, 
                                    ATTRIBUTES.PLAYER_ROTATE_SPEED_R,
                                    this.ctx,
                                    this.mapWorld,
                                    COLOR.PLAYER
                                    );

        this.particle = new Light(
                                    PROJECTION_PLANE_WIDTH, 
                                    RAY_WIDTH, 
                                    VIEW_DIST, 
                                    NUM_RAYS, 
                                    this.player,
                                    this.ctx);  
        
        this.currentState = MENU_STATE;    
        this.inputHandlerID1 = window.addEventListener("keydown", this.handleKeyDown.bind(this));
        this.inputHandlerID2 = window.addEventListener("keyup",  this.handleKeyUp.bind(this));       
    }

    gameOver() {
        window.cancelAnimationFrame(this.mainLoopID);
        this.gameMenu.draw(WIN_TEXT[0], WIN_TEXT[1]);
        this.audioLoader.stop("active");
        this.audioLoader.stop("sideStep");
        this.audioLoader.stop("walk");
        this.audioLoader.play("end");
        this.resetGameComponents();
        setTimeout(() => {
            this.currentState = MENU_STATE;
            this.startGameWorld();
        }, 5000);
    }

handleKeyDown() {
    this.audioLoader.stop("active");
    switch (event.keyCode) {
            case DIRECTION.LEFT_ROTATE:
                this.left = true;
                this.audioLoader.play("sideStep");
                if (this.isplaying) {this.player.rotateLeft(event)};
                break;
            case DIRECTION.FORWARD_MOVE:
                this.up = true;
                this.audioLoader.play("walk");
                if (this.isplaying){this.player.moveForward(event)};
                break;
            case DIRECTION.RIGHT_ROTATE:
                this.right = true;
                this.audioLoader.play("sideStep");
                if (this.isplaying){this.player.rotateRight(event);}
                break;
            case DIRECTION.BACKWARD_MOVE:
                this.down = true;
                this.audioLoader.play("walk");
                if (this.isplaying){this.player.moveBackward(event);} 
                break;
            case GAME_STATES_PLAYER.START_GAME:
                this.isplaying = true;
                this.audioLoader.stop("active");
                this.currentState = START;
                break;    
            case GAME_STATES_PLAYER.PAUSE_GAME:     
                this.isplaying = false;
                this.currentState = IS_PAUSED;
                break;           
            }
    }

    handleKeyUp(event) {
        switch (event.keyCode) {
            case DIRECTION.LEFT_ROTATE:
            case DIRECTION.RIGHT_ROTATE:
                this.audioLoader.stop("sideStep");
                this.left = false;
                this.right = false;
                this.player.stopRotate();
                break;
            case DIRECTION.FORWARD_MOVE:
            case DIRECTION.BACKWARD_MOVE:
                this.audioLoader.stop("walk");
                this.up = false;
                this.down = false;
                this.player.stopMovement();
                break;
        }
    }

}