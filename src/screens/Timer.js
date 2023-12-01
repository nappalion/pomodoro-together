import React, { useEffect, useState } from "react";

import { database } from "../firebaseConfig.js";
import { ref, onValue } from "firebase/database";

import { auth } from "../firebaseConfig.js";

import TimerGroup from "../components/TimerGroup";
import UserTimer from "../components/UserTimer";

import Layout from "../components/Layout";

function Timer() {
  const userId = auth.currentUser.uid;

  const [currGroup, setCurrGroup] = useState("");
  const [currGroupUsers, setCurrGroupUsers] = useState();

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

  const styles = {
    screen: {
      height: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "hidden",
    },
    leftSide: {
      flex: 2,
      display: "flex",
      alignItems: "center",
    },
    rightSide: {
      width: "100%",
      flex: 1,
    },
    container: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: width > height ? "row" : "column",
    },
  };

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  useEffect(() => {
    const userRef = ref(database, "users/" + userId + "/currGroup");
    onValue(userRef, (snapshot) => {
      const currentGroup = snapshot.val();
      setCurrGroup(currentGroup);

      const currGroupUsersRef = ref(
        database,
        "groups/" + currentGroup + "/users"
      );
      onValue(currGroupUsersRef, (snapshot) => {
        const users = snapshot.val();
        let updatedUsers = {};

        // Store all asynchronous functions for fetching user data
        const userDetailsPromises = [];

        for (let userKey in users) {
          if (userKey !== userId) {
            updatedUsers[userKey] = users[userKey];

            const currUserRef = ref(database, "users/" + userKey);

            // Create a promise for async function
            const userDetailPromise = new Promise((resolve) => {
              onValue(currUserRef, (snapshot) => {
                const user = snapshot.val();
                const userDetails = {
                  username: user.username,
                  hoursFocused:
                    user.focusTime && user.focusTime[getCurrentDate()]
                      ? user.focusTime[getCurrentDate()]
                      : 0,
                };
                updatedUsers[userKey] = {
                  ...updatedUsers[userKey],
                  ...userDetails,
                };

                // If the async function is done, then we use resolve() to say this promise done
                resolve();
              });
            });

            // Push the async function into the list
            userDetailsPromises.push(userDetailPromise);
          }
        }

        // If all the promises resolve, then we update state variables (to rerender UI)
        Promise.all(userDetailsPromises).then(() => {
          setCurrGroupUsers(updatedUsers);
        });
      });
    });
  }, []);

  return (
    <Layout style={styles.screen}>
      <div style={styles.container}>
        {
          <div style={styles.leftSide}>
            {currGroup !== -1 && <UserTimer currGroup={currGroup} />}
            {currGroup === -1 && (
              <span style={{ width: "100%", color: "black", padding: 100 }}>
                Join a group using the "Groups" tab in the left menu.
              </span>
            )}
          </div>
        }

        {
          <div style={styles.rightSide}>
            <TimerGroup currGroup={currGroup} users={currGroupUsers} />
          </div>
        }
      </div>
    </Layout>
  );
}

export default Timer;
