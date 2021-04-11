/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

import {colors, COLOR_LIGHT_BLUE, COLOR_LIGHT_YELLOW} from '../../theme/colors';
import {CATEGORY_TYPE} from '../../constants';

import {Text} from '../Typography/Text.component';

const RecordTimeLine = ({records, navigate}) => {
  return (
    <Timeline
      data={records}
      timeStyle={{color: 'white'}}
      circleColor={COLOR_LIGHT_BLUE}
      lineColor={COLOR_LIGHT_YELLOW}
      descriptionStyle={{color: COLOR_LIGHT_YELLOW}}
      titleStyle={colors.text.primary}
      options={{
        style: {paddingTop: 10},
      }}
      renderDetail={(rowData) => {
        let {title, amount, description, type} = rowData;
        return (
          <TouchableOpacity
            onPress={() => {
              navigate('RecordAddIncome', {record: rowData});
            }}
            style={{marginTop: -10}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <View style={{flex: 1}}>
                <Text>{title}</Text>
                <Text variant="subtitle">{description}</Text>
              </View>
              <View style={{flex: 1}}>
                {type === CATEGORY_TYPE.INCOME && (
                  <Text variant="typeIncome">{amount}</Text>
                )}
                {type === CATEGORY_TYPE.EXPENSE && (
                  <Text variant="typeExpense">- {amount}</Text>
                )}
                {type === CATEGORY_TYPE.TRANSFER && (
                  <Text variant="typeTransfer">- {amount}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default RecordTimeLine;
