import 'react-native-gesture-handler'; // TO FIX ISSUE WITH IPHONE 6 WITH BACK BUTTON
import * as React from 'react';
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import AppNavigation from './navigation';
import {ThemeProvider} from 'styled-components/native';

import {theme} from './theme';

const store = configureStore();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Root>
          <AppNavigation />
        </Root>
      </Provider>
    </ThemeProvider>
  );
}
