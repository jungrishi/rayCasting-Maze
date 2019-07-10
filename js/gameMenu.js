class GameMenu {
    constructor(ref, gameWorldContext) {
        this.worldRef = ref;
        this.gameWorldContext = gameWorldContext;
        window.addEventListener("keydown",this.menuController.bind(this));
    }

    menuController() {
        if(event.keyCode == 13){
            this.startGame();
        }
        else{
            return;
        }
    }

    draw() {
        this.gameWorldContext.fillStyle = "#d5d5d5";
        this.gameWorldContext.fillRect(
            0, 0,
            this.gameWorldContext.width,
            this.gameWorldContext.height
        )
        this.gameWorldContext.font = "65px Georgia";
        this.gameWorldContext.color = 'black';
        var gradient = this.gameWorldContext.createLinearGradient(0,0,20,0)
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        this.gameWorldContext.fillStyle = gradient;
        this.gameWorldContext.fillText("WelCome! To The Game", 
                            100,
                            100 , 
                            260);
        this.gameWorldContext.fillText("Press Enter to start the Game", 
            100,
            300, 
            260);
            // debugger;                    
    }

    startGame() {
        this.gameWorldContext.clearRect(0, 0, this.worldRef.canvasElement.width, this.worldRef.canvasElement.height);
        removeEventListener('keydown', this.menuController, true);
        this.worldRef.currentState = START;
    }
}
        

    