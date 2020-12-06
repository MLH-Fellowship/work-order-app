import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { StatusBar } from "react-native";
import MapPage from "../pages/MapPage";
import DashboardPage from "../pages/DashboardPage";
import SettingsPage from "../pages/SettingsPage";
import { setCurrentUser } from "../actions/index";

// Theme
import { theme } from "../core/theme";

//Icons
//cheatsheet: https://ionicons.com/v4/cheatsheet.html
import Icon from "react-native-vector-icons/Ionicons";

// Navigation
import { NavigationContainer } from "@react-navigation/native";

const MainContainer = ({ Tab, user }) => {
  const dispath = useDispatch();
  useEffect(() => setCurrentUser(user.email)(dispath), []);
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
        <Tab.Screen name="Dashboard" component={DashboardPage} />
        <Tab.Screen name="Settings" component={SettingsPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
