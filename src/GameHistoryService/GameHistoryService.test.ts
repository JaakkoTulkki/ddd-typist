import {GameHistoryService, KeyStroke} from "./GameHistoryService";

describe('GameHistoryService', () => {
    let gameHistoryService: GameHistoryService;
    beforeAll(() => {
        gameHistoryService = new GameHistoryService();
    });
    function createGameHistory(): string {
        return gameHistoryService.createGame();
    }

    it('should create a GameHistory and return a unique GameHistoryId when starting a game', () => {
        const gameHistoryId = createGameHistory();
        expect(gameHistoryId.length).toEqual(36);

        const anotherId = createGameHistory();
        expect(anotherId).not.toEqual(gameHistoryId);
    });

    it('should find GameHistory by id', () => {
        const gameHistoryId = createGameHistory();
        const gameHistory = gameHistoryService.findById(gameHistoryId);

        expect(gameHistory.id).toEqual(gameHistoryId);
    });

    it('should save keystrokes to GameHistory and return them', () => {
        const gameHistoryId = createGameHistory();
        const firstKeyStroke = {
            time: 0.0001,
            value: 'a',
            gameId: gameHistoryId,
            correct: true,
        } as KeyStroke;

        const secondKeyStroke = {
            time: 0.1,
            value: 'b',
            gameId: gameHistoryId,
            correct: false,
        } as KeyStroke;

        gameHistoryService.saveKeyStroke(secondKeyStroke);
        gameHistoryService.saveKeyStroke(firstKeyStroke);

        const game = gameHistoryService.findById(gameHistoryId);
        delete firstKeyStroke['gameId'];
        delete secondKeyStroke['gameId'];
        expect(game.strokes).toEqual([firstKeyStroke, secondKeyStroke]);
    });

});