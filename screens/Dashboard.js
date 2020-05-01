import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import VerticalLister from "../components/VerticalLister";

const width = Dimensions.get("window").width;

function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={[styles.ListContainer, { flex: 1, backgroundColor: "red" }]}>
        <Text>Friends</Text>
      </View>

      <View
        style={[styles.ListContainer, { flex: 6, backgroundColor: "blue" }]}
      >
        <Text>Places</Text>
        <VerticalLister />
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
