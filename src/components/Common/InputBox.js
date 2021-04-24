import React, {PureComponent} from 'react';
import {Item, Label, Input, Icon, InputGroup} from 'native-base';

import cs from '../../styles/common';

export class InputBox extends PureComponent {
  render() {
    const {
      title,
      icon,
      value,
      onChange,
      placeholder = '',
      numeric = false,
      focus = false,
    } = this.props;

    return (
      <InputGroup>
        <Icon name={icon} style={[cs.color_light_blue, cs.h2, {width: 35}]} />
        <Item stackedLabel style={{borderColor: '#00000000', width: '100%'}}>
          <Label style={cs.label}>{title}</Label>
          <Input
            value={value}
            placeholder={placeholder}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={focus}
            keyboardType={numeric ? 'numeric' : 'default'}
            style={[cs.color_light_blue, {paddingLeft: 15}]}
            onChangeText={(v) => {
              onChange(v);
            }}
          />
        </Item>
      </InputGroup>
    );
  }
}

export default InputBox;
