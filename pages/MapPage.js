import React from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "../components/Map";

const MapStack = createStackNavigator();


const MapPage = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen name="Map" component={Map} />
    </MapStack.Navigator>
  );
};

export default MapPage;
