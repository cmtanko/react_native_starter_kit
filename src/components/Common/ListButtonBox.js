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
  onChange,
  onPress,
}) => {
  return (
    <ListItem
      icon
      onPress={() => {
        if (type !== 'switch') {
          onPress();
        }
      }}>
      <Left>
        <Button style={cs.bg_dark_blue}>
          <Icon active name={icon} />
        </Button>
      </Left>
      <Body>
        <Text>{title}</Text>
      </Body>
      <Right>
        {type === 'switch' && (
          <Switch
            value={isSelected}
            onValueChange={(val) => {
              onChange(val);
            }}
          />
        )}
        {type === 'list' && <Text>{selectedItem}</Text>}
      </Right>
    </ListItem>
  );
};

export default ListButtonBox;
