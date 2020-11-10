import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/Login";
import { theme } from "../core/theme";
import { Button, Text } from "react-native";

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
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.colors.accent,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <Button
              onPress={() => alert("This is a button!")}
              title="Info"
              color="#00cc00"
            />
          ),
        }}
      />
    </LoginStack.Navigator>
  );
};

export default LoginPage;
