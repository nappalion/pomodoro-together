/*
Create group of timers for each group session.
This is where you can see other users' timers.
Should have the group name at the top and then display a grid view of multiple "UserTimer" components.
*/

import React, {useState, useEffect} from 'react';
import OtherTimer from './OtherTimer';
import TextInput from './TextInput';
import { auth } from "../firebaseConfig.js"
import { database } from "../firebaseConfig.js"
import { ref, child, get, set, onValue} from "firebase/database";

function TimerGroup(props) {
    const {users, currGroup} = props;
    const [currGroupName, setCurrGroupName] = useState("");
    const [search, setSearch] = useState("");
    
    useEffect(() => {
        const userId = auth.currentUser.uid
        const userCurrGroupRef = ref(database, 'users/' + userId + '/currGroup');
        onValue(userCurrGroupRef, (snapshot) => {
            const currentGroup = snapshot.val();
            const currGroupNameRef = ref(database, 'groups/' + currentGroup + '/name');
            onValue(currGroupNameRef, (snapshot) => {
            const currentGroupName = snapshot.val()
            setCurrGroupName(currentGroupName);
            })
        });
    }, []); 

    const styles = {
        container: {
            height: '100vh',
            backgroundColor: '#9EB3C2',
            borderRadius: 16,
        },
        header: {
            backgroundColor: '#21295C',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 35,
            paddingBottom: 35,
        },
        search: {
            alignItems: 'center', 
        },
        titleText: {
            fontSize: 22,
            color: 'white',
            paddingLeft: 20,
            paddingBottom: 10,
        },
        timerGroup: {
            width: '100%',
            height: 'min-content',
            overflowY: 'scroll',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gridAutoFlow: 'dense',
            gap: 10,
            padding: 20,
        }
    }

    return(
        <div style={styles.container}>
            <div style={styles.header}>
                {
                    currGroupName ?
                    <span style={styles.titleText}>
                        {users ? Object.keys(users).length : 0} Others in 
                        {(currGroupName != "") ? " " + currGroupName : " N/A"}
                    </span> :
                    <span style={styles.titleText}>
                        Join a group to focus with others.
                    </span>
                }

                <TextInput style={styles.search} placeholder={"Search"}/>
            </div>
            <div style={styles.timerGroup}>
                {users &&  
                    Object.keys(users).map(userKey => (
                        <OtherTimer key={userKey} userId={userKey} currGroup={currGroup} username={users[userKey].username} time={users[userKey].timer} hoursToday={users[userKey].hoursFocused}/>
                    ))
                }
            </div>


        </div>
    );
}

export default TimerGroup;