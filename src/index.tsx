import React from "react";
import ReactDOM from "react-dom";

import * as styles from './scss/main.scss'
import {Home, TextToType} from "./react-app/screens/home/home";
const texts: TextToType[] = require('./texts.json');


const App = () =>
    <div className={styles.containerFluid}>
        <div className={`${styles.row}`}>
            <div className={styles.col2} />
            <div className={styles.col8}>
                <h1>
                    Typer
                </h1>
                <p className={`${styles.leadStyle}`}>Just start typing!</p>
                <hr/>
                <div className={`${styles.row} ${styles.writingArea}`}>
                    <Home texts={texts} />
                </div>

            </div>

            <div className={styles.col2} />
        </div>
    </div>;

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
