import React, {useState} from "react"

function LocalInputForm({dispatch, ...props}) {
    const [cards, setCards] = useState("");

    var handleSubmit = function(event) {
        var nums = cards.split(" ");
        if (nums.length === 3) {
            dispatch({
                type: 'callSet',
                playerName: "Host",
                card1: nums[0],
                card2: nums[1],
                card3: nums[2]
            });
            setCards("");
        }
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Cards: 
                <input type="text" value={cards} onChange={event => setCards(event.target.value)}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    );
}

export default LocalInputForm;