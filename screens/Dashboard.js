import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, processColor } from "react-native";
import VerticalLister from "../components/VerticalLister";
import HorizontalLister from "../components/HorizontalLister";
import * as Location from "expo-location";
import { GOOGLE_API_KEY } from "react-native-dotenv";
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
          url: "http://10.0.0.118:3000/venue/new",
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
        "http://10.0.0.118:3000/venue/local?lat=" +
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
        <HorizontalLister navigation={navigation} />
      </View>

      <View style={[styles.VerticalListContainer, { flex: 6 }]}>
        <VerticalLister venues={venues} navigation={navigation} />
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
    marginTop: 20,
  },
  HorizontalListContainer: {
    width: "100%",
    marginTop: 50,
  },
});

export default Dashboard;
