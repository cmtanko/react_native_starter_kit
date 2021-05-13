import _ from 'lodash';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Provider} from 'react-native-paper';
import {Container, Content, View} from 'native-base';

import RecordForm from './RecordForm';
import SectionHeader from './SectionHeader';
import {ButtonBox, ErrorBox} from '../Common';
import {
  addRecord,
  editRecord,
  deleteRecord,
  selectCategoryType,
} from '../../actions';

import cs from '../../styles/common';

let callback = null;

class RecordAddIncome extends Component {
  constructor(props) {
    super(props);

    let firstAccount =
      !!props.accounts && props.accounts[0] && props.accounts[0].id;

    this.state = {
      id: '',
      amount: '',
      date: new Date(),
      categoryId: '',
      payFrom: firstAccount || '',
      payTo: firstAccount || '',
      description: '',
      place: '',
      attachment: '',
      formType: '',
      error: '',
      selectedCategoryType: 'INCOME',
    };

    callback = () => this.props.navigation.navigate('Home');

    this.addMyRecord = this.addMyRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }

  componentDidMount() {
    const {params} = this.props.route;

    if (params) {
      const {
        id,
        amount,
        date,
        type,
        categoryId,
        payFrom,
        description,
        payTo,
        place,
        camera: attachment,
      } = params.record;
      this.setState({
        id,
        amount: amount.toString(),
        date,
        categoryId,
        description,
        payFrom,
        payTo,
        place,
        attachment,
        selectedCategoryType: type,
        formType: type,
      });
      this.props.selectCategoryType(type);
    }
  }

  onStateChange(key, value) {
    if (key === 'categoryId' && value === 0) {
      this.props.navigation.navigate('CategoryAdd', {
        navigateBackTo: 'RecordAddIncome',
      });
    }
    this.setState({
      [key]: value,
    });
  }

  addMyRecord() {
    let {
      id,
      amount,
      date,
      categoryId,
      payFrom,
      payTo,
      description,
      place,
      attachment,
    } = this.state;
    amount = parseInt(amount, 10) || -1;
    if (amount <= 0 || !categoryId || !payFrom) {
      this.onStateChange('error', 'All fields are required!');
    } else {
      if (id) {
        this.props.editRecord({
          id,
          amount,
          date,
          categoryId,
          payFrom,
          payTo,
          description,
          place,
          attachment,
          callback,
        });
      } else {
        this.props.addRecord({
          amount,
          date: date.toISOString(),
          categoryId,
          payFrom,
          payTo,
          description,
          place,
          attachment,
          callback,
        });
      }
      this.onStateChange('error', '');
    }
  }

  deleteRecord() {
    const {id} = this.state;
    this.props.deleteRecord({
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
          <ButtonBox title="Edit" onChange={this.addMyRecord} />
          <ButtonBox title="Delete" btnDelete onChange={this.deleteRecord} />
        </View>
      );
    }
    return <ButtonBox title="Add" onChange={this.addMyRecord} />;
  }

  render() {
    const {accounts, categories} = this.props;
    const {id, categoryId, error} = this.state;

    return (
      <Provider>
        <Container style={cs.bg_dark_lightblue}>
          <SectionHeader />
          <Content>
            <RecordForm
              date={this.state.date}
              onStateChange={this.onStateChange}
              amount={this.state.amount}
              description={this.state.description}
              selectedCategoryType={this.props.selectedCategoryType}
              accounts={accounts}
              payFrom={this.state.payFrom}
              payTo={this.state.payTo}
              accountFrom={this.state.accountFrom}
              accountTo={this.state.accountTo}
              attachment={this.state.attachment}
              categories={[
                ...categories,
                {id: 0, title: 'Add Category', icon: 'plus', type: ''},
              ]}
              categoryId={categoryId}
            />
            {this.showError(error)}
            {this.showButton(id)}
          </Content>
        </Container>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    account: {list: accounts},
    category: {list: categories},
  } = state;

  return {
    accounts,
    categories,
    selectedCategoryType: state.selectedCategoryType,
    error: state.account.error,
    loading: state.account.loading,
  };
};

export default connect(mapStateToProps, {
  addRecord,
  editRecord,
  deleteRecord,
  selectCategoryType,
})(RecordAddIncome);
