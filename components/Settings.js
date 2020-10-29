import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { logoutUser } from "../api/auth-api";
import Button from "../components/Button";


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
    <View style={styles.container}>
    <Button onPress={logoutUser}><Text>Logout</Text></Button>
    </View>
  );
};

export default Settings;