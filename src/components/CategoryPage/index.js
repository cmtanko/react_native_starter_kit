import React from 'react';
import {Container, Content, Fab, Icon} from 'native-base';
import {connect} from 'react-redux';
import CategoryList from './CategoryList';

import cs from '../../styles/common';
import SectionHeader from '../Dashboard/SectionHeader';
import {selectCategoryType} from '../../actions';

const CategoryPage = (props) => {
  const {navigation} = props;

  return (
    <Container style={cs.bg_dark_lightblue}>
      <SectionHeader />
      <Content style={{}}>
        <CategoryList navigate={navigation.navigate} />
      </Content>
      <Fab
        onPress={() => navigation.navigate('CategoryAdd')}
        direction="up"
        style={cs.bg_light_green}
        position="bottomRight">
        <Icon name="add" />
      </Fab>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {selectedCategoryType: state.selectedCategoryType};
};

export default connect(mapStateToProps, {selectCategoryType})(CategoryPage);
