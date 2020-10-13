import React from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../components/Dashboard";

const DashboardStack = createStackNavigator();

const DashboardPage = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Dashboard" component={Dashboard} />
    </DashboardStack.Navigator>
  );
};

export default DashboardPage;
