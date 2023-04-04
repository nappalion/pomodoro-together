import React, { useState } from 'react';
import logo from "../assets/logo.PNG"
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { database } from "../firebaseConfig.js"
import { ref, child, get, set} from "firebase/database";

import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [loginText, setLoginText] = useState("");
    const [currUser, setCurrUser] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
  
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
  
    function login(username) {
      console.log("Checking if " + username.toString() + " exists.")
      if (username != "") {
        return get(child(ref(database), `users/${username}`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log("User exists.");
            if (snapshot.val().password != password) {
                setLoginText("Invalid password.")
                console.log("Invalid password.")
                return false
            } else {
                setCurrUser(username);
                navigate("/timer", {state: {currUser: username, timer: snapshot.val().timer}});
                return true;
            }
          } else {
            console.log("User does not exist.");
            setLoginText("User does not exist.") 
            return false;
          }
        }).catch((error) => {
            console.error(error);
            return false;
        });
      }
      else {
        return;
      }


    }
  
  
    function handleChangeUsername(event) {
      setLoginText("");
      setUsername(event.target.value);
    }
  
    function handleChangePassword(event) {
        setLoginText("");
        setPassword(event.target.value);
    }
  

  
    const styles = {
      container: {
        width: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      logo: {
        width: 250
      },
      textButton: {
        color: '#065A82',
        fontSize: 13,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginTop: 5
      },
      text: {
        color: '#1C1C1C',
        fontSize: 13,
        alignSelf: 'flex-end',
        marginTop: 5
      }
    }

    return (

            <div style={styles.container}>
              <img src={logo} alt="Logo" style={styles.logo}></img>
              <text style={{color: '#1C1C1C', fontSize: 13, marginTop: 5}}>{loginText}</text>
              <TextInput placeholder="Username" value={username} onChangeText={handleChangeUsername} />
              <TextInput placeholder="Password" value={password} onChangeText={handleChangePassword} />
              <text style={styles.textButton}>Forgot Password?</text>
              <Button onClick={() => login(username)} style={{marginTop: 50}} text="Log In"/>
              
              <div>
              <text style={styles.text}>Don't have an account?  </text>
              <text style={styles.textButton} onClick={() => { createUser(username, password) }}>Sign Up</text>
              </div>
            </div>
          
      );
}

export default Login;