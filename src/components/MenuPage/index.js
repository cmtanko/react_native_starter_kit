import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MenuPage = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Menu Page</Text>
    </View>
  );
};

export default MenuPage;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
