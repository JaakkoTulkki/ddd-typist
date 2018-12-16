import {GameHistory, GameHistoryRepository} from "./GameHistoryService";

interface DB {
    [id: string]: GameHistory;
}

export class HistoryRepo implements GameHistoryRepository {
    readonly _db: DB;
    constructor() {
        this._db = {};
    }

    getAllHistories() {
        return Object.keys(this._db).map(historyId => this._db[historyId]);
    }

    save(game: GameHistory) {
        this._db[game.id] = game;
    }

    findById(gameId: string): GameHistory {
        if (this._db[gameId]) {
            return this._db[gameId];
        }
        throw new Error('No such history');
    }

    addStrokeToGame(gameId: string, time: number, value: string, correct: boolean): void {
        const game = this.findById(gameId);
        game.addStroke(time, value, correct);
    }
}