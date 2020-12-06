import _ from 'lodash';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Container, Content, View} from 'native-base';

import RecordForm from './RecordForm';
import SectionHeader from './SectionHeader';
import {ButtonBox, ErrorBox} from '../Common';
import {addRecord, editRecord, deleteRecord} from '../../actions';

import cs from '../../styles/common';

let callback = null;

class RecordAddIncome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      amount: '',
      date: new Date(),
      categoryId: '',
      payFrom: '',
      payTo: '',
      description: '',
      place: '',
      attachment: '',
      formType: '',
      error: '',
      selectedCategoryType: 'INCOME',
    };

    callback = () => this.props.navigation.navigate('Home');

    this.addAccount = this.addAccount.bind(this);
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
        attachment,
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
    }
  }

  onStateChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  addAccount() {
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
    amount = parseInt(amount, 10);
    if (amount <= 0 && !categoryId && !payFrom) {
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
          <ButtonBox title="Edit" onChange={this.addAccount} />
          <ButtonBox title="Delete" btnDelete onChange={this.deleteRecord} />
        </View>
      );
    }
    return <ButtonBox title="Add" onChange={this.addAccount} />;
  }

  render() {
    const {accounts, categories} = this.props;
    const {id, categoryId, error} = this.state;

    return (
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
            categories={categories}
            categoryId={categoryId}
          />
          {this.showError(error)}
          {this.showButton(id)}
        </Content>
      </Container>
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
    categories: _.filter(
      categories,
      (category) => category.type === state.selectedCategoryType,
    ),
    selectedCategoryType: state.selectedCategoryType,
    error: state.account.error,
    loading: state.account.loading,
  };
};

export default connect(mapStateToProps, {
  addRecord,
  editRecord,
  deleteRecord,
})(RecordAddIncome);
