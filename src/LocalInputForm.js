import React, {useState} from "react"
import InfoTooltipIcon from "./InfoTooltipIcon";

function LocalInputForm({dispatch, ...props}) {
    const [input, setInput] = useState("");

    var handleSubmit = function(event) {
        var split = input.split(" ");
        if (split.length === 3) {
            dispatch({
                type: 'callSet',
                playerName: "Host",
                card1: split[0],
                card2: split[1],
                card3: split[2]
            });
            setInput("");
        }
        if (split.length === 1 && split[0].toLowerCase() === "hint") {
            dispatch({
                type: 'setShowHint',
                showHint: true
            });
            setInput("");
        }
        if (split.length === 1 && split[0].toLowerCase() === "restart") {
            dispatch({
                type: 'restart'
            });
            setInput("");
        }
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Cards: 
                <input type="text" value={input} onChange={event => setInput(event.target.value)} size="10"/>
            </label>
            <input type="submit" value="Submit"/>
            <InfoTooltipIcon>
                <div style={{textAlign: "left"}}>
                    Commands:<br/>
                    x y z: Guess cards x,y,z are a set<br/>
                    restart: Start a new game<br/>
                    hint: Highlight one card of one set with a green border<br/>
                </div>
            </InfoTooltipIcon>
        </form>
    );
}

export default LocalInputForm;