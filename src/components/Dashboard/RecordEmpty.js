import React from 'react';
import {Text, View} from 'native-base';

import cs from '../../styles/common';

const RecordEmpty = () => {
  return (
    <View>
      <Text style={[cs.color_grey, {padding: 10, textAlign: 'center'}]}>
        No records found, Add by clicking plus button
      </Text>
    </View>
  );
};

export default RecordEmpty;
