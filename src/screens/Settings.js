/*
View the User Settings details

*/

import React from 'react';
import Layout from '../components/Layout';

function Settings(props) {

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


        <div>
        <div className="wrapper">
      <h1>Account Settings</h1>
      
      <form>
        <fieldset>
          <label>
            <div>Display Name</div>
            <input name="name" />
            <button>Add Alias</button>
          </label>
        </fieldset>
        <fieldset>
            <div><input type="checkbox"/>
                _Timer Visible to Other Users</div>
            <div><input type="checkbox"/>
                _Other Users' timers visible</div>
                
                
                <input type="checkbox"/>
                _Place In Leaderboards

        </fieldset>
        <fieldset>
         <label>
           <div>Default Timer Duration</div>
           <select name="">
               <option value="">--Please choose an option--</option>
               <option value="10 Min">Public</option>
               <option value="25 Min">Private</option>
           </select>
           <p></p>
           <div>Alert Type</div>
           <select name="1">
               <option value="">--Please choose an option--</option>
               <option value="Silent">Public</option>
               <option value="Beep">Private</option>
           </select>
           
         </label>
         <label>
         </label>
         <label>
         </label>
       </fieldset>
      </form>
    </div>
            
        </div>

    </Layout>
    );
}

export default Settings;