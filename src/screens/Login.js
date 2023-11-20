import React, { useState } from "react";
import logo from "../assets/logo.svg";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

import { auth } from "../firebaseConfig.js";
import { signInWithEmailAndPassword } from "@firebase/auth";

import { useNavigate } from "react-router-dom";
import TextButton from "../components/TextButton";
import EmailIcon from "../assets/mail-fill.svg";
import PasswordIcon from "../assets/lock-fill.svg";

function Login() {
  const navigate = useNavigate();
  const [loginText, setLoginText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate("/timer");
      })
      .catch((error) => {
        const errorCode = error.code.toString();
        setLoginText(errorCode);
      });
  }
  function loginWithTestUser() {
    signInWithEmailAndPassword(auth, "test@gmail.com", "test123")
      .then((userCredential) => {
        // Signed in
        navigate("/timer");
      })
      .catch((error) => {
        const errorCode = error.code.toString();
        setLoginText(errorCode);
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
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    logo: {
      width: 250,
    },
    text: {
      color: "#1C1C1C",
      fontSize: 16,
      alignSelf: "flex-end",
      marginTop: 5,
      paddingRight: 5,
    },
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="logo" style={styles.logo}></img>
      <span style={{ color: "#1C1C1C", fontSize: 13, marginTop: 5 }}>
        {loginText}
      </span>
      <TextInput
        label="Email"
        placeholder="Enter your email..."
        icon={EmailIcon}
        value={email}
        onChangeText={handleChangeEmail}
      />
      <TextInput
        label="Password"
        placeholder="Enter your password..."
        icon={PasswordIcon}
        value={password}
        isPassword={true}
        onChangeText={handleChangePassword}
        onSubmit={() => login(email, password)}
      />
      <TextButton
        onClick={() => {
          navigate("/");
        }}
        text="Forgot Password?"
      />
      <Button
        onClick={() => login(email, password)}
        style={{ marginTop: 50 }}
        text="Log In"
      />

      <Button
        onClick={() => loginWithTestUser()}
        style={{ backgroundColor: "#c2c2c2" }}
        text="Log In As Test User"
      />

      <div style={{ display: "flex" }}>
        <span style={styles.text}>Don't have an account?</span>
        <TextButton
          onClick={() => {
            navigate("/signup");
          }}
          text="Sign Up."
        />
      </div>
    </div>
  );
}

export default Login;
