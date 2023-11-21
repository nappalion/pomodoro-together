/*
This is the place to create a table to hold rows

*/

import React from "react";
import GroupSettingsIcon from "../assets/settings-fill.svg";
import RemoveGroupIcon from "../assets/delete-bin-fill.svg";
import { useNavigate } from "react-router-dom";

import { database } from "../firebaseConfig.js";
import { auth } from "../firebaseConfig.js";
import { ref, set, remove } from "firebase/database";
import TableRow from "./TableRow";
import IconButton from "./IconButton";

function Table(props) {
  const navigate = useNavigate();

  const { style, data, headerText, noIcons } = props;

  const styles = {
    categoryText: {
      color: "black",
      textAlign: "start",
      fontSize: 20,
      paddingBottom: 15,
    },
    icon: {
      height: "100%",
      width: 25,
    },
    header: {
      backgroundColor: "#E2EFF8",
      color: "black",
      flex: 1,
      textAlign: "left",
      fontSize: 20,
    },
    table: {
      borderCollapse: "collapse",
    },
  };

  // data.map((item, index) => {
  //   console.log(item);
  // });

  function handleRowClick(groupId) {
    const currUserId = auth.currentUser.uid;
    set(ref(database, "users/" + currUserId + "/currGroup/"), groupId);
    navigate("/timer");
  }

  function handleDeleteItem(groupId) {
    const groupRef = ref(database, "groups/" + groupId);
    remove(groupRef)
      .then(() => {
        console.log("Item deleted successfully.");
      })
      .catch((error) => {
        console.log("Error deleting item:", error);
      });
  }

  return (
    <div style={style}>
      <span style={styles.categoryText}>{headerText}</span>
      <table style={styles.table}>
        <thead style={styles.header}>
          <tr>
            <th>Name</th>
            <th>Users</th>
            {/*empty columns for buttons*/}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <TableRow key={index}>
                <td onClick={() => handleRowClick(item.groupKey)}>
                  {item.name}
                </td>
                <td onClick={() => handleRowClick(item.groupKey)}>
                  {Object.keys(item.users).length} / {item.roomCapacity}
                </td>
                <td style={{ display: "flex", alignItems: "center" }}>
                  {false && (
                    <IconButton
                      style={styles.icon}
                      src={GroupSettingsIcon}
                      onClick={() => navigate("/group-settings")}
                    />
                  )}
                </td>
                <td>
                  {!noIcons && (
                    <IconButton
                      style={styles.icon}
                      src={RemoveGroupIcon}
                      onClick={() => handleDeleteItem(item.groupKey)}
                    />
                  )}
                </td>
              </TableRow>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
