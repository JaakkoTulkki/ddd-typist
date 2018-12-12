export class GameTimer {
    public milliseconds: number = 0;
    private interValId: any;
    private gameLength: number;
    private onGameEndCb: () => void;
    private hasEnded: boolean = false;

    private tickSeconds() {
        this.milliseconds += 10;
        if(this.milliseconds >= this.gameLength) {
            this.stop();
        }
    }

    public start(): void {
        this.interValId = setInterval(this.tickSeconds.bind(this), 10);
    }

    public getTime() {
        return this.milliseconds;
    }

    public gameHasStarted() {
        return !!this.interValId;
    }

    public gameHasEnded() {
        return this.hasEnded;
    }

    public stop() {
        if(!this.gameHasEnded()) {
            this.hasEnded = true;
            clearInterval(this.interValId);
            this.onGameEndCb();
        }
    }

    public setGameLength(gameLengthMs: number) {
        this.gameLength = gameLengthMs;
    }

    public onGameEnd(onGameEnd: () => void) {
        this.onGameEndCb = onGameEnd;
    }
}