import React, {useState, useEffect} from "react"
const tmi = require('tmi.js');

function TwitchListener({ dispatch, ...props}) {
    const [channel, setChannel] = useState(undefined);
    const [input, setInput] = useState("");

    useEffect(() => {
        if (channel === undefined) {
            return;
        }
        var client = new tmi.Client({
            //options: {debug:true},
            channels: [channel]
        });
        client.connect();
        client.on('message', (channel, tags, message, self) => {
            if (!self) {
                const args = message.split(' ');
                if (args.length === 3) {
                    const n1 = Number(args[0]);
                    const n2 = Number(args[1]);
                    const n3 = Number(args[2]);
                    if (Number.isInteger(n1) && n1 > 0 && n1 <= 21
                    && Number.isInteger(n2) && n2 > 0 && n2 <= 21
                    && Number.isInteger(n3) && n3 > 0 && n3 <= 21) {
                        dispatch(
                            { 
                                type: 'callSet', 
                                playerName: tags.username, 
                                card1: n1, 
                                card2: n2, 
                                card3: n3
                            }
                        );
                    }
                }
            }
        });
        
        return function cleanup() {
            client.disconnect();
        }
    }, [channel, dispatch]); // useReducer guarantees dispatch won't ever change, just listed here as a dep to appease the linter

    var handleSubmit = function(event) {
        setChannel(input === undefined ? input : input.toLowerCase());
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
        <label>
            Twitch Channel: 
            <input type="text" value={input} onChange={event => setInput(event.target.value)}/>
        </label>
        <input type="submit" value="Connect"/>
        </form>
    );
}

export default TwitchListener;