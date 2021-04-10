import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Input} from 'react-native-elements';

const RecordPage = () => {
  return (
    <View style={styles.wrapper}>
      <Input
        placeholder="Date"
        leftIcon={{type: 'font-awesome', name: 'calendar', size: 18}}
      />
      <Input
        placeholder="Ammount"
        leftIcon={{type: 'font-awesome', name: 'calculator', size: 18}}
      />
      <Input
        placeholder="Date"
        leftIcon={{type: 'font-awesome', name: 'calendar', size: 18}}
      />
    </View>
  );
};

export default RecordPage;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
});
