import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "../components/Map";
import { theme } from "../core/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Text, StyleSheet} from "react-native";

const MapStack = createStackNavigator();


const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: theme.colors.primary,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,

  },
  button: {
    paddingLeft: 20,
  },
});

const MapPage = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="Map"
        component={Map}
        options={{
          headerStyle: styles.headerStyle,
          headerTintColor: theme.colors.accent,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <Icon.Button name="bars" backgroundColor={theme.colors.primary} size={30} style={styles.button}>
            </Icon.Button>
          ),
        }}
      />
    </MapStack.Navigator>
  );
};

export default MapPage;
