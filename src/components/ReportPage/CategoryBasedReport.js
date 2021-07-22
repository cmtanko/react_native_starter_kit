import {View} from 'react-native';
import {connect} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {VictoryLine, VictoryChart, VictoryScatter} from 'victory-native';

import {HeaderText} from '../Common';
import {chartTheme} from './ChartTheme';
import SelectableCategory from '../Dashboard/SelectableCategory';
import {selectRecordGroupedByCategoryAndYear} from '../../selector';

import styles from './styles';
import cs from '../../styles/common';

const CategoryBasedReport = (props) => {
  const {recordGroupedByCategoryAndYear, selectedItem} = props;
  let [categoryItem, setCategoryItem] = useState([]);

  useEffect(() => {
    if (selectedItem.category > 0) {
      setCategoryItem(
        recordGroupedByCategoryAndYear[selectedItem.category] || [],
      );
    }
  }, [recordGroupedByCategoryAndYear, selectedItem.category, categoryItem]);

  return (
    <View style={cs.center_item}>
      <HeaderText title={'Report by Category'} />
      {categoryItem && (
        <VictoryChart theme={chartTheme}>
          <VictoryScatter
            animate={styles.animate500}
            data={categoryItem.map((val) => {
              return {
                x: val.x,
                y: val.y > 0 ? val.y : null,
                label: val.y > 0 ? val.y.toString() : '',
              };
            })}
            style={styles.scatterChart}
          />

          <VictoryLine
            animate={styles.animate100}
            style={styles.lineChart}
            data={categoryItem}
          />
        </VictoryChart>
      )}
      <SelectableCategory title={'Select Category'} style={cs.p_t_0} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedItem: state.selectedItem,
    recordGroupedByCategoryAndYear: selectRecordGroupedByCategoryAndYear(state),
  };
};

export default connect(mapStateToProps, {})(CategoryBasedReport);
