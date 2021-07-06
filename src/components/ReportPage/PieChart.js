import {View} from 'react-native';
import {connect} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {VictoryPie, VictoryTheme, VictoryLegend} from 'victory-native';

import {HeaderText} from '../Common';
import {selectExpenseData, selectIncomeData} from '../../selector';

import styles from './styles';
import cs from '../../styles/common';

const PieChart = (props) => {
  const {title, type} = props;
  let [data, setData] = useState(
    type === 'INCOME' ? props.incomeData : props.expenseData,
  );

  useEffect(() => {
    setData(type === 'INCOME' ? props.incomeData : props.expenseData);
  }, [props.expenseData, props.incomeData, type]);

  return (
    <View style={cs.center_item}>
      <HeaderText
        title={title}
        style={type === 'EXPENSE' ? cs.color_light_red : null}
      />
      <VictoryPie
        theme={VictoryTheme.material}
        colorScale={styles.colorScale}
        innerRadius={68}
        labelRadius={0}
        width={300}
        height={300}
        data={data}
        events={[]}
        style={{
          labels: styles.labels,
        }}
        animate={styles.animate1000}
      />
      <VictoryLegend
        x={16}
        symbolSpacer={8}
        theme={VictoryTheme.material}
        orientation="vertical"
        gutter={20}
        style={styles.legend}
        colorScale={styles.colorScale}
        data={data}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedItem: state.selectedItem,
    selectedReportType: state.selectedReportType,
    expenseData: selectExpenseData(state),
    incomeData: selectIncomeData(state),
  };
};

export default connect(mapStateToProps, {})(PieChart);
