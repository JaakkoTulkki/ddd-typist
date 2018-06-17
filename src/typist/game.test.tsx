import {Game, Key, GameTimer, TypedKey, GameResults} from "./game";

describe('Game', () => {
    let game: Game;
    beforeEach(() => {
        game = new Game(new GameTimer());
    });

    function addStrokesToGame(strokes: string) {
        for(let key of strokes) {
            game.sendKey(new Key(key));
        }
    }

    function addTextToGame(text: string) {
        game.addText(text);
    }

    it('should throw error if no text and trying to send keystroke', () => {
        expect(() => game.sendKey(new Key('a'))).toThrow('You do not have added text to type.')
    });

    it('should record keystrokes', () => {
        addTextToGame('hello');
        addStrokesToGame('hab');

        const playedStrokes: TypedKey[] = game.getResults().keys();

        expect(playedStrokes).toEqual([
            new TypedKey('h', true),
            new TypedKey('a', false),
            new TypedKey('b', false),
        ]);
    });

    it('should delete keystrokes', () => {
        addTextToGame('haa');
        addStrokesToGame('baa');
        game.delete();
        game.delete();

        const playedStrokes: Key[] = game.getResults().keys();

        expect(playedStrokes).toEqual([new TypedKey('b', false)]);
    });

    it('should tell how many keystrokes per minute player is hitting', (done) => {
        addTextToGame('chicken');
        addStrokesToGame('chii');
        game.delete();
        addStrokesToGame('c');

        setTimeout(() => {
            const keysPerMinute: number = game.getResults().keysPerMinute();
            expect(keysPerMinute).toEqual(240);

            done();
        }, 1001);
    });

    it('should tell how many how many correct and incorrect characters have been typed', (done) => {
        addTextToGame('hello');
        addStrokesToGame('heli');

        setTimeout(() => {
            game.sendKey(new Key('o'));
            const results: GameResults = game.getResults();

            expect(results.keys()).toEqual([
                new TypedKey('h', true),
                new TypedKey('e', true),
                new TypedKey('l', true),
                new TypedKey('i', false),
                new TypedKey('o', true),
            ]);
            expect(results.keysPerMinute()).toEqual(240);

            done();
        }, 1001);
    });

    it('should end the game once everything has been typed correctly', () => {
        addTextToGame('hello there');
        addStrokesToGame('hellos');
        game.delete();
        addStrokesToGame(' there');

        expect(game.isFinished()).toBeTruthy();
    });

    it('should not stop the game if it is not yet over', () => {
        addTextToGame('hello');
        addStrokesToGame('hell');

        expect(game.isFinished()).toEqual(false);
    });

    it('should stop the timer once the game has stopped', (done) => {
        addTextToGame('hello');
        addStrokesToGame('h');

        setTimeout(() => {
            addStrokesToGame('ello');
        }, 1001);

        setTimeout(() => {
            expect(game.isFinished()).toBeTruthy();
            expect(game.getResults().seconds).toEqual(1);
            done();
        }, 2001);

    });

    it('should throw an error if trying to keep playing once game ended', () => {
        addTextToGame('hello');
        addStrokesToGame('hello');

        expect(() => addStrokesToGame('w')).toThrow('Game has ended.')
    });

    it('should not delete if there is nothing to delete', () => {
        addTextToGame('aa');
        addStrokesToGame('a');
        game.delete();
        game.delete();

        expect(game.getResults().keys()).toEqual([]);
    });
});

describe('GameResults', () => {
    it('should tell correct keys per minute', () => {
        const text = 'This is a long Text to Write';
        const keyStrokes = text.split('').map((key) => {
            // Upper case letters are spelled incorrect in this test
            let correct = !key.startsWith(key.toUpperCase()) || key === ' ';
            return new TypedKey(key, correct);
        });

        const seconds = 10;
        const expectedKeysPerMinute = (text.length - 3) / (seconds / 60) ;

        const results = new GameResults(keyStrokes, seconds);

        expect(results.keysPerMinute()).toEqual(expectedKeysPerMinute);
    });
});
