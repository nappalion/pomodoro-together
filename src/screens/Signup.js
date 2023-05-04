/*
Add the forms for creating a user account.
Name, Date of Birth, Email, Password, Username, Profile Picture

*/

import React, {useState} from 'react';
import { database } from "../firebaseConfig.js"
import { ref, child, get, set} from "firebase/database";

import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput.js';
import Button from '../components/Button.js';

function Signup(props) {
    const navigate = useNavigate();
    const [currUser, setCurrUser] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginText, setLoginText] = useState("");

    const styles = {
        container: {
          width: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
    }

    function handleChangeUsername(event) {
        setLoginText("");
        setUsername(event.target.value);
    }
    
    function handleChangePassword(event) {
        setLoginText("");
        setPassword(event.target.value);
    }

    function createUser(username, password) {
        setLoginText("");
        console.log("Clicked!");
        if (username != "" && password != "")  {
          set(ref(database, `users/${username}`), {password: password, timer: 60});
          setCurrUser(username);
          navigate("/timer", {state: {currUser: currUser, timer: 60}});
        } else {
          setLoginText("Invalid username/password.");
        }
      }

    return(
        <div style={styles.container}>
            <text style={{color: '#1C1C1C', fontSize: 13, marginTop: 5}}>{loginText}</text>
            <TextInput placeholder="Username" value={username} onChangeText={handleChangeUsername} />
            <TextInput placeholder="Password" value={password} onChangeText={handleChangePassword}/>
            <Button onClick={() => createUser(username, password)} style={{marginTop: 50}} text="Sign Up"/>
        </div>
    );
}

export default Signup;