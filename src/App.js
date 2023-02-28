import React, { useState } from 'react';
import './App.css';
import clock from "./clock.png"

import { database } from "./firebaseConfig.js"
import { ref, child, get, set} from "firebase/database";

function changeValue() {

}



function App() {

  const [hours, setHours] = useState(0);
  const [currUser, setCurrUser] = useState("")
  const [username, setUsername] = useState("")

  function createUser(username) {
    if (username != "") {
      console.log('hello')
      set(ref(database, `users/${username}`), 0);
      setCurrUser(username);
    }
  }

  function login(username) {
    console.log("Checking if " + username.toString() + " exists.")
    if (username != "") {
      return get(child(ref(database), `users/${username}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log("User exists.");
          setCurrUser(username)
          console.log("Set user: " + currUser)
          setHours(snapshot.val())
          return true;
        } else {
          console.log("User does not exist. Creating one...");
          createUser(username);
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


  function logout() {
    setHours(0);
    setUsername("");
    setCurrUser("");
  }

  function handleChangeUsername(event) {
    setUsername(event.target.value);
  }

  function changeHours(change) {
    console.log(currUser)
    if (currUser != "") {
      console.log('hello')
      set(ref(database, 'users/' + currUser), hours + change);
      setHours(hours + change)
      
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <text style={{fontSize: 20}}>username:</text>
        <input type="text" value={username} onChange={handleChangeUsername} />
        <button onClick={() => login(username)}>Log In</button>
        <button onClick={() => logout()}>Log Out</button>
        <h1>Welcome to Pomodoro Together!</h1>
        <img src={clock} alt="Clock" style={{width: 200}}></img>
        
        <button onClick={() => changeHours(1)}>Increase Hours Studied</button>
        <h2>Hours Studied: {hours}</h2>
        <button onClick={() => changeHours(-1)}>Decrease Hours Studied</button>
      </header>
    </div>
  );
}

export default App;