class MapWorld {
    constructor() {
        this.mapCanvas = document.getElementById('mycanvas');
        this.mapContext = this.mapCanvas.getContext('2d');
        this.map = [];
        this.mapWidth = 0;
        this.mapHeight = 0;
        console.log(this.mapCanvas);
    }
    
    init() {
        this.map = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,1,1,1,2,1,1,1,1,1,2,1,1,1,2,1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,3,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,3,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,2,2,2,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
            [1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,1,1,1,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,3,3,0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
            [1,0,1,0,0,0,4,2,0,0,0,0,0,0,0,0,0,0,2,4,4,0,0,4,0,0,0,1,0,0,0,1],
            [1,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,1,0,0,0,1],
            [1,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
            [1,1,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
            [1,0,0,4,3,3,4,0,2,2,2,2,2,2,2,2,2,2,2,2,4,3,3,4,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
        this.mapWidth = this.map[0].length;
        this.mapHeight = this.map.length;
        mapClone = [...this.map];
        mapWidth =  this.mapWidth;
        mapHeight = this.mapHeight;
        this.mapCanvas.width = this.mapWidth * MAP_SCALE * SCALE_FACTOR;
        this.mapCanvas.height = this.mapHeight * MAP_SCALE * SCALE_FACTOR; //block size 8px
        this.mapCanvas.style.width = (this.mapWidth * MAP_SCALE * SCALE_FACTOR) + 'px';
        this.mapCanvas.style.height = (this.mapHeight * MAP_SCALE * SCALE_FACTOR) + 'px';
        gameWrapper.style.width = this.mapCanvas.width + 'px';
        gameWrapper.style.height = this.mapCanvas.height + 'px';
    }

    drawMapWorld() {
        var x,
            y,
            wall;

        this.mapContext.fillStyle = "#fff";
        this.mapContext.fillRect(0,0,this.mapCanvas.width,this.mapCanvas.height);
        for (y=0; y < this.mapHeight; y++) {
            for (x=0; x < this.mapWidth; x++) {
                wall = this.map[y][x];
                if (wall > 0) {
                    this.mapContext.fillStyle = 'red'; //draw a block on the map
                    this.mapContext.fillRect(
                        x * MAP_SCALE * SCALE_FACTOR,
                        y * MAP_SCALE * SCALE_FACTOR,
                        MAP_SCALE * SCALE_FACTOR, MAP_SCALE* SCALE_FACTOR
                    );
                }
            }
        }
    }
}