import _ from 'lodash';
import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import {Text, Spinner, Content} from 'native-base';
import CategoryRow from './CategoryRow';
import {getCategories} from '../../actions';

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
      <Text style={{color: 'gray', textAlign: 'center'}}>
        No category found, Add by clicking plus button
      </Text>
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
    return <Content>{this.showList()}</Content>;
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
