import React from 'react';
import {Icon, View, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';

import cs from '../../styles/common';

const RoundIcon = ({selectedItem, id, title, name, onPress}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}>
      <View
        style={
          selectedItem === id
            ? cs.round_icon_container_active
            : cs.round_icon_container
        }>
        <Icon type="FontAwesome" name={name} style={cs.round_icon} />
        <Text numberOfLines={1} style={cs.round_icon_title}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RoundIcon;
