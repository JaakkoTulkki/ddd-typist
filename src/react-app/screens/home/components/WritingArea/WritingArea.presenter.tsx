import React from 'react';
import {Game, Key, TypedKey} from "../../../../../typist/game";
import {GameWithHistory, WritingAreaProps} from "../GameWithHistory/GameWithHistory";
import {Replay} from "../Replay/Replay";
import {GameTimer} from "../../../../../typist/gameTimer";
import {appStyles} from "../../home";

interface WritingAreaPresenterState {
    game: GameWithHistory;
}

export class WritingAreaPresenter extends React.Component<WritingAreaProps, WritingAreaPresenterState> {
    constructor(props: WritingAreaProps) {
        super(props);
        this.state = {
            game: new GameWithHistory(new GameTimer()),
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
        if(this.state.game.isFinished()) {
            return <div>
                <span>{`Game is finished. ${this.state.game.getResults().toString()}`}</span>
                <div>Your game as it was:</div>
                <Replay text={this.props.textToWrite} strokes={this.state.game.getHistoryStrokes()}/>
              </div>;
        }
        return <div>
            <span data-test-id="written-so-far"><WrittenSoFar game={this.state.game}/></span>
            <span className={appStyles.textToWrite}>{this.props.textToWrite.slice(charAt)}</span>
        </div>;
    }
}

interface WrittenSoFarProps {
    game: Game;
}

const WrittenSoFar: React.SFC<WrittenSoFarProps> = ({game}) => {
    return <span>
        {game.getResults().keys().map((key: TypedKey, index) => {
            const clsName=  key.correct ? appStyles.textToWriteCorrect : appStyles.textToWriteIncorrect;

            return <span className={clsName} key={index}>{key.key}</span>
        })}
    </span>
};
