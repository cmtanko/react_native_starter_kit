/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Label, InputGroup, Icon, Picker, Item} from 'native-base';
import {Dimensions} from 'react-native';
// import {Picker} from '@react-native-community/picker';

import cs from '../../styles/common';

const {width: WIDTH} = Dimensions.get('window');

const PickerBox = ({title, type, options, onChange}) => {
  return (
    <InputGroup>
      <Icon name="ios-card" style={[cs.color_light_blue, cs.h2, {width: 35}]} />
      <Item
        stackedLabel
        style={{
          borderColor: '#00000000',
        }}>
        <Label style={cs.label}>{title}</Label>

        <Picker
          note
          mode="dropdown"
          style={[cs.color_light_blue, {width: WIDTH * 0.9}]}
          iosHeader="Select category type"
          placeholder="Select category type"
          placeholderIconColor={cs.color_light_blue}
          selectedValue={type}
          itemStyle={[
            cs.bg_dark_blue,
            {
              marginLeft: 0,
              paddingLeft: 20,
            },
          ]}
          onValueChange={(e) => onChange(e)}>
          {options.map((item) => {
            return (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            );
          })}
        </Picker>
      </Item>
    </InputGroup>
  );
};

export default PickerBox;
