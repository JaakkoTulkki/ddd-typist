import React from 'react';
import {WritingAreaContainer} from "./components/WritingArea/WritingArea.container";
import styles from '../../../scss/main.scss';

interface HomeProps {
    textToWrite: string;
}

interface HomeState {
    chosenText: string | null;
    texts: string[];
}

export class Home extends React.Component<HomeProps, HomeState> {
    state: HomeState = {
        chosenText: null,
        texts: ['123']
    };
    render() {
        return <div>
            {}
            <WritingAreaContainer textToWrite={this.props.textToWrite}/>
        </div>;
    }
}

export const appStyles = styles;
