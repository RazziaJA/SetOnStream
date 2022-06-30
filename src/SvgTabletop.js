import React from "react"
import SvgCard from "./SvgCard";
import shapestyles from './shapestyles.css'

const NUM_ROWS = 3;
const ROW_HEIGHT_PCT = 100.0/NUM_ROWS;
const SVG_ID_PREFIX = "TABLETOP-";

export default function SvgTabletop({game, ...props}) {
    var num_cols = game.on_table.length / 3;
    var col_width_pct = 100.0/num_cols;
    return (
        <div className="Tabletop">
            <svg x="0" y="0" viewBox="0 0 900 500" className="CardContainer" preserveAspectRatio="xMinYMin">
                <style>@import {`${shapestyles}`};</style>
                <defs>
                    <pattern id={SVG_ID_PREFIX + "red-striped"} width="20" height="20" viewBox="0 0 4 4">
                        <line x1="0" y="0" x2="4" y2="0" stroke="red"/>
                    </pattern>
                    <pattern id={SVG_ID_PREFIX + "green-striped"} width="20" height="20" viewBox="0 0 4 4">
                        <line x1="0" y="0" x2="4" y2="0" stroke="green"/>
                    </pattern>
                    <pattern id={SVG_ID_PREFIX + "purple-striped"} width="20" height="20" viewBox="0 0 4 4">
                        <line x1="0" y="0" x2="4" y2="0" stroke="purple"/>
                    </pattern>
                </defs>

                {game.on_table.map((deckId, tblIdx) => {
                    return (
                        <SvgCard 
                            key={tblIdx.toString()}
                            tblIdx={tblIdx}
                            card={deckId}
                            cardX={Math.floor((tblIdx/3))*col_width_pct}
                            cardY={(tblIdx%3)*ROW_HEIGHT_PCT}
                            cardWidth={col_width_pct}
                            cardHeight={ROW_HEIGHT_PCT}
                            svgIdPrefix={SVG_ID_PREFIX} />
                    );
                })}
            </svg>
        </div>
    );
}