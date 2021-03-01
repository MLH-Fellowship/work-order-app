import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "../components/Map";
import theme from "../native-base-theme/variables/commonColor";
import { Icon } from "native-base";
import { StyleSheet } from "react-native";
import Search from "../components/Search";

const MapStack = createStackNavigator();

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: theme.brandPrimary,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  button: {
    paddingRight: 15,
  },
});

const MapPage = () => {
  const MapStackOptions = {
    headerStyle: styles.headerStyle,
    headerTintColor: theme.textColor,
    headerTitleStyle: {
      fontWeight: "bold",
    },
  }
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="Map"
        component={Map}
        options={({ navigation }) => ({
          ...MapStackOptions,
          headerRight: () => (
            <Icon
              name="search"
              size={25}
              style={styles.button}
              onPress={() => navigation.navigate("Search")}
            />
          ),
        })}
      />
      <MapStack.Screen
        name="Search"
        component={Search}
        options={MapStackOptions}
      />
    </MapStack.Navigator>
  );
};

export default MapPage;
