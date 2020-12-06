import React from "react";
import { StatusBar } from "react-native";
import LoginPage from "../pages/LoginPage";

// Theme
import { theme } from "../core/theme";

// Navigation
import { NavigationContainer } from "@react-navigation/native";

const LoginContainer = ({ Tab, user }) => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <Tab.Navigator initialRouteName="Login">
        <Tab.Screen
          name="Login"
          component={LoginPage}
          options={{ tabBarVisible: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default LoginContainer;
