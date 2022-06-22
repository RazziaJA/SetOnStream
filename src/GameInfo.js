import React from "react"

export default function GameInfo({game, dispatch, ...props}) {
    var handleSubmit = function(event) {
        dispatch({
            type: 'restart'
        });
        event.preventDefault();
    };
    return (
        <div className="gameinfo">
            <label>Game Over: {game.isGameOver ? "yes" : "no"}</label><br/>
            <label>Cards in deck: {game.deck.length}</label><br/>
            <label>Sets on table: {game.countSets(game.on_table)}</label>
            <form onSubmit={handleSubmit}>
            <input type="submit" value="New Game"/>
            </form>
        </div>
    );
}