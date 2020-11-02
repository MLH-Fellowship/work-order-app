import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "../components/Map";

const MapStack = createStackNavigator();

const MapPage = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="Map"
        component={Map}
        options={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </MapStack.Navigator>
  );
};

export default MapPage;
