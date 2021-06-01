/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Button, Text} from 'native-base';

import {selectCategoryType} from '../../actions';
import {CATEGORY_TYPE} from '../../constants';

import {SegmentContainer} from './SectionHeader.styles';

const SectionHeader = (props) => {
  const {selectCategoryType, selectedCategoryType} = props;

  return (
    <SegmentContainer>
      <Button
        first
        style={{
          borderColor: '#1C2544',
          borderBottomColor:
            selectedCategoryType === CATEGORY_TYPE.INCOME
              ? '#22e3c4'
              : '#1C2544',
          backgroundColor:
            selectedCategoryType === CATEGORY_TYPE.INCOME
              ? '#1C262E'
              : '#10151D',
        }}
        onPress={() => {
          selectCategoryType(CATEGORY_TYPE.INCOME);
        }}>
        <Text
          style={{
            color:
              selectedCategoryType === CATEGORY_TYPE.INCOME
                ? 'white'
                : '#666666',
          }}>
          INCOME
        </Text>
      </Button>

      <Button
        style={{
          borderColor: '#1C2533',
          borderBottomColor:
            selectedCategoryType === CATEGORY_TYPE.EXPENSE
              ? '#22e3c4'
              : '#1C2544',
          backgroundColor:
            selectedCategoryType === CATEGORY_TYPE.EXPENSE
              ? '#1C262E'
              : '#10151D',
        }}
        onPress={() => {
          selectCategoryType(CATEGORY_TYPE.EXPENSE);
        }}>
        <Text
          style={{
            color:
              selectedCategoryType === CATEGORY_TYPE.EXPENSE
                ? 'white'
                : '#666666',
          }}>
          EXPENSE
        </Text>
      </Button>

      <Button
        style={{
          borderColor: '#1C2533',
          borderBottomColor:
            selectedCategoryType === CATEGORY_TYPE.TRANSFER
              ? '#22e3c4'
              : '#1C2544',
          backgroundColor:
            selectedCategoryType === CATEGORY_TYPE.TRANSFER
              ? '#1C262E'
              : '#10151D',
        }}
        last
        onPress={() => {
          selectCategoryType(CATEGORY_TYPE.TRANSFER);
        }}>
        <Text
          style={{
            color:
              selectedCategoryType === CATEGORY_TYPE.TRANSFER
                ? 'white'
                : '#666666',
          }}>
          TRANSFER
        </Text>
      </Button>
    </SegmentContainer>
  );
};

const mapStateToProps = (state) => {
  return {selectedCategoryType: state.selectedCategoryType};
};

export default connect(mapStateToProps, {
  selectCategoryType,
})(SectionHeader);
