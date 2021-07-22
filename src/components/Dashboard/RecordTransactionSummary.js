import {VictoryPie, VictoryLegend, VictoryTheme} from 'victory-native';

import React from 'react';
import {View, Text} from 'react-native';
import cs from '../../styles/common';

const RecordTransactionSummary = ({
  records,
  accounts,
  categories,
  selectedMonth,
  type = 'EXPENSE',
}) => {
  let categoryWiseRecords = [];

  categoryWiseRecords = categories
    .filter((cat) => {
      return cat.type === type;
    })
    .map((category) => {
      return {
        x: category.title,
        name: category.title,
        y: records
          .filter(
            (record) =>
              new Date(record.date).getMonth().toString() === selectedMonth,
          )
          .filter((record) => record.categoryId === category.id)
          .reduce((accumulator, record) => {
            return accumulator + record.amount;
          }, 0),
      };
    })
    .filter((cat) => cat.y !== 0)
    .map((cat) => {
      return {...cat, name: cat.name + ': $' + cat.y};
    });

  return (
    <View style={{}}>
      <View style={cs.summary_header}>
        <Text
          style={[cs.h2, {color: type === 'INCOME' ? '#8658A5' : '#47985D'}]}>
          {type}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
        }}>
        <View style={{flex: 1}} />

        <View style={{flex: 6}}>
          <VictoryPie
            colorScale={[
              '#195B39',
              '#1C5A57',
              '#242F5B',
              '#55295B',
              '#5F2435',
              '#5A4B13',
              '#415B00',
              '#3A2D5B',
            ]}
            data={categoryWiseRecords}
            theme={VictoryTheme.material}
            innerRadius={50}
            width={248}
            events={[]}
            style={{
              labels: {
                fill: '#dddddd',
                fontSize: 8,
              },
            }}
            animate={{
              duration: 1000,
            }}
          />
        </View>
        <View
          style={{
            flex: 5,
            paddingTop: 64,
            justifyContent: 'center',
          }}>
          <VictoryLegend
            x={16}
            symbolSpacer={8}
            theme={VictoryTheme.material}
            orientation="vertical"
            gutter={20}
            style={{
              labels: {fill: 'white', fontSize: 10},
            }}
            colorScale={[
              '#195B39',
              '#1C5A57',
              '#242F5B',
              '#55295B',
              '#5F2435',
              '#5A4B13',
              '#415B00',
              '#3A2D5B',
            ]}
            data={categoryWiseRecords}
          />
        </View>
      </View>
    </View>
  );
};

export default RecordTransactionSummary;
