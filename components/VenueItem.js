import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { GOOGLE_API_KEY } from "react-native-dotenv";

function VenueItem({
  placeID,
  name,
  rsvps,
  numOfPeopleWaiting,
  status,
  imageUrl,
  photoReference,
  navigation,
}) {
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyModal", {
              placeID: placeID,
            })
          }
        >
          <View style={styles.row}>
            <View style={styles.dataContainer}>
              <Text style={styles.text}>People There</Text>
              <Text style={styles.text}>Hotness</Text>
              <Text style={styles.text}>Wait Time</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri:
                    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
                    photoReference +
                    "&key=" +
                    GOOGLE_API_KEY,
                }}
                style={styles.venueImage}
              />
              <Text style={styles.text}>{name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 10,
  },
  imageContainer: {
    flex: 3,
    alignItems: "center",
    margin: 10,
  },
  dataContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    margin: 40,
    marginRight: 5,
  },
  row: {
    flexDirection: "row",
  },
  venueImage: {
    width: "100%",
    height: 150,
    borderRadius: 20,
    borderColor: "#8B60F0",
    borderWidth: 3,
  },
  text: {
    color: "white",
  },
});

export default VenueItem;
