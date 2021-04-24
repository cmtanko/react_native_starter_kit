/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {Image} from 'react-native';
import {
  View,
  Item,
  Label,
  Input,
  Icon,
  InputGroup,
  Button,
  Text,
} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';

import cs from '../../styles/common';

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
          <Text>Attach receipt</Text>
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
        <InputGroup>
          <Icon name={icon} style={[cs.color_light_blue, cs.h2, {width: 35}]} />
          <Item stackedLabel style={{borderColor: '#00000000', width: '100%'}}>
            <Label style={cs.label}>{title}</Label>
            {this.showButton(
              type,
              value,
              placeholder,
              focus,
              numeric,
              onChange,
            )}
          </Item>
        </InputGroup>
        {this.showImage(value)}
      </View>
    );
  }
}

export default ImageBox;
