import React from 'react';
import {DatePicker} from 'native-base';
import {Dimensions} from 'react-native';
const {width: WIDTH} = Dimensions.get('window');

import cs from '../../styles/common';
import {
  InputGroupContainer,
  IconContainer,
  ItemContainer,
  LabelContainer,
} from './styles';

const DatePickerBox = ({title, onChange}) => {
  const today = new Date();

  return (
    <InputGroupContainer>
      <IconContainer name="ios-calendar" />
      <ItemContainer stackedLabel>
        <LabelContainer>{title}</LabelContainer>
        <DatePicker
          defaultDate={today}
          modalTransparent
          animationType="fade"
          androidMode="default"
          textStyle={[
            cs.color_light_blue,
            cs.brandBgColorPrimary,
            {width: WIDTH * 0.82},
          ]}
          onDateChange={(e) => {
            onChange(e);
          }}
        />
      </ItemContainer>
    </InputGroupContainer>
  );
};

export default DatePickerBox;
