import React, { useState } from 'react';
import logo1 from "../assets/logo1.jpg"
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { database } from "../firebaseConfig.js"
import { ref, child, get, set} from "firebase/database";

import { auth } from "../firebaseConfig.js"
import { signInWithEmailAndPassword } from '@firebase/auth';

import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [loginText, setLoginText] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    function login(email, password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          navigate("/timer");
        })
        .catch((error) => {
          const errorCode = error.code.toString();
          const errorMessage = error.message.toString();
          setLoginText(errorCode)
        });
    }
  
  
    function handleChangeEmail(event) {
      setLoginText("");
      setEmail(event.target.value);
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
      logo1: {
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

              <img src={logo1} alt="logo1" style={styles.logo1}></img>
              <span style={{color: '#1C1C1C', fontSize: 13, marginTop: 5}}>{loginText}</span>
              <TextInput placeholder="Email" value={email} onChangeText={handleChangeEmail} />
              <TextInput placeholder="Password" value={password} onChangeText={handleChangePassword}/>
              <span style={styles.textButton}>Forgot Password?</span>
              <Button onClick={() => login(email, password)} style={{marginTop: 50}} text="Log In"/>
              
              <div>
              <span style={styles.text}>Don't have an account?  </span>
              <span style={styles.textButton} onClick={() => { navigate('/signup') }}>Sign Up</span>
              </div>
            </div>
          
      );
}

export default Login;