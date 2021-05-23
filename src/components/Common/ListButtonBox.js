import React from 'react';
import {
  Text,
  Left,
  Body,
  Icon,
  Right,
  Button,
  Switch,
  ListItem,
} from 'native-base';

import cs from '../../styles/common';

const ListButtonBox = ({
  title,
  icon,
  type,
  selectedItem,
  isSelected,
  onPress,
}) => {
  return (
    <ListItem icon onPress={onPress}>
      <Left>
        <Button style={cs.bg_dark_blue}>
          <Icon active name={icon} />
        </Button>
      </Left>
      <Body>
        <Text>{title}</Text>
      </Body>
      <Right>
        {type === 'switch' && <Switch value={isSelected} />}
        {type === 'list' && <Text>{selectedItem}</Text>}
      </Right>
    </ListItem>
  );
};

export default ListButtonBox;
