import React from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "../components/Map";

const MapStack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingHorizontal: 10,
    backgroundColor: "#2BD1FB",
  },
  map: {
    flex: 1,
  },
});

const MapPage = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen name="Map" component={Map} />
    </MapStack.Navigator>
  );
};

export default MapPage;
