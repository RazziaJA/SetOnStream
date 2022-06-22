import React from "react"

export default function TwitchInfoTooltipIcon() {
    return (
        <div className="twitch-info-tooltip-icon">
            <label className="twitch-info-icon">(?)</label>
            <div className="twitch-info-tooltip-popup">
                Enter your Twitch channel name and click connect to start listening for guesses from your Twitch chatters.
            </div>
        </div>
    );
}