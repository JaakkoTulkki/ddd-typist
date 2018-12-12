import {Game, Key, TypedKey} from "./game";
import {GameResults} from "./gameResults";
import {GameTimer} from "./gameTimer";

describe('Game', () => {
    let game: Game;
    let gameLength = 20;
    const onGameEndCb = jest.fn();
    beforeEach(() => {
        game = new Game(new GameTimer(), gameLength, onGameEndCb);
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

        const playedStrokes: TypedKey[] = game.getResults().keys();

        expect(playedStrokes).toEqual([new TypedKey('b', false)]);
    });

    it('should tell how many keystrokes per minute player is hitting', () => {
        addTextToGame('chicken');
        addStrokesToGame('chii');
        game.delete();
        addStrokesToGame('c');
        // @ts-ignore
        game.timer.stop();
        // @ts-ignore
        game.timer.milliseconds = 1005;
        const keysPerMinute: number = game.getResults().keysPerMinute();
        expect(keysPerMinute).toEqual(238);
    });

    it('should tell how many how many correct and incorrect characters have been typed', () => {
        addTextToGame('hello');
        addStrokesToGame('helio');
        // @ts-ignore
        game.timer.stop();
        // @ts-ignore
        game.timer.milliseconds = 100;
        const results: GameResults = game.getResults();
        expect(results.keys()).toEqual([
                new TypedKey('h', true),
                new TypedKey('e', true),
                new TypedKey('l', true),
                new TypedKey('i', false),
                new TypedKey('o', true),
            ]);

        expect(results.keysPerMinute()).toEqual(2400);

        const expectedText = `You typed 80.00 % right. You typed 2400 keys per minute`;
        expect(results.toString()).toEqual(expectedText);
    });

    it('should end the game once everything has been typed correctly', () => {
        addTextToGame('hello there');
        addStrokesToGame('hellos');
        game.delete();
        addStrokesToGame(' there');

        expect(game.isFinished()).toBeTruthy();
    });

    it('should call the onEndGame cb when game is finished', () => {
        addTextToGame('hello there');
        addStrokesToGame('hello there');
        expect(game.isFinished()).toEqual(true);
        expect(onGameEndCb).toHaveBeenCalled();
    });

    it('should not stop the game if it not all chars have been added and time is not up', () => {
        addTextToGame('hello');
        addStrokesToGame('hell');

        expect(game.isFinished()).toEqual(false);
    });

    it('should stop the game when time is up regardless of how many chars have been added', async (done) => {
        addTextToGame('hello');
        addStrokesToGame('hell');
        setTimeout(() => {
            expect(game.isFinished()).toEqual(true);
            done();
        }, gameLength + 5);
    });


    it('should stop the timer once the game has stopped', () => {
        addTextToGame('hello');
        addStrokesToGame('h');
        addStrokesToGame('ello');
        expect(game.isFinished()).toBeTruthy();
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
