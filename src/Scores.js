import React from "react"

function comparator(a, b) {
    return a.score === b.score ? a.turn - b.turn : b.score - a.score;
}

export default function Scores({game, ...props}) {
    var scores = Object.entries(game.scores).map((kvp) => ({playerName: kvp[0], ...kvp[1]})).sort(comparator);
    return (
        <div className="scores">
            <label>Scores:</label>
            <ol>
                {
                    scores.map((score) => <li key={score.playerName}>{score.playerName} - {score.score}</li>)
                }
            </ol>
        </div>
    );
}