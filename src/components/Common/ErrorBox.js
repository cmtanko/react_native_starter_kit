/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {Label} from 'native-base';

import cs from '../../styles/common';

const ErrorBox = ({testID, error}) => {
  return (
    <Label
      testID={testID}
      style={[cs.label, {color: 'red', textAlign: 'center'}]}>
      {error}
    </Label>
  );
};

export default ErrorBox;
