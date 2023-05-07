import React, {useState, useEffect} from 'react';

import MenuIcon from '../assets/menu-line.svg';

import Menu from '../screens/Menu'
import { auth } from "../firebaseConfig.js"
import { database } from "../firebaseConfig.js"
import { ref, child, get, set, onValue} from "firebase/database";
import IconButton from './IconButton';

function Layout(props) {

    const { header } = props;

    const [menuVisible, setMenuVisible] = useState(false);
    const [currGroupName, setCurrGroupName] = useState("");
    
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

    console.log( header );

    return(
        <div style={{...props.style, ...styles.container}}>
            <div style={styles.header}>
                <IconButton src={MenuIcon} style={styles.menuIcon} onClick={() => { setMenuVisible(!menuVisible); }}/>
                <span style={styles.headerTitle}>{ header ? header : currGroupName}</span>
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
