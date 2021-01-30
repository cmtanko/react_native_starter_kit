import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SettingPage = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Settings Page</Text>
    </View>
  );
};

export default SettingPage;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
