/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {Label, InputGroup, Icon, Item} from 'native-base';

import cs from '../../styles/common';

const IconBox = ({title, icons, icon, onChange}) => {
  return (
    <InputGroup style={{flex: 1, height: 250}}>
      <Icon
        name="ios-globe"
        style={[cs.color_light_blue, cs.h2, {width: 25}]}
      />
      <Item
        stackedLabel
        style={{
          borderColor: '#00000000',
          width: '100%',
          alignItems: 'flex-end',
        }}>
        <Label style={cs.label}>{title}</Label>
        <FlatGrid
          itemDimension={40}
          data={icons}
          renderItem={(item) => renderItem(item, icon, onChange)}
        />
      </Item>
    </InputGroup>
  );
};

const renderItem = (item, icon, onChange) => {
  return (
    <Icon
      type="FontAwesome"
      name={item.item}
      style={icon === item.item ? cs.active_icon : cs.inactive_icon}
      onPress={() => onChange(item.item)}
    />
  );
};

export default IconBox;
