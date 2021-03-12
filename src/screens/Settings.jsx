import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '@/views/Settings';
import { StackNavigatorOptions } from './_defaults';

const SettingsStack = createStackNavigator();

const SettingsPage = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name="Settings"
      component={Settings}
      options={StackNavigatorOptions}
    />
  </SettingsStack.Navigator>
);

export default SettingsPage;
