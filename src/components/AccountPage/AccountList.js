import _ from 'lodash';
import {connect} from 'react-redux';
import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';

import {Text, View, Spinner} from 'native-base';

import AccountRow from './AccountRow';
import {getAccounts} from '../../actions';

class AccountList extends PureComponent {
  componentDidMount() {
    this.props.getAccounts();
  }

  showList() {
    const filteredList = this.props.accounts;

    if (this.props.loading) {
      return <Spinner />;
    }
    if (filteredList.length) {
      return (
        <FlatList
          data={filteredList}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item) => item.id}
        />
      );
    }
    return (
      <Text style={{color: 'gray', textAlign: 'center'}}>
        No account found, Add by clicking plus button
      </Text>
    );
  }

  renderItem({item}) {
    return (
      <AccountRow id={item.id} account={item} navigate={this.props.navigate} />
    );
  }

  render() {
    return <View>{this.showList()}</View>;
  }
}

const mapStateToProps = (state) => {
  const accounts = _.map(state.account.list, (val) => {
    val.balance = val.balance || 0;
    return val;
  });
  const {loading} = state.account;
  return {accounts, loading};
};

export default connect(mapStateToProps, {getAccounts})(AccountList);
