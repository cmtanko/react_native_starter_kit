import React from 'react';
import {Button, Text} from 'native-base';

import cs from '../../styles/common';

const ButtonBox = ({testID, title, color, btnDelete, onChange}) => {
  return (
    <Button
      testID={testID}
      block
      rounded
      style={btnDelete ? [cs.button, cs.brandBgColorDanger] : cs.button}
      onPress={(e) => {
        onChange(e);
      }}>
      <Text style={cs.buttonText}>{title}</Text>
    </Button>
  );
};

export default ButtonBox;
