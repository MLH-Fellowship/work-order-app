import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import Map from '@/views/Map';
import Search from '@/views/Search';
import SubmitOrder from '@/views/SubmitOrder';
import { StackNavigatorOptions } from './_defaults';


const MapStack = createStackNavigator();

const styles = StyleSheet.create({
  button: {
    paddingRight: 15,
  },
});

const MapPage = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="Map"
        component={Map}
        options={({ navigation }) => ({
          ...StackNavigatorOptions,
          headerRight: () => (
            <Icon
              name="search"
              size={25}
              style={styles.button}
              onPress={() => navigation.navigate('Search')}
            />
          ),
        })}
      />
      <MapStack.Screen
        name="Search"
        component={Search}
        options={StackNavigatorOptions}
      />
      <MapStack.Screen
        name="Submit Order"
        component={SubmitOrder}
        options={StackNavigatorOptions}
      />
    </MapStack.Navigator>
  );
};

export default MapPage;
