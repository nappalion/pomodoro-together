/*
Add the forms for creating a user account.
Name, Date of Birth, Email, Password, Username, Profile Picture

*/

import React, { useState, useRef, useEffect } from "react";

import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { auth } from "../firebaseConfig.js";
import { storage } from "../firebaseConfig.js";
import { uploadBytes } from "firebase/storage";

import { useNavigate } from "react-router-dom";

import TextInput from "../components/TextInput.js";
import Button from "../components/Button.js";
import IconButton from "../components/IconButton.js";

function ProfilePictureForm(props) {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const profileRef = storageRef(storage, auth.currentUser.uid);
    getDownloadURL(profileRef).then((url) => {
      setProfilePic(url);
    });
  }, []);

  const styles = {
    container: {
      width: 400,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    profile: {
      width: 90,
      height: 90,
      borderRadius: 360,
      boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      objectFit: "cover",
    },
  };

  function testUpload() {
    const profileRef = storageRef(storage, auth.currentUser.uid);
    console.log(storage);
    if (profilePic) {
      uploadBytes(profileRef, profilePic)
        .then((snapshot) => {
          console.log("Uploaded profile picture!");
          navigate("/timer");
        })
        .catch((error) => {
          console.log("Error uploading profile picture: " + error);
        });
    } else {
      console.log("No profile picture.");
    }
  }

  function handleFileChange(event) {
    setProfilePic(event.target.files[0]);
    console.log(profilePic);
  }

  return (
    <div style={styles.container}>
      <IconButton
        style={styles.profile}
        src={profilePic ? profilePic : require("../assets/default-profile.jpg")}
        onClick={() => fileInputRef.current.click()}
      />
      <TextInput
        type="file"
        inputRef={fileInputRef}
        inputProps={{
          accept: "image/*",
          onChange: handleFileChange,
        }}
      />
      <Button
        onClick={() => testUpload()}
        style={{ marginTop: 50 }}
        text="Upload"
      />
    </div>
  );
}

export default ProfilePictureForm;
