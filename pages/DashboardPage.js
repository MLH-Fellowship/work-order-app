import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../components/Dashboard";
import DashboardDetail from "../components/DashboardDetail";
import { theme } from "../core/theme";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

const DashboardStack = createStackNavigator();

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: theme.colors.primary,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  button: {
    paddingLeft: 20,
  },
});

const DashboardPage = () => {
  const detailState = useSelector((state) => state.detailReducer);
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
      <DashboardStack.Screen
        name="DashboardDetail"
        component={DashboardDetail}
        options={{
          title: `Building ${detailState.dashboardName}`,
          headerStyle: styles.headerStyle,
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
