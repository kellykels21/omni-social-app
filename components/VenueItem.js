import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function VenueItem({
  placeID,
  name,
  rsvps,
  numOfPeopleWaiting,
  status,
  navigation,
}) {
  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyModal", {
              placeID: placeID,
            })
          }
          style={{ backgroundColor: "yellow", height: 100 }}
        >
          <Text style={styles.title}>{placeID}</Text>
          <Text style={styles.title}>{name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default VenueItem;
