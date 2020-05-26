import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { OMNI_API_URL } from "react-native-dotenv";

function UserDetails({ route, navigation }) {
  const { authId } = route.params;
  return (
    <View style={styles.container}>
      <Text>{authId}</Text>
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
});

export default UserDetails;
