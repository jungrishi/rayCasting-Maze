class Player extends MapWorld {
    constructor(x, y, alpha, speed, moveSpeed, rotSpeed, context) {
        super();
        this.rayContext = context;
        this.pos = new Vector(x, y);
        this.dir = 0;
        this.alpha = alpha; //rotation angle 
        this.speed = speed; 
        this.moveSpeed = moveSpeed;
        this.rotationSpeed = rotSpeed;
    }

    draw() {
        console.log('draw')
        let x = this.pos.x  * MAP_SCALE * SCALE_FACTOR - 2;
        let y = this.pos.y  * MAP_SCALE * SCALE_FACTOR- 2;
        let w = 4  ;
        let h = 4  ;
        console.log(x,y,w,h);
        this.rayContext.fillStyle = 'black';
        this.rayContext.fillRect(x, y, w, h);
        this.rayContext.strokeStyle = 'rgba(255,0,0,0.3)';
        this.rayContext.beginPath();
        this.rayContext.moveTo(x + 2, y + 2);
        this.rayContext.lineTo(
            (this.pos.x + Math.cos(this.alpha) * w)  * MAP_SCALE * SCALE_FACTOR,
            (this.pos.y + Math.sin(this.alpha)* h)  * MAP_SCALE * SCALE_FACTOR
        );
        this.rayContext.closePath();
        this.rayContext.stroke();
        // debugger;
    }

    move() {
        this.moveStep = this.speed * this.moveSpeed;
        if (this.dir != 0) {  
        this.alpha += this.dir * this.rotationSpeed;
    }

        while(this.alpha < 0) {
            this.alpha += DOUBLEPI;
        }

        while(this.alpha >= DOUBLEPI) this.alpha -= DOUBLEPI;

            this.newX = this.pos.x + Math.cos(this.alpha) * this.moveStep;
            this.newY = this.pos.y + Math.sin(this.alpha) * this.moveStep;
            if (this.isBlocking(this.newX, this.newY)) {
                return;
            }
            this.pos.x = this.newX;
            this.pos.y = this.newY;
        }

    isBlocking(x,y) {
        if (y < 1 || y > this.mapHeight - 1 || x < 1 || x > this.mapWidth - 1) {
            return true;
        }

        return (this.map[Math.floor(y)][Math.floor(x)] != 0);
    }

    rotateLeft() {
        console.log('left');
        this.dir = -1;
        this.move();
    }

    rotateRight() {
        this.dir = 1;
        this.move();
    }

    moveForward() {
        this.speed = 1;
        this.move();
    }

    moveBackward() {
        this.speed = -1;
        this.move();
    }

    stopRotate() {
        this.dir=0;
        this.move();
    }

    stopMovement() {
        this.speed = 0;
        this.move();
    }
}