import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Icon} from 'native-base';

import AccountList from './AccountList';
import AccountSummary from './AccountSummary';

import {
  AccountPageContainer,
  AccountPageContent,
  AccountPageFab,
} from './index.styles';

const AccountPage = (props) => {
  const {navigation} = props;

  return (
    <AccountPageContainer>
      <AccountPageContent>
        <AccountSummary />
        <AccountList navigate={navigation.navigate} />
      </AccountPageContent>
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
