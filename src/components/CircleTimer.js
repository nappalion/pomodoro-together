/*
Generic search bar that can be used anywhere
Should have a search (magnifying glass) icon on the left
*/

import React from 'react';

function CircleTimer(props) {
    const {time, maxTime, timerText} = props;

    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60).toString().padStart(2, '0');  

    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = -(circumference - (time / maxTime) * circumference);
    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <svg width="100%" viewBox="-5 -5 110 110">
                <circle cx="50" cy="50" r={radius} stroke="#9EB3C2" strokeWidth="5" fill="none" />
                <circle cx="50" cy="50" r={radius} stroke="#21295C" strokeWidth="5" fill="none"
                strokeDasharray={circumference} strokeDashoffset={dashOffset} transform="rotate(-90, 50, 50)"/>
                <text x="50" y={timerText ? "50" : "58"} textAnchor="middle" fontSize={timerText ? "20" : "25"}>{`${minutes}:${seconds}`}</text>
                <text x="50" y="65" textAnchor="middle" fontSize="10">{timerText}</text>
            </svg>
        </div>
    );
}

export default CircleTimer;