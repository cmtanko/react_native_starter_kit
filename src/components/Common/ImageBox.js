/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {Image} from 'react-native';
import {View, Input, Button, Text} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';

import cs from '../../styles/common';
import {
  InputGroupContainer,
  IconContainer,
  ItemContainer,
  LabelContainer,
} from './styles';

export class ImageBox extends PureComponent {
  showImage(value) {
    if (value) {
      return (
        <Image
          style={{height: 200}}
          source={{
            uri: `data:image/png;base64,${value}`,
          }}
        />
      );
    }
  }

  showButton(type, value, placeholder, focus, numeric, onChange) {
    if (type === 'camera') {
      return (
        <Button
          transparent
          onPress={() =>
            launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: true,
                maxHeight: 200,
                maxWidth: 200,
              },
              (response) => {
                onChange(response);
              },
            )
          }>
          <Text style={cs.brandColorTertiary}>Attach receipt</Text>
        </Button>
      );
    } else {
      return (
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
      );
    }
  }

  render() {
    const {
      title,
      icon,
      value,
      type = 'text',
      onChange,
      placeholder = '',
      numeric = false,
      focus = false,
    } = this.props;
    return (
      <View>
        <InputGroupContainer>
          <IconContainer name={icon} />
          <ItemContainer
            stackedLabel
            style={{borderColor: '#00000000', width: '100%'}}>
            <LabelContainer>{title}</LabelContainer>
            {this.showButton(
              type,
              value,
              placeholder,
              focus,
              numeric,
              onChange,
            )}
          </ItemContainer>
        </InputGroupContainer>
        {this.showImage(value)}
      </View>
    );
  }
}

export default ImageBox;
