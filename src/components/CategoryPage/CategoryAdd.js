import {connect} from 'react-redux';
import React, {Component} from 'react';
import {FlatList, View, TouchableOpacity} from 'react-native';
import {Text, Icon, Content, Form} from 'native-base';
import {Modal, Portal} from 'react-native-paper';
import {Provider} from 'react-native-paper';
import {CATEGORY_TYPE} from '../../constants';
import {
  InputBox,
  ButtonBox,
  ErrorBox,
  PickerBox,
  IconModalBox,
} from '../Common';
import {
  addCategory,
  editCategory,
  deleteCategory,
  categoryInputChange,
} from '../../actions';

import icons from '../../iconList';
import cs from '../../styles/common';

import {CategoryAddContainer, CategoryForm} from './index.styles';

let callback = null;

class CategoryAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: '',
      icon: 'home',
      type: CATEGORY_TYPE.INCOME,
      modalVisible: false,
    };

    callback = () => this.props.navigation.navigate('Category');

    this.addCategory = this.addCategory.bind(this);
    this.editCategory = this.editCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    const {params} = this.props.route;
    const {categoryType} = this.props;

    if (params) {
      const {navigateBackTo, key, updateRecordState} = params;
      const isOpenedFromModalWindowShortCut = !!navigateBackTo;
      if (isOpenedFromModalWindowShortCut) {
        callback = (cat) => {
          this.props.navigation.navigate(navigateBackTo);
          updateRecordState(key, cat.id);
        };
        this.onStateChange('type', categoryType);
        return;
      }

      const {category} = params;
      const {title, type, id, icon} = category;

      this.onStateChange('id', id);
      this.onStateChange('icon', icon);
      this.onStateChange('title', title);
      this.onStateChange('type', type);
    } else {
      this.onStateChange('type', categoryType);
    }
  }

  showModal() {
    this.setState({
      modalVisible: true,
    });
  }

  hideModal() {
    this.setState({
      modalVisible: false,
    });
  }

  onStateChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  addCategory() {
    const {title, type, icon} = this.state;
    if (!title.trim()) {
      this.onStateChange('error', 'Category title cannot be empty');
    } else {
      this.props.addCategory({
        title: title.trim(),
        type,
        icon,
        callback,
      });
    }
  }

  editCategory() {
    const {title, type, icon, id} = this.state;
    if (!title.trim()) {
      this.onStateChange('error', 'Category title cannot be empty');
    } else {
      this.props.editCategory({
        title: title.trim(),
        type,
        icon,
        id,
        callback,
      });
    }
  }

  deleteCategory() {
    const {id} = this.state;
    this.props.deleteCategory({
      id,
      callback,
    });
  }

  showError(error) {
    if (error) {
      return <ErrorBox error={error} />;
    }
  }

  showButton(id) {
    if (id) {
      return (
        <View>
          <ButtonBox title="Edit" onChange={this.editCategory} />
          <ButtonBox title="Delete" btnDelete onChange={this.deleteCategory} />
        </View>
      );
    }
    return <ButtonBox title="Add" onChange={this.addCategory} />;
  }

  render() {
    const {id, title, type, icon, error} = this.state;

    return (
      <Provider>
        <CategoryAddContainer>
          <Content>
            <Portal>
              <Modal
                animationType="slide"
                visible={this.state.modalVisible}
                onDismiss={this.hideModal}
                contentContainerStyle={{
                  backgroundColor: '#0F171E',
                  alignSelf: 'center',
                  height: '64%',
                  borderRadius: 20,
                  width: '80%',
                }}>
                <FlatList
                  ListHeaderComponent={() => (
                    <View style={cs.padding_large}>
                      <Text
                        style={[
                          cs.h2,
                          cs.center,
                          cs.color_grey,
                          cs.padding_large,
                        ]}>
                        Select Icon
                      </Text>
                    </View>
                  )}
                  horizontal={false}
                  numColumns={4}
                  data={icons}
                  itemDimension={50}
                  keyExtractor={(item) => item}
                  initialNumToRender={20}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.onStateChange('icon', item);
                        this.hideModal();
                      }}>
                      <View style={cs.iconContainer}>
                        <Icon
                          type="FontAwesome"
                          name={item}
                          style={
                            icon === item ? cs.activeIcon : cs.inactiveIcon
                          }
                        />
                        <Text
                          numberOfLines={1}
                          style={
                            icon === item ? cs.activeText : cs.inactiveText
                          }>
                          {item}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </Modal>
            </Portal>
            <CategoryForm>
              <InputBox
                title="Title"
                icon="ios-clipboard"
                value={title}
                focus
                onChange={(value) => this.onStateChange('title', value)}
              />
              <PickerBox
                title="Type"
                type={type}
                options={[
                  {
                    label: CATEGORY_TYPE.INCOME.toString(),
                    value: CATEGORY_TYPE.INCOME,
                  },
                  {
                    label: CATEGORY_TYPE.EXPENSE.toString(),
                    value: CATEGORY_TYPE.EXPENSE,
                  },
                  {
                    label: CATEGORY_TYPE.TRANSFER.toString(),
                    value: CATEGORY_TYPE.TRANSFER,
                  },
                ]}
                onChange={(value) => this.onStateChange('type', value)}
              />

              <IconModalBox
                headingIcon="ios-globe"
                headingTitle="Icon"
                title="Select Icon"
                icons={icons}
                icon={icon}
                onPress={this.showModal}
              />
            </CategoryForm>
            {this.showError(error)}
            {this.showButton(id)}
          </Content>
        </CategoryAddContainer>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.category.error,
    loading: state.category.loading,
    categoryType: state.selectedCategoryType,
  };
};

CategoryAdd.propTypes = {};

export default connect(mapStateToProps, {
  addCategory,
  editCategory,
  deleteCategory,
  categoryInputChange,
})(CategoryAdd);
