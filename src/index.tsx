import React from "react";
import ReactDOM from "react-dom";

import * as styles from './scss/main.scss'
import {Home} from "./react-app/screens/home/home";

const App = () =>
    <div className={styles.container}>
        <Home />
    </div>;

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
