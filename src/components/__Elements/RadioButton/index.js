import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

import Item from './Item';
import Label from '../Label';

const RadioButton = (props) => {
  const {
    title = '',
    subtitle = '',
    disabled = false,
    required = false,
    onChange,
    onClear,
  } = props;

  return (
    <SafeAreaView>
      <Label title={title} subtitle={subtitle} required={required} />
      {[
        {
          key: 0,
          name: 'item1',
          selected: true,
        },
        {
          key: 1,
          name: 'item2',
          selected: false,
        },
        {
          key: 2,
          name: 'item4',
          selected: false,
        },
      ].map((item) => {
        return (
          <Item
            key={item.key}
            disabled={disabled}
            item={item}
            onChange={() => {
              onChange();
            }}
            onClear={() => {
              onClear();
            }}
          />
        );
      })}
    </SafeAreaView>
  );
};

export default RadioButton;
