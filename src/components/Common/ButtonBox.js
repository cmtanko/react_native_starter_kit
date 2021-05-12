import React from 'react';
import {Button, Text} from 'native-base';

import cs from '../../styles/common';

const ButtonBox = ({title, color, btnDelete, onChange}) => {
  return (
    <Button
      block
      rounded
      style={btnDelete ? [cs.button, {backgroundColor: '#e32246'}] : cs.button}
      onPress={(e) => {
        onChange(e);
      }}>
      <Text style={cs.buttonText}>{title}</Text>
    </Button>
  );
};

export default ButtonBox;
