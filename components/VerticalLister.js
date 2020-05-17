import * as React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import VenueItem from "./VenueItem";

function VerticalLister({ venues, navigation }) {
  return (
    <View>
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
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 24,
    padding: 10,
  },
});

export default VerticalLister;
