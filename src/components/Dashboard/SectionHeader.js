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
        active={selectedCategoryType === CATEGORY_TYPE.INCOME}
        onPress={() => {
          selectCategoryType(CATEGORY_TYPE.INCOME);
        }}>
        <Text>INCOME</Text>
      </Button>

      <Button
        active={selectedCategoryType === CATEGORY_TYPE.EXPENSE}
        onPress={() => {
          selectCategoryType(CATEGORY_TYPE.EXPENSE);
        }}>
        <Text>EXPENSE</Text>
      </Button>

      <Button
        last
        active={selectedCategoryType === CATEGORY_TYPE.TRANSFER}
        onPress={() => {
          selectCategoryType(CATEGORY_TYPE.TRANSFER);
        }}>
        <Text>TRANSFER</Text>
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
