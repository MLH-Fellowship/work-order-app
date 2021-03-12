import { registerRootComponent } from 'expo';
import React, { useState, useEffect } from 'react';
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

function App() {
  const middleware = [thunk];
  const store = createStore(rootReducer, applyMiddleware(...middleware));

  const [user, setUser] = useState();

  // eslint-disable-next-line consistent-return
  async function onAuthStateChanged(newUserState) {
    // if (newUserState && !newUserState.emailVerified) {
    //   try {
    //     console.log(newUserState.user.uid);
    //     await newUserState.sendEmailVerification();
    //     console.log('Verification email sent.');
    //   } catch (e) {
    //     console.error('Error sending verification email:', e);
    //   }
    //   return firebase.auth().signOut();
    // }
    setUser(newUserState);
  }
  useEffect(() => firebase.auth().onAuthStateChanged(onAuthStateChanged), []);

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

export default registerRootComponent(App);
