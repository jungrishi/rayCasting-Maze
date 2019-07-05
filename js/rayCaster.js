class Raycast {
    constructor(x,y, alpha, alpha_offset, moveSpeed) {
        this.rayContext = ctx;
        this.pos = new Vector(x,y);
        this.dir = 1;
        this.alpha = alpha; 
        this.speed = SPEED;
        this.moveSpeed = moveSpeed;
        this.rotateSpeed = alpha_offset;
        console.log(this);

        this.left = false;
        this.up = false;
        this.right = false;
        this.down = false;

        window.addEventListener("keydown", () => this.handleKeyDown(event));
        window.addEventListener("keyup", () => this.handleKeyUp(event));
    }

    draw() {
            this.rayContext.fillStyle = 'red';
            this.rayContext.fillRect(
                this.pos.x * MAP_SCALE-2,
                this.pos.y * MAP_SCALE-2,
                6,6
            );
            this.rayContext.beginPath();
            this.rayContext.moveTo(this.pos.x * MAP_SCALE, this.pos.y * MAP_SCALE);
            this.rayContext.lineTo(
                (this.pos.x + Math.cos(this.alpha) * 6) * MAP_SCALE,
                (this.pos.y + Math.sin(this.alpha)*6) * MAP_SCALE
            );
            this.rayContext.closePath();
            this.rayContext.stroke();
    }

    update() {
        this.moveStep = this.speed * this.moveSpeed;
        this.alpha += this.dir * this.rotateSpeed;
        this.newX = this.pos.x + Math.cos(this.alpha) * this.moveStep;
        this.newY = this.pos.y + Math.sin(this.alpha) * this.moveStep;
        this.newPos = new Vector(this.newX, this.newY);
        this.checkCollision(this.newPos);
        
    }

    checkCollision(cPos) {

    }

    movement = {
        
        forward: function() {
            console.log(this);
            this.speed = 1;
            update(); //redundant
        },

        backward: function() {
            this.speed = -1;
            this.update();
        },

        rotateLeft: function() {
            this.dir = -1;
            this.update();
        },
        
        rotateRight: function() {
            this.dir = 1;
            this.update();
        },

        stopMovement: function() {
            this.speed = 0;
            this.update();
        },

        stopRotate: function() {
            this.dir = 0;
            this.update();
        }
    }

    handleKeyDown(event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.left = true;
                this.movement.rotateLeft(event);
                break;
            case UP_ARROW:
                this.up = true;
                this.movement.forward(event);
                break;
            case RIGHT_ARROW:
                this.right = true;
                this.movement.rotateRight(event);
                break;
            case DOWN_ARROW:
                this.down = true;
                this.movement.backward(event);
        }
    }
    
    handleKeyUp(event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
            case RIGHT_ARROW:    
                this.left = false;
                this.right = false;
                this.movement.stopRotate();
                break;
            case UP_ARROW:
            case DOWN_ARROW:                
                this.up = false;
                this.down = false;
                this.movement.stopMovement();
                break;          
        }
        this.keyDownDuration = 0;
        }
    }


