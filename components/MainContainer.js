import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "react-native";
import MapPage from "../pages/MapPage";
import DashboardPage from "../pages/DashboardPage";
import SettingsPage from "../pages/SettingsPage";
import { setCurrentUser } from "../actions/index";
import { db } from "../actions/index";

// Theme
import { theme } from "../core/theme";

//Icons
//cheatsheet: https://ionicons.com/v4/cheatsheet.html
import Icon from "react-native-vector-icons/Ionicons";

// Navigation
import { NavigationContainer } from "@react-navigation/native";

const MainContainer = ({ Tab, user }) => {
  const dispatch = useDispatch();
  const username = user.email.split("@")[0];

  const userState = useSelector((state) => state.userReducer);
  let role = userState.role;

  useEffect(() => {
    setCurrentUser(username)(dispatch);
    console.log(userState.role);
  }, []);
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <Tab.Navigator
        initialRouteName="Map"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case "Map":
                iconName = "ios-map";
                break;
              case "Dashboard":
                iconName = "md-list";
                break;
              case "Settings":
                iconName = "md-settings";
                break;

              default:
                break;
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: theme.colors.secondary,
          inactiveTintColor: theme.colors.accent,
          style: {
            backgroundColor: theme.colors.primary,
            borderTopWidth: 0,
          },
        }}
      >
        <Tab.Screen name="Map" component={MapPage} />
        {role === "service-member" ? null : (
          <Tab.Screen name="Dashboard" component={DashboardPage} />
        )}
        <Tab.Screen name="Settings" component={SettingsPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
