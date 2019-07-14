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
        this.resetGameComponents();
        this.startGameLoop();
    }

    pauseGame() {
        console.log(this.checkPauseState);
        this.gameMenu.draw();
        } 

    startGameLoop() {
        this.mainLoopID = requestAnimationFrame(() => this.startGameLoop());
        this.ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
        switch(this.currentState) {
            case MENU_STATE:
                this.gameMenu.draw();
                break;
            case START: 
                this.mapWorld.drawMapWorld();
                this.currentState = IS_PLAYING;
                break;
            case IS_PLAYING:
                this.mapWorld.drawMapWorld();
                this.player.move();
                this.player.draw();
                this.particle.castRay();    
                break;
            case IS_PAUSED:
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

handleKeyDown() {
    switch (event.keyCode) {
            case DIRECTION.LEFT_ROTATE:
                this.left = true;
                if (this.isplaying) {this.player.rotateLeft(event)};
                break;
            case DIRECTION.FORWARD_MOVE:
                this.up = true;
                if (this.isplaying){this.player.moveForward(event)};
                break;
            case DIRECTION.RIGHT_ROTATE:
                this.right = true;
                if (this.isplaying){this.player.rotateRight(event);}
                break;
            case DIRECTION.BACKWARD_MOVE:
                this.down = true;
                if (this.isplaying){this.player.moveBackward(event);} 
                break;
            case GAME_STATES_PLAYER.START_GAME:
                this.isplaying = true;
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
                this.left = false;
                this.right = false;
                this.player.stopRotate();
                break;
            case DIRECTION.FORWARD_MOVE:
            case DIRECTION.BACKWARD_MOVE:
                this.up = false;
                this.down = false;
                this.player.stopMovement();
                break;
        }
    }

}