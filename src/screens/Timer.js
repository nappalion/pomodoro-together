import React, { useState } from 'react';
import Button from '../components/Button';
import {useLocation, useNavigate} from 'react-router-dom';
import { database } from "../firebaseConfig.js"
import { ref, child, get, set} from "firebase/database";

function Timer() {
    const navigate = useNavigate();
    const location = useLocation();
    const [timer, setTimer] = useState(location.state.timer);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

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
        container: {
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
        }
    }

    return(
        
        <div style={styles.container}>
            <div style={{display: 'flex',marginBottom: 30}}>
                <button onClick={() => decreaseTimer()}>&lt;</button>
                <text style={styles.text}>{`${minutes}:${seconds}`}</text>
                <button onClick={() => increaseTimer()}>&gt;</button>
            </div>
            <Button text="Pause/Play" onClick={() => {isRunning ? pauseTimer() : startTimer()}} />
            <Button text="Logout" onClick={logout}/>
        </div>
    );
}

export default Timer;