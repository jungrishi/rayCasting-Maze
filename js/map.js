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
            [1,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,3,0,3,0,0,1,1,1,2,1,1,1,1,1,2,1,1,1,2,1,0,0,0,0,0,0,0,0,1],
            [1,0,0,3,0,4,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,3,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,3,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,3,1,1,1,1,1],
            [1,0,0,3,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,3,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
            [1,0,0,3,0,3,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,2,2,2,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
            [1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,1,1,1,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
            [1,0,1,4,0,0,4,2,0,2,2,2,2,2,2,2,2,0,2,4,4,0,0,4,0,0,0,1,0,0,0,1],
            [1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,1,0,0,0,1],
            [1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
            [1,1,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
            [1,0,0,4,3,3,4,0,2,2,2,2,2,2,2,2,2,2,2,2,4,3,3,4,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
        this.mapWidth = this.map[0].length;
        this.mapHeight = this.map.length;
        mapClone = [...this.map];
        this.mapCanvas.width = this.mapWidth * MAP_SCALE;
        this.mapCanvas.height = this.mapHeight * MAP_SCALE; //block size 8px
        console.log('map',this.mapCanvas.height); //256 * 192
        this.mapCanvas.style.width = (this.mapWidth * MAP_SCALE) + 'px';
        this.mapCanvas.style.height = (this.mapHeight * MAP_SCALE) + 'px';
        gameWrapper.style.width = this.mapCanvas.width + 'px';
        gameWrapper.style.height = this.mapCanvas.height + 'px';
    }

    drawMapWorld() {
        console.log('this1')
        this.mapContext.fillStyle = "#fff";
        this.mapContext.fillRect(0,0,this.mapCanvas.width,this.mapCanvas.height)
        for (var y=0; y < this.mapHeight; y++) {
            for (var x=0; x < this.mapWidth; x++) {
                var wall = this.map[y][x];
                if (wall > 0) {
                    this.mapContext.fillStyle = 'rgb(0,0,0)'; //draw a block on the map
                    this.mapContext.fillRect(
                        x * MAP_SCALE,
                        y * MAP_SCALE,
                        MAP_SCALE, MAP_SCALE
                    );
                }
            }
        }
    }
}