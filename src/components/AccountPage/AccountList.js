import _ from 'lodash';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {View, Spinner} from 'native-base';
import React, {PureComponent} from 'react';

import AccountRow from './AccountRow';
import {getAccounts} from '../../actions';
import {Text} from '../Typography/Text.component';

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
          keyExtractor={(item) => item.id.toString()}
        />
      );
    }
    return (
      <Text variant="hint">No account found, Add by clicking plus button</Text>
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
