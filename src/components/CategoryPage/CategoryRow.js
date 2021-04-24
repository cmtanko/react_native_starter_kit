import React from 'react';
import {Left, Button, ListItem, Body} from 'native-base';

import {Text} from '../Typography/Text.component';

import {CategoryIcon} from './index.styles';

const CategoryRow = ({category, navigate}) => {
  const {id, title, icon} = category;
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
      <Body>
        <Text>{title}</Text>
      </Body>
    </ListItem>
  );
};

export default CategoryRow;
