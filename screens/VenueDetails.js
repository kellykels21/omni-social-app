import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import HorizontalLister from "../components/HorizontalLister";
import { GOOGLE_API_KEY, OMNI_API_URL } from "react-native-dotenv";
import axios from "axios";
import { createStore } from "redux";
import userState from "../store/reducers";
import { addPlaceId, removePlaceId } from "../store/actions";

const store = createStore(userState);

function VenueDetails({ route, navigation }) {
  const [userIsHere, setUserIsHere] = React.useState(false);

  React.useEffect(() => {
    if (store.getState().placeIdOfCurrentLocation == placeID) {
      setUserIsHere(true);
    }
  });

  async function updateUserlocation(placeID, authId) {
    try {
      const result = await axios({
        method: "put",
        headers: { "Content-Type": "application/json" },
        url: OMNI_API_URL + "/user/location",
        data: {
          authId,
          placeID,
        },
      });
      store.dispatch(addPlaceId(placeID));
      setUserIsHere(true);
      console.log("User Location Update Succesfully!");
    } catch (error) {
      console.log(error);
    }
  }

  const { placeID, photoReference, name } = route.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Right Now</Text>
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
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.hereContainer}>
        <TouchableOpacity
          onPress={async () =>
            await updateUserlocation(
              placeID,
              AsyncStorage.getItem("@UserAuthID")
            )
          }
        >
          <View style={styles.hereButtonContainer}>
            <Text style={styles.hereButtonText}>I'm Here</Text>
            {userIsHere && <Text style={styles.hereButtonText}>X</Text>}
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.HorizontalListContainer]}>
        <Text style={styles.text}>Friends There Now</Text>
        <HorizontalLister navigation={navigation} />
      </View>
      <View style={[styles.HorizontalListContainer]}>
        <Text style={styles.text}>Upcoming Events</Text>
        <HorizontalLister navigation={navigation} />
      </View>

      <View style={[styles.HorizontalListContainer]}>
        <Text style={styles.text}>Venue Details</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#100D38",
    paddingTop: 80,
  },
  HorizontalListContainer: {
    paddingTop: 30,
    width: "100%",
  },
  venueImage: {
    width: "100%",
    height: 225,
    borderRadius: 20,
    borderColor: "#8B60F0",
    borderWidth: 3,
  },
  text: {
    color: "white",
    fontSize: 24,
    marginLeft: 15,
  },
  title: {
    color: "white",
    fontSize: 18,
  },
  textContainer: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  textContainer: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  titleContainer: {
    paddingBottom: 20,
    alignItems: "center",
  },
  imageContainer: {
    padding: 10,
  },
  hereContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  hereButtonText: {
    color: "white",
    fontSize: 18,
  },
  hereButtonContainer: {
    backgroundColor: "#342CFB",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 5,
  },
});

export default VenueDetails;
