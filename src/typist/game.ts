export class Game {
    private keys: TypedKey[] = [];
    private textToType: string;
    private currentPointer: number = 0;
    private gameInPlay: boolean = true;

    constructor(protected timer: GameTimer){ }

    public sendKey(key: Key): void {
        if(!this.textToType) {
            throw new Error('You do not have added text to type.');
        }
        if(!this.gameInPlay) {
            throw new Error('GameHistory has ended.');
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
        // throw new Error(this.timer.getTime());

        return new GameResults(this.keys, this.timer.getTime() / 1000);
    }

    isFinished(): boolean {
        return this.timer.gameHasStarted() && this.currentPointer === this.textToType.length;
    }

    gameHasStarted(): boolean {
        return this.timer.gameHasStarted();
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
        return Math.floor(this.typedKeys.filter(key => key.correct).length / (this.seconds / 60))
    }

    public toString(): string {
        const correctRate = this.typedKeys.filter((key: TypedKey) => key.correct).length
                / this.typedKeys.length * 100;

        return `You typed ${correctRate} % right. You typed ${this.keysPerMinute()} keys per minute`;
    }
}

export class Key {
    constructor(public key: string) {}

    isDelete(): boolean {
        return this.key === 'delete';
    }
}

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

export class TypedKey {
    constructor(public key: string, public correct: boolean) {}
}