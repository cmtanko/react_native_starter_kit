/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Left, Icon, Button, ListItem, Body, Right} from 'native-base';

import {Text} from '../Typography/Text.component';

import {AccountIcon} from './index.styles';

const AccountRow = (props) => {
  const {
    account,
    account: {id, type, title, icon, balance, openingBalance, isFavorite},
    onToggleFavorite,
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
      <Body
        style={{
          borderBottomWidth: 0,
        }}>
        <Text>{title}</Text>
      </Body>
      <Right
        style={{
          borderBottomWidth: 0,
        }}>
        <Text>{totalBalance}</Text>
      </Right>
      <Right
        style={{
          borderBottomWidth: 0,
        }}>
        <AccountIcon
          active
          type="FontAwesome"
          name={isFavorite ? 'star' : 'star-o'}
          onPress={() => {
            onToggleFavorite({
              title: title.trim(),
              id,
              icon,
              type,
              balance,
              openingBalance,
              isFavorite: isFavorite ? 0 : 1,
            });
          }}
        />
      </Right>
    </ListItem>
  );
};

export default AccountRow;
