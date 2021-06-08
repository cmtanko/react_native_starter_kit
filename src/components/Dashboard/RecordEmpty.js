import React from 'react';
import {View} from 'native-base';

import {Text} from '../Typography/Text.component';

import cs from '../../styles/common';

const RecordEmpty = () => {
  return (
    <View style={cs.spacer}>
      <Text variant="hint">No records found, Add by clicking plus button</Text>
    </View>
  );
};

export default RecordEmpty;
