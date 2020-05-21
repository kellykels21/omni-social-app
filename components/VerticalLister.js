import * as React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import VenueItem from "./VenueItem";

function VerticalLister({ venues, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>What's Going on Now</Text>
      <FlatList
        data={venues.data}
        renderItem={({ item }) => (
          <VenueItem
            placeID={item.placeId}
            name={item.name}
            rsvps={item.rsvps}
            status={item.status}
            photoReference={item.photoReference}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.placeId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    margin: 10,
  },
  text: {
    color: "white",
    fontSize: 24,
  },
});

export default VerticalLister;
