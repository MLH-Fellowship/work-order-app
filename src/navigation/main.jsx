import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "react-native";
import MapPage from "@/screens/Map";
import DashboardPage from "@/screens/Dashboard";
import SettingsPage from "@/screens/Settings";
import { setCurrentUser } from "@/store/user";
import theme from "theme";

//Icons
//cheatsheet: https://ionicons.com/v4/cheatsheet.html
import Icon from "react-native-vector-icons/Ionicons";

// Navigation
import { NavigationContainer } from "@react-navigation/native";

const routeToIcon = {
  Map: 'ios-map',
  Dashboard: 'md-list',
  Settings: 'md-settings',
}

const MainContainer = ({ Tab, user }) => {
  const dispatch = useDispatch();
  const username = user.uid;

  useEffect(() => {
    setCurrentUser(username)(dispatch);
  }, []);
  
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      <Tab.Navigator
        initialRouteName="Map"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={routeToIcon[route.name]} size={size} color={color} />
          ),
        })}
        tabBarOptions={{
          activeTintColor: theme.brandAccent,
          inactiveTintColor: theme.textColor,
          style: {
            backgroundColor: theme.brandPrimary,
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
