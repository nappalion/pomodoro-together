/*
Holds the timer component for the user
*/

import React, {useState, useEffect} from 'react';
import { database } from "../firebaseConfig.js"
import { ref, child, get, set} from "firebase/database";
import {useLocation, useNavigate} from 'react-router-dom';

import { auth } from "../firebaseConfig.js"

import Button from './Button.js';
import CircleTimer from './CircleTimer.js';

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
    iconButton: {
        width: 60
    }
}

function UserTimer(props) {
    const { currGroup } = props;
    const userId = auth.currentUser.uid;

    const [timer, setTimer] = useState(60);
    const [maxTime, setMaxTime] = useState(60);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);


    useEffect(() => {
        setTimer(maxTime);
    }, [maxTime]);

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
        const maxTimeRef = ref(database, `groups/${currGroup}/users/${userId}/maxTime`);
        get(maxTimeRef).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
              setMaxTime(snapshot.val());
            } else {
              // If the timer value doesn't exist in the database, set it to 60
              setMaxTime(60);
            }
        });
    }, [currGroup])

    function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }




    function saveTime() {
        const userId = auth.currentUser.uid
        const currDate = getCurrentDate()

        const totalFocusTimeRef = ref(database, `users/${auth.currentUser.uid}/totalFocusTime`);
        const focusTimeRef = ref(database, `users/${auth.currentUser.uid}/focusTime`);
        const prevTimerRef = ref(database, `groups/${currGroup}/users/${auth.currentUser.uid}/timer`);
        const currentDayFocusTimeRef = ref(database, `users/${auth.currentUser.uid}/focusTime/${currDate}`);
        get(prevTimerRef).then((timerData) => {
            get(totalFocusTimeRef).then((totalFocusData) => {
                if (timerData.exists() && totalFocusData.exists()) {
                    console.log((timerData.val() - timer) + totalFocusData.val())
                    set(ref(database, 'users/' + userId + '/totalFocusTime/'), (timerData.val() - timer) + totalFocusData.val());
                } else {
                    console.log("Error.")
                }

                get(currentDayFocusTimeRef).then((snapshot) => {
                    const currDayFocusTime = snapshot.val();
                    if (currDayFocusTime === null) {
                        set(currentDayFocusTimeRef, (timerData.val() - timer));
                    } else {
                        set(currentDayFocusTimeRef, currDayFocusTime + (timerData.val() - timer));
                    }
                })

                get(focusTimeRef).then((snapshot) => {
                    const focusTimeData = snapshot.val();
                    for (let dateKey in focusTimeData) {
                        if (dateKey == currDate) {
                            set(ref(database, 'users/' + userId + '/focusTime/' + dateKey), (timerData.val() - timer) + focusTimeData[dateKey])
                        }
                    }
                });
            });
        });
        set(ref(database, 'groups/' + currGroup + "/users/" + auth.currentUser.uid + "/timer"), timer);
        set(ref(database, 'groups/' + currGroup + "/users/" + auth.currentUser.uid + "/maxTime"), maxTime);
        set(ref(database, 'groups/' + currGroup + "/users/" + auth.currentUser.uid + "/isRunning"), false);

        
    }

    function increaseMaxTime() {
        setMaxTime(maxTime => maxTime + 60);
    }

    function decreaseMaxTime() {
        if (maxTime > 60) {
            setMaxTime(maxTime => maxTime - 60);
        }
    }

    function startTimer() {
        setIsRunning(true);
        // console.log('groups/' + currGroup + "/users/" + auth.currentUser.uid + "/isRunning")
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
        saveTime();
    }

    function stopTimer() {
        setTimer(maxTime);
    }

    return(
        <div style={styles.timerContainer}>
            <div style={styles.timer}>
                {!isRunning && <button onClick={() => {decreaseMaxTime()}}>&lt;</button>}
                <CircleTimer time={timer} maxTime={maxTime} timerText="Focus"/>
                {!isRunning && <button onClick={() => {increaseMaxTime()}}>&gt;</button>}
            </div>

            
            <img style={styles.iconButton} src={isRunning ? require('../assets/pause-button.png') : require('../assets/play-button.png')} onClick={() => {isRunning ? pauseTimer() : startTimer()}}/>
            <img style={styles.iconButton} src={require('../assets/stop-button.png')} onClick={stopTimer}/>
        </div>
    );
}

export default UserTimer;