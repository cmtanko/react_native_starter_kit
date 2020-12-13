/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, Icon, Left, Button, ListItem, Body, Right} from 'native-base';

import cs from '../../styles/common';

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
          <Icon
            active
            type="FontAwesome"
            name={icon}
            style={[cs.color_light_blue, {fontSize: 25}]}
          />
        </Button>
      </Left>
      <Body>
        <Text style={cs.color_white}>{title}</Text>
      </Body>
      <Right>
        <Text style={cs.color_white}>{totalBalance}</Text>
      </Right>
    </ListItem>
  );
};

export default AccountRow;
