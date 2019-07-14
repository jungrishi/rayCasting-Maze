class Player{
    constructor(x, y, alpha, speed, moveSpeed, rotSpeed, context, map, color) {
        this.rayContext = context;
        this.pos = new Vector(x, y);
        this.dir = 0;
        this.alpha = alpha; //rotation angle 
        this.speed = speed; 
        this.moveSpeed = moveSpeed;
        this.rotationSpeed = rotSpeed;
        this.mapWorld  = map;
        this.color = color;
    }

    draw() {
        console.log('plyaer pos')
        console.log(this.pos.x, this.pos.y);
        let x = this.pos.x  * MAP_SCALE * SCALE_FACTOR - 2;
        let y = this.pos.y  * MAP_SCALE * SCALE_FACTOR- 2;
        let w = 4 ;
        let h = 4 ;
        this.rayContext.fillStyle = this.color;
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

    isFinish() {
        let x = this.pos.x;
        let y = this.pos.y;
        let xWithInRange = inRange(x, POSITION.PLAYER_FINISH_POSX[0], POSITION.PLAYER_FINISH_POSX[2]);
        let yWithInRange = inRange(y, POSITION.PLAYER_FINISH_POSY[0], POSITION.PLAYER_FINISH_POSY[1]);
        if (xWithInRange && yWithInRange){
            return true;
        }        
        return;
    }    

    isBlocking(x,y) {
        if (y < 1 || y > this.mapWorld.mapHeight - 1 || x < 1 || x > this.mapWorld.mapWidth - 1) {
            return true;
        }

        return (this.mapWorld.map[Math.floor(y)][Math.floor(x)] != 0);
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