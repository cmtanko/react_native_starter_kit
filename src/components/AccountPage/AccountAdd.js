import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Content, View, Form} from 'native-base';

import icons from '../../iconList';
import {InputBox, ButtonBox, ErrorBox, PickerBox, IconBox} from '../Common';
import {addAccount, editAccount, deleteAccount} from '../../actions';

import {AccountAddContainer, AccountForm} from './index.styles';

let callback = null;
class AccountAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: '',
      openingBalance: '',
      balance: '0',
      type: 'BANK',
      icon: 'bank',
    };

    callback = () => this.props.navigation.navigate('Account');

    this.addAccount = this.addAccount.bind(this);
    this.editAccount = this.editAccount.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }

  componentDidMount() {
    const {params} = this.props.route;

    if (params) {
      const {account} = params;
      const {id, icon, type, title, balance, openingBalance} = account;

      this.onStateChange('id', id);
      this.onStateChange('icon', icon);
      this.onStateChange('type', type);
      this.onStateChange('title', title);
      this.onStateChange('openingBalance', balance);
      this.onStateChange('openingBalance', openingBalance.toString());
    } else {
      // this.onStateChange('type', type);
    }
  }

  onStateChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  addAccount() {
    const {title, openingBalance, type, icon} = this.state;
    this.props.addAccount({
      title,
      openingBalance,
      type,
      icon,
      callback,
    });
  }

  editAccount() {
    const {id, title, openingBalance, balance, type, icon} = this.state;
    this.props.editAccount({
      id,
      title,
      openingBalance,
      balance,
      type,
      icon,
      callback,
    });
  }

  deleteAccount() {
    const {id} = this.state;
    this.props.deleteAccount({
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
          <ButtonBox title="Edit" onChange={this.editAccount} />
          <ButtonBox title="Delete" btnDelete onChange={this.deleteAccount} />
        </View>
      );
    }
    return <ButtonBox title="Add" onChange={this.addAccount} />;
  }

  render() {
    const {id, title, type, icon, openingBalance, error} = this.state;

    return (
      <AccountAddContainer>
        <Content>
          <Form>
            <AccountForm>
              <InputBox
                title="Account Name"
                placeholder="Bank / Cash"
                icon="ios-clipboard"
                value={title}
                focus
                onChange={(value) => this.onStateChange('title', value)}
              />
              <InputBox
                title="Opening Balance"
                placeholder=""
                numeric={true}
                icon="ios-calculator"
                value={openingBalance}
                onChange={(value) =>
                  this.onStateChange('openingBalance', value)
                }
              />

              <PickerBox
                title="Account Type"
                type={type}
                options={[
                  {label: 'Cash', value: 'CASH'},
                  {label: 'Bank', value: 'BANK'},
                  {label: 'Others', value: 'OTHERS'},
                ]}
                onChange={(value) => this.onStateChange('type', value)}
              />

              <IconBox
                title="Icon"
                icons={icons}
                icon={icon}
                onChange={(value) => this.onStateChange('icon', value)}
              />
            </AccountForm>

            {this.showError(error)}
            {this.showButton(id)}
          </Form>
        </Content>
      </AccountAddContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.account.error,
    loading: state.account.loading,
  };
};

export default connect(mapStateToProps, {
  addAccount,
  editAccount,
  deleteAccount,
})(AccountAdd);
