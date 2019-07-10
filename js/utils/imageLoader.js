class ImageLoader {
    constructor() {
        this.images = {};
        this.numberOfImages = 0;
        this.numberOfLoadedImage = 0;
        this.init();
    }

    init() {
        this.loadImage('loadingRun', 'images/fireman.png');
        this.loadImage('menu', 'images/maze.png');
        // this.loadImage('menu', 'images/maze.png');
        this.numberOfImages = Object.keys(this.images).length;
    }

    loadImage(iden, source) {
        var that = this;
        let image = new Image();
        image.src = source;
        image.onload = () => that.numberOfLoadedImage++;
        this.images[iden] = image;
    }

    hasAllImagesLoaded() {
        return this.numberOfLoadedImage == this.numberOfImages ? true: false;
    }
}