import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '@/views/Settings';
import theme from 'theme';

const SettingsStack = createStackNavigator();

const SettingsPage = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name="Settings"
      component={Settings}
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
  </SettingsStack.Navigator>
);

export default SettingsPage;
