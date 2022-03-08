/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Left, Right, Button, ListItem, Body} from 'native-base';

import {Text} from '../Typography/Text.component';

import {CategoryIcon} from './index.styles';

const CategoryRow = ({category, navigate, onToggleFavorite}) => {
  const {id, type, title, icon, isFavorite} = category;
  return (
    <ListItem
      key={id}
      icon
      onPress={() => {
        navigate('CategoryAdd', {category});
      }}>
      <Left>
        <Button disabled info transparent>
          <CategoryIcon active type="FontAwesome" name={icon} />
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
        <CategoryIcon
          active
          type="FontAwesome"
          name={isFavorite ? 'star' : 'star-o'}
          onPress={() => {
            onToggleFavorite({
              title: title.trim(),
              type,
              icon,
              id,
              isFavorite: isFavorite ? 0 : 1,
            });
          }}
        />
      </Right>
    </ListItem>
  );
};

export default CategoryRow;
