/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions} from 'react-native';
import DatePicker from 'react-native-datepicker';
const {width: WIDTH} = Dimensions.get('window');

import {
  InputGroupContainer,
  IconContainer,
  ItemContainer,
  LabelContainer,
} from './styles';

const DatePickerBox = ({testID, title, value, onChange}) => {
  const today = new Date(value) || new Date();

  return (
    <InputGroupContainer>
      <IconContainer name="ios-calendar" />
      <ItemContainer stackedLabel>
        <LabelContainer>{title}</LabelContainer>
        <DatePicker
          testID={testID}
          style={{
            width: WIDTH * 0.82,
            backgroundColor: '#0F171E',
            alignItems: 'flex-start',
          }}
          date={today}
          mode="date"
          showIcon={false}
          placeholder="select date"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: {
              borderWidth: 0,
              alignItems: 'flex-start',
            },
            dateText: {
              fontSize: 16,
              paddingLeft: 16,
            },
          }}
          onDateChange={(date) => {
            onChange(date);
          }}
        />
      </ItemContainer>
    </InputGroupContainer>
  );
};

export default DatePickerBox;
