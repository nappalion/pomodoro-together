/*
Other timer for all other users in the group
Used in TimerGroup

Contains a timer component for a user
Holds the timer, username, and hours studied today
Will be displayed with other users in a group
*/

import React from 'react';

function OtherTimer(props) {
    const {username, time} = props;

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
        }
    }

    return(
        <div style={styles.container}>
            <span>Time: {time}</span>
            <span>User: {username}</span>
        </div>
    );
}

export default OtherTimer;