/*
Other timer for all other users in the group
Used in TimerGroup

Contains a timer component for a user
Holds the timer, username, and hours studied today
Will be displayed with other users in a group
*/

import React, {useEffect, useState} from 'react';
import { database } from "../firebaseConfig.js"
import { storage } from '../firebaseConfig.js';
import { auth } from '../firebaseConfig.js';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { ref, child, get, set, onValue} from "firebase/database";
import CircleTimer from './CircleTimer.js';
import HoverContainer from './HoverContainer.js';
import IconButton from './IconButton.js';

function OtherTimer(props) {
    const {userId, username, time, currGroup, hoursToday} = props;
    const [timer, setTimer] = useState(time);
    const [maxTime, setMaxTime] = useState(60);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [profileUrl, setProfileUrl] = useState(null);

    useEffect(() => {
        const profileRef = storageRef(storage, userId);
        getDownloadURL(profileRef).then(url => {
          setProfileUrl(url);
        });
    }, []);
    

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
            width: 150,
            height: 'min-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: 15,
            justifyContent: 'center',
            color: 'black',
            margin: 10,
            padding: 10,
        },
        text: {
            color: '#1C1C1C',
            fontSize: 60,
            padding: 0
        },
        username: {
            color: '#1C1C1C',
            fontWeight: 'bold',
            fontSize: 25,
        },
        hoursToday: {
            color: '#1C1C1C',
            fontSize: 15
        },
        profile: {
            width: 20,
            height: 20,
            marginRight: 10,
            borderRadius: 360,
            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            objectFit: 'cover'
        },
    }

    useEffect(() => {
        // Listen for changes to the timer value of the user
        const userTimerRef = ref(database, `groups/${currGroup}/users/${userId}/timer`);
        onValue(userTimerRef, (snapshot) => {
            const userTimer = snapshot.val();
            setTimer(userTimer || 0);
        });

        // Listen for changes to the timer value of the user
        const userMaxTimeRef = ref(database, `groups/${currGroup}/users/${userId}/maxTime`);
        onValue(userMaxTimeRef, (snapshot) => {
            const maxTime = snapshot.val();
            setMaxTime(maxTime || 0);
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

        <HoverContainer style={styles.container}>
            <CircleTimer time={timer} maxTime={maxTime}/>
            <div>
                <IconButton style={styles.profile} src={profileUrl ? profileUrl : require('../assets/default-profile.jpg')}/>
                <span style={styles.username}>{username}</span>
            </div>

            <span style={styles.hoursToday}>{hoursToday} hours today</span>
        </HoverContainer>

    );
}

export default OtherTimer;