import React from "react"
import LocalInputForm from "./LocalInputForm";
import TwitchListener from "./TwitchListener";

function InputForm({dispatch, ...props}) {
    // TODO add a switch or checkbox(es) to hide one of the input methods
    return (
        <div>
            <LocalInputForm dispatch={dispatch} />
            <TwitchListener dispatch={dispatch} />
        </div>
    );
}

export default InputForm;