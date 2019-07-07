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
        window.addEventListener("keydown", () => this.handleKeyDown(event));
        window.addEventListener("keyup", () => this.handleKeyUp(event));

        this.particle = new Light(PROJECTION_PLANE_WIDTH, RAY_WIDTH, VIEW_DIST, NUM_RAYS, this.player);        
        // this.particle.castRay();        
    }
    
    castAllRays() {
        var columnID = 0;
            var rayAngle = this.player.alpha - HALF_FOV;
            this.rays = [];
            for (var i = 0; i < NUM_RAYS; i++) {
                this.ray = new Ray(rayAngle, this.player);
                this.ray.cast(columnID);
                this.rays.push(this.ray);
                rayAngle += FOV / NUM_RAYS;
                columnID++;
            }
            for(var r of this.rays) {
                r.render();
            }
    }

    startGameLoop() {
        this.player.draw();
        // this.castRays();
        this.particle.castRay();
        this.player.move();

        requestAnimationFrame(this.startGameLoop.bind(this));
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