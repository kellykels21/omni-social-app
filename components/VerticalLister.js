import * as React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import VenueItem from "./VenueItem";

function VerticalLister({ data, navigation }) {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <VenueItem
            placeID={item.placeID}
            name={item.name}
            rsvps={item.rsvps}
            numOfPeopleWaiting={item.numOfPeopleWaiting}
            status={item.status}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.placeID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default VerticalLister;
