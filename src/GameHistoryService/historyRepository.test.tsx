class HistoryRepo {
    private _db = {};
    constructor() {
        this._db = {};
    }

    getAllHistories() {
        return Object.keys(this._db).map(historyId => this._db[historyId]);
    }

    save(history: any) {
        this._db[history.id] = history;
    }

    findById(number: number) {
        if(this._db[number]) {
            return this._db[number];
        }
        throw new Error('No such history');
    }
}


describe('HistoryRepository', () => {
    let historyRepo: HistoryRepo;
    beforeEach(() => {
        historyRepo = new HistoryRepo();
    });

    it('should return zero gamehistorie if none created', () => {
        expect(historyRepo.getAllHistories()).toEqual([]);
    });

    it('should retun two histories if two created', () => {
        historyRepo.save({id: 1});
        historyRepo.save({id: 2});

        expect(historyRepo.getAllHistories().map(history => history.id)).toEqual([1, 2])
    });

    it('should add GameHistory and return them', () => {
        const historyOne = {id: 1};
        const historyTwo = {id: 2};

        historyRepo.save(historyOne);
        historyRepo.save(historyTwo);

        const actualHistoryOne = historyRepo.findById(1);
        const actualHistoryTwo = historyRepo.findById(2);

        expect(actualHistoryOne.id).toEqual(1);
        expect(actualHistoryTwo.id).toEqual(2);
    });

    it('should throw an error if trying to find non-existing history', () => {
        expect(() => historyRepo.findById(1)).toThrow('No such history');
    });
});