import React from "react"

export default function InfoTooltipIcon({children}) {
    return (
        <div className="info-tooltip-icon">
            <label className="info-icon">(?)</label>
            <div className="info-tooltip-popup">
                {children}
            </div>
        </div>
    );
}