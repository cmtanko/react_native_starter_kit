import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {Button as ButtonNB, Text} from 'native-base';

import styles from '../index.styles';

const Button = (props) => {
  const [selectable, setSelectable] = useState(false);
  const {
    title = '',
    type = 'primary',
    testID = 'button',
    disabled = false,
    selected = false,
    toggable = false,
    onChange,
  } = props;

  useEffect(() => {
    setSelectable(selected);
  }, []);

  return (
    <SafeAreaView style={styles.fullWidth}>
      <ButtonNB
        testID={testID}
        block
        disabled={disabled}
        style={[
          styles.button,
          styles['button_' + type],
          disabled ? styles.disabled : null,
          selectable ? styles.selected : null,
        ]}
        onPress={() => {
          toggable && setSelectable(!selectable);
          onChange();
        }}>
        <Text style={styles.buttonText}>{title}</Text>
      </ButtonNB>
    </SafeAreaView>
  );
};

export default Button;
