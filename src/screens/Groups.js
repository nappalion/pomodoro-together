/*
Display the groups available for a user
Shows the user's groups (joined and created)
Shows a 'Discover' tab to show currently running (and popular) groups
Has a search Bar at the top to search for groups --> Pressing enter takes you to GroupSearchResults.js screen

*/

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

import Table from "../components/Table";

import { database } from "../firebaseConfig.js";
import { auth } from "../firebaseConfig.js";
import { ref, onValue } from "firebase/database";

import TextInput from "../components/TextInput";
import { useNavigate } from "react-router-dom";

import SearchIcon from "../assets/search-line.svg";

function Groups(props) {
  const navigate = useNavigate();

  const [myGroupsData, setMyGroupsData] = useState([]);
  const [discoverData, setDiscoverData] = useState([]);

  const styles = {
    screen: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      padding: 30,
    },
    main: {
      padding: 30,
    },
    searchInput: {
      width: "95%",
    },
    search: {
      alignItems: "center",
    },
  };

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const groupsRef = ref(database, "groups/");
    onValue(groupsRef, (snapshot) => {
      const groups = snapshot.val();
      let myGroups = [];
      let discoverGroups = [];
      for (let groupKey in groups) {
        const group = groups[groupKey];
        group.groupKey = groupKey;
        console.log(group);
        if (group.users && userId in group.users && group != -1) {
          myGroups.push(group);
        } else if (group.users && !(userId in group.users) && group != -1) {
          discoverGroups.push(group);
        }
      }
      setMyGroupsData(myGroups);
      setDiscoverData(discoverGroups);
    });
  }, []);

  function handleSearch(event) {
    const searchValue = event.target.value.toLowerCase().replace(/\s/g, "");
    const filteredGroupData = [];

    for (let i = 0; i < myGroupsData.length; i++) {
      const group = myGroupsData[i];
      const groupName = group.name.toLowerCase().replace(/\s/g, "");
      if (groupName.includes(searchValue)) {
        filteredGroupData.push(group);
      }
    }

    for (let i = 0; i < discoverData.length; i++) {
      const group = discoverData[i];
      const groupName = group.name.toLowerCase().replace(/\s/g, "");
      if (groupName.includes(searchValue)) {
        filteredGroupData.push(group);
      }
    }

    console.log("Filtered Group Data: " + filteredGroupData);

    navigate("/group-search-results", {
      state: { search: event.target.value, groupData: filteredGroupData },
    });
  }

  return (
    <Layout header="Groups Screen" style={styles.screen}>
      <div style={{ ...styles.screen, ...styles.main }}>
        <TextInput
          icon={SearchIcon}
          inputStyle={styles.searchInput}
          style={styles.search}
          placeholder={"Search"}
          onSubmit={handleSearch}
        />
        <Table
          style={styles.container}
          headerText="My Groups"
          data={myGroupsData}
        />
        <Table
          style={styles.container}
          headerText="Discover"
          data={discoverData}
          noIcons={true}
        />
      </div>
    </Layout>
  );
}

export default Groups;
