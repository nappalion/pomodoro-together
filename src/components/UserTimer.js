/*
Holds the timer component for the user
*/

import React, {useState} from 'react';
import { database } from "../firebaseConfig.js"
import { ref, child, get, set} from "firebase/database";
import {useLocation, useNavigate} from 'react-router-dom';

import Button from './Button.js';

const styles = {
    text: {
        color: '#1C1C1C',
        fontSize: 60,
        marginTop: 5,
        marginLeft: 30,
        marginRight: 30,
    },
    timer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    timerContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        
    },
    pausePlayButton: {
        width: 60
    }
}

function UserTimer(props) {
    const location = useLocation();

    const [timer, setTimer] = useState(location.state.timer);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const minutes = Math.floor(timer / 60);
    const seconds = Math.round(timer % 60).toString().padStart(2, '0');  

    function startTimer() {
        setIsRunning(true);
        const id = setInterval(() => {
            if (timer > 0) {
                setTimer(timer => timer - 1);
            }
        }, 1000);
        setIntervalId(id);
    }

    function saveTime() {
        console.log('users/' + location.state.currUser + "/timer")
        set(ref(database, 'users/' + location.state.currUser + "/timer"), timer);
    }

    function increaseTimer() {
        setTimer(timer => timer + 60);
    }

    function decreaseTimer() {
        if (timer > 60) {
            setTimer(timer => timer - 60);
        }
    }

    function pauseTimer() {
        setIsRunning(false);
        clearInterval(intervalId);
        saveTime()
    }

    return(
        <div style={styles.timerContainer}>
            <div style={styles.timer}>
                <button onClick={() => decreaseTimer()}>&lt;</button>
                <text style={styles.text}>{`${minutes}:${seconds}`}</text>
                <button onClick={() => increaseTimer()}>&gt;</button>
                
            </div>
            
            <img style={styles.pausePlayButton} src={isRunning ? require('../assets/pause-button.png') : require('../assets/play-button.png')} onClick={() => {isRunning ? pauseTimer() : startTimer()}}/>
        </div>
    );
}

export default UserTimer;