import {GameResults} from "./gameResults";
import {GameTimer} from "./gameTimer";

export class Game {
    private keys: TypedKey[] = [];
    private textToType: string;
    private currentPointer: number = 0;
    private gameInPlay: boolean = true;
    private gameTouched: boolean = false;

    constructor(protected timer: GameTimer,
                protected gameLengthMs: number=5000,
                protected onGameEnd: () => void = () => null){
        timer.setGameLength(gameLengthMs);
        timer.onGameEnd(this.endGame.bind(this));
    }

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

        let correct = this.keyIsCorrect(key);
        this.currentPointer += 1;

        this.keys.push(new TypedKey(key.key, correct));
        this.gameTouched = true;

        if(this.shouldEndGame()) {
            this.endGame();
        }
    }

    protected keyIsCorrect(key: Key) {
        return this.textToType[this.currentPointer] === key.key;
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

    public isFinished(): boolean {
        return (this.timer.gameHasStarted() && this.timer.gameHasEnded()
            && this.currentPointer === this.textToType.length) || !this.gameInPlay
    }

    public gameIsOn(): boolean {
        return this.gameInPlay && this.gameTouched;
    }

    private shouldEndGame() {
        return this.currentPointer === this.textToType.length;
    }

    public endGame() {
        this.gameInPlay = false;
        this.timer.stop();
        this.onGameEnd();
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
