import * as React from "react";
import {KeyStroke, PressedKey} from "../../../../../GameHistoryService/GameHistoryService";
import {appStyles} from "../../home";

interface ReplayState {
    writtenSoFar: string;
    written: PressedKey[];
}

export interface ReplayProps {
    strokes: PressedKey[];
    text: string;
}

export class Replay  extends React.Component <ReplayProps, ReplayState>{
    constructor(props: ReplayProps) {
        super(props);
        this.state = {
            writtenSoFar: '',
            written: [],
        };
        for(const stroke of this.props.strokes) {
            setTimeout(() => {
                this.setState((state, props) => {
                    let written = state.written;
                    if(stroke.value === 'delete') {
                        written = written.slice(0, written.length -1);
                    } else {
                        written.push(stroke);
                    }
                    return {
                        written,
                    }
                });
            }, stroke.time)
        }
    }

    render() {
        return <div data-test-id="written-so-far">
            {this.state.written.map((key: KeyStroke, index) => {
                const clsName = key.correct ? appStyles.textToWriteCorrect : appStyles.textToWriteIncorrect;
                return <span className={clsName} key={`written-${index}`}>{key.value}</span>
            })}
        </div>
    }
}
