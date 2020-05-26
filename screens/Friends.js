import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import axios from "axios";
import { OMNI_API_URL } from "react-native-dotenv";
import FriendsVerticalLister from "../components/FriendsVerticalLister";

function Friends({ navigation }) {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);

  async function searchUsers() {
    try {
      const results = await axios({
        method: "get",
        headers: { "Content-Type": "application/json" },
        url: OMNI_API_URL + "/user/search?name=" + searchValue,
      });

      await setUsers(results.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Type Here..."
          value={searchValue}
          onChangeText={(text) => {
            setSearchValue(text);
            searchUsers();
          }}
        />
      </View>

      {searchValue != "" && (
        <View style={styles.friendsListContainer}>
          <FriendsVerticalLister users={users} navigation={navigation} />
        </View>
      )}

      {searchValue == "" && (
        <View style={styles.noFriendsContainer}>
          <Text style={styles.text}>No friends here yet!</Text>
          <Text style={styles.text}>Add some!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#100D38",
    paddingTop: 55,
    padding: 15,
  },
  searchContainer: {
    flex: 2,
  },
  noFriendsContainer: {
    flex: 5,
    alignItems: "center",
  },
  friendsListContainer: {
    flex: 16,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },

  text: {
    fontSize: 24,
    color: "white",
  },
  searchBar: {},
});

export default Friends;
