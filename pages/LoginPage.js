import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/Login";
import {theme} from "../core/theme";

const LoginStack = createStackNavigator();

const LoginPage = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.accent,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </LoginStack.Navigator>
  );
};

export default LoginPage;
