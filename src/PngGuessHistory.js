import React from "react"
import LabelledSetSprite from "./LabelledSetSprite"

export default function PngGuessHistory({game, ...props}) {
    return (
        <div>
            {game.guesses.slice(-3).map((guess, idx) => 
            <div key={idx}>
                <label>{guess.playerName} - {guess.wasSet ? "✅" : "❌"}</label>
                <div className="GuessedCards">
                    {guess.guess.map((card, idx) => <LabelledSetSprite key={idx} card={card} />)}
                </div>
            </div>
            )}
        </div>
    )
}