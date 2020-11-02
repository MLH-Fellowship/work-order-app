import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../components/Settings";

const SettingsStack = createStackNavigator();

const SettingsPage = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
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
    </SettingsStack.Navigator>
  );
};

export default SettingsPage;
