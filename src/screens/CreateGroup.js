/*
This is the place to create a group

*/

import React from 'react';
import Layout from '../components/Layout';
import AddGroupForm from '../components/AddGroupForm';

function CreateGroup() {

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
            justifyContent: 'center',
            alignItems: 'center'
        },

    }
    

    return(
        <Layout header="Create A New Group" style={styles.screen}>


        <div style={styles.container}>
            <AddGroupForm />
        </div>

    </Layout>
    );
}

export default CreateGroup;