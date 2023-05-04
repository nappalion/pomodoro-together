/*
View the User Account details

*/

import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';

function Account(props) {

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
        <div className="wrapper">
        <h1>
            <span style={{ fontWeight: 'bold' }}>Account Information</span>
        </h1>
      
      <form>
        <fieldset>
          <label>
            <p style={{ color: 'blue' }}><span style={{ fontWeight: 'bold' }}>Email Address</span></p>
            <div color='blue'>jack@gmail.com</div>
          </label>
        </fieldset>
        <fieldset>
         <label>
           <p><span style={{ fontWeight: 'bold' }}>Reset Password</span></p>
           
         </label>

          <button> Reset </button>

       </fieldset>
        
        <div><Button text = 'DELETE ACCOUNT'/></div>
      </form>
    </div>
        </div>

    </Layout>
    );
}

export default Account;