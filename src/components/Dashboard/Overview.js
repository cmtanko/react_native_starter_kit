import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {Button, Title, List} from 'react-native-paper';
import {Container, Content, Icon, Header, Left, Body, Right} from 'native-base';
import {selectAccountType, selectAccount, selectCategory} from '../../actions';

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
  const totalAmountInAccount = props.accounts.reduce(
    (accumulator, currentValue) =>
      accumulator + parseFloat(currentValue.openingBalance),
    0,
  );
  return (
    <Container style={[cs.brandBgColorSecondary]}>
      <View id="topSection" style={cs.pb8}>
        <Header transparent>
          <Left>
            <Button
              transparent
              style={{marginLeft: -16}}
              onPress={() => props.navigation.openDrawer()}>
              <Icon name="menu" style={cs.color_white} />
            </Button>
          </Left>
          <Body>
            <Title style={cs.overview_subtitle}>Your Balance</Title>
          </Body>
          <Right />
        </Header>

        <View style={[cs.center, {height: 96}]}>
          <Text style={cs.overview_heading}>
            ${' '}
            {totalAmountInAccount.toLocaleString(undefined, {
              minimumFractionDigits: 0,
            })}
          </Text>
          <Text style={cs.overview_subtitle}>In Total</Text>
        </View>

        <View style={{height: 80}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{}}>
            <RoundBoxButton
              title="Add Account"
              subtitle="+"
              id={0}
              onPress={() => {
                props.navigation.navigate('Account');
              }}
            />
            {props.accounts.map((account) => {
              const {title, id, openingBalance} = account;
              return (
                <RoundBoxButton
                  id={id}
                  selectedItem={props?.selectedItem?.account}
                  title={title}
                  subtitle={parseFloat(openingBalance).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 0,
                    },
                  )}
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
        <View style={{paddingTop: 48}}>
          <Text style={cs.overview_title}>View Transaction by Category</Text>
          <View style={{height: 80, marginTop: 8}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              <RoundIcon
                title="Add"
                id={0}
                name="plus"
                onPress={() => {
                  props.navigation.navigate('Category');
                }}
              />
              {props.categories.map((category) => {
                const {title, icon, id} = category;
                return (
                  <RoundIcon
                    selectedItem={props?.selectedItem?.category}
                    id={id}
                    title={title}
                    name={icon}
                    onPress={() => {
                      props.selectCategory(id);
                    }}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            paddingTop: 0,
          }}>
          <View style={{flexDirection: 'row', height: 24}}>
            <Text style={[cs.overview_title, {flex: 3}]}>
              Today's Transaction
            </Text>
            <Text
              style={{
                flex: 1,
                paddingRight: 8,
                textAlign: 'right',
                color: 'white',
                fontWeight: '700',
              }}
              onPress={() => {
                props.navigation.navigate('Home');
              }}>
              View All
            </Text>
          </View>
          <Content>
            <List.Section>
              {props.transactions
                .filter((t) =>
                  props.selectedItem.category
                    ? t.categoryId === props.selectedItem.category
                    : true,
                )
                .filter((t) =>
                  props.selectedItem.account
                    ? t.payFrom === props.selectedItem.account ||
                      t.payTo === props.selectedItem.account
                    : true,
                )
                .map((record) => {
                  const {
                    id,
                    payTo,
                    amount,
                    payFrom,
                    category,
                    description,
                  } = record;
                  if (!category) return;
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
                          {category.type === 'INCOME' ? '+' : '-'} ${amount}
                        </Text>
                      )}
                      title={category.title}
                      description={description}
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
