class GameMenu  {
    constructor(ctx) {
        this.context = ctx;
        console.log(this.context);
    }

    draw() {
        this.context.beginPath();
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
        this.context.fillText(START_TEXT[0], 
                            100,
                            100 , 
                            260);
        this.context.fillText(START_TEXT[1], 
            100,
            300, 
            260);
        this.context.closePath();    
    }
}
        

    