import React, {useState} from 'react';
import { StyleSheet, Text, View } from "react-native";
import LoginPage from "./pages/LoginPage";
import MapPage from "./pages/MapPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import firebase from './core/config'

// Redux
import { createStore, applyMiddleware } from "redux";
import { Provider as StoreProvider } from "react-redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

//Icons
//cheatsheet: https://ionicons.com/v4/cheatsheet.html
import Icon from "react-native-vector-icons/Ionicons";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function App() {
  const middleware = [thunk];
  const store = createStore(rootReducer, applyMiddleware(...middleware));

  const [user, setUser] = useState()

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setUser(user)
    } else {
      setUser(user)
    }
  });

  // console.log("USER",user)

  return (
    <StoreProvider store={store}>

      {user ?
      <NavigationContainer>
        <Tab.Navigator
        initialRouteName='Map'
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
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Map" component={MapPage} />
          <Tab.Screen name="Dashboard" component={DashboardPage} />
          <Tab.Screen name="Settings" component={SettingsPage} />
        </Tab.Navigator>
      </NavigationContainer> :
       <NavigationContainer>
       <Tab.Navigator
       initialRouteName='Login'
         screenOptions={({ route }) => ({
           tabBarIcon: ({ focused, color, size }) => {
             let iconName;

             switch (route.name) {
               case "Login":
                 iconName = "ios-contact";
                 break;
               default:
                 break;
             }

             // You can return any component that you like here!
             return <Icon name={iconName} size={size} color={color} />;
           },
         })}
         tabBarOptions={{
           activeTintColor: "tomato",
           inactiveTintColor: "gray",
         }}
       >
         <Tab.Screen name="Login" component={LoginPage} />
       </Tab.Navigator>
     </NavigationContainer>

    }
    </StoreProvider>
  );
}
