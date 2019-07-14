class GameMenu  {
    constructor(ctx) {
        this.context = ctx;
    }

    draw(x, y) {
        this.context.fillStyle = "#d5d5d5";
        this.context.fillRect(
            0, 0,
            this.context.width,
            this.context.height
        )
        this.context.font = "65px Georgia";
        this.context.color = 'black';
        let gradient = this.context.createLinearGradient(0,0,20,0)
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        this.context.fillStyle = gradient;
        this.context.fillText(x, 
                            100,
                            100 , 
                            260);
        this.context.fillText(y, 
            100,
            300, 
            260);
    }
}
        

    