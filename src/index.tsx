import React from "react";
import ReactDOM from "react-dom";

import * as styles from './scss/main.scss'
import {Home} from "./react-app/screens/home/home";

const text = 'It has been reported that doctors wow';// assessed the boys inside the cave on Saturday and drew up an priority evacuation list with the weakest to be brought out first, and the strongest to be rescued last.';

const App = () =>
    <div className={styles.containerFluid}>
        <div className={`${styles.row} ${styles.header}`}>
            <div className={styles.col2} />
            <div className={styles.col8}>
                <h1>
                    Typer
                </h1>
                <p className={`${styles.leadStyle}`}>Just start typing!</p>

                <div className={`${styles.row} ${styles.writingArea}`}>
                    <Home textToWrite={text} />
                </div>

            </div>

            <div className={styles.col2} />
        </div>
    </div>;

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
