/*
Create group of timers for each group session.
This is where you can see other users' timers.
Should have the group name at the top and then display a grid view of multiple "UserTimer" components.
*/

import React, { useState, useEffect } from "react";
import OtherTimer from "./OtherTimer";
import TextInput from "./TextInput";
import { auth } from "../firebaseConfig.js";
import { database } from "../firebaseConfig.js";
import { ref, onValue } from "firebase/database";

import SearchIcon from "../assets/search-line.svg";

function TimerGroup(props) {
  const { users, currGroup } = props;
  const [currGroupName, setCurrGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const userCurrGroupRef = ref(database, "users/" + userId + "/currGroup");

    onValue(userCurrGroupRef, (snapshot) => {
      const currentGroup = snapshot.val();
      const currGroupNameRef = ref(
        database,
        "groups/" + currentGroup + "/name"
      );
      onValue(currGroupNameRef, (snapshot) => {
        const currentGroupName = snapshot.val();
        setCurrGroupName(currentGroupName);
      });
    });
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const styles = {
    container: {
      height: "100vh",
      borderRadius: 16,
      backgroundColor: "#9EB3C2",
    },
    header: {
      backgroundColor: "#21295C",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 35,
      paddingBottom: 35,
    },
    search: {
      alignItems: "center",
    },
    titleText: {
      fontSize: 22,
      color: "white",
      paddingLeft: 20,
      paddingBottom: 10,
    },
    timerGroup: {
      width: "100%",
      maxHeight: width > height ? "calc(100vh - 100px)" : width / 2,
      overflowY: "scroll",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gridAutoFlow: "dense",
      gap: 10,
      backgroundColor: "#9EB3C2",
    },
  };

  function handleSearch(event) {
    setSearch(event.target.value);
    const searchValue = event.target.value.toLowerCase();
    const filtered = {};

    if (search === "") {
      setFilteredUsers(users);
    } else {
      Object.keys(users).forEach((key) => {
        const user = users[key];
        if (user.username.toLowerCase().includes(searchValue)) {
          filtered[key] = user;
        }
      });
      setFilteredUsers(filtered);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {currGroupName ? (
          <span style={styles.titleText}>
            {users ? Object.keys(users).length : 0} Others in
            {currGroupName != "" ? " " + currGroupName : " N/A"}
          </span>
        ) : (
          <span style={styles.titleText}>
            Join a group to focus with others.
          </span>
        )}

        <TextInput
          icon={SearchIcon}
          style={styles.search}
          placeholder={"Search"}
          value={search}
          onChangeText={handleSearch}
        />
      </div>
      <div style={styles.timerGroup}>
        {filteredUsers &&
          users &&
          Object.keys(filteredUsers ? filteredUsers : users).map((userKey) => (
            <OtherTimer
              key={userKey}
              userId={userKey}
              currGroup={currGroup}
              username={users[userKey].username}
              time={users[userKey].timer}
              hoursToday={users[userKey].hoursFocused}
            />
          ))}
      </div>
    </div>
  );
}

export default TimerGroup;
