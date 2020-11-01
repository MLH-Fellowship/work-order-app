import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { logoutUser } from "../api/auth-api";
import Button from "../components/Button";
import Background from "../components/Background";



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    backgroundColor: "#2BD1FB",
  },
  map: {
    flex: 1,
  },
});

const Settings = () => {
  return (
    <Background>
      <Button mode="contained" onPress={logoutUser}>
        Logout
      </Button>
    </Background>
  );
};

export default Settings;