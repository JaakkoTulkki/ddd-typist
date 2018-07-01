import React from "react";
import ReactDOM from "react-dom";

import * as styles from './scss/main.scss'

const Yo = () =>
    <div className={styles.container}>
        <div className={styles.row}>
            <div className={styles.colSm}>
                One of three columns
            </div>
            <div className={styles.colSm}>
                One of three columns
            </div>
            <div className={styles.colSm}>
                One of three columns
            </div>
        </div>
    </div>;

ReactDOM.render(
    <Yo />,
    document.getElementById("root")
);