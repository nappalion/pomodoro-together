/*
A menu component that displays buttons on the side of the screen (Groups, Create Group, Analytics, Account, Settings, Logout)
Also displays the user's name and profile picture.
*/

import React from 'react';

function Menu(props) {

    const styles = {
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: 100,
            height: 100,
            backgroundColor: 'black'
        }
    }

    return(
        <div style={styles.container}></div>
    );
}

export default Menu;