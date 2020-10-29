import React from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/Login";

const LoginStack = createStackNavigator();

const LoginPage = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" component={Login} />
    </LoginStack.Navigator>
  );
};

export default LoginPage;
