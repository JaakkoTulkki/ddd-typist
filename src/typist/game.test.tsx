import {Game, Key, GameTimer} from "./game";

describe('Game', () => {
    function createGame() {
        const game: Game = new Game(new GameTimer());
        game.sendKey(new Key('a'));
        game.sendKey(new Key('a'));
        game.sendKey(new Key('b'));
        return game;
    }

    it('should record keystrokes', () => {
        const game: Game = createGame();

        const playedStrokes: Key[] = game.readKeys();

        expect(playedStrokes).toEqual([new Key('a'), new Key('a'), new Key('b')]);
    });

    it('should delete keystrokes', () => {
        const game: Game = createGame();
        game.delete();
        game.delete();

        const playedStrokes: Key[] = game.readKeys();

        expect(playedStrokes).toEqual([new Key('a')]);
    });

    it('should tell how many keystrokes per minute player is hitting [mock]', () => {
        const start = jest.fn();
        const timer = {
            start,
            getTime: function () {
                return this.seconds;
            },
            seconds: 3
        };

        const game: Game = new Game(timer as any);
        game.sendKey(new Key('a'));
        game.sendKey(new Key('b'));
        const keysPerMinute: number = game.keysPerMinute();

        expect(start).toHaveBeenCalled();
        expect(keysPerMinute).toEqual(40);
    });

    it('[do not mock] should tell how many keystrokes per minute player is hitting', (done) => {
        const timer: GameTimer = new GameTimer();

        const game: Game = new Game(timer);
        game.sendKey(new Key('a'));
        game.sendKey(new Key('a'));
        game.sendKey(new Key('b'));
        game.sendKey(new Key('b'));
        game.delete();
        game.sendKey(new Key('b'));
        setTimeout(() => {
            const keysPerMinute: number = game.keysPerMinute();
            expect(keysPerMinute).toEqual(240);
            done();
        }, 1001);
    });
});

