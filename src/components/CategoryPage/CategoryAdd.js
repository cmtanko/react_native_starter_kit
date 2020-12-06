import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Container, Content, Form, View} from 'native-base';

import {CATEGORY_TYPE} from '../../constants';
import {InputBox, ButtonBox, ErrorBox, PickerBox, IconBox} from '../Common';
import {
  addCategory,
  editCategory,
  deleteCategory,
  categoryInputChange,
} from '../../actions';

import icons from '../../iconList';

import cs from '../../styles/common';

let callback = null;

class CategoryAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      icon: 'home',
      type: CATEGORY_TYPE.INCOME,
    };

    callback = () => this.props.navigation.navigate('Category');

    this.addCategory = this.addCategory.bind(this);
    this.editCategory = this.editCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }

  componentDidMount() {
    const {params} = this.props.route;
    const {categoryType} = this.props;

    if (params) {
      const {category} = params;
      const {name, type, id, icon} = category;

      this.onStateChange('id', id);
      this.onStateChange('icon', icon);
      this.onStateChange('name', name);
      this.onStateChange('type', type);
    } else {
      this.onStateChange('type', categoryType);
    }
  }

  onStateChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  addCategory() {
    const {name, type, icon} = this.state;
    this.props.addCategory({
      name,
      type,
      icon,
      callback,
    });
  }

  editCategory() {
    const {name, type, icon, id} = this.state;
    this.props.editCategory({
      name,
      type,
      icon,
      id,
      callback,
    });
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
    const {id, name, type, icon, error} = this.state;

    return (
      <Container style={cs.bg_dark_lightblue}>
        <Content>
          <Form style={{marginLeft: 20, marginRight: 20}}>
            <InputBox
              title="Title"
              icon="ios-clipboard"
              value={name}
              focus
              onChange={(value) => this.onStateChange('name', value)}
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

            <IconBox
              title="Icon"
              icons={icons}
              icon={icon}
              onChange={(value) => this.onStateChange('icon', value)}
            />
          </Form>
          {this.showError(error)}
          {this.showButton(id)}
        </Content>
      </Container>
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
