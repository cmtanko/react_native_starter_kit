import React from 'react';
import {Text, View} from 'react-native';

import styles from '../index.styles';

const Label = ({title, subtitle, required}) => {
  return (
    <>
      <View style={[styles.title_container]}>
        <Text numberOfLines={1} style={[styles.text_field_title]}>
          {title}
        </Text>
        {required ? <Text style={[styles.required]}>*</Text> : null}
      </View>
      {subtitle ? (
        <Text style={[styles.text_field_subtitle]}>{subtitle}</Text>
      ) : null}
    </>
  );
};

export default Label;
