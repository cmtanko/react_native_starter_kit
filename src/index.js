import * as React from 'react';
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler'; // TO FIX ISSUE WITH IPHONE 6 WITH BACK BUTTON

import {theme} from './theme';
import AppNavigation from './navigation';
import configureStore from './store/configureStore';
import {ThemeProvider} from 'styled-components/native';

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
