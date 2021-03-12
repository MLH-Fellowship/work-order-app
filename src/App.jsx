import { registerRootComponent } from 'expo';
import React, { useState, useEffect } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider as StoreProvider, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleProvider, Root } from 'native-base';


// Redux
import rootReducer from './reducers';

// Navigation
import NavigationController from './navigation'

// Theme
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';

const Tab = createBottomTabNavigator();

function App() {
  const middleware = [thunk];
  const store = createStore(rootReducer, applyMiddleware(...middleware));

  

  return (
    <StyleProvider style={getTheme(commonColor)}>
      <StoreProvider store={store}>
        <Root>
          <NavigationController/>
        </Root>
      </StoreProvider>
    </StyleProvider>
  );
}

export default registerRootComponent(App);
