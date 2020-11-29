import * as React from 'react';
import {Provider} from 'react-redux';
import {Root, StyleProvider} from 'native-base';
import configureStore from './src/store/configureStore';

import getTheme from './native-base-theme/components';
import { Container, Header, Content, Spinner } from 'native-base';
const store = configureStore();

if (__DEV__) {
  console.disableYellowBox = true;
  GLOBAL.XMLHttpRequest =
    GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
}

export default function App() {
  return (
    <StyleProvider style={getTheme()}>
      <Provider store={store}>
      <Container>
        <Header />
        <Content>
          <Spinner />
          <Spinner color='red' />
          <Spinner color='green' />
          <Spinner color='blue' />
        </Content>
      </Container>
      </Provider>
    </StyleProvider>
  );
}
