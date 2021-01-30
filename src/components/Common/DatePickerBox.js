/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {InputGroup, Icon, Item, Label, DatePicker} from 'native-base';

import cs from '../../styles/common';

const DatePickerBox = ({title, onChange}) => {
  const today = new Date();

  return (
    <InputGroup>
      <Icon
        name="ios-calendar"
        style={[cs.color_light_blue, cs.h2, {width: 25}]}
      />
      <Item stackedLabel style={{borderColor: '#00000000'}}>
        <Label style={cs.label}>{title}</Label>
        <DatePicker
          defaultDate={today}
          modalTransparent
          animationType="fade"
          androidMode="default"
          textStyle={cs.color_light_blue}
          onDateChange={(e) => {
            onChange(e);
          }}
        />
      </Item>
    </InputGroup>
  );
};

export default DatePickerBox;
