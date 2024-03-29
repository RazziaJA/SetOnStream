import React from "react"
import SvgCard from "./SvgCard"
import shapestyles from './shapestyles.css'

export default function SvgGuessHistory({game, ...props}) {
    return (
        <div className="GuessedCards">
            <svg viewBox="0 0 450 300" className="CardContainer" preserveAspectRatio="xMinYMin">
                <style>@import {`${shapestyles}`};</style>

                {game.guesses?.slice(-3)?.map((guess, guessNum) => 
                    <g key={guessNum}>
                        <text dominantBaseline="hanging" x="35%" y={`${33*guessNum + 2}%`}>
                            {guess.playerName} - {guess.wasSet ? "✅" : "❌"}
                        </text>

                        {guess?.guessed_cards?.map((card, idx) => 
                            <SvgCard
                                key={idx}
                                card={card}
                                cardX={33 * idx}
                                cardY={33 * guessNum + 8}
                                cardWidth={33}
                                cardHeight={25} />
                        )}
                    </g>
                )}
            </svg>


        </div>
    )
}