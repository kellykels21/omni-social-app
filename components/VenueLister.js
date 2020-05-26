import * as React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import VenueItem from "./VenueItem";

function VenueLister({ venues, navigation }) {
  return (
    <View style={styles.container}>
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
    marginLeft: 10,
  },
});

export default VenueLister;
