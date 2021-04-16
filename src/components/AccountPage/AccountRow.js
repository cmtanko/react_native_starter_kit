import React from 'react';
import {Left, Button, ListItem, Body, Right} from 'native-base';

import {Text} from '../Typography/Text.component';

import {AccountIcon} from './index.styles';

const AccountRow = (props) => {
  const {
    account,
    account: {id, title, icon, balance, openingBalance},
  } = props;
  const totalBalance = parseFloat(balance + openingBalance)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  const {navigate} = props;

  return (
    <ListItem
      key={id}
      icon
      onPress={() => {
        navigate('AccountAdd', {account});
      }}>
      <Left>
        <Button disabled info transparent>
          <AccountIcon active type="FontAwesome" name={icon} />
        </Button>
      </Left>
      <Body>
        <Text>{title}</Text>
      </Body>
      <Right>
        <Text>{totalBalance}</Text>
      </Right>
    </ListItem>
  );
};

export default AccountRow;
