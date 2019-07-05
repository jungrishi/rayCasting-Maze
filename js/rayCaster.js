class Raycast {
    constructor(x, y, alpha, speed, moveSpeed, rotSpeed, map) {
        this.rayCanvas = document.getElementById('objectcanvas')
        this.rayContext = this.rayCanvas.getContext('2d');
        this.pos = new Vector(x, y);
        console.log(this.rayCanvas);
        this.dir = 0;
        this.alpha = alpha; //rotation angle 
        this.speed = speed; 
        this.moveSpeed = moveSpeed;
        this.rotationSpeed = rotSpeed;
    }

    draw() {
        let x = this.pos.x * MAP_SCALE - 2;
        let y = this.pos.y * MAP_SCALE - 2;
        let w = 4;
        let h = 4;

        // this.rayContext.clearRect(0, 0, this.rayContext.width, this.rayContext.height);
        this.rayContext.fillStyle = 'red';
        this.rayContext.fillRect(x, y, w, h);
        this.rayContext.beginPath();
        this.rayContext.moveTo(x + 2, y + 2);
        this.rayContext.lineTo(
            (this.pos.x + Math.cos(this.alpha) * w) * MAP_SCALE,
            (this.pos.y + Math.sin(this.alpha)* h) * MAP_SCALE
        );
        this.rayContext.closePath();
        this.rayContext.stroke();
    }

    move() {
        this.moveStep = this.speed * this.moveSpeed;
        if (this.dir != 0) {
        this.alpha += this.dir * this.rotationSpeed;
    }
        this.newX = this.pos.x + Math.cos(this.alpha) * this.moveStep;
        this.newY = this.pos.y + Math.sin(this.alpha) * this.moveStep;
        // if (this.isBlocking(this.newX, this.newY)) {
        //     return;
        // }
        this.pos.x = this.newX;
        this.pos.y = this.newY;
    }
    // isBlocking(x,y) {
    //     if (y < 0 || y > this.map.mapHeight || x < 0 || x > this.map.mapWidth) {
    //         return true;
    //     }
    // }
    rotateLeft() {
        console.log('left');
        this.dir = 1;
        this.move();
    }

    rotateRight() {
        this.dir = -1;
        this.move();
    }

    moveForward() {
        this.speed = -1;
        this.move();
    }

    moveBackward() {
        this.speed = 1;
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