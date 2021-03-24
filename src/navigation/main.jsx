import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { StatusBar, View } from "react-native";
import MapPage from "@/screens/Map";
import DashboardPage from "@/screens/Dashboard";
import SettingsPage from "@/screens/Settings";
import { setCurrentUser } from "@/store/user";
import theme from "theme";

//Icons
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
  const email = user.email;
  useEffect(() => {
    setCurrentUser(username, email)(dispatch);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      <Tab.Navigator
        initialRouteName="Map"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{height: size - 4}}>
              <Icon name={routeToIcon[route.name]} size={size - 4} color={color} />
            </View>
          ),
        })}
        tabBarOptions={{  
          activeTintColor: theme.brandAccent,
          inactiveTintColor: theme.textColor,
          labelStyle: {
            marginTop: 6,
          },
          tabStyle: {
            marginBottom: 6,
          },
          style: {
            padding: 10,
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
