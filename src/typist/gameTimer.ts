export class GameTimer {
    public milliseconds: number = 0;
    private interValId: any;

    private tickSeconds() {
        this.milliseconds += 10;
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

    public stop() {
        clearInterval(this.interValId);
    }
}