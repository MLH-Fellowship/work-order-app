import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@/views/Login';
import theme from 'theme';

const LoginStack = createStackNavigator();

const LoginPage = () => (
  <LoginStack.Navigator>
    <LoginStack.Screen
      name="Login"
      component={Login}
      options={{
        headerStyle: {
          backgroundColor: theme.brandPrimary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: theme.textColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },

      }}
    />
  </LoginStack.Navigator>
);

export default LoginPage;
