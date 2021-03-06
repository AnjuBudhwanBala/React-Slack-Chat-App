import React from "react";
import { Progress } from "semantic-ui-react";

const ProgressBar = (props) => {
    return (
        <Progress
            className="progress__bar"
            percent={props.percentUploaded}
            progress
            indicating
            size="medium"
            inverted
        />
    )
}



export default ProgressBar;