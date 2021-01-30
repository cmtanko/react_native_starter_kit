import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CategorySummary = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Category Summary Page</Text>
    </View>
  );
};

export default CategorySummary;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
