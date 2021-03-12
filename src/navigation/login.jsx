import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from '../pages/LoginPage';

// Navigation

const LoginContainer = ({ Tab, user }) => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#fff" />
    <Tab.Navigator initialRouteName="Login">
      <Tab.Screen
        name="Login"
        component={LoginPage}
        options={{ tabBarVisible: false }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default LoginContainer;
