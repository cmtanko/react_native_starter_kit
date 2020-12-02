import * as React from 'react';
import {Provider} from 'react-redux';
import {StyleProvider} from 'native-base';
import configureStore from './src/store/configureStore';

import getTheme from './native-base-theme/components';
import {Container, Header, Content, Spinner} from 'native-base';
const store = configureStore();

export default function App() {
  return (
    <StyleProvider style={getTheme()}>
      <Provider store={store}>
        <Container>
          <Header />
          <Content>
            <Spinner />
            <Spinner color="red" />
            <Spinner color="green" />
            <Spinner color="blue" />
          </Content>
        </Container>
      </Provider>
    </StyleProvider>
  );
}
