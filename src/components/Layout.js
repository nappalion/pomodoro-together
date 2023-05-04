import React, {useState} from 'react';

import MenuIcon from '../assets/menu-line.svg';

import Menu from '../screens/Menu'

function Layout(props) {

    const [menuVisible, setMenuVisible] = useState(false);

    return(
        <div style={{...props.style, ...styles.container}}>
            <div style={styles.header}>
                <img src={MenuIcon} style={styles.menuIcon} onClick={() => { setMenuVisible(!menuVisible); }}/>
                <text style={styles.headerTitle}>CPP CS 4800 Study Room</text>
            </div>

            {menuVisible && <Menu onExit={() => setMenuVisible(false)}/>}
            
            <main style={styles.main}>
                {props.children}
            </main>
        </div>
    );
}

const styles = {
    header: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        height: '100%',
        
    },
    menuIcon: {
        width: 40,
        height: 40,
    },
    headerTitle: {
        color: '#1C1C1C', 
        fontSize: 20, 
        marginLeft: "auto",
        flex: 1,
        textAlign: 'center'
    },
    main: {
        display: 'flex',
        width: '100%'
    }
}

export default Layout;
