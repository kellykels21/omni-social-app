import * as React from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import axios from "axios";
import { AsyncStorage } from "react-native";

function AppleSignInButton({ navigation }) {
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
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={{ width: 200, height: 44 }}
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });
          // signed in
          console.log(credential);
          saveNewUser(
            credential.fullName.givenName,
            credential.email,
            credential.identityToken
          );
        } catch (e) {
          if (e.code === "ERR_CANCELED") {
            // handle that the user canceled the sign-in flow
          } else {
            // handle other errors
          }
        }
      }}
    />
  );
}

export default AppleSignInButton;
