export class Game {
    private keys: TypedKey[] = [];
    private textToType: string;
    private currentPointer: number = 0;
    private gameInPlay: boolean = true;

    constructor(private timer: GameTimer){ }

    public sendKey(key: Key): void {
        if(!this.textToType) {
            throw new Error('You do not have added text to type.');
        }
        if(!this.gameInPlay) {
            throw new Error('Game has ended.');
        }

        if(!this.timer.gameHasStarted()) {
            this.timer.start();
        }

        let correct = true;
        if(this.textToType[this.currentPointer] !== key.key) {
            correct = false;
        }
        this.currentPointer += 1;

        this.keys.push(new TypedKey(key.key, correct));

        if(this.shouldEndGame()) {
            this.endGame();
        }
    }

    public delete(): void {
        if(this.currentPointer > 0) {
            this.currentPointer -= 1;
            this.keys.pop();
        }
    }

    addText(textToType: string) {
        this.textToType = textToType;
    }

    getResults(): GameResults {
        return new GameResults(this.keys, this.timer.getTime());
    }

    isFinished(): boolean {
        return this.timer.gameHasStarted() && this.currentPointer === this.textToType.length;
    }

    private shouldEndGame() {
        return this.currentPointer === this.textToType.length;
    }

    private endGame() {
        this.gameInPlay = false;
        this.timer.stop();
    }
}

export class GameResults {
    constructor(private typedKeys: TypedKey[], public seconds: number) {}
    public keys(): TypedKey[] {
        return this.typedKeys;
    }

    public keysPerMinute(): number {
        return this.typedKeys.filter(key => key.correct).length / (this.seconds / 60)
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

    public gameHasStarted() {
        return !!this.interValId;
    }

    public stop() {
        clearInterval(this.interValId);
    }
}

export class TypedKey {
    constructor(public key: string, public correct: boolean) {}
}