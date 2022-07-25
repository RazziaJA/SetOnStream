import React, {useState} from "react"
import InfoTooltipIcon from "./InfoTooltipIcon";

function LocalInputForm({dispatch, ...props}) {
    const [input, setInput] = useState("");

    var handleSubmit = function(event) {
        var split = input.split(" ");
        if (split.length === 3) {
            const n1 = Number(split[0]);
            const n2 = Number(split[1]);
            const n3 = Number(split[2]);
            if (Number.isInteger(n1) && n1 > 0 && n1 <= 21
            && Number.isInteger(n2) && n2 > 0 && n2 <= 21
            && Number.isInteger(n3) && n3 > 0 && n3 <= 21) {
                dispatch(
                    { 
                        type: 'callSet', 
                        playerName: "Host", 
                        card1: n1, 
                        card2: n2, 
                        card3: n3
                    }
                );
            }
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