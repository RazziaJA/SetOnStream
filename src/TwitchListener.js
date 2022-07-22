import React, {useState, useEffect} from "react"
import InfoTooltipIcon from "./InfoTooltipIcon";
const tmi = require('tmi.js');

function TwitchListener({ dispatch, twitchChannel, ...props}) {
    const [channel, setChannel] = useState(twitchChannel);
    const [input, setInput] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    if (twitchChannel !== null && twitchChannel !== channel) {
        setChannel(twitchChannel);
    }

    useEffect(() => {
        if (channel === null || channel === undefined || channel.length < 1) {
            return;
        }
        var client = new tmi.Client({
            //options: {debug:true},
            channels: [channel]
        });
        client.connect();
        setIsConnected(true);
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
            setIsConnected(false);
        }
    }, [channel, dispatch]); // useReducer guarantees dispatch won't ever change, just listed here as a dep to appease the linter

    var handleSubmit = function(event) {
        if (isConnected) {
            setChannel(undefined);
        } else {
            setChannel(input === undefined ? input : input.toLowerCase());
        }
        event.preventDefault();
    };

    if (twitchChannel !== null) {
        return (<label>{isConnected ? `Connected to channel: ${twitchChannel} 🔗` : ""}</label>);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Twitch Channel: 
            </label><br/>
            <input type="text" value={input} onChange={event => setInput(event.target.value)}/><br/>
            <input type="submit" value={(isConnected ? "Disc" : "C") + "onnect"}/>
            <label>{isConnected ? "🔗" : ""}</label>
            <InfoTooltipIcon>
                Enter your Twitch channel name and click connect to start listening for guesses from your Twitch chatters.
            </InfoTooltipIcon>
        </form>
    );
}

export default TwitchListener;