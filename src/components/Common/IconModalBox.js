/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {FlatList, TouchableOpacity} from 'react-native';
import {Alert, StyleSheet, Pressable, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {Text, Item, Icon, Label, Button, InputGroup} from 'native-base';
import {Modal, Portal} from 'react-native-paper';
import {Provider} from 'react-native-paper';

import cs from '../../styles/common';
import {IconModalBoxStyles} from './styles';

const IconModalBox = ({
  headingIcon = 'ios-globe',
  headingTitle = 'Icon',
  title,
  icons,
  icon,
  onChange,
}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showItems = (item) => {
    if (!icon) {
      return (
        <Button transparent onPress={showModal}>
          <Text>{title}</Text>
        </Button>
      );
    } else {
      return (
        <TouchableOpacity
          style={{marginTop: -16, marginLeft: -8}}
          onPress={showModal}>
          <View style={cs.iconContainer}>
            <Icon
              type="FontAwesome"
              name={icon}
              style={icon === item ? cs.activeIcon : cs.inactiveIcon}
            />
            <Text
              numberOfLines={1}
              style={icon === item ? cs.activeText : cs.inactiveText}>
              {icon}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const containerStyle = {
    backgroundColor: '#0F171E',
    flex: 1,
    marginBottom: -16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '110%',
  };

  return (
    <Provider>
      <InputGroup style={cs.borderZero}>
        <Portal>
          <Modal
            animationType="slide"
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <FlatList
              ListHeaderComponent={() => (
                <View style={cs.padding_large}>
                  <Text
                    style={[cs.h2, cs.center, cs.color_grey, cs.padding_large]}>
                    {title}
                  </Text>
                </View>
              )}
              horizontal={false}
              numColumns={4}
              data={icons}
              itemDimension={50}
              keyExtractor={(item) => item}
              initialNumToRender={20}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    onChange(item);
                    hideModal();
                  }}>
                  <View style={cs.iconContainer}>
                    <Icon
                      type="FontAwesome"
                      name={item}
                      style={icon === item ? cs.activeIcon : cs.inactiveIcon}
                    />
                    <Text
                      numberOfLines={1}
                      style={icon === item ? cs.activeText : cs.inactiveText}>
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </Modal>
        </Portal>
        <Icon name={headingIcon} style={cs.color_light_blue} />
        <Item stackedLabel style={cs.whiteBorder}>
          <Label style={cs.label}>{headingTitle}</Label>
          {showItems(icon)}
        </Item>
      </InputGroup>
    </Provider>
  );
};

export default IconModalBox;
