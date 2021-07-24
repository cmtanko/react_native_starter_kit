import React, {useEffect} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Label from '../Label';
import styles from '../index.styles';

const DatePickerBox = (props) => {
  const {
    title = '',
    value = '',
    testID = 'textfield',
    subtitle = '',
    disabled = false,
    required = false,
    placeholder = '',
    onChange,
    onClear,
  } = props;
  const today = (value && new Date(value)) || new Date();

  return (
    <SafeAreaView>
      <Label title={title} subtitle={subtitle} required={required} />
      <DatePicker
        mode="date"
        date={today}
        style={[styles.date_picker, disabled ? styles.disabled : null]}
        testID={testID}
        disabled={disabled}
        placeholder={placeholder}
        cancelBtnText="Cancel"
        confirmBtnText="Confirm"
        onDateChange={(date) => {
          onChange(date);
        }}
        customStyles={{
          dateInput: styles.dateInput,
          dateText: styles.dateText,
          dateIcon: styles.dateIcon,
        }}
      />
      {value ? (
        <TouchableOpacity
          onPress={(e) => {
            onClear();
          }}>
          <Text style={styles.clear}>Clear Time</Text>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};

export default DatePickerBox;