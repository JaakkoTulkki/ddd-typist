import * as React from 'react';
import {GameWithHistory} from "../GameWithHistory/GameWithHistory";
import {Key} from "../../../../../typist/game";
import {PressedKey} from "../../../../../GameHistoryService/GameHistoryService";
import {mount} from "enzyme";
import {Replay} from "./Replay";
import {GameTimer} from "../../../../../typist/gameTimer";

describe('Replay', () => {
    it('should play the keys in order', (done) => {
        const gameWithHistory = new GameWithHistory(new GameTimer());
        gameWithHistory.addText('hello');
        const keys: Key[] = [
            new Key('h'),
            new Key('i'),
            new Key('delete'),
            new Key('e'),
            new Key('l'),
            new Key('i'),
            new Key('delete'),
            new Key('l'),
            new Key('o'),
        ];
        for(const key of keys) {
            if(key.isDelete()) {
                gameWithHistory.delete();
            } else {
                gameWithHistory.sendKey(key);
            }
        }

        expect(gameWithHistory.isFinished()).toBeTruthy();
        let strokes = gameWithHistory.getHistoryStrokes();
        strokes = strokes.map((stroke: PressedKey, i) => {
            const s = {...stroke, time: i * 20} as PressedKey;
            return s;
        });

        const component = mount(<Replay text={'hello'} strokes={strokes}></Replay>);

        setTimeout(() => {
            expect(component.find('[data-test-id="written-so-far"]').text()).toEqual('hel');
            done();
        }, 83)
    });
});