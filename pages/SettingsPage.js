import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../components/Settings";
import theme from "../native-base-theme/variables/commonColor";

const SettingsStack = createStackNavigator();

const SettingsPage = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: {
            backgroundColor: theme.brandPrimary,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.textColor,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsPage;
