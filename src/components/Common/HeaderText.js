import React from 'react';
import {Text} from 'react-native';

import cs from '../../styles/common';

const HeaderText = ({title = 'Header', style}) => {
  return (
    <Text style={[cs.h2, cs.color_light_blue, cs.padding_large, {...style}]}>
      {title}
    </Text>
  );
};

export default HeaderText;
