import uuidv1 from 'uuid/v1';
import {HistoryRepo} from "./GameHistoryRepository";

interface PressedKey {
    time: number;
    value: string;
}

export class GameHistory {
    private _strokes: PressedKey[] = [];
    constructor(public id: string) {}

    get strokes(): PressedKey[] {
        this._strokes.sort((a, b) => {
            if(a.time < b.time) {
                return -1;
            }
            if(a.time === b.time) {
                return 0;
            }
            return 1;
        });
        return this._strokes;
    }

    public addStroke(time: number, value: string) {
        this._strokes.push({time, value} as PressedKey)
    }
}

export interface GameHistoryRepository {
    getAllHistories(): GameHistory[];

    save(history: GameHistory): void;

    findById(gameId: string): GameHistory;

    addStrokeToGame(gameId: string, time: number, value: string): void;
}

export interface KeyStroke {
    time: number;
    value: string;
    gameId: string;
}

export class GameHistoryService {
    constructor (private gameHistoryRepo: GameHistoryRepository = new HistoryRepo()) {

    }

    public createGame() {
        const gameHistory = new GameHistory(uuidv1());
        this.gameHistoryRepo.save(gameHistory);
        return gameHistory.id;
    }

    public findById(gameHistoryId: string): GameHistory {
        return this.gameHistoryRepo.findById(gameHistoryId);
    }

    saveKeyStroke(keyStroke: KeyStroke) {
        this.gameHistoryRepo.addStrokeToGame(
            keyStroke.gameId,
            keyStroke.time,
            keyStroke.value,
        );
    }
}