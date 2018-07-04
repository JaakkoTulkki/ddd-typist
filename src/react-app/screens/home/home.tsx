import React from 'react';
import {TextToType} from "./components/TextToType/TextToType";
import {WritingAreaContainer} from "./components/WritingArea/WritingArea.container";

interface HomeProps {
    textToWrite: string;
}

export class Home extends React.Component<HomeProps, any> {
    render() {
        return <div>
            <TextToType text={this.props.textToWrite} />
            <WritingAreaContainer />
        </div>;
    }
}
