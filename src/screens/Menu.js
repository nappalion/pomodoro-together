/*
A menu component that displays buttons on the side of the screen (Groups, Create Group, Analytics, Account, Settings, Logout)
Also displays the user's name and profile picture.
*/

import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, database } from "../firebaseConfig.js";
import { storage } from "../firebaseConfig";
import { ref, get } from "firebase/database";
import { ref as storageRef, getDownloadURL } from "firebase/storage";

import GroupsIcon from "../assets/group-fill.svg";
import CreateGroupIcon from "../assets/user-add-fill.svg";
import AnalyticsIcon from "../assets/bar-chart-fill.svg";
import AccountIcon from "../assets/account-circle-fill.svg";
import SettingsIcon from "../assets/settings-fill.svg";
import LogoutIcon from "../assets/logout-box-line.svg";
import IconButton from "../components/IconButton";

function Menu(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileUrl, setProfileUrl] = useState(null);
  const [username, setUsername] = useState("...");

  const styles = {
    screen: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",

      zIndex: 9999,
      display: "flex",
    },
    menu: {
      flex: 2,
      minWidth: 230,
      backgroundColor: "white",
      boxShadow: "1px 2px 9px #2e2e2e",
      padding: 20,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    transparent: {
      flex: 5,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    profile: {
      width: 90,
      height: 90,
      borderRadius: 360,
      boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      objectFit: "cover",
    },
    username: {
      paddingTop: 10,
    },
  };

  useEffect(() => {
    const profileRef = storageRef(storage, auth.currentUser.uid);
    getDownloadURL(profileRef).then((url) => {
      setProfileUrl(url);
    });

    const usernameRef = ref(
      database,
      "/users/" + auth.currentUser.uid + "/username"
    );
    get(usernameRef).then((snapshot) => {
      setUsername(snapshot.val());
    });
  }, []);

  function logout() {
    try {
      auth.signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={styles.screen}>
      <div style={styles.menu}>
        <IconButton
          style={styles.profile}
          src={
            profileUrl ? profileUrl : require("../assets/default-profile.jpg")
          }
          onClick={() => navigate("/profile-picture-form")}
        />
        <span style={styles.username}>{username}</span>
        <Button
          color={location.pathname === "/groups" ? "#DADADA" : "white"}
          secondaryColor="#DADADA"
          fontColor="black"
          text="Groups"
          onClick={() => navigate("/groups")}
          icon={GroupsIcon}
        />
        <Button
          color={location.pathname === "/create-group" ? "#DADADA" : "white"}
          secondaryColor="#DADADA"
          fontColor="black"
          text="Create Group"
          onClick={() => navigate("/create-group")}
          icon={CreateGroupIcon}
        />
        <Button
          color={location.pathname === "/analytics" ? "#DADADA" : "white"}
          secondaryColor="#DADADA"
          fontColor="black"
          text="Analytics"
          onClick={() => navigate("/analytics")}
          icon={AnalyticsIcon}
        />
        {/* <Button
          color={location.pathname === "/account" ? "#DADADA" : "white"}
          secondaryColor="#DADADA"
          fontColor="black"
          text="Account"
          onClick={() => navigate("/account")}
          icon={AccountIcon}
        />
        <Button
          color={location.pathname === "/settings" ? "#DADADA" : "white"}
          secondaryColor="#DADADA"
          fontColor="black"
          text="Settings"
          onClick={() => navigate("/settings")}
          icon={SettingsIcon}
        /> */}
        <Button
          color="white"
          secondaryColor="#DADADA"
          fontColor="black"
          text="Logout"
          onClick={() => logout()}
          icon={LogoutIcon}
        />
      </div>
      <div style={styles.transparent} onClick={() => props.onExit()} />
    </div>
  );
}

export default Menu;
