/*
View the User Settings details

*/

import React from 'react';
import Layout from '../components/Layout';
import TextInput from '../components/TextInput';

function Settings(props) {

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
            alignItems: 'center',
            justifyContent: 'center'
        },
    }

    return(
        <Layout header="Settings" style={styles.screen}>


            <div style={styles.container}>
                
                <h1>Account Settings</h1>
                
                <form>
                    <fieldset>
                        <label>
                            <div>Display Name</div>
                            <TextInput name="name" label="Username" placeholder="Please enter a username..."/>
                            <input name="name" />
                            <button>Add Alias</button>
                        </label>
                    </fieldset>

                    <fieldset>
                        <div>
                            <input type="checkbox"/>
                            _Timer Visible to Other Users
                        </div>

                        <div>
                            <input type="checkbox"/>
                            _Other Users' timers visible
                        </div>


                        <div>
                            <input type="checkbox"/>
                            _Place In Leaderboards
                        </div>
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

                    </fieldset>
                </form>
                        
            </div>

        </Layout>
    );
}

export default Settings;