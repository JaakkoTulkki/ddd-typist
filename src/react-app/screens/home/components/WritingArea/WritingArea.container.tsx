import React from 'react';
import {WritingAreaPresenter} from "./WritingArea.presenter";

interface WritingAreaContainerProps {
    textToWrite: string;
    onKeyPress?: (event: KeyboardEvent) => void
}

interface WritingAreaContainerState {
    newKey: string;
}

export class WritingAreaContainer extends React.Component<WritingAreaContainerProps, WritingAreaContainerState> {
    constructor(props: any) {
        super(props);
        this.state = {
            newKey: '',
        };
        this.onKeyPress = this.props.onKeyPress || this.onKeyPress.bind(this);
    }

    onKeyPress(event: KeyboardEvent) {
        this.setState((state: WritingAreaContainerState) => {
            let newKey = '';
            if(event.key === 'Backspace') {
                newKey = 'delete';
            } else if (event.key.length === 1) {
                newKey = event.key;
            }
            return {
                newKey,
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
            <WritingAreaPresenter newKey={this.state.newKey} textToWrite={this.props.textToWrite} />
        </div>;
    }
}
