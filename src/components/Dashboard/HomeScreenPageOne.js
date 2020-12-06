import React, {Component} from 'react';
import {Container, Content, Button, Text} from 'native-base';

import cs from '../../styles/common';

class HomeScreenPageOne extends Component {
  render() {
    const {navigate} = this.props.navigation;

    return (
      <Container style={[cs.bg_dark_lightblue, cs.card_body]}>
        <Content>
          <Button
            style={cs.bg_light_green}
            onPress={() => navigate.goBack()}
            title="Go back home"
          />
          <Text style={cs.color_white}>HomeScreenPageOne</Text>
        </Content>
      </Container>
    );
  }
}

export default HomeScreenPageOne;
