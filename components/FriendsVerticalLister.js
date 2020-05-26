import * as React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import FriendListItem from "./FriendListItem";

function FriendsVerticalLister({ users, navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <FriendListItem
            name={item.name}
            authId={item.authId}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default FriendsVerticalLister;
