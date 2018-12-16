import {Game, Key} from "../../../../../typist/game";
import {GameHistoryService, KeyStroke} from "../../../../../GameHistoryService/GameHistoryService";
import {GameTimer} from "../../../../../typist/gameTimer";

export interface WritingAreaProps {
    newKey: string;
    textToWrite: string;
}

export class GameWithHistory extends Game{
    private historyService: GameHistoryService;
    private gameHistoryId: string;

    constructor(gameTimer: GameTimer,
                gameLengthMs: number=10000,
                onGameEndCb: () => void = () => null) {
        super(gameTimer, gameLengthMs, onGameEndCb);
        this.historyService = new GameHistoryService();
        this.gameHistoryId = this.historyService.createGame();
    }

    getHistoryStrokes() {
        return this.historyService.findById(this.gameHistoryId).strokes;
    }

    sendKey(key: Key) {
        const keyStroke = this.createKeyStroke(key);
        this.historyService.saveKeyStroke(keyStroke);
        super.sendKey(key);
    }

    private createKeyStroke(key: Key) {
        return {
            time: this.timer.getTime(),
            value: key.key,
            correct: this.keyIsCorrect(key),
            gameId: this.gameHistoryId,
        } as KeyStroke;
    }

    delete() {
        super.delete();
        const keyStroke: KeyStroke = this.createKeyStroke(new Key('delete'));
        this.historyService.saveKeyStroke(keyStroke);
    }
}
