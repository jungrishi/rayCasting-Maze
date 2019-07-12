class GameWorld {
    constructor(canvasEle) {
        this.canvasElement = canvasEle;
        this.ctx = this.canvasElement.getContext("2d");  
        this.canvasElement.width = CANVAS_WIDTH;
        this.canvasElement.height = CANVAS_HEIGHT;

        this.isplaying = false;
        this.currentState = MENU_STATE;
        this.checkPauseState = 0;
        this.stateStack = [];

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
        this.checkPauseState === 0 ? 1 : 0;
        // debugger;
        switch (this.checkPauseState) { //how??
            // case 1:
            //     this.ctx = this.stateStack.pop();
            //     console.log(this.stateStack.pop());
            //     debugger;
            //     this.isplaying = true;
            //     this.currentState = IS_PLAYING;
            //     break;
            case 0:
                // this.stateStack.push(this.context);
                this.gameMenu.draw();
                break;
        } 

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
                this.objects.draw();
                // this.objects.move();
                this.currentState = IS_PLAYING;
                break;
            case IS_PLAYING:
                this.mapWorld.drawMapWorld();
                this.objects.draw();
                // this.objects.move();
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
        this.gameMenu = new GameMenu(this.ctx); //blunder

        this.mapWorld = new MapWorld(this.ctx); 
        this.player = new Player(
                                    PLAYER_START_POSX, 
                                    PLAYER_START_POSY,
                                    START_ANGLE, SPEED, 
                                    MOVE_SPEED, 
                                    ROTATE_SPEED_R,
                                    this.ctx
                                    );

        this.particle = new Light(
                                    PROJECTION_PLANE_WIDTH, 
                                    RAY_WIDTH, 
                                    VIEW_DIST, 
                                    NUM_RAYS, 
                                    this.player,
                                    this.ctx);  
        
                                    

        this.objects = new Obstacles(10,5, this.ctx, 'red', 1, this.mapWorld);                                    
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