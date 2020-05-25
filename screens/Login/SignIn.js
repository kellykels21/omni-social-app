import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  Alert,
} from "react-native";
import { FB_API_ID } from "react-native-dotenv";
import { GOOGLE_IOS_CLIENT_ID } from "react-native-dotenv";
import { GOOGLE_ANDROID_CLIENT_ID } from "react-native-dotenv";
import axios from "axios";
import { AsyncStorage } from "react-native";

import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

import AppleSignInButton from "../../components/AppleSignInButton";

function SignIn({ navigation }) {
  async function facebookLogin() {
    try {
      await Facebook.initializeAsync(FB_API_ID);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        const userData = await response.json();

        saveNewUser(userData.name, null, userData.id);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  async function googleLogin() {
    const { type, accessToken, user } = await Google.logInAsync({
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    });

    if (type === "success") {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
      console.log(user);
      await saveNewUser(user.name, user.email, user.id);
    }
  }

  async function saveNewUser(name, email, authId) {
    var userData = JSON.stringify({
      name,
      email,
      authId,
    });

    try {
      await axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: OMNI_API_URL + "/user/new",
        data: userData,
      });
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("@UserAuthID", authId);
    } catch (error) {
      // Error saving data
      throw error;
    }

    navigation.navigate("Tabs", { screen: "Home" });
  }

  useEffect(() => {
    AsyncStorage.getItem("@UserAuthID", (err, result) => {
      navigation.navigate("Tabs", { screen: "Home" });
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.omni_logo}
          source={require("../../img/omni_logo.png")}
        />
      </View>
      <TouchableHighlight
        style={styles.button}
        onPress={async () => await facebookLogin()}
      >
        <View style={styles.ButtonTextContainer}>
          <Text style={styles.text}> Facebook </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={async () => await googleLogin()}
      >
        <View style={styles.ButtonTextContainer}>
          <Text style={styles.text}> Google </Text>
        </View>
      </TouchableHighlight>
      <AppleSignInButton navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#8B60F0",
  },
  button: {
    backgroundColor: "black",
    opacity: 0.6,
    height: 60,
    width: 200,
    marginBottom: 50,
  },
  ButtonTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    paddingTop: 100,
    marginBottom: 200,
  },
  text: {
    color: "white",
  },
  omni_logo: {
    width: 200,
    height: 100,
  },
});

export default SignIn;
