/*
Holds the timer component for the user
*/

import React, {useState, useEffect} from 'react';
import { database } from "../firebaseConfig.js"
import { ref, child, get, set} from "firebase/database";
import {useLocation, useNavigate} from 'react-router-dom';

import { auth } from "../firebaseConfig.js"
import { signInWithEmailAndPassword } from '@firebase/auth';

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
    const { currGroup } = props;

    const [timer, setTimer] = useState(60);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const minutes = Math.floor(timer / 60);
    const seconds = Math.round(timer % 60).toString().padStart(2, '0');  

    useEffect(() => {
        const userId = auth.currentUser.uid
        console.log("curr group: " + currGroup)
        const timerRef = ref(database, `groups/${currGroup}/users/${userId}/timer`);
        get(timerRef).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
              setTimer(snapshot.val());
            } else {
              // If the timer value doesn't exist in the database, set it to 60
              setTimer(60);
            }
        });
    }, [currGroup])


    function saveTime() {
        const userId = auth.currentUser.uid
        console.log('groups/' + currGroup + "/users/" + userId)
        set(ref(database, 'groups/' + currGroup + "/users/" + auth.currentUser.uid + "/timer"), timer);
        set(ref(database, 'groups/' + currGroup + "/users/" + auth.currentUser.uid + "/isRunning"), false);
    }

    function increaseTimer() {
        setTimer(timer => timer + 60);
    }

    function decreaseTimer() {
        if (timer > 60) {
            setTimer(timer => timer - 60);
        }
    }

    function startTimer() {
        setIsRunning(true);
        console.log('groups/' + currGroup + "/users/" + auth.currentUser.uid + "/isRunning")
        set(ref(database, 'groups/' + currGroup + "/users/" + auth.currentUser.uid + "/isRunning"), true);
        const id = setInterval(() => {
            if (timer > 0) {
                setTimer(timer => timer - 1);
            }
        }, 1000);
        setIntervalId(id);
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
                <span style={styles.text}>{`${minutes}:${seconds}`}</span>
                <button onClick={() => increaseTimer()}>&gt;</button>
                
            </div>
            
            <img style={styles.pausePlayButton} src={isRunning ? require('../assets/pause-button.png') : require('../assets/play-button.png')} onClick={() => {isRunning ? pauseTimer() : startTimer()}}/>
        </div>
    );
}

export default UserTimer;