import React, { useState } from "react";
import firebase from "./core/config";

// Redux
import { createStore, applyMiddleware } from "redux";
import { Provider as StoreProvider, useSelector } from "react-redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { setCurrentUsername } from "./actions/index";

// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainContainer from "./components/MainContainer";
import LoginContainer from "./components/LoginContainer";

const Tab = createBottomTabNavigator();

export default function App() {
  const middleware = [thunk];
  const store = createStore(rootReducer, applyMiddleware(...middleware));
  // const orderState = useSelector((state) => state.usernameReduer);
  const [user, setUser] = useState();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(user);
    }
  });

  // console.log(orderState);

  return (
    <StoreProvider store={store}>
      {user ? <MainContainer Tab={Tab} user={user} /> : <LoginContainer />}
    </StoreProvider>
  );
}
