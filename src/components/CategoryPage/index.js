import React from 'react';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import CategoryList from './CategoryList';

import SectionHeader from '../Dashboard/SectionHeader';
import {selectCategoryType} from '../../actions';

import {CategoryPageContainer, CategoryPageFab} from './index.styles';

const CategoryPage = (props) => {
  const {navigation} = props;

  return (
    <CategoryPageContainer>
      <SectionHeader />
      <CategoryList navigate={navigation.navigate} />
      <CategoryPageFab
        onPress={() => navigation.navigate('CategoryAdd')}
        direction="up"
        position="bottomRight">
        <Icon name="add" />
      </CategoryPageFab>
    </CategoryPageContainer>
  );
};

const mapStateToProps = (state) => {
  return {selectedCategoryType: state.selectedCategoryType};
};

export default connect(mapStateToProps, {selectCategoryType})(CategoryPage);
