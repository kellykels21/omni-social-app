import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import VerticalLister from "../components/VerticalLister";

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
