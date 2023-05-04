/*
Other timer for all other users in the group
Used in TimerGroup

Contains a timer component for a user
Holds the timer, username, and hours studied today
Will be displayed with other users in a group
*/

import React, {useEffect, useState} from 'react';
import { database } from "../firebaseConfig.js"
import { ref, child, get, set, onValue} from "firebase/database";

function OtherTimer(props) {
    const {userId, username, time, currGroup} = props;
    const [timer, setTimer] = useState(time);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    
    const minutes = Math.floor(timer / 60);
    const seconds = Math.round(timer % 60).toString().padStart(2, '0');  

    function startTimer() {
        if (isRunning) {
            const id = setInterval(() => {
                if (timer > 0) {
                    setTimer(timer => timer - 1);
                }
            }, 1000);
            setIntervalId(id);
        }
    }

    function pauseTimer() {
        setIsRunning(false);
        clearInterval(intervalId);
    }


    const styles = {
        container: {
            width: 200,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: 15,
            color: 'black',
            margin: 10,
        },
        text: {
            color: '#1C1C1C',
            fontSize: 60,
            marginTop: 5,
            marginLeft: 30,
            marginRight: 30,
        },
    }

    useEffect(() => {
        // Listen for changes to the timer value of the user
        const userTimerRef = ref(database, `groups/${currGroup}/users/${userId}/timer`);
        onValue(userTimerRef, (snapshot) => {
            const userTimer = snapshot.val();
            setTimer(userTimer || 0);
        });

        // Listen for changes to the isRunning value of the user
        const userIsRunningRef = ref(database, `groups/${currGroup}/users/${userId}/isRunning`);
        onValue(userIsRunningRef, (snapshot) => {
            const userIsRunning = snapshot.val();
            setIsRunning(userIsRunning || false);
        });

        // Start or pause the timer depending on the isRunning value of the user
        if (isRunning) {
            startTimer();
        } else {
            pauseTimer();
        }
    }, [currGroup, userId, isRunning]);

    return(
        <div style={styles.container}>
             <span style={styles.text}>{`${minutes}:${seconds}`}</span>
            <span>User: {username}</span>
            
        </div>
    );
}

export default OtherTimer;