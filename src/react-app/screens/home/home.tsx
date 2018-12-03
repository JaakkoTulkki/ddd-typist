import React from 'react';
import {WritingAreaContainer} from "./components/WritingArea/WritingArea.container";
import styles from '../../../scss/main.scss';

export interface TextToType {
    name: string;
    text: string;
}

interface HomeProps {
    texts: TextToType[];
}

interface HomeState {
    chosenText: TextToType | null;
    texts: TextToType[];
}

export class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            chosenText: null,
            texts: props.texts
        };
    }

    render() {
        return <div>
            {!this.state.chosenText &&
            <div>
                <h3>Choose Text To Write</h3>
                <ul data-test-id="choose-text" className=
                    {`${appStyles.listGroup} ${appStyles.listGroupFlush}`}
                >
                    {this.state.texts.map(text =>
                        <li className={`${appStyles.listGroupItem}`}
                            onClick={() => this.setState({chosenText: text})} key={text.name}
                        >
                            {text.name}
                        </li>)}
                </ul>
            </div>
            }
            {this.state.chosenText &&
                <WritingAreaContainer textToWrite={this.state.chosenText}/>
            }
        </div>;
    }
}

export const appStyles = styles;
