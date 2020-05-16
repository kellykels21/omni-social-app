import * as React from "react";
import { View, Text, Button } from "react-native";

function ModalScreen({ route, navigation }) {
  const { placeID } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>Place ID: {placeID}</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

export default ModalScreen;
