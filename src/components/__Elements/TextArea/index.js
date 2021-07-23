import React from 'react';
import {SafeAreaView, TextInput} from 'react-native';

import Label from '../Label';
import styles from '../index.styles';

const TextArea = (props) => {
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
      <TextInput
        style={[styles.text_area, disabled ? styles.disabled : null]}
        value={value}
        testID={testID}
        editable={!disabled}
        multiline={true}
        autoFocus={focus}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder={placeholder}
        keyboardType={numeric ? 'numeric' : 'default'}
        selectTextOnFocus={true}
        onChangeText={(val) => {
          onChange(val);
        }}
      />
    </SafeAreaView>
  );
};

export default TextArea;
