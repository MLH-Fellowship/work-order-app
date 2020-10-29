import React, { memo } from "react";
import { ActivityIndicator } from "react-native";
import firebase from "../core/config";
import Background from "../components/Background";
import { theme } from "../core/theme";

const AuthLoadingScreen = ({ navigation }) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is logged in
      navigation.navigate("Map");
    } else {
      // User is not logged in
      navigation.navigate("Login");
    }
  });

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
};

export default memo(AuthLoadingScreen);
