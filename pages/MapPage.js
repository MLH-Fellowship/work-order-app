import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "../components/Map";
import {theme} from "../core/theme";

const MapStack = createStackNavigator();

const MapPage = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="Map"
        component={Map}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.accent,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </MapStack.Navigator>
  );
};

export default MapPage;
