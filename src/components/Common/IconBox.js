/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {Icon} from 'native-base';

import {IconContainer, ItemIcon} from './IconBox.styles';
import cs from '../../styles/common';
import {InputGroupContainer, ItemContainer, LabelContainer} from './styles';

const IconBox = ({title, icons, icon, onChange}) => {
  return (
    <InputGroupContainer style={{flex: 1, height: 340}}>
      <ItemIcon name="ios-globe" />
      <ItemContainer stackedLabel>
        <LabelContainer>{title}</LabelContainer>
        <FlatGrid
          style={{
            marginRight: 16,
          }}
          itemDimension={68}
          data={icons}
          renderItem={(item) => renderItem(item, icon, onChange)}
        />
      </ItemContainer>
    </InputGroupContainer>
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
