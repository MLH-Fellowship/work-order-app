import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../components/Dashboard";

const DashboardStack = createStackNavigator();

const DashboardPage = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="Dashboard"
        component={Dashboard}
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
    </DashboardStack.Navigator>
  );
};

export default DashboardPage;
