import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "../components/Map";
import { theme } from "../core/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import Search from "../components/Search";

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
        options={({ navigation }) => ({
          headerStyle: styles.headerStyle,
          headerTintColor: theme.colors.accent,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <Icon.Button
              name="search"
              backgroundColor={theme.colors.primary}
              size={25}
              style={styles.button}
              onPress={() => navigation.navigate("Search")}
            ></Icon.Button>
          ),
        })}
      />
      <MapStack.Screen
        name="Search"
        component={Search}
        options={{
          headerStyle: styles.headerStyle,
          headerTintColor: theme.colors.accent,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </MapStack.Navigator>
  );
};

export default MapPage;
