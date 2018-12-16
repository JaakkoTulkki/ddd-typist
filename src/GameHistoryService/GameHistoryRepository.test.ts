import {HistoryRepo} from "./GameHistoryRepository";
import {GameHistory} from "./GameHistoryService";

describe('HistoryRepository', () => {
    let historyRepo: HistoryRepo;
    beforeEach(() => {
        historyRepo = new HistoryRepo();
    });

    it('should return zero gamehistorie if none created', () => {
        expect(historyRepo.getAllHistories()).toEqual([]);
    });

    function getGameHistory(id: number | string = 1): GameHistory {
        return new GameHistory(id.toString());
    }

    it('should retun two histories if two created', () => {
        historyRepo.save(getGameHistory('1'));
        historyRepo.save(getGameHistory('2'));

        expect(historyRepo.getAllHistories().map(history => history.id)).toEqual(['1', '2'])
    });

    it('should add GameHistory and return them', () => {
        historyRepo.save(getGameHistory('1'));
        historyRepo.save(getGameHistory('2'));

        const actualHistoryOne = historyRepo.findById('1');
        const actualHistoryTwo = historyRepo.findById('2');

        expect(actualHistoryOne.id).toEqual('1');
        expect(actualHistoryTwo.id).toEqual('2');
    });

    it('should throw an error if trying to find non-existing history', () => {
        expect(() => historyRepo.findById('1')).toThrow('No such history');
    });

    it('should add PressedKeys and order by their time', () => {
        const gameId = '1';
        historyRepo.save(getGameHistory(gameId));
        // Simulate that key strokes have not arrived in order
        historyRepo.addStrokeToGame(gameId, 2, 'c', true);
        historyRepo.addStrokeToGame(gameId, 1, 'b', true);
        historyRepo.addStrokeToGame(gameId, 0.1, 'a', false);

        const game = historyRepo.findById(gameId);
        expect(game.strokes).toEqual([
            {time: 0.1, value: 'a', correct: false},
            {time: 1, value: 'b', correct: true},
            {time: 2, value: 'c', correct: true},
        ])
    });
});