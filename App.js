import * as React from 'react';
import {Root, StyleProvider} from 'native-base';

import expenseManagerTheme from './src/theme/variables/expenseManager';
import getTheme from './src/theme/components';
import { Container, Button, Text } from 'native-base';

if (__DEV__) {
  console.disableYellowBox = true;
  GLOBAL.XMLHttpRequest =
    GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
}

export default function App() {
  return (
    <StyleProvider style={getTheme(expenseManagerTheme)}>
      <Container>
        <Button>
          <Text>
            Button
          </Text>
        </Button>
      </Container>
    </StyleProvider>
  );
}
