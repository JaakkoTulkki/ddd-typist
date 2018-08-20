import {GameResults} from "./gameResults";
import {GameTimer} from "./gameTimer";

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
        return new GameResults(this.keys, this.timer.getTime() / 1000);
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

export class Key {
    constructor(public key: string) {}

    isDelete(): boolean {
        return this.key === 'delete';
    }
}

export class TypedKey {
    constructor(public key: string, public correct: boolean) {}
}
