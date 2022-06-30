import React from "react"
import SvgCard from "./SvgCard"
import shapestyles from './shapestyles.css'

const SVG_ID_PREFIX="GUESS_HISTORY-";

export default function SvgGuessHistory({game, ...props}) {
    return (
        <div className="GuessedCards">
            <svg viewBox="0 0 450 300" className="CardContainer" preserveAspectRatio="xMinYMin">
                <style>@import {`${shapestyles}`};</style>
                <defs>
                    <pattern id={SVG_ID_PREFIX + "red-striped"} width="10%" height="10%" viewBox="0 0 4 4">
                        <line x1="0" y="0" x2="4" y2="0" stroke="red"/>
                    </pattern>
                    <pattern id={SVG_ID_PREFIX + "green-striped"} width="10%" height="10%" viewBox="0 0 4 4">
                        <line x1="0" y="0" x2="4" y2="0" stroke="green"/>
                    </pattern>
                    <pattern id={SVG_ID_PREFIX + "purple-striped"} width="10%" height="10%" viewBox="0 0 4 4">
                        <line x1="0" y="0" x2="4" y2="0" stroke="purple"/>
                    </pattern>
                </defs>
                {game.guesses.slice(-3).map((guess, guessNum) => 
                    <g key={guessNum}>
                        <text dominantBaseline="hanging" x="35%" y={`${33*guessNum + 2}%`}>
                            {guess.playerName} - {guess.wasSet ? "✅" : "❌"}
                        </text>

                        {guess.guess.map((card, idx) => 
                            <SvgCard
                                key={idx}
                                card={card}
                                cardX={33 * idx}
                                cardY={33 * guessNum + 8}
                                cardWidth={33}
                                cardHeight={25}
                                svgIdPrefix={SVG_ID_PREFIX} />
                        )}
                    </g>
                )}
            </svg>


        </div>
    )
}