import React, { useState } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider as StoreProvider, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleProvider, Root } from 'native-base';
import firebase from './core/config';

// Redux
import rootReducer from './reducers';

// Navigation
import MainContainer from './components/MainContainer';
import LoginContainer from './components/LoginContainer';

// Theme
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';

const Tab = createBottomTabNavigator();

export default function App() {
  const middleware = [thunk];
  const store = createStore(rootReducer, applyMiddleware(...middleware));

  const [user, setUser] = useState();

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  return (
    <StyleProvider style={getTheme(commonColor)}>
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
