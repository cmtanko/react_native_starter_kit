import React from 'react';
import {Label} from 'native-base';

import cs from '../../styles/common';

const ErrorBox = ({error}) => {
  return (
    <Label style={[cs.label, {color: 'red', textAlign: 'center'}]}>
      {error}
    </Label>
  );
};

export default ErrorBox;
