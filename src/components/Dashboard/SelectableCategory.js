import React from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, View} from 'react-native';

import {RoundIcon} from '../Common';
import cs from '../../styles/common';
import {selectCategory} from '../../actions';

import {selectCategories} from '../../selector';

const SelectableCategory = (props) => {
  let {
    title = 'View Transaction by Category',
    categories,
    navigation,
    selectedItem,
    selectCategory,
  } = props;
  return (
    <View style={props.style}>
      <Text style={cs.overview_title}>{title}</Text>
      <View style={{height: 80, marginTop: 8}}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {navigation && (
            <RoundIcon
              title="Add"
              id={0}
              name="plus"
              onPress={() => {
                navigation.navigate('Category');
              }}
            />
          )}
          {categories.map((category) => {
            const {title, icon, id} = category;
            return (
              <RoundIcon
                selectedItem={selectedItem?.category}
                key={id}
                id={id}
                title={title}
                name={icon}
                onPress={() => {
                  selectCategory(id);
                }}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: selectCategories(state),
    selectedItem: state.selectedItem,
  };
};

export default connect(mapStateToProps, {
  selectCategory,
})(SelectableCategory);
