import React from "react";
import ReactDOM from "react-dom";

import * as styles from './scss/main.scss'
import {Home} from "./react-app/screens/home/home";

const text = 'It has been reported that doctors wow';// assessed the boys inside the cave on Saturday and drew up an priority evacuation list with the weakest to be brought out first, and the strongest to be rescued last.';

const App = () =>
    <div className={styles.container}>
        <Home textToWrite={text} />
    </div>;

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
