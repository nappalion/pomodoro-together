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
    const [currGroupUsers, setCurrGroupUsers] = useState();

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

    function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    useEffect(() => {
        // Get group that signed in user is in
        const userRef = ref(database, 'users/' + userId + '/currGroup');
        onValue(userRef, (snapshot) => {
            const currentGroup = snapshot.val();
            setCurrGroup(currentGroup);

            // Get list of users in that group
            const currGroupUsersRef = ref(database, 'groups/' + currentGroup + '/users')
            onValue(currGroupUsersRef, (snapshot) => {
                const users = snapshot.val();
                let updatedUsers = {};
                for (let userKey in users) {
                    if (userKey != userId) {
                        updatedUsers[userKey] = users[userKey];
                        
                        // Get username of each user in group's users
                        const currUserRef = ref(database, 'users/' + userKey)
                        onValue(currUserRef, (snapshot) => {
                            const user = snapshot.val()
                            updatedUsers[userKey].username = user.username;

                            const currentDate = getCurrentDate()
                            if (user.focusTime && user.focusTime[currentDate]) {
                                updatedUsers[userKey].hoursFocused = user.focusTime[currentDate]
                            } else {
                                updatedUsers[userKey].hoursFocused = 0
                            }
                        })

                    }
                }
                setCurrGroupUsers(updatedUsers);
            })
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
                    <TimerGroup currGroup={currGroup} users={currGroupUsers}/>
                </div>
                
            </div>

        </Layout>
    );
}

export default Timer;