class AudioLoader {
    constructor() {
        this.audios = {};
        this.audioNumber = 0;
        this.timeFrame = 0;
        this.audioLoaded = 0;
        this.init();
    }

    init() {
        this.loadAudio("sideStep", "audios/Running.mp3");
        this.loadAudio("active", "audios/active.mp3");
        this.loadAudio("walk", "audios/Running.mp3");
        this.loadAudio("end", "audios/end.mp3");
        this.audioNumber = Object.keys(this.audios).length;
    }

    loadAudio(identifier, src) {
        let audio = new Audio();
        audio.src = src;
        audio.addEventListener("canplay", () => {
            this.audioLoaded++
        });
        this.audios[identifier] = audio;
    }

    hasAllAudiosLoaded() {

        return this.audioLoaded == this.audioNumber ? true: false;
    }

    play(index) {
        this.audios[index].play();
        if (index === "run") {
            this.audios[index]  = this.timeFrame;
        }
    }

    stop(index) {
        if (index === "run") {
            this.timeFrame = this.audios[index].currenTime;
        }
        this.audios[index].pause();
        this.audios[index].currenTime = 0;
    }
}