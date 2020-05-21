import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { color } from "react-native-reanimated";

function FriendItem({ _id, imageUrl, navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.item}>
          <Image
            style={styles.circle}
            source={require("../img/profile_placeholder.jpg")}
          />
          <Text style={{ color: "white", marginTop: 5 }}>Friend</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  circle: {
    borderRadius: 100,
    height: 70,
    width: 70,
    borderColor: "#7DDBC3",
    borderWidth: 3,
  },
  item: {
    alignItems: "center",
    paddingTop: 10,
    marginRight: 20,
  },
});

export default FriendItem;
