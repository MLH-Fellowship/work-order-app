import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapPage from "./pages/MapPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";

//Icons
//cheatsheet: https://ionicons.com/v4/cheatsheet.html
import Icon from "react-native-vector-icons/Ionicons";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

{
  /* <Stack.Navigator>
            <Stack.Screen
              name="Map"
              component={Map}
            />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
            />
          </Stack.Navigator> */
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
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
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Map" component={MapPage} />
        <Tab.Screen name="Dashboard" component={DashboardPage} />
        <Tab.Screen name="Settings" component={SettingsPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
