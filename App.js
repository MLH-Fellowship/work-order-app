import React, { useState } from "react";
import firebase from "./core/config";

// Redux
import { createStore, applyMiddleware } from "redux";
import { Provider as StoreProvider, useSelector } from "react-redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainContainer from "./components/MainContainer";
import LoginContainer from "./components/LoginContainer";

// Theme
import getTheme from './native-base-theme/components';
import { StyleProvider } from 'native-base'
import { StyleProvider, Root } from 'native-base'

const Tab = createBottomTabNavigator();

export default function App() {
  const middleware = [thunk];
  const store = createStore(rootReducer, applyMiddleware(...middleware));

  const [user, setUser] = useState();

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  return (
    <StyleProvider  style={getTheme()}>
      <StoreProvider store={store}>
        <Root>
          {user ? (
            <MainContainer Tab={Tab} user={user} />
          ) : (
            <LoginContainer Tab={Tab} user={user} />
          )}
        </Root>
      </StoreProvider>
    </StyleProvider>
  );
}
