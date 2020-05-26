import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

function FriendListItem({ name, authId, navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("UserDetails", {
            authId,
          })
        }
      >
        <View style={styles.item}>
          <View style={styles.profilePic}>
            <Image
              style={styles.circle}
              source={require("../img/profile_placeholder.jpg")}
            />
          </View>
          <View style={styles.profileName}>
            <Text style={{ color: "white", marginTop: 5 }}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    borderRadius: 100,
    height: 60,
    width: 60,
    borderColor: "#7DDBC3",
    borderWidth: 3,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 20,
    marginRight: 20,
  },
  profilePic: {
    flex: 1,
  },
  profileName: {
    flex: 2,
    justifyContent: "center",
  },
});

export default FriendListItem;
