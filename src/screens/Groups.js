/*
Display the groups available for a user
Shows the user's groups (joined and created)
Shows a 'Discover' tab to show currently running (and popular) groups
Has a search Bar at the top to search for groups --> Pressing enter takes you to GroupSearchResults.js screen

*/

import React, {useState, useEffect} from 'react';
import Layout from '../components/Layout';

import Table from '../components/Table';
import SearchBar from '../components/SearchBar';

import { database } from "../firebaseConfig.js"
import { auth } from '../firebaseConfig.js';
import { ref, child, get, set, onValue} from "firebase/database";


function Groups(props) {

    const [myGroupsData, setMyGroupsData] = useState([]);
    const [discoverData, setDiscoverData] = useState([]);

    const styles = {
        screen: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }, 
        container: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 30
        },
        main: {
            padding: 30
        }
    }

    useEffect(() => {
        setMyGroupsData([]);
        setDiscoverData([]);
        const userId = auth.currentUser.uid
        const groupsRef = ref(database, 'groups/');
        onValue(groupsRef, (snapshot) => {
            const groups = snapshot.val();
            for (let groupKey in groups) {
                const group = groups[groupKey];
                group.groupKey = groupKey;
                console.log(group);
                if (group.users && userId in group.users && group != -1) {
                    setMyGroupsData((prevGroups) => [...prevGroups, group]);
                } else if (group.users && !(userId in group.users) && group != -1) {
                    setDiscoverData((prevGroups) => [...prevGroups, group]);
                }
            }
        });
    }, []); 


    return(
        <Layout header="Groups Screen" style={styles.screen}>
            <div style={{...styles.screen, ...styles.main}}>
                <SearchBar />
                <Table style={styles.container} headerText="My Groups" data={myGroupsData}/>
                <Table style={styles.container} headerText="Discover" data={discoverData} noIcons={true}/>
            </div>
        </Layout>
    );
}

export default Groups;