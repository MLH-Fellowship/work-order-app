import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@/views/Login';

import { StackNavigatorOptions } from './_defaults';

const LoginStack = createStackNavigator();

const LoginPage = () => (
  <LoginStack.Navigator>
    <LoginStack.Screen
      name="Login"
      component={Login}
      options={StackNavigatorOptions}
    />
  </LoginStack.Navigator>
);

export default LoginPage;
