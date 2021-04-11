import React from 'react';
import {View} from 'native-base';

import {Text} from '../Typography/Text.component';

const RecordEmpty = () => {
  return (
    <View>
      <Text variant="hint">No records found, Add by clicking plus button</Text>
    </View>
  );
};

export default RecordEmpty;
