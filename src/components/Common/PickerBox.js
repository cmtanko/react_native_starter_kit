/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Picker, Icon} from 'native-base';

import cs from '../../styles/common';
import {
  InputGroupContainer,
  IconContainer,
  ItemContainer,
  LabelContainer,
  PickerContainer,
} from './styles';

const PickerBox = ({title, type, options, onChange}) => {
  return (
    <InputGroupContainer>
      <IconContainer name="ios-card" />
      <ItemContainer stackedLabel>
        <LabelContainer>{title}</LabelContainer>

        <PickerContainer
          note
          iosIcon={<Icon name="caret-down" style={cs.brandColorTertiary} />}
          mode="dialog"
          iosHeader="Select category type"
          placeholder="Select category type"
          textStyle={cs.brandColorTertiary}
          selectedValue={type}
          modalStyle={[cs.brandBgColorSecondary]}
          itemTextStyle={cs.brandColorInfo}
          headerStyle={[cs.brandBgColorPrimary]}
          headerTitleStyle={cs.brandColorTertiary}
          headerBackButtonTextStyle={cs.brandColorTertiary}
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
        </PickerContainer>
      </ItemContainer>
    </InputGroupContainer>
  );
};

export default PickerBox;
