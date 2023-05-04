/*
Create group of timers for each group session.
This is where you can see other users' timers.
Should have the group name at the top and then display a grid view of multiple "UserTimer" components.
*/

import React from 'react';

function TimerGroup(props) {

    const styles = {
        container: {
            height: '100vh',
            backgroundColor: '#9EB3C2',
            borderRadius: 16,
            overflowY: 'scroll'
        }
    }

    return(
        <div style={styles.container}>
            
        </div>
    );
}

export default TimerGroup;