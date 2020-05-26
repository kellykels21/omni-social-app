import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, processColor } from "react-native";
import VenueLister from "../components/VenueLister";
import FriendsHorizontalLister from "../components/FriendsHorizontalLister";
import * as Location from "expo-location";
import { GOOGLE_API_KEY, OMNI_API_URL } from "react-native-dotenv";
import axios from "axios";
import { AsyncStorage } from "react-native";

function Dashboard({ navigation }) {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function saveVenue(venue) {
      var venueData = JSON.stringify({
        name: venue.name,
        placeId: venue.place_id,
        location: {
          type: "Point",
          coordinates: [
            venue.geometry.location.lng,
            venue.geometry.location.lat,
          ],
        },
        photoReference: venue.photos ? venue.photos[0].photo_reference : null,
      });

      try {
        await axios({
          method: "post",
          headers: { "Content-Type": "application/json" },
          url: OMNI_API_URL + "/venue/new",
          data: venueData,
        });
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchLocalVenues() {
      //LOCATION PERMISSIONS
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const radius = 8000;

      const results = await axios.get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
          location.coords.latitude +
          "," +
          location.coords.longitude +
          "&type=bar&key=" +
          GOOGLE_API_KEY +
          "&keyword=bar&radius=" +
          radius +
          " &opennow=true"
      );

      return results.data;
    }

    async function getLocalOmniVenues() {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});

      const data = await axios.get(
        OMNI_API_URL +
          "/venue/local?lat=" +
          location.coords.latitude +
          "&long=" +
          location.coords.longitude
      );

      await setVenues(data);
    }

    async function loadDashboardData() {
      const localVenues = await fetchLocalVenues();

      for (const venue of localVenues.results) {
        await saveVenue(venue);
      }

      console.log("Saved All Venues Successfully");

      await getLocalOmniVenues();
    }

    loadDashboardData();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("@UserAuthID", (err, result) => {
      console.log("AUTH ID: " + result);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.HorizontalListContainer, { flex: 1 }]}>
        <Text style={styles.text}>Friends</Text>
        <FriendsHorizontalLister navigation={navigation} />
      </View>

      <View style={[styles.VerticalListContainer, { flex: 6 }]}>
        <Text style={styles.text}>What's Going on Now</Text>
        <VenueLister
          style={styles.VerticalList}
          venues={venues}
          navigation={navigation}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#100D38",
  },
  VerticalListContainer: {
    width: "100%",
    marginTop: 50,
  },
  HorizontalListContainer: {
    width: "100%",
    marginTop: 50,
  },
  text: {
    color: "white",
    fontSize: 24,
    marginLeft: 15,
  },
});

export default Dashboard;
