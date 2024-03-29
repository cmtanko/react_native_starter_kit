import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import {
  Text,
  Form,
  Item,
  Icon,
  View,
  Label,
  Button,
  InputGroup,
} from 'native-base';
import {Modal, Portal} from 'react-native-paper';
import {FlatList, TouchableOpacity} from 'react-native';

import cs from '../../styles/common';
import {InputBox, ImageBox, PickerBox, DatePickerBox} from '../Common';

import {CATEGORY_TYPE} from '../../constants';

const RecordForm = ({
  date,
  payTo,
  amount,
  payFrom,
  accounts,
  accountTo,
  attachment,
  categories,
  categoryId,
  description,
  accountFrom,
  onStateChange,
  showCategoryModal = false,
  selectedCategoryType,
}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
    onStateChange('showCategoryModal', true);
  };

  const hideModal = () => {
    setVisible(false);
    onStateChange('showCategoryModal', false);
  };

  useEffect(() => {
    setVisible(showCategoryModal);
  });

  const containerStyle = {
    backgroundColor: '#0F171E',
    alignSelf: 'center',
    height: '64%',
    width: '80%',
    borderRadius: 20,
  };

  const accountOptions = _.map(accounts, (val) => {
    return {label: val.title, value: val.id};
  });

  const showCategory = () => {
    if (!categoryId) {
      return (
        <Button testID="recordSelectCategory" transparent onPress={showModal}>
          <Text style={cs.brandColorTertiary}>Select category</Text>
        </Button>
      );
    } else {
      let item = categories.find((cat) => cat.id === categoryId);
      return (
        <TouchableOpacity testID="recordSelectIcon" onPress={showModal}>
          <View style={cs.iconContainer}>
            <Icon
              type="FontAwesome"
              name={item.icon}
              style={categoryId === item.id ? cs.activeIcon : cs.inactiveIcon}
            />
            <Text
              numberOfLines={1}
              style={categoryId === item.id ? cs.activeText : cs.inactiveText}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View>
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
                  Select Category
                </Text>
              </View>
            )}
            horizontal={false}
            numColumns={4}
            data={categories
              .filter(
                (cat) => cat.type === selectedCategoryType || cat.type === '',
              )
              .sort((a, b) => {
                return b.isFavorite - a.isFavorite;
              })}
            itemDimension={50}
            keyExtractor={(item) => item.id}
            initialNumToRender={20}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  onStateChange('categoryId', item.id);
                  hideModal();
                }}>
                <View style={cs.iconContainer}>
                  <Icon
                    type="FontAwesome"
                    name={item.icon}
                    style={
                      categoryId === item.id ? cs.activeIcon : cs.inactiveIcon
                    }
                  />
                  <Text
                    numberOfLines={1}
                    style={
                      categoryId === item.id ? cs.activeText : cs.inactiveText
                    }>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </Modal>
      </Portal>
      <Form style={cs.form}>
        <DatePickerBox
          title="Date"
          value={date}
          onChange={(value) => onStateChange('date', value)}
        />

        <InputBox
          testID="recordAmount"
          title="Amount"
          placeholder=""
          icon="ios-calculator"
          value={amount}
          numeric={true}
          returnKeyType="done"
          focus
          onChange={(value) => onStateChange('amount', value)}
        />

        <InputBox
          testID="recordDescription"
          title="Description"
          placeholder=""
          icon="ios-document"
          value={description}
          onChange={(value) => onStateChange('description', value)}
        />

        {selectedCategoryType === CATEGORY_TYPE.INCOME && (
          <PickerBox
            testID="recordDepositTo"
            title="Deposit to"
            type={payTo}
            options={accountOptions}
            onChange={(value) => onStateChange('payTo', value)}
          />
        )}

        {selectedCategoryType === CATEGORY_TYPE.EXPENSE && (
          <PickerBox
            testID="recordPayFrom"
            title="Pay from"
            type={payFrom}
            options={accountOptions}
            onChange={(value) => onStateChange('payFrom', value)}
          />
        )}

        {selectedCategoryType === CATEGORY_TYPE.TRANSFER && (
          <PickerBox
            testID="recordAccountFrom"
            title="Account From"
            type={payFrom}
            options={accountOptions}
            onChange={(value) => onStateChange('payFrom', value)}
          />
        )}

        {selectedCategoryType === CATEGORY_TYPE.TRANSFER && (
          <PickerBox
            testID="recordAccountTo"
            title="Account To"
            type={payTo}
            options={accountOptions}
            onChange={(value) => onStateChange('payTo', value)}
          />
        )}

        <InputGroup
          style={{
            borderBottomWidth: 0,
          }}>
          <Icon name="ios-folder" style={cs.color_light_blue} />
          <Item stackedLabel style={cs.whiteBorder}>
            <Label style={cs.label}>Category</Label>
            {showCategory(categoryId)}
          </Item>
        </InputGroup>

        <ImageBox
          testID="recordCamera"
          title="Camera"
          placeholder="Receipt"
          type="camera"
          icon="ios-camera"
          value={attachment}
          onChange={(value) => onStateChange('attachment', value.base64)}
        />
      </Form>
    </View>
  );
};

export default RecordForm;
