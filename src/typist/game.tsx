export class Game {
    private keys: Key[] = [];
    constructor(private timer: GameTimer){
        timer.start();
    }

    public sendKey(key: Key): void {
        this.keys.push(key);
    }

    public readKeys(): Key[] {
        return this.keys;
    }

    public delete(): void {
        this.keys.pop();
    }

    public keysPerMinute(): number {
        return this.keys.length / (this.timer.getTime() / 60)
    }
}

export class Key {
    constructor(public key: string) {}
}

export class GameTimer {
    public seconds: number = 0;
    private interValId: any;

    private tickSeconds() {
        this.seconds += 1;
    }

    public start(): void {
        this.interValId = setInterval(this.tickSeconds.bind(this), 1000);
    }

    public getTime() {
        return this.seconds;
    }

    public stop() {
        clearInterval(this.interValId);
    }
}
