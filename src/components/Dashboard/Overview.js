import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {Button, Title, List, Chip} from 'react-native-paper';
import {Container, Content, Icon, Header, Left, Body, Right} from 'native-base';
import {selectAccountType, selectAccount, selectCategory} from '../../actions';
import SelectableCategory from './SelectableCategory';
import {
  selectRecords,
  selectCategories,
  selectAccounts,
  selectTransactions,
} from '../../selector';
import {
  getRecords,
  getAccounts,
  getCategories,
  getBackup,
  getUserInfo,
  getSettings,
} from '../../actions';
import cs from '../../styles/common';

import {RoundIcon, RoundBoxButton} from '../Common';
const Overview = (props) => {
  useEffect(() => {
    props.getRecords();
    props.getAccounts();
    props.getCategories();
  }, []);

  const accounts = props.accounts;
  const ACCOUNT_TYPE = {
    INCOME: 'payTo',
    EXPENSE: 'payFrom',
    TRANSFER: 'TRANSFER',
  };

  const ACCOUNT_TYPE_VALUE = {
    INCOME: 1,
    EXPENSE: -1,
    TRANSFER: 1,
  };

  const currencify = (currencyInString) => {
    return parseFloat(currencyInString).toLocaleString(undefined, {
      minimumFractionDigits: 0,
    });
  };

  const getTransactionsByAccount = (accountId) => {
    let a = props.transactions.filter((t) => {
      let accountType = ACCOUNT_TYPE[t.category?.type];

      return accountType === 'TRANSFER'
        ? t.payFrom === accountId || t.payTo === accountId
        : t[accountType] === accountId;
    });
    return a;
  };

  const getSum = (transactions, account) => {
    const sum = transactions.reduce(
      (acc, record) =>
        acc +
        parseFloat(record.amount) *
          (record.category.type === 'TRANSFER'
            ? record.payFrom === account.id
              ? -1
              : 1
            : ACCOUNT_TYPE_VALUE[record.category.type]),
      parseFloat(account.openingBalance) || 0,
    );
    return sum;
  };

  const totalAmountInAccount = props.accounts.reduce(
    (accumulator, account) =>
      accumulator + getSum(getTransactionsByAccount(account.id), account),
    0,
  );

  return (
    <Container style={[cs.brandBgColorSecondary]}>
      <View id="topSection" style={cs.pb8}>
        <Header transparent>
          <Left style={{flex: 1}}>
            <Button
              transparent
              style={{marginLeft: -16}}
              onPress={() => props.navigation.openDrawer()}>
              <Icon name="menu" style={[cs.color_white, {fontSize: 24}]} />
            </Button>
          </Left>
          <Body
            style={{
              flex: 4,
              alignItems: 'center',
            }}>
            <Title style={cs.header_title}>Your Balance</Title>
          </Body>
          <Right style={{flex: 1}}>
            <Icon
              name="cog"
              type="FontAwesome"
              onPress={() => {
                props.navigation.navigate('Setting', {hideProfile: true});
              }}
              style={[cs.color_white, {fontSize: 24}]}
            />
          </Right>
        </Header>

        <View style={[cs.center, {height: 96}]}>
          <Text style={cs.overview_heading}>
            $ {currencify(totalAmountInAccount)}
          </Text>
          <Text style={cs.overview_subtitle}>In Total</Text>
        </View>

        <View style={{height: 80}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{}}>
            <RoundBoxButton
              testID="addaccount"
              title="Add Account"
              subtitle="+"
              id={0}
              onPress={() => {
                props.navigation.navigate('Account');
              }}
            />
            {props.accounts.map((account) => {
              const {title, id, openingBalance} = account;

              const totalBalance = currencify(
                getSum(getTransactionsByAccount(id), account),
              );

              return (
                <RoundBoxButton
                  id={id}
                  key={id}
                  selectedItem={props?.selectedItem?.account}
                  title={title}
                  subtitle={'$ ' + totalBalance}
                  onPress={() => {
                    props.selectAccount(id);
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>

      <View id="bottomSection" style={cs.section_bottom}>
        <SelectableCategory
          navigation={props.navigation}
          style={{paddingTop: 40}}
        />
        <View
          style={{
            flex: 1,
            paddingTop: 0,
          }}>
          <View style={{flexDirection: 'row', height: 32}}>
            <Text style={[cs.overview_title, {flex: 3}]}>Transactions</Text>
            <Chip
              testID="viewAll"
              icon="folder-open"
              selectedColor="white"
              style={{
                backgroundColor: '#243855',
                color: 'white',
                marginRight: 8,
              }}
              textStyle={{
                color: 'white',
              }}
              onPress={() => props.navigation.navigate('Home')}>
              View All
            </Chip>
            <Chip
              testID="addNewRecord"
              icon="plus"
              selectedColor="white"
              style={{
                backgroundColor: '#243855',
                color: 'white',
              }}
              textStyle={{
                color: 'white',
              }}
              onPress={() =>
                props.navigation.navigate('RecordAddIncome', {
                  navigateBackTo: 'Overview',
                })
              }>
              Add New
            </Chip>
          </View>
          <Content>
            <List.Section>
              {props.transactions
                .filter((t) =>
                  props.selectedItem.category
                    ? t.categoryId === props.selectedItem.category
                    : true,
                )
                .filter((t) => {
                  let accountType = ACCOUNT_TYPE[t.category?.type];
                  return props.selectedItem.account
                    ? accountType === 'TRANSFER'
                      ? t.payFrom === props.selectedItem.account ||
                        t.payTo === props.selectedItem.account
                      : t[accountType] === props.selectedItem.account
                    : true;
                })
                .map((record) => {
                  const {
                    id,
                    payTo,
                    amount,
                    payFrom,
                    category,
                    description,
                  } = record;
                  if (!category) {
                    return;
                  }
                  return (
                    <List.Item
                      key={id}
                      titleStyle={[
                        cs.color_white,
                        cs.h3,
                        {fontWeight: '700', marginTop: -8},
                      ]}
                      descriptionStyle={[cs.color_white]}
                      left={() => (
                        <Icon
                          type="FontAwesome"
                          name={category.icon}
                          style={[cs.left_icon]}
                        />
                      )}
                      right={(props) => (
                        <Text style={[cs.h3, cs.color_white]}>
                          {category.type === 'INCOME'
                            ? '+ '
                            : category.type === 'EXPENSE'
                            ? '- '
                            : ''}
                          ${currencify(amount)}
                        </Text>
                      )}
                      title={category.title}
                      description={description}
                      onPress={() => {
                        props.navigation.navigate('RecordAddIncome', {
                          navigateBackTo: 'Overview',
                          record: {
                            ...record,
                            type: category.type,
                          },
                        });
                      }}
                    />
                  );
                })}
            </List.Section>
          </Content>
        </View>
      </View>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    records: selectRecords(state),
    accounts: selectAccounts(state),
    categories: selectCategories(state),
    transactions: selectTransactions(state),
    settings: state.settings,
    selectedItem: state.selectedItem,
  };
};

export default connect(mapStateToProps, {
  getBackup,
  getUserInfo,
  getRecords,
  getSettings,
  getAccounts,
  getCategories,
  selectAccountType,
  selectAccount,
  selectCategory,
})(Overview);
