import {VictoryPie, VictoryLegend, VictoryTheme} from 'victory-native';

import React from 'react';
import {View} from 'react-native';

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
    <View style={{flex: 1}}>
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
        events={[]}
        style={{
          labels: {
            fill: '#dddddd',
            fontSize: 12,
          },
        }}
        animate={{
          duration: 1000,
        }}
      />
      <VictoryLegend
        x={16}
        symbolSpacer={8}
        theme={VictoryTheme.material}
        orientation="vertical"
        gutter={20}
        style={{
          labels: {fill: 'white', fontSize: 14},
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
  );
};

export default RecordTransactionSummary;
