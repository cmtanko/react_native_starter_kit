import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Content,
  ListItem,
  List,
  Text,
  Radio,
  Right,
  Left,
} from 'native-base';

import Button from '../Button';

import styles from '../index.styles';

const Item = ({disabled, item}) => {
  const {key, name, selected} = item;

  return (
    <List key={key} style={styles.list}>
      <ListItem selected={selected} style={styles.listItem}>
        <Button
          title={name}
          type="none"
          toggable={true}
          disabled={disabled}
          selected={selected}
          onChange={() => {}}
        />
      </ListItem>
    </List>
  );
};

export default Item;
