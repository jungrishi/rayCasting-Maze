class Obstacles extends Light {
    constructor(x, y, context, color, speed, map) {
        super();
        this.mapObject = map;
        this.color = color;
        this.speed = speed;
        this.WorldContext = context;
        this.pos = new Vector(x,y);
    }

    draw() {
        let wall;
        wall = this.mapObject.map[this.pos.y][this.pos.x];
        if (wall == 0) {
            this.WorldContext.fillStyle = "blue";
            this.WorldContext.fillRect(
                (this.pos.x + (Math.floor(MAP_SCALE/3)))* ( MAP_SCALE* SCALE_FACTOR),
                this.pos.y * Math.floor(MAP_SCALE/3)* ( MAP_SCALE* SCALE_FACTOR), 
                4,4
            );
        }
    }

    move() {
        this.moveStep += this.speed ;  
        if (this.isBlocking(this.moveStep)) {
            this.speed = -this.speed;
        }
        this.pos.x = this.moveStep;
    }

    isBlocking(x, y) {
        if (y < 1 || y > this.mapHeight - 1 || x < 1 || x > this.mapWidth - 1) {
            return true;
        }

        return (this.map[Math.floor(this.pos.y)][Math.floor(x)] != 0);
    }

}