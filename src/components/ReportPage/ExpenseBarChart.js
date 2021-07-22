import {View} from 'react-native';
import {connect} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {VictoryBar, VictoryLegend, VictoryTheme} from 'victory-native';

import {HeaderText} from '../Common';
import {selectExpenseData} from '../../selector';

import styles from './styles';
import cs from '../../styles/common';

const ExpenseBarChart = (props) => {
  let [data, setData] = useState(props.expenseData);
  useEffect(() => {
    setData(props.expenseData);
  }, [props.expenseData]);

  return (
    <View style={cs.center_item}>
      <HeaderText title={'Expense Bar'} style={cs.color_light_red} />
      {data && data.length > 0 && (
        <>
          <VictoryBar
            theme={VictoryTheme.material}
            colorScale={styles.colorScale}
            width={styles.width}
            data={data}
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
        </>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedItem: state.selectedItem,
    selectedReportType: state.selectedReportType,
    expenseData: selectExpenseData(state),
  };
};

export default connect(mapStateToProps, {})(ExpenseBarChart);
