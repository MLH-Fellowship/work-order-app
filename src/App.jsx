import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider as StoreProvider } from 'react-redux';
import { StyleProvider, Root } from 'native-base';

import store from './store';

// Redux
//import rootReducer from './store';

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
