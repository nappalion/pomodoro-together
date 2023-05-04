/*
This is the place to create a group

*/

import React from 'react';
import Layout from '../components/Layout';

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
            justifyContent: 'space-between',
            alignItems: 'center'
        },

    }
    

    return(
        <Layout style={styles.screen}>


        <div style={styles.container}>
            <div style={styles.leftSide}> 
                <h1>
                    
                </h1>
            </div>

            <div style={styles.rightSide}>
                
            </div>
            
        </div>

    </Layout>
    );
}

export default CreateGroup;