import React from 'react';
import { registerRootComponent } from 'expo';
//import { createStore, applyMiddleware } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
//import thunk from 'redux-thunk';
import { StyleProvider, Root } from 'native-base';

// Redux
import store from './store';

// Navigation
import NavigationController from './navigation'

// Theme
import getTheme from './native-base-theme/components';
import commonColor from 'theme';

function App() {
  //const store = createStore(rootReducer, applyMiddleware(thunk));
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
