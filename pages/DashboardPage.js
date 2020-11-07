import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../components/Dashboard";
import {theme} from "../core/theme";

const DashboardStack = createStackNavigator();

const DashboardPage = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="Dashboard"
        component={Dashboard}
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
    </DashboardStack.Navigator>
  );
};

export default DashboardPage;
