import React from 'react';
import {WritingAreaContainer} from "./components/WritingArea/WritingArea.container";
import styles from '../../../scss/main.scss';

interface HomeProps {
    textToWrite: string;
}

export class Home extends React.Component<HomeProps, any> {
    render() {
        return <div>
            <WritingAreaContainer textToWrite={this.props.textToWrite}/>
        </div>;
    }
}

export const appStyles = styles;
