import {TypedKey} from "./game";
import {GameResults} from "./gameResults";

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
