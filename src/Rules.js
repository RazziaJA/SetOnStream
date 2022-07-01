import React from "react"

export default function Rules() {
    return (
        <div className="rules">
            <p>Each card has four properties: the shape on it, the number of shapes, their color, and their shading.<br/>
                The objective is to find sets of three (3) cards for which each property is either all the same or all different.<br/>
                E.g. red-green-purple or red-red-red, but not red-red-purple. <br/>
                If you find a set enter the numbers on the three cards separated by spaces.</p>
        </div>
        )
}