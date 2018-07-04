import React from 'react';
import {WritingAreaPresenter} from "./WritingArea.presenter";

interface WritingAreaContainerState {
    typedText: string;
}

export class WritingAreaContainer extends React.Component<any, WritingAreaContainerState> {
    constructor(props: any) {
        super(props);
        this.state = {
            typedText: '',
        };
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onKeyPress(event: KeyboardEvent) {
        this.setState((state: WritingAreaContainerState) => {
            return {
                typedText: state.typedText + event.key,
            }
        });
    }

    componentDidMount() {
        document.addEventListener('keypress', this.onKeyPress, true)
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.onKeyPress, true);
    }

    render() {
        return <div>
            <WritingAreaPresenter typedText={this.state.typedText} />
        </div>;
    }
}
