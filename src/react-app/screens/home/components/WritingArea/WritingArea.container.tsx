import React from 'react';
import {WritingAreaPresenter} from "./WritingArea.presenter";

interface WritingAreaContainerState {
    typedText: string;
    onKeyPress?: (event: KeyboardEvent) => void
}

export class WritingAreaContainer extends React.Component<any, WritingAreaContainerState> {
    constructor(props: any) {
        super(props);
        this.state = {
            typedText: '',
        };
        this.onKeyPress = this.props.onKeyPress || this.onKeyPress.bind(this);
    }

    onKeyPress(event: KeyboardEvent) {
        let typedText: string;
        this.setState((state: WritingAreaContainerState) => {
            if(event.key === 'Backspace') {
                typedText = state.typedText.slice(0, -1);
            } else {
                typedText = state.typedText + event.key;
            }
            return {
                typedText,
            }
        });
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyPress, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyPress, false);
    }

    render() {
        return <div>
            <WritingAreaPresenter typedText={this.state.typedText} />
        </div>;
    }
}
