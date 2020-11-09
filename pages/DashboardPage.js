import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../components/Dashboard";
import { theme } from "../core/theme";
import { useSelector, useDispatch } from "react-redux";

const DashboardStack = createStackNavigator();

const DashboardPage = () => {
  const dispatch = useDispatch();
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="Dashboard"
        component={Dashboard}
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
    </DashboardStack.Navigator>
  );
};

export default DashboardPage;
