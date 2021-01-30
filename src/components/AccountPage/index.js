import React from 'react';
import {connect} from 'react-redux';
import {Container, Content, List, View, Fab, Icon} from 'native-base';

import AccountList from './AccountList';
import AccountSummary from './AccountSummary';

import cs from '../../styles/common';

const AccountPage = (props) => {
  const {navigation} = props;

  return (
    <Container style={[cs.bg_dark_lightblue]}>
      <Content>
        <AccountSummary />
        <List>
          <AccountList navigate={navigation.navigate} />
        </List>
      </Content>
      <View>
        <Fab
          direction="up"
          style={cs.bg_light_green}
          position="bottomRight"
          onPress={() => navigation.navigate('AccountAdd')}>
          <Icon name="add" />
        </Fab>
      </View>
    </Container>
  );
};

export default connect(null, {})(AccountPage);
