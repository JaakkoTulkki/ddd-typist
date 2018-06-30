import React from "react";
import ReactDOM from "react-dom";

const Yo = () =>
    <div className="container">
        <div className="row">
            <div className="col-sm">
                One of three columns
            </div>
            <div className="col-sm">
                One of three columns
            </div>
            <div className="col-sm">
                One of three columns
            </div>
        </div>

        <div className="row">
            <div className="col-sm">
                One of three columns
            </div>
            <div className="col-sm">
                One of three columns
            </div>
            <div className="col-sm">
                One of three columns
            </div>
        </div>
    </div>;

ReactDOM.render(
    <Yo />,
    document.getElementById("root")
);