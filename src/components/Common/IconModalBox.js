/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Item, Icon, Label, Button, InputGroup} from 'native-base';
import {Provider} from 'react-native-paper';

import cs from '../../styles/common';

const IconModalBox = ({
  testID,
  headingIcon = 'ios-globe',
  headingTitle = 'Icon',
  title,
  icon,
  onPress,
}) => {
  const showItems = (item) => {
    if (!icon) {
      return (
        <Button transparent onPress={onPress}>
          <Text>{title}</Text>
        </Button>
      );
    } else {
      return (
        <TouchableOpacity
          testID={testID}
          style={{marginTop: -16, marginLeft: -8}}
          onPress={onPress}>
          <View style={cs.iconContainer}>
            <Icon
              type="FontAwesome"
              name={icon}
              style={icon === item ? cs.activeIcon : cs.inactiveIcon}
            />
            <Text
              numberOfLines={1}
              style={icon === item ? cs.activeText : cs.inactiveText}>
              {icon}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <Provider>
      <InputGroup style={cs.borderZero}>
        <Icon name={headingIcon} style={cs.color_light_blue} />
        <Item stackedLabel style={cs.whiteBorder}>
          <Label style={cs.label}>{headingTitle}</Label>
          {showItems(icon)}
        </Item>
      </InputGroup>
    </Provider>
  );
};

export default IconModalBox;
