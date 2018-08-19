import * as React from "react";
import {PressedKey} from "../../../../../GameHistoryService/GameHistoryService";

interface ReplayState {
    writtenSoFar: string;
}

export interface ReplayProps {
    strokes: PressedKey[];
    text: string;
}

export class Replay  extends React.Component <ReplayProps, ReplayState>{
    constructor(props: ReplayProps) {
        super(props);
        this.state = {
            writtenSoFar: ''
        };
        for(const stroke of this.props.strokes) {
            setTimeout(() => {
                this.setState((state, props) => {
                    let newValue = state.writtenSoFar;
                    if(stroke.value === 'delete') {
                        newValue = newValue.slice(0, newValue.length -1);
                    } else {
                        newValue += stroke.value;
                    }
                    return {
                        writtenSoFar: newValue,
                    }
                });
            }, stroke.time)
        }
    }

    render() {
        return <div data-test-id="written-so-far">
            {this.state.writtenSoFar}
        </div>
    }
}
