import React from 'react';
import {connect} from 'react-redux';
import {Content, List, View, Icon} from 'native-base';

import AccountList from './AccountList';
import AccountSummary from './AccountSummary';

import {AccountPageContainer, AccountPageFab} from './index.styles';

const AccountPage = (props) => {
  const {navigation} = props;

  return (
    <AccountPageContainer>
      <Content>
        <AccountSummary />
        <List>
          <AccountList navigate={navigation.navigate} />
        </List>
      </Content>
      <View>
        <AccountPageFab
          direction="up"
          position="bottomRight"
          onPress={() => navigation.navigate('AccountAdd')}>
          <Icon name="add" />
        </AccountPageFab>
      </View>
    </AccountPageContainer>
  );
};

export default connect(null, {})(AccountPage);
