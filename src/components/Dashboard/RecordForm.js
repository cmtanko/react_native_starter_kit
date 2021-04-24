import _ from 'lodash';
import React from 'react';
import {Text, Form, Item, Label, Icon, View, InputGroup} from 'native-base';
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
  selectedCategoryType,
}) => {
  const accountOptions = _.map(accounts, (val) => {
    return {label: val.title, value: val.id};
  });

  return (
    <Form style={cs.form}>
      <DatePickerBox
        title="Date"
        value={date}
        onChange={(value) => onStateChange('date', value)}
      />

      <InputBox
        title="Amount"
        placeholder=""
        icon="ios-calculator"
        value={amount}
        numeric={true}
        focus
        onChange={(value) => onStateChange('amount', value)}
      />

      <InputBox
        title="Description"
        placeholder=""
        icon="ios-document"
        value={description}
        onChange={(value) => onStateChange('description', value)}
      />

      {selectedCategoryType === CATEGORY_TYPE.INCOME && (
        <PickerBox
          title="Deposit to"
          type={payTo}
          options={accountOptions}
          onChange={(value) => onStateChange('payTo', value)}
        />
      )}

      {selectedCategoryType === CATEGORY_TYPE.EXPENSE && (
        <PickerBox
          title="Pay from"
          type={payFrom}
          options={accountOptions}
          onChange={(value) => onStateChange('payFrom', value)}
        />
      )}

      {selectedCategoryType === CATEGORY_TYPE.TRANSFER && (
        <PickerBox
          title="Account From"
          type={accountFrom}
          options={accountOptions}
          onChange={(value) => onStateChange('accountFrom', value)}
        />
      )}

      {selectedCategoryType === CATEGORY_TYPE.TRANSFER && (
        <PickerBox
          title="Account To"
          type={accountTo}
          options={accountOptions}
          onChange={(value) => onStateChange('accountTo', value)}
        />
      )}

      <InputGroup>
        <Icon name="ios-folder" style={cs.color_light_blue} />
        <Item stackedLabel style={cs.whiteBorder}>
          <Label style={cs.label}>Category</Label>
          <FlatList
            horizontal={false}
            numColumns={4}
            data={categories}
            itemDimension={50}
            keyExtractor={(item) => item.id}
            initialNumToRender={20}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => onStateChange('categoryId', item.id)}>
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
        </Item>
      </InputGroup>

      <ImageBox
        title="Camera"
        placeholder="Receipt"
        type="camera"
        icon="ios-camera"
        value={attachment}
        onChange={(value) => onStateChange('attachment', value.base64)}
      />
    </Form>
  );
};

export default RecordForm;
