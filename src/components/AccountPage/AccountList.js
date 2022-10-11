import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {View, Spinner} from 'native-base';
import React, {PureComponent} from 'react';

import AccountRow from './AccountRow';
import {getAccounts, editAccount} from '../../actions';
import {Text} from '../Typography/Text.component';
import {selectAccounts, selectAccountLoading} from '../../selector';
class AccountList extends PureComponent {
  componentDidMount() {
    this.props.getAccounts();
  }

  showList() {
    const filteredList = this.props.accounts.filter((item) => {
      return item.isDeleted !== 1;
    });

    if (this.props.loading) {
      return <Spinner />;
    }
    if (filteredList.length) {
      return (
        <FlatList
          style={{marginBottom: 96}}
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
      <AccountRow
        id={item.id}
        account={item}
        navigate={this.props.navigate}
        onToggleFavorite={(newAccount) => {
          this.props.editAccount({
            ...newAccount,
            callback: () => {
              this.props.getAccounts();
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
  return {
    accounts: selectAccounts(state),
    loading: selectAccountLoading(state),
  };
};

export default connect(mapStateToProps, {getAccounts, editAccount})(
  AccountList,
);
