import React from 'react';
import {Game, GameTimer, Key} from "../../../../../typist/game";

export interface WritingAreaProps {
    newKey: string;
    textToWrite: string;
}

interface WritingAreaPresenterState {
    game: Game;
}

export class WritingAreaPresenter extends React.Component<WritingAreaProps, WritingAreaPresenterState> {
    constructor(props: WritingAreaProps) {
        super(props);
        this.state = {
            game: new Game(new GameTimer()),
        };
        this.state.game.addText(this.props.textToWrite);
    }

    getWrittenSoFar(): string {
        if(this.state.game.isFinished()) {
            return `Game is finished. ${this.state.game.getResults().toString()}`;
        }
        return this.state.game.getResults().keys().map((key: Key) => key.key).join('');
    }

    shouldComponentUpdate(nextProps: WritingAreaProps, nextState: WritingAreaPresenterState) {
        if(!this.state.game.isFinished()) {
            if(nextProps.newKey.length === 1) {
                this.state.game.sendKey(new Key(nextProps.newKey));
            }

            if(nextProps.newKey === 'delete') {
                this.state.game.delete();
            }
        }
        return true;
    }

    render() {
        return <div>{this.getWrittenSoFar()}</div>;
    }
}
