import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { OMNI_API_URL } from "react-native-dotenv";
import axios from "axios";

import FriendStoryIcon from "../components/FriendStoryIcon";

function UserDetails({ route, navigation }) {
  const { authId } = route.params;
  const [userDetails, setUserDetails] = useState({});
  const [venueName, setVenueName] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const getUserDetails = async () => {
        try {
          const results = await axios({
            method: "get",
            headers: { "Content-Type": "application/json" },
            url: OMNI_API_URL + "/user/search/authId?authId=" + authId,
          });

          await setUserDetails(results.data);
        } catch (err) {
          throw err;
        }
      };

      getUserDetails();

      return () => {
        isActive = false;
      };
    }, [authId])
  );

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const getVenueName = async () => {
        try {
          const results = await axios({
            method: "get",
            headers: { "Content-Type": "application/json" },
            url:
              OMNI_API_URL +
              "/venue/search/placeId?placeId=" +
              userDetails.placeIdOfCurrentLocation,
          });

          await setVenueName(results.data.name);
        } catch (err) {
          throw err;
        }
      };

      getVenueName();

      return () => {
        isActive = false;
      };
    }, [userDetails])
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileTitleRow}>
        <View style={styles.askButton}>
          <TouchableOpacity>
            <Text style={styles.text}>Ask</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.userInfoContainer}>
          <Text style={[styles.text, styles.name]}>{userDetails.name}</Text>
          <View style={styles.item}>
            <Image
              style={styles.circle}
              source={require("../img/profile_placeholder.jpg")}
            />

            {venueName != null && (
              <View style={styles.userInfoContainer}>
                <Text style={{ color: "white", marginTop: 15 }}>
                  Currently at:
                </Text>
                <Text style={{ color: "white", marginTop: 5 }}>
                  {venueName}
                </Text>
              </View>
            )}

            {venueName == null && (
              <View style={styles.userInfoContainer}>
                <Text style={{ color: "white", marginTop: 15 }}>
                  Not Currently Partying
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.friendsButton}>
          <TouchableOpacity
            onPress={() => {
              addFriend();
            }}
          >
            <Text style={styles.text}>Add Friend</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.currentLocationRow}>
        <Text style={styles.text}>Current Location</Text>
      </View>

      <View style={styles.mutualFriendsRow}>
        <Text style={styles.text}>Mutual Friends</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#100D38",
  },
  profileTitleRow: {
    flex: 1,
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "center",
    paddingTop: 10,
    paddingRight: 15,
  },
  currentLocationRow: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "blue",
  },
  mutualFriendsRow: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "pink",
  },
  askButton: {
    flex: 1,
    alignItems: "center",
  },
  friendsButton: {
    flex: 1,
    alignItems: "center",
  },
  userInfoContainer: {
    flex: 3,
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  name: {
    fontSize: 18,
  },
  item: {
    alignItems: "center",
    paddingTop: 20,
  },
  circle: {
    borderRadius: 100,
    height: 90,
    width: 90,
    borderColor: "#7DDBC3",
    borderWidth: 3,
  },
});

export default UserDetails;
