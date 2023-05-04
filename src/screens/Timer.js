import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import {useLocation, useNavigate} from 'react-router-dom';

import { database } from "../firebaseConfig.js"
import { ref, child, get, set, onValue} from "firebase/database";


import { auth } from "../firebaseConfig.js"
import { signInWithEmailAndPassword } from '@firebase/auth';

import TimerGroup from '../components/TimerGroup';
import UserTimer from '../components/UserTimer'


import Layout from '../components/Layout';



function Timer() {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = auth.currentUser.uid;

    const [currGroup, setCurrGroup] = useState("");

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

    useEffect(() => {
        const userCurrGroupRef = ref(database, 'users/' + userId + '/currGroup');
        onValue(userCurrGroupRef, (snapshot) => {
            const currentGroup = snapshot.val();
            setCurrGroup(currentGroup);
        });
    }, []); 


    return(
        
        <Layout style={styles.screen}>

            

            <div style={styles.container}>
                <div style={styles.leftSide}> 
                    {currGroup != -1 && <UserTimer currGroup={currGroup}/>}
                    {currGroup == -1 && <span style={{width: '100%', color: 'black', padding: 100}}>Join a group using the "Groups" tab in the left menu.</span>}
                </div>

                <div style={styles.rightSide}>
                    <TimerGroup />
                </div>
                
            </div>

        </Layout>
    );
}

export default Timer;