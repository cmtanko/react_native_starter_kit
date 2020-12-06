import React, {Component} from 'react';
import {Container, Content, View, Text} from 'native-base';

import cs from '../../styles/common';

class HomeScreenPageTwo extends Component {
  render() {
    return (
      <Container style={cs.bg_dark_lightblue}>
        <Content>
          <Text>HomeScreenPageTwo</Text>
        </Content>
      </Container>
    );
  }
}

export default HomeScreenPageTwo;
