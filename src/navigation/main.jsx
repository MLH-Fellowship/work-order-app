import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "react-native";
import MapPage from "@/pages/MapPage";
import DashboardPage from "@/pages/DashboardPage";
import SettingsPage from "@/pages/SettingsPage";
import { setCurrentUser } from "@/actions/index";
import theme from "@/native-base-theme/variables/commonColor";

//Icons
//cheatsheet: https://ionicons.com/v4/cheatsheet.html
import Icon from "react-native-vector-icons/Ionicons";

// Navigation
import { NavigationContainer } from "@react-navigation/native";

const MainContainer = ({ Tab, user }) => {
  const dispatch = useDispatch();
  console.log(user);
  const username = user.uid;

  const userState = useSelector((state) => state.userReducer);
  let role = userState.role;

  useEffect(() => {
    setCurrentUser(username)(dispatch);
    console.log(userState.role);
  }, []);
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      <Tab.Navigator
        initialRouteName="Map"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case "Map":
                iconName = "ios-map";
                break;
              case "Dashboard":
                iconName = "md-list";
                break;
              case "Settings":
                iconName = "md-settings";
                break;

              default:
                break;
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: theme.brandAccent,
          inactiveTintColor: theme.textColor,
          style: {
            backgroundColor: theme.brandPrimary,
            borderTopWidth: 0,
          },
        }}
      >
        <Tab.Screen name="Map" component={MapPage} />
        {role === "service-member" ? null : (
          <Tab.Screen name="Dashboard" component={DashboardPage} />
        )}
        <Tab.Screen name="Settings" component={SettingsPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
