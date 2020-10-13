import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './pages/Map'
import Dashboard from './pages/Dashboard'

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Map"
              component={Map}
            />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
            />
          </Stack.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
