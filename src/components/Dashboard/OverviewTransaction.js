import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Title, List} from 'react-native-paper';
import {Container, Content, Icon, Header, Left, Body, Right} from 'native-base';
import cs from '../../styles/common';

const OverviewTransaction = (props) => {
  const ACCOUNT_TYPE = {
    INCOME: 'payTo',
    EXPENSE: 'payFrom',
    TRANSFER: 'TRANSFER',
  };

  return (
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
          const {id, payTo, amount, payFrom, category, description} = record;
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
                    ? '+'
                    : category.type === 'EXPENSE'
                    ? '-'
                    : ''}
                  ${amount}
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
  );
};

export default OverviewTransaction;

const styles = StyleSheet.create({});
