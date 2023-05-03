import React, { useState } from 'react';
import Button from '../components/Button';
import {useLocation, useNavigate} from 'react-router-dom';
import { database } from "../firebaseConfig.js"
import { ref, child, get, set} from "firebase/database";

import Menu from './Menu';

import MenuIcon from '../assets/menu-line.svg';
import TimerGroup from '../components/TimerGroup';

function Timer() {
    const navigate = useNavigate();
    const location = useLocation();
    const [timer, setTimer] = useState(location.state.timer);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    
    const [menuVisible, setMenuVisible] = useState(false);

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
    }

    function logout() {
        saveTime()
        navigate("/");
    }

    const minutes = Math.floor(timer / 60);
    const seconds = Math.round(timer % 60).toString().padStart(2, '0');  

    const styles = {
        screen: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        text: {
            color: '#1C1C1C',
            fontSize: 60,
            marginTop: 5,
            marginLeft: 30,
            marginRight: 30,
        },
        timer: {
            display: 'flex',
            marginBottom: 30
        },
        header: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        container: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
        },
        menuIcon: {
            width: 50,
            height: 50,
        },
        headerTitle: {
            color: '#1C1C1C', 
            fontSize: 20, 
            marginLeft: "auto",
            flex: 1,
            textAlign: 'center'
        },
        timer: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        leftSide: {
            flex: 1,
        },
        timerContainer: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    return(
        
        <div style={styles.screen}>

            { menuVisible && <Menu /> }

            <div style={styles.container}>
                <div style={styles.leftSide}> 
                    <div style={styles.header}>
                        <img src={MenuIcon} style={styles.menuIcon} onClick={() => { setMenuVisible(!menuVisible); console.log(menuVisible.toString());}}/>
                        <text style={styles.headerTitle}>CPP CS 4800 Study Room</text>
                    </div>

                    <div style={styles.timerContainer}>
                        <div style={styles.timer}>
                            <button onClick={() => decreaseTimer()}>&lt;</button>
                            <text style={styles.text}>{`${minutes}:${seconds}`}</text>
                            <button onClick={() => increaseTimer()}>&gt;</button>
                        </div>
                        <Button text="Pause/Play" onClick={() => {isRunning ? pauseTimer() : startTimer()}} />
                        <Button text="Logout" onClick={logout}/>
                    </div>

                </div>

                <div>
                    <TimerGroup />
                </div>
            </div>

        </div>
    );
}

export default Timer;