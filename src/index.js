import * as React from 'react';
import {Provider} from 'react-redux';
import {Root} from 'native-base';
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
