import * as React from 'react';
import {Provider} from 'react-redux';
import {Root, StyleProvider} from 'native-base';
import configureStore from './store/configureStore';
import AppNavigation from './navigation';

import getTheme from '../native-base-theme/components';

const store = configureStore();

export default function App() {
  return (
    <StyleProvider style={getTheme()}>
      <Provider store={store}>
        <Root>
          <AppNavigation />
        </Root>
      </Provider>
    </StyleProvider>
  );
}
