import {Game, Key} from "../../../../../typist/game";
import {GameHistoryService, KeyStroke} from "../../../../../GameHistoryService/GameHistoryService";
import {GameTimer} from "../../../../../typist/gameTimer";

export interface WritingAreaProps {
    newKey: string;
    textToWrite: string;
}

export interface WritingAreaPresenterState {
    game: GameWithHistory;
}

export class GameWithHistory extends Game{
    private historyService: GameHistoryService;
    private gameHistoryId: string;

    constructor(gameTimer: GameTimer) {
        super(gameTimer);
        this.historyService = new GameHistoryService();
        this.gameHistoryId = this.historyService.createGame();
    }

    getHistoryStrokes() {
        return this.historyService.findById(this.gameHistoryId).strokes;
    }

    sendKey(key: Key) {
        super.sendKey(key);

        const keyStroke = this.createKeyStroke(key.key);
        this.historyService.saveKeyStroke(keyStroke);
    }

    private createKeyStroke(value: string) {
        return {
            time: this.timer.getTime(),
            value,
            gameId: this.gameHistoryId,
        } as KeyStroke;
    }

    delete() {
        super.delete();
        const keyStroke: KeyStroke = this.createKeyStroke('delete');
        this.historyService.saveKeyStroke(keyStroke);
    }
}
