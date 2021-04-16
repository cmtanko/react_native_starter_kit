import _ from 'lodash';
import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Spinner, View} from 'native-base';
import CategoryRow from './CategoryRow';
import {getCategories} from '../../actions';

import {Text} from '../Typography/Text.component';

class CategoryList extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  showList() {
    const {categories, selectedCategoryType, loading} = this.props;
    const filteredList = _.filter(
      categories,
      (cat) => cat.type === selectedCategoryType,
    );

    if (loading) {
      return <Spinner />;
    }
    if (filteredList.length > 0) {
      return (
        <FlatList
          data={filteredList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderItem.bind(this)}
        />
      );
    }
    return (
      <Text variant="hint">No account found, Add by clicking plus button</Text>
    );
  }

  renderItem({item}) {
    return (
      <CategoryRow
        id={item.id}
        category={item}
        navigate={this.props.navigate}
      />
    );
  }

  render() {
    return <View>{this.showList()}</View>;
  }
}

const mapStateToProps = (state) => {
  const categories = _.map(state.category.list, (val) => {
    return val;
  });

  const {selectedCategoryType} = state;
  const {loading} = state.category;
  return {categories, selectedCategoryType, loading};
};

export default connect(mapStateToProps, {getCategories})(CategoryList);
