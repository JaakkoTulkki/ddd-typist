import React from 'react';
import {Game, Key, TypedKey} from "../../../../../typist/game";
import {GameWithHistory, WritingAreaProps} from "../GameWithHistory/GameWithHistory";
import {Replay} from "../Replay/Replay";
import {GameTimer} from "../../../../../typist/gameTimer";
import {appStyles} from "../../home";

interface TimerProps {
    start: boolean,
    gameLength?: number;
}

interface TimerState {
    time: number;
    timeToDisplay: string;
}

class Timer extends React.Component<TimerProps, TimerState> {
    private intervalId: any;
    constructor(props: TimerProps) {
        super(props);
        this.state = {
            time: 0,
            timeToDisplay: this.props.gameLength ? (this.props.gameLength / 1000).toString() : '0',
        };
    }

    public componentDidUpdate(prevProps: TimerProps) {
        if(!prevProps.start && this.props.start) {
            this.intervalId = setInterval(() => {
                const time = this.state.time + 10;
                let timeToDisplay: any = (this.props.gameLength ? this.props.gameLength - time : 0) / 1000;
                timeToDisplay = `${timeToDisplay}`;
                this.setState({time, timeToDisplay});
            }, 10);
        }

        if(prevProps.start && !this.props.start) {
            clearInterval(this.intervalId);
        }
    }

    public render() {
        if(this.state.time === 0) {
            return <div>Game length {this.state.timeToDisplay} seconds</div>
        }
        if(!this.props.start) {
            return <div>Game finished</div>
        }
        return <div>Time left
                <span style={{display: 'inline-block', width: '30px', marginLeft: '3px'}}> {this.state.timeToDisplay}</span> seconds</div>
    }
}


interface WritingAreaPresenterState {
    game: GameWithHistory;
    gameEnd: boolean;
}

export class WritingAreaPresenter extends React.Component<WritingAreaProps, WritingAreaPresenterState> {
    private gameLength: number;
    constructor(props: WritingAreaProps) {
        super(props);
        this.gameLength = 5000;
        this.endGameCb = this.endGameCb.bind(this);
        const game = new GameWithHistory(new GameTimer(), this.gameLength, () => console.log('game finished '));
        game.addText(this.props.textToWrite);
        this.state = {
            game: game,
            gameEnd: false
        };
    }

    componentDidUpdate(prevProps: WritingAreaProps, prevState: WritingAreaPresenterState) {
        if(prevState.game.isFinished() && !this.state.gameEnd) {
            this.endGameCb();
        }
    }

    private endGameCb () {
        this.setState({gameEnd: true});
    }

    private sendKeys() {
        if (this.props.newKey && this.state.game && !this.state.game.isFinished()) {
            // No two spaces should follow each other
            const writtenIndex = this.state.game.getResults().keys().length - 1;
            let lastKey = '';
            if(writtenIndex >= 0) {
                lastKey = this.state.game.getResults().keys()[writtenIndex].key;
            }

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
        if(!this.state.game) {
            return <div>....</div>;
        }
        this.sendKeys();
        const charAt = this.state.game.getResults().keys().length;
        if(this.state.gameEnd) {
            return <div>
                <Timer start={false} />
                <span>{`Game is finished. ${this.state.game.getResults().toString()}`}</span>
                <div>Your game as it was:</div>
                <Replay text={this.props.textToWrite} strokes={this.state.game.getHistoryStrokes()}/>
              </div>;
        }
        return <div>
            <Timer start={this.state.game.gameIsOn()} gameLength={this.gameLength}/>
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
            const clsName = key.correct ? appStyles.textToWriteCorrect : appStyles.textToWriteIncorrect;

            return <span className={clsName} key={index}>{key.key}</span>
        })}
    </span>
};
