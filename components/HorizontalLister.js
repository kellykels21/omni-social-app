import * as React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import FriendItem from "./FriendItem";

const DATA = [
  {
    _id: "1",
    imageUrl: "someURL",
  },
  {
    _id: "2",
    imageUrl: "someURL",
  },
  {
    _id: "3",
    imageUrl: "someURL",
  },
  {
    _id: "4",
    imageUrl: "someURL",
  },
  {
    _id: "5",
    imageUrl: "someURL",
  },
  {
    _id: "6",
    imageUrl: "someURL",
  },
  {
    _id: "7",
    imageUrl: "someURL",
  },
  {
    _id: "8",
    imageUrl: "someURL",
  },
];

function HorizontalLister({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Friends</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <FriendItem _id={item._id} imageUrl={item.imageUrl} />
        )}
        keyExtractor={(item) => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  text: {
    color: "white",
    fontSize: 24,
  },
});

export default HorizontalLister;
