import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Friends() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No friends here yet!</Text>
      <Text style={styles.text}>Add some!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#100D38",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "white",
  },
});

export default Friends;
