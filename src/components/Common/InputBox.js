import React, {PureComponent} from 'react';

import {
  InputGroupContainer,
  IconContainer,
  ItemContainer,
  LabelContainer,
  InputContainer,
} from './styles';

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
      <InputGroupContainer>
        <IconContainer name={icon} />
        <ItemContainer stackedLabel>
          <LabelContainer>{title}</LabelContainer>
          <InputContainer
            value={value}
            placeholder={placeholder}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={focus}
            keyboardType={numeric ? 'numeric' : 'default'}
            returnKeyType="done"
            selectTextOnFocus={true}
            maxLength={numeric ? 10 : 20}
            onChangeText={(v) => {
              onChange(v);
            }}
          />
        </ItemContainer>
      </InputGroupContainer>
    );
  }
}

export default InputBox;
