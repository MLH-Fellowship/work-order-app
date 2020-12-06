import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../components/Dashboard";
import DashboardAdmin from "../components/DashboardAdmin";
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
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  let role = userState.role;
  let key = detailState.order[0] === undefined ? "" : detailState.order[0];
  let value = detailState.order[1] === undefined ? {} : detailState.order[1];

  return (
    <DashboardStack.Navigator>
      {role === "admin" ? (
        <DashboardStack.Screen
          name="Dashboard Admin"
          component={DashboardAdmin}
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
      ) : (
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
      )}

      <DashboardStack.Screen
        name="DashboardDetail"
        component={DashboardDetail}
        options={({ navigation }) => ({
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
                navigation.goBack();
              }}
            ></Icon.Button>
          ),
        })}
      />
    </DashboardStack.Navigator>
  );
};

export default DashboardPage;
