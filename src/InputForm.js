import React from "react"
import LocalInputForm from "./LocalInputForm";
import TwitchListener from "./TwitchListener";

function InputForm({dispatch, twitchChannel, ...props}) {
    return (
        <div className="inputform">
            {twitchChannel === null && <LocalInputForm dispatch={dispatch} />}
            <TwitchListener dispatch={dispatch} twitchChannel={twitchChannel} />
        </div>
    );
}

export default InputForm;