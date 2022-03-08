import _ from 'lodash';
import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Spinner, View} from 'native-base';
import CategoryRow from './CategoryRow';
import {editCategory, getCategories} from '../../actions';
import {selectCategories, selectCategoryLoading} from '../../selector';
import {Text} from '../Typography/Text.component';
class CategoryList extends Component {
  constructor(props) {
    super(props);
  }

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
          style={{marginBottom: 96}}
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
        onToggleFavorite={(newCategory) => {
          this.props.editCategory({
            ...newCategory,
            callback: () => {
              this.props.getCategories();
            },
          });
        }}
      />
    );
  }

  render() {
    return <View>{this.showList()}</View>;
  }
}

const mapStateToProps = (state) => {
  const {selectedCategoryType} = state;
  return {
    categories: selectCategories(state),
    selectedCategoryType,
    loading: selectCategoryLoading(state),
  };
};

export default connect(mapStateToProps, {editCategory, getCategories})(
  CategoryList,
);
