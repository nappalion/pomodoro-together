import React, { useState } from 'react';
import logo1 from "../assets/logo1.jpg"
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { database } from "../firebaseConfig.js"
import { ref, child, get, set} from "firebase/database";

import { auth } from "../firebaseConfig.js"
import { signInWithEmailAndPassword } from '@firebase/auth';

import { useNavigate } from 'react-router-dom';
import TextButton from '../components/TextButton';

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
      text: {
        color: '#1C1C1C',
        fontSize: 13,
        alignSelf: 'flex-end',
        marginTop: 5,
        paddingRight: 5
      }
    }

    return (

            <div style={styles.container}>

              <img src={logo1} alt="logo1" style={styles.logo1}></img>
              <span style={{color: '#1C1C1C', fontSize: 13, marginTop: 5}}>{loginText}</span>
              <TextInput label="Email" placeholder="Enter your email..." value={email} onChangeText={handleChangeEmail} />
              <TextInput label="Password" placeholder="Enter your password..." value={password} onChangeText={handleChangePassword}/>
              <TextButton onClick={() => { navigate('/') }} text="Forgot Password?"/>
              <Button onClick={() => login(email, password)} style={{marginTop: 50}} text="Log In"/>
              
              <div style={{ display: 'flex' }}>
                <span style={styles.text}>Don't have an account?</span>
                <TextButton onClick={() => { navigate('/signup') }} text="Sign Up."/>
              </div>
            </div>
          
      );
}

export default Login;