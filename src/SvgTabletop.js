import React from "react"
import SvgCard from "./SvgCard";
import shapestyles from './shapestyles.css'

const NUM_ROWS = 3;
const ROW_HEIGHT_PCT = 100.0/NUM_ROWS;

export default function SvgTabletop({game, ...props}) {
    var num_cols = game.on_table.length / 3;
    var col_width_pct = 100.0/num_cols;
    return (
        <div className="Tabletop">
            <svg x="0" y="0" viewBox="0 0 900 500" className="CardContainer" preserveAspectRatio="xMinYMin">
                <style>@import {`${shapestyles}`};</style>

                {game.on_table.map((deckId, tblIdx) => {
                    return (
                        <SvgCard 
                            key={tblIdx.toString()}
                            tblIdx={tblIdx}
                            card={deckId}
                            cardX={Math.floor((tblIdx/3))*col_width_pct}
                            cardY={(tblIdx%3)*ROW_HEIGHT_PCT}
                            cardWidth={col_width_pct}
                            cardHeight={ROW_HEIGHT_PCT}/>
                    );
                })}
            </svg>
        </div>
    );
}