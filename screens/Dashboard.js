import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, processColor } from "react-native";
import VerticalLister from "../components/VerticalLister";
import * as Location from "expo-location";
import { GOOGLE_API_KEY } from "react-native-dotenv";

const DATA = [
  {
    placeID: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "Venue 1",
    rsvps: ["userid_1", "userid_2", "userid_3"],
    numOfPeopleWaiting: ["userid_1", "userid_2", "userid_3"],
    status: 1,
    imageUrl: "",
  },
  {
    placeID: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Venue 2",
    rsvps: ["userid_1", "userid_2", "userid_3"],
    numOfPeopleWaiting: ["userid_1", "userid_2", "userid_3"],
    status: 1,
    imageUrl: "",
  },
  {
    placeID: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "Venue 12",
    rsvps: ["userid_1", "userid_2", "userid_3"],
    numOfPeopleWaiting: ["userid_1", "userid_2", "userid_3"],
    status: 1,
    imageUrl: "",
  },
  {
    placeID: "58694a0f-3da1-471f-bd96-145571e29d71",
    name: "Venue 3",
    rsvps: ["userid_1", "userid_2", "userid_3"],
    numOfPeopleWaiting: ["userid_1", "userid_2", "userid_3"],
    status: 1,
    imageUrl: "",
  },
];

function Dashboard({ navigation }) {
  const [venues, setVenues] = useState([]);

  async function fetchLocalVenues() {
    //LOCATION PERMISSIONS
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);

    //GOOGLE API REQUEST
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        location.coords.latitude +
        "," +
        location.coords.longitude +
        "&type=bar&key=" +
        GOOGLE_API_KEY +
        "&keyword=bar&radius=3000&opennow=true",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    fetchLocalVenues();
  });

  return (
    <View style={styles.container}>
      <View style={[styles.ListContainer, { flex: 1, backgroundColor: "red" }]}>
        <Text>Friends</Text>
      </View>

      <View
        style={[styles.ListContainer, { flex: 6, backgroundColor: "blue" }]}
      >
        <Text>Places</Text>
        <VerticalLister data={DATA} navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ListContainer: {
    width: "100%",
  },
});

export default Dashboard;
