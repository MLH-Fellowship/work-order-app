import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../components/Settings";
import { theme } from "../core/theme";

const SettingsStack = createStackNavigator();

const SettingsPage = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.colors.accent,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsPage;
