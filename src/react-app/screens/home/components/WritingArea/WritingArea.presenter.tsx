import React from 'react';
import {Game, GameTimer, Key, TypedKey} from "../../../../../typist/game";

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

    private sendKeys() {
        if (this.props.newKey && !this.state.game.isFinished()) {
            // No two spaces should follow each other
            const writtenIndex = this.state.game.getResults().keys().length - 1;
            let lastKey = '';
            if(writtenIndex >= 0) lastKey = this.state.game.getResults().keys()[writtenIndex].key;

            if(this.props.newKey === ' ' && lastKey === ' ') {
                return;
            }

            if (this.props.newKey.length === 1) {
                this.state.game.sendKey(new Key(this.props.newKey));
            }

            if (this.props.newKey === 'delete') {
                this.state.game.delete();
            }
        }
    }

    render() {
        this.sendKeys();
        const charAt = this.state.game.getResults().keys().length;
        return <div>
            <span data-test-id="written-so-far" style={{color: 'black'}}><WrittenSoFar game={this.state.game}/></span>
            <span style={{color: 'gainsboro'}}>{this.props.textToWrite.slice(charAt)}</span>
        </div>;
    }
}

interface WrittenSoFarProps {
    game: Game;
}

const WrittenSoFar: React.SFC<WrittenSoFarProps> = ({game}) => {
    if(game.isFinished()) {
        return <span>{`Game is finished. ${game.getResults().toString()}`}</span>;
    }


    return <span>
        {game.getResults().keys().map((key: TypedKey, index) => {
            const style = {
                color: key.correct ? 'black' : 'red',
            } as any;

            return <span style={style} key={index}>{key.key}</span>
        })}
    </span>
};
