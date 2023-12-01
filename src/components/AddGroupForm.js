import React, { useState } from "react";

import { database } from "../firebaseConfig.js";
import { ref, set, push } from "firebase/database";
import { auth } from "../firebaseConfig.js";
import { useNavigate } from "react-router-dom";
import TextInput from "./TextInput.js";
import Button from "./Button.js";

const styles = {
  container: {
    width: "50%",
  },
  invalidText: {
    color: "#1C1C1C",
    fontSize: 13,
    marginTop: 5,
  },
  button: {
    marginTop: 50,
  },
};

const AddGroupForm = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [invalidText, setInvalidText] = useState("");

  function handleChangeGroupName(event) {
    setInvalidText("");
    setGroupName(event.target.value);
  }

  function handleChangeCapacity(event) {
    setInvalidText("");
    setCapacity(event.target.value);
  }

  function handleSubmit(groupName, capacity) {
    if (groupName !== "" && capacity !== "") {
      const newGroupRef = push(ref(database, "groups"));
      const newGroupId = newGroupRef.key;

      set(ref(database, "groups/" + newGroupId + "/name"), groupName);
      set(ref(database, "groups/" + newGroupId + "/roomCapacity"), capacity);
      set(
        ref(
          database,
          "groups/" + newGroupId + "/users/" + auth.currentUser.uid
        ),
        { isRunning: false, timer: 60 }
      );
      navigate("/groups");
    } else {
      setInvalidText("Invalid values.");
    }
  }

  return (
    <div style={styles.container}>
      <span style={styles.invalidText}>{invalidText}</span>

      <TextInput
        name="groupname"
        label="Group Name"
        placeholder="Please enter a group name..."
        value={groupName}
        onChangeText={handleChangeGroupName}
      />
      <TextInput
        name="roomcapacity"
        label="Room Capacity"
        placeholder="Please enter a room capacity..."
        value={capacity}
        onChangeText={handleChangeCapacity}
      />

      <Button
        text="Add Group"
        style={styles.button}
        onClick={() => handleSubmit(groupName, capacity)}
      />
    </div>
  );
};

export default AddGroupForm;
