/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Label, InputGroup, Icon, Item} from 'native-base';
import {Picker} from '@react-native-community/picker';
import cs from '../../styles/common';

const PickerBox = ({title, type, options, onChange}) => {
  return (
    <InputGroup>
      <Icon name="ios-card" style={[cs.color_light_blue, cs.h2, {width: 25}]} />
      <Item
        stackedLabel
        style={{
          borderColor: '#00000000',
        }}>
        <Label style={cs.label}>{title}</Label>

        <Picker
          note
          mode="dropdown"
          style={{width: 200}}
          headerStyle={{
            backgroundColor: '#262637',
          }}
          headerTitleStyle={{
            color: 'white',
          }}
          iosHeader="Select category type"
          placeholder="Select category type"
          placeholderIconColor={cs.color_light_blue}
          selectedValue={type}
          textStyle={cs.color_light_blue}
          itemTextStyle={cs.color_light_blue}
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
