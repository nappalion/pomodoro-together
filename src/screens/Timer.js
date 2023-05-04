import React, { useState } from 'react';
import Button from '../components/Button';
import {useLocation, useNavigate} from 'react-router-dom';
import { database } from "../firebaseConfig.js"
import { ref, child, get, set} from "firebase/database";


import TimerGroup from '../components/TimerGroup';
import UserTimer from '../components/UserTimer'


import Layout from '../components/Layout';



function Timer() {
    const navigate = useNavigate();
    const location = useLocation();

    const styles = {
        screen: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        leftSide: {
            flex: 2,
            display: 'flex',
            alignItems: 'center',

        },
        rightSide: {
            flex: 1,
        },
        container: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },


    }

    return(
        
        <Layout style={styles.screen}>


            <div style={styles.container}>
                <div style={styles.leftSide}> 
                    <UserTimer />
                </div>

                <div style={styles.rightSide}>
                    <TimerGroup />
                </div>
                
            </div>

        </Layout>
    );
}

export default Timer;