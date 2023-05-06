/*
Display the results (the groups) that the user searched in the Group screen search bar

*/

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Table from '../components/Table';

function GroupSearchResults(props) {
    const location = useLocation();
    const search = location.state.search;
    const groupData = location.state.groupData;

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
    }
    
    return(
        <Layout header={groupData.length + " results for \"" + search + "\""} style={styles.screen}>
            <Table style={styles.container} headerText="My Groups" data={groupData}/>
        </Layout>

    );
}

export default GroupSearchResults;