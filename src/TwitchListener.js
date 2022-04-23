import React, {useState} from "react"
const tmi = require('tmi.js');

function TwitchListener({ onSetCalled, channel, ...props}) {
    const [client, updateClient] = useState(() => {
        var ret = new tmi.Client({
            options: {debug:true},
            channels: [channel]
        });
        ret.connect();
        ret.on('message', (channel, tags, message, self) => {
            if (!self) {
                const args = message.split(' ');
                if (args.length === 3) {
                    const n1 = Number(args[0]);
                    const n2 = Number(args[1]);
                    const n3 = Number(args[2]);
                    if (Number.isInteger(n1) && n1 > 0 && n1 <= 21
                    && Number.isInteger(n2) && n2 > 0 && n2 <= 21
                    && Number.isInteger(n3) && n3 > 0 && n3 <= 21) {
                        onSetCalled(tags.username, n1, n2, n3);
                    }
                }
            }
        });
    });

    return (<div/>);
}

export default TwitchListener;