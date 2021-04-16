/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {Label, InputGroup, Icon, Item} from 'native-base';

import {IconContainer, ItemIcon} from './IconBox.styles';
import cs from '../../styles/common';

const IconBox = ({title, icons, icon, onChange}) => {
  return (
    <InputGroup style={{flex: 1, height: 340}}>
      <ItemIcon name="ios-globe" />
      <Item
        stackedLabel
        style={{
          borderColor: '#00000000',
          width: '100%',
          alignItems: 'flex-end',
        }}>
        <Label style={{paddingLeft: 16}}>{title}</Label>
        <FlatGrid
          style={{
            marginRight: 16,
          }}
          itemDimension={68}
          data={icons}
          renderItem={(item) => renderItem(item, icon, onChange)}
        />
      </Item>
    </InputGroup>
  );
};

const renderItem = (item, icon, onChange) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onChange(item.item)}>
      <IconContainer>
        <Icon
          type="FontAwesome"
          name={item.item}
          style={icon === item.item ? cs.active_icon : cs.inactive_icon}
        />
      </IconContainer>
    </TouchableOpacity>
  );
};

export default IconBox;
