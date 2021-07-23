import React from 'react';
import {SafeAreaView, TextInput} from 'react-native';
import {Item, Icon, Picker} from 'native-base';
import Label from '../Label';

import styles from '../index.styles';

const Dropdown = (props) => {
  const {
    title = '',
    value = '',
    focus = false,
    testID = 'textfield',
    numeric = false,
    subtitle = '',
    disabled = false,
    required = false,
    placeholder = '',
    onChange,
  } = props;

  return (
    <SafeAreaView>
      <Label title={title} subtitle={subtitle} required={required} />
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        style={[styles.dropdown, disabled ? styles.disabled : null]}
        value={value}
        testID={testID}
        enabled={!disabled}
        placeholder={placeholder}
        selectedValue={'key0'}
        onValueChange={(val) => {
          onChange(val);
        }}>
        {[
          {
            key: 0,
            label: 'item1',
            value: 0,
          },
          {
            key: 1,
            label: 'item2',
            value: 1,
          },
          {
            key: 2,
            label: 'item4',
            value: 2,
          },
        ].map((item) => {
          return (
            <Picker.Item key={item.key} label={item.label} value={item.value} />
          );
        })}
      </Picker>
    </SafeAreaView>
  );
};

export default Dropdown;
