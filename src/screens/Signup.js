/*
Add the forms for creating a user account.
Name, Date of Birth, Email, Password, Username, Profile Picture

*/

import React, { useState } from "react";

import { database } from "../firebaseConfig.js";
import { ref, set } from "firebase/database";
import { auth } from "../firebaseConfig.js";
import { createUserWithEmailAndPassword } from "@firebase/auth";

import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput.js";
import Button from "../components/Button.js";

function Signup(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginText, setLoginText] = useState("");

  const styles = {
    container: {
      width: 400,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  };

  function handleChangeEmail(event) {
    setLoginText("");
    setEmail(event.target.value);
  }

  function handleChangeUsername(event) {
    setLoginText("");
    setUsername(event.target.value);
  }

  function handleChangePassword(event) {
    setLoginText("");
    setPassword(event.target.value);
  }

  function createUser(email, password, username) {
    setLoginText("");
    if (email !== "" && password !== "" && username !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const userID = userCredential.user.uid;
          // Signed in
          set(ref(database, `users/${userID}`), {
            currGroup: -1,
            username: username.toString(),
          });
          navigate("/profile-picture-form");
        })
        .catch((error) => {
          const errorCode = error.code.toString();
          setLoginText(errorCode);
        });
    } else {
      setLoginText("Invalid credentials.");
    }
  }

  return (
    <div style={styles.container}>
      <text style={{ color: "#1C1C1C", fontSize: 13, marginTop: 5 }}>
        {loginText}
      </text>
      <TextInput
        label="Username"
        placeholder="Please enter a username..."
        value={username}
        onChangeText={handleChangeUsername}
      />
      <TextInput
        label="Email"
        placeholder="Please enter a email..."
        value={email}
        onChangeText={handleChangeEmail}
      />
      <TextInput
        label="Password"
        placeholder="Please enter a password..."
        value={password}
        onChangeText={handleChangePassword}
      />
      <Button
        onClick={() => createUser(email, password, username)}
        style={{ marginTop: 50 }}
        text="Sign Up"
      />
    </div>
  );
}

export default Signup;
