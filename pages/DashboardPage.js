import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../components/Dashboard";
import DashboardDetail from "../components/DashboardDetail";
import { theme } from "../core/theme";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { updateOrders } from "../actions";

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
  let key = detailState.order[0] === undefined ? "" : detailState.order[0];
  let value = detailState.order[1] === undefined ? {} : detailState.order[1];

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
      <DashboardStack.Screen
        name="DashboardDetail"
        component={DashboardDetail}
        options={{
          title: `Building ${value.building}`,
          headerStyle: styles.headerStyle,
          headerTintColor: theme.colors.accent,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <Icon.Button
              name="md-checkmark"
              backgroundColor={theme.colors.primary}
              size={25}
              style={styles.button}
              onPress={() => {
                updateOrders(key)({ ...value, complete: true })(dispatch);
              }}
            ></Icon.Button>
          ),
        }}
      />
    </DashboardStack.Navigator>
  );
};

export default DashboardPage;
